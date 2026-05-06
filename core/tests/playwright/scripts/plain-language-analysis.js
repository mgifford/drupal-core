/**
 * Plain language analyzer for Drupal Core UI strings.
 *
 * Reads reports/content-patterns.json and scores every corpus of text
 * (help text, module descriptions, status messages, button labels,
 * table headers, form labels) against:
 *
 *   - Flesch Reading Ease  (higher = easier; 60–70 = plain English target)
 *   - Flesch-Kincaid Grade Level  (target ≤ 8 for general audiences)
 *   - Sentence-level flags: passive voice, long sentences, jargon,
 *     nominalisations, vague openers, missing articles
 *
 * Key references:
 *   - Canada.ca Content Style Guide §2 (2024 update)
 *   - 18F Content Guide — Plain Language
 *   - Colorado OIT Plain Language guide
 *   - ISO plain language standard (2023)
 *
 * Note: Readability formulas are a *diagnostic* tool, not a pass/fail gate.
 * Use scores to find candidates for review; apply judgement to fix them.
 *
 * Usage:
 *   node core/tests/playwright/scripts/plain-language-analysis.js
 *
 * Output:
 *   reports/plain-language-report.json
 *   reports/plain-language-report.md  (human-readable)
 */

'use strict';

const fs   = require('fs');
const path = require('path');
const { renderMarkdownReport } = require('./lib/render-markdown-report');

// ── Paths ─────────────────────────────────────────────────────────────────────

const INPUT  = path.resolve(__dirname, '../../../../reports/content-patterns.json');
const OUT_JSON = path.resolve(__dirname, '../../../../reports/plain-language-report.json');
const OUT_MD   = path.resolve(__dirname, '../../../../reports/plain-language-report.md');
const OUT_HTML = path.resolve(__dirname, '../../../../reports/plain-language-report.html');

// ── Syllable counter (English approximation) ──────────────────────────────────

function syllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!word) return 0;
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const m = word.match(/[aeiouy]{1,2}/g);
  return m ? m.length : 1;
}

function wordSyllables(text) {
  return text.split(/\s+/).filter(Boolean).map(syllables);
}

// ── Readability scores ────────────────────────────────────────────────────────

function readability(text) {
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 3);
  const words = text.split(/\s+/).filter(Boolean);
  const syls = words.map(syllables);

  const nSentences = sentences.length || 1;
  const nWords     = words.length || 1;
  const nSyllables = syls.reduce((a, b) => a + b, 0);

  const fre  = 206.835 - 1.015 * (nWords / nSentences) - 84.6 * (nSyllables / nWords);
  const fkgl = 0.39    * (nWords / nSentences) + 11.8 * (nSyllables / nWords) - 15.59;

  return {
    fleschReadingEase:       Math.round(fre  * 10) / 10,
    fleschKincaidGradeLevel: Math.round(fkgl * 10) / 10,
    sentences: nSentences,
    words:     nWords,
    syllables: nSyllables,
    avgWordsPerSentence: Math.round((nWords / nSentences) * 10) / 10,
  };
}

function freLabel(score) {
  if (score >= 90) return 'Very easy (grade 5)';
  if (score >= 80) return 'Easy (grade 6)';
  if (score >= 70) return 'Fairly easy (grade 7)';
  if (score >= 60) return 'Standard (grade 8–9) ✅ target range';
  if (score >= 50) return 'Fairly difficult (grade 10–12)';
  if (score >= 30) return 'Difficult (college level)';
  return 'Very confusing (professional)';
}

// ── Sentence-level flags ──────────────────────────────────────────────────────

const PASSIVE_RE = /\b(is|are|was|were|be|been|being)\s+\w+ed\b/i;

