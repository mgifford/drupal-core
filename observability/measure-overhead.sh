#!/usr/bin/env bash
# Measures what observatory_trace adds to time to first byte (TTFB).
# See docs/observability/README.md, "Overhead".
#
# Runs inside the DDEV web container, so the DDEV router and TLS are not
# part of the timing:
#
#   ddev exec bash observability/measure-overhead.sh <test user> [samples per block] [blocks per mode]
#
# It alternates blocks with tracing off and on (off, on, off, on, ...), so
# slow drift on the machine affects both modes alike. Each block discards
# three warm-up requests, then times two routes:
#   admin-content  GET /admin/content as the test user: bypasses the page
#                  cache and the dynamic page cache (uncached).
#   login-cached   GET /user/login anonymously: a page cache hit.
# Each sample records whether the response carried a traceresponse header.
# The script stops if a block's warm-up shows the wrong mode, for example
# when OTEL_EXPORTER_OTLP_ENDPOINT is set in the container (it overrides the
# state value, so tracing cannot be turned off).
#
# Tracing is turned on with the state value observatory_trace.otlp_endpoint,
# set to $OBSERVATORY_OTLP_ENDPOINT (default
# http://observatory-otel-collector:4318). The original value is restored
# when the script ends. Results go to
# tests/playwright/reports/evidence/overhead/ (gitignored) as CSV.
set -euo pipefail

usage="usage: measure-overhead.sh <test user> [samples per block] [blocks per mode]"
user="${1:?$usage}"
samples="${2:-10}"
blocks="${3:-4}"
if ! [[ "$samples" =~ ^[1-9][0-9]*$ && "$blocks" =~ ^[1-9][0-9]*$ ]]; then
  echo "$usage" >&2
  exit 2
fi
endpoint="${OBSERVATORY_OTLP_ENDPOINT:-http://observatory-otel-collector:4318}"
base="http://localhost"
key="observatory_trace.otlp_endpoint"

work="$(mktemp -d)"
jar="$work/cookies"
headers="$work/headers"
original="$(dr state:get "$key" 2>/dev/null || true)"

restore() {
  if [ -n "$original" ]; then
    dr state:set "$key" "$original" >/dev/null
  else
    dr state:delete "$key" >/dev/null 2>&1 || true
  fi
  rm -rf "$work"
}
trap restore EXIT

out_dir="tests/playwright/reports/evidence/overhead"
mkdir -p "$out_dir"
out="$out_dir/overhead-$(date -u +%Y%m%dT%H%M%SZ).csv"
echo "block,mode,route,http_status,ttfb_s,total_s,traceresponse" > "$out"

# Log in once. The one-time login link is used here and never printed.
link="$(dr user:login --name "$user" 2>/dev/null | tail -n 1)"
path="/${link#*://*/}"
curl -s -o /dev/null -c "$jar" -b "$jar" -L "$base$path"
check="$(curl -s -o /dev/null -b "$jar" -w '%{http_code}' "$base/admin/content")"
if [ "$check" != "200" ]; then
  echo "measure-overhead: GET /admin/content as $user returned $check, not 200" >&2
  exit 1
fi

traced=no
sample() {
  local block="$1" mode="$2" route="$3" url="$4" cookies="$5" timing
  if [ -n "$cookies" ]; then
    timing="$(curl -s -o /dev/null -D "$headers" -b "$jar" -w '%{http_code},%{time_starttransfer},%{time_total}' "$url")"
  else
    timing="$(curl -s -o /dev/null -D "$headers" -w '%{http_code},%{time_starttransfer},%{time_total}' "$url")"
  fi
  traced=no
  grep -qi '^traceresponse:' "$headers" && traced=yes
  [ -n "$block" ] && echo "$block,$mode,$route,$timing,$traced" >> "$out"
  return 0
}

block=0
for _ in $(seq "$blocks"); do
  for mode in off on; do
    block=$((block + 1))
    if [ "$mode" = on ]; then
      dr state:set "$key" "$endpoint" >/dev/null
    else
      dr state:delete "$key" >/dev/null 2>&1 || true
    fi
    for _ in 1 2 3; do
      sample "" "$mode" admin-content "$base/admin/content" yes
      sample "" "$mode" login-cached "$base/user/login" ""
    done
    if { [ "$mode" = on ] && [ "$traced" = no ]; } || { [ "$mode" = off ] && [ "$traced" = yes ]; }; then
      echo "measure-overhead: block $block should have tracing $mode, but traceresponse=$traced" >&2
      exit 1
    fi
    for _ in $(seq "$samples"); do
      sample "$block" "$mode" admin-content "$base/admin/content" yes
      sample "$block" "$mode" login-cached "$base/user/login" ""
    done
  done
done

echo "Wrote $out"