const JARGON = [
  'utilize', 'utilization', 'utilise',
  'leverage', 'leveraging',
  'facilitate', 'facilitation',
  'implement', 'implementation',
  'notwithstanding',
  'aforementioned',
  'herein', 'hereinafter',
  'pursuant',
  'instantiate', 'instantiation',
  'programmatically',   // often replaceable with "automatically" or "by code"
  'via',                // replaceable with "through" or "using"
  'i\.e\.', 'e\.g\.',  // should be "that is" / "for example"
];
const JARGON_RE = new RegExp('\\b(' + JARGON.join('|') + ')\\b', 'i');

// Nominalisations: noun forms of verbs that obscure the action
const NOMINALISATIONS = [
  'utilization', 'implementation', 'configuration', 'administration',
  'specification', 'determination', 'establishment', 'identification',
  'modification', 'authentication', 'authorization', 'customization',
  'documentation', 'aggregation', 'prioritization', 'simplification',
  'functionalities', 'capabilities',
];
const NOMINAL_RE = new RegExp('\\b(' + NOMINALISATIONS.join('|') + ')\\b', 'i');

// Vague openers that bury the subject
const VAGUE_OPENERS_RE = /^(there (is|are|was|were)|it (is|was|has been))\b/i;

// Long sentence threshold (words)
const LONG_SENTENCE_WORDS = 25;

function flagSentence(sentence) {
  const flags = [];
  const words = sentence.split(/\s+/).filter(Boolean);

  if (words.length > LONG_SENTENCE_WORDS)
    flags.push(`long sentence (${words.length} words)`);

  if (PASSIVE_RE.test(sentence))
    flags.push('passive voice');

  const jargonMatch = sentence.match(JARGON_RE);
  if (jargonMatch)
    flags.push(`jargon: "${jargonMatch[0]}"`);

  const nomMatch = sentence.match(NOMINAL_RE);
  if (nomMatch)
    flags.push(`nominalisation: "${nomMatch[0]}"`);

  if (VAGUE_OPENERS_RE.test(sentence.trim()))
    flags.push('vague opener (there is/it is)');

  return flags;
}

function analyzeText(text, source) {
  if (!text || text.length < 10) return null;

  const scores = readability(text);
  const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 3);

  const flagged = [];
  for (const s of sentences) {
    const flags = flagSentence(s);
    if (flags.length > 0) {
      flagged.push({ sentence: s.slice(0, 200), flags });
    }
  }

  return {
    source,
    text: text.slice(0, 300),
    scores,
    freLabel: freLabel(scores.fleschReadingEase),
    issues: flagged,
  };
}

// ── Main ──────────────────────────────────────────────────────────────────────

function main() {
  const data = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
  const all  = [...data.anonymousPages, ...data.adminPages].filter(p => !p.error && !p.skipped);

  const results = [];

  // ── Help text corpus ────────────────────────────────────────────────────────
  for (const page of all) {
    for (const ht of (page.helpText || [])) {
      const r = analyzeText(ht, `[${page.name}] help text`);
      if (r) results.push(r);
    }
  }

  // ── Module descriptions ─────────────────────────────────────────────────────
  // Module descriptions come through as help text on the Modules page —
  // pull them separately because they're a distinct corpus.
  const modulePage = all.find(p => p.name === 'Modules');
  if (modulePage) {
    for (const ht of (modulePage.helpText || [])) {
      // Module descriptions always contain "Machine name:"
      if (ht.includes('Machine name:')) {
        // Extract just the human-readable sentence (before "Machine name:")
        const desc = ht.split('Machine name:')[0].trim();
        if (desc.length > 10) {
          const r = analyzeText(desc, '[Modules] module description');
          if (r) r.fullText = ht.slice(0, 300);
          if (r) results.push(r);
        }
      }
    }
  }

  // ── Status messages ─────────────────────────────────────────────────────────
  for (const page of all) {
    for (const msg of (page.statusMessages || [])) {
      const r = analyzeText(msg, `[${page.name}] status message`);
      if (r) results.push(r);
    }
  }

  // ── Description blocks ──────────────────────────────────────────────────────
  for (const page of all) {
    for (const desc of (page.descriptions || [])) {
      const r = analyzeText(desc, `[${page.name}] description`);
      if (r) results.push(r);
    }
  }

  // ── Aggregate corpus stats ──────────────────────────────────────────────────
  const allTexts = results.map(r => r.text).join(' ');
  const corpusScores = readability(allTexts);

  // ── Collect all flagged items sorted by severity ────────────────────────────
  const allFlagged = results
    .filter(r => r.issues.length > 0)
    .sort((a, b) => a.scores.fleschKincaidGradeLevel - b.scores.fleschKincaidGradeLevel)
    .reverse(); // hardest first

  // ── Count issue types ───────────────────────────────────────────────────────
  const issueCounts = {};
  for (const r of results) {
    for (const issue of r.issues) {
      for (const flag of issue.flags) {
        const key = flag.replace(/:\s+".+"$/, '').replace(/\(\d+ words\)/, '(N words)');
        issueCounts[key] = (issueCounts[key] || 0) + 1;
      }
    }
  }

  // ── Grade distribution ──────────────────────────────────────────────────────
  const gradeDist = { '≤5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13+': 0 };
  for (const r of results) {
    const g = r.scores.fleschKincaidGradeLevel;
    if (g <= 5)       gradeDist['≤5']++;
    else if (g <= 6)  gradeDist['6']++;
    else if (g <= 7)  gradeDist['7']++;
    else if (g <= 8)  gradeDist['8']++;
    else if (g <= 9)  gradeDist['9']++;
    else if (g <= 10) gradeDist['10']++;
    else if (g <= 11) gradeDist['11']++;
    else if (g <= 12) gradeDist['12']++;
    else              gradeDist['13+']++;
  }

  // ── Top 20 hardest strings ──────────────────────────────────────────────────
  const top20Hard = [...results]
    .sort((a, b) => b.scores.fleschKincaidGradeLevel - a.scores.fleschKincaidGradeLevel)
    .slice(0, 20);

  const output = {
    generatedAt: new Date().toISOString(),
    corpus: {
      totalTexts: results.length,
      ...corpusScores,
      freLabel: freLabel(corpusScores.fleschReadingEase),
    },
    gradeDistribution: gradeDist,
    issueSummary: issueCounts,
    top20HardestTexts: top20Hard,
    allFlaggedTexts: allFlagged,
    allResults: results,
  };

  fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
  fs.writeFileSync(OUT_JSON, JSON.stringify(output, null, 2));

  // ── Markdown report ─────────────────────────────────────────────────────────
  const lines = [];
  lines.push('# Plain Language Analysis — Drupal Core UI Strings');
  lines.push('');
  lines.push(`*Generated: ${new Date().toISOString().slice(0, 10)}*`);
  lines.push('');
  lines.push('## Corpus summary');
  lines.push('');
  lines.push(`| Metric | Value |`);
  lines.push(`| :--- | :--- |`);
  lines.push(`| Total text samples analyzed | ${output.corpus.totalTexts} |`);
  lines.push(`| Total words | ${output.corpus.words} |`);
  lines.push(`| Flesch Reading Ease (corpus) | **${output.corpus.fleschReadingEase}** — ${output.corpus.freLabel} |`);
  lines.push(`| Flesch-Kincaid Grade Level (corpus) | **${output.corpus.fleschKincaidGradeLevel}** |`);
  lines.push(`| Avg words per sentence | ${output.corpus.avgWordsPerSentence} |`);
  lines.push('');
  lines.push('> **Target:** FRE ≥ 60 (standard/plain English), FKGL ≤ 8 (grade 8).');
  lines.push('> Readability scores are a *diagnostic tool*, not a pass/fail gate.');
  lines.push('> Canada.ca (2024) and ISO plain language standard (2023) both caution');
  lines.push('> against relying on formulas alone — use them to find candidates for review.');
  lines.push('');
  lines.push('## Grade level distribution');
  lines.push('');
  lines.push('| Grade | Count |');
  lines.push('| :--- | :--- |');
  for (const [grade, count] of Object.entries(gradeDist)) {
    const note = (grade === '≤5' || grade === '6' || grade === '7' || grade === '8') ? ' ✅' : '';
    lines.push(`| ${grade}${note} | ${count} |`);
  }
  lines.push('');
  lines.push('## Issue summary');
  lines.push('');
  lines.push('| Issue type | Occurrences |');
  lines.push('| :--- | :--- |');
  for (const [issue, count] of Object.entries(issueCounts).sort((a, b) => b[1] - a[1])) {
    lines.push(`| ${issue} | ${count} |`);
  }
  lines.push('');
  lines.push('## Top 20 hardest strings (by grade level)');
  lines.push('');
  for (const r of top20Hard) {
    lines.push(`### Grade ${r.scores.fleschKincaidGradeLevel} — ${r.source}`);
    lines.push('');
    lines.push(`> ${r.text.replace(/\n/g, ' ')}`);
    lines.push('');
    lines.push(`FRE: ${r.scores.fleschReadingEase} | Words: ${r.scores.words} | Avg words/sentence: ${r.scores.avgWordsPerSentence}`);
    if (r.issues.length > 0) {
      lines.push('');
      lines.push('**Flags:**');
      for (const issue of r.issues) {
        lines.push(`- *${issue.sentence.slice(0, 120)}*`);
        lines.push(`  - ${issue.flags.join(', ')}`);
      }
    }
    lines.push('');
  }
  lines.push('## All flagged strings');
  lines.push('');
  for (const r of allFlagged) {
    lines.push(`### Grade ${r.scores.fleschKincaidGradeLevel} — ${r.source}`);
    lines.push('');
    lines.push(`> ${r.text.slice(0, 200).replace(/\n/g, ' ')}`);
    lines.push('');
    for (const issue of r.issues) {
      lines.push(`- *"${issue.sentence.slice(0, 120)}"*`);
      lines.push(`  - ${issue.flags.join(', ')}`);
    }
    lines.push('');
  }

  const markdown = lines.join('\n');
  const html = renderMarkdownReport({
    title: 'Plain Language Analysis — Drupal Core UI Strings',
    description: 'Readability and plain-language diagnostics for collected Drupal admin UI strings.',
    markdown,
    sourceLabel: path.basename(OUT_MD),
  });

  fs.writeFileSync(OUT_MD, markdown);
  fs.writeFileSync(OUT_HTML, html);

  // ── Console summary ─────────────────────────────────────────────────────────
  console.log('\n📊 Plain Language Analysis — Drupal Core UI Strings');
  console.log('─'.repeat(55));
  console.log(`  Total text samples:          ${output.corpus.totalTexts}`);
  console.log(`  Corpus FRE:                  ${output.corpus.fleschReadingEase}  (${output.corpus.freLabel})`);
  console.log(`  Corpus FKGL:                 ${output.corpus.fleschKincaidGradeLevel}`);
  console.log(`  Avg words/sentence:          ${output.corpus.avgWordsPerSentence}`);
  console.log('');
  console.log('  Issue counts:');
  for (const [issue, count] of Object.entries(issueCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${count.toString().padStart(3)}  ${issue}`);
  }
  console.log('');
  console.log(`  Top 5 hardest strings:`);
  for (const r of top20Hard.slice(0, 5)) {
    console.log(`    Grade ${r.scores.fleschKincaidGradeLevel.toFixed(1).padStart(5)} | ${r.source}`);
    console.log(`             "${r.text.slice(0, 80).replace(/\n/g, ' ')}…"`);
  }
  console.log('');
  console.log(`✅ Reports written to:`);
  console.log(`   ${OUT_JSON}`);
  console.log(`   ${OUT_MD}`);
  console.log(`   ${OUT_HTML}`);
}

main();
