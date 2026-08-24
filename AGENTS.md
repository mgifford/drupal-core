## Drupal Code Query MCP

When working on Drupal projects, use the `drupal-code-query` MCP server
(`https://mcp.tresbien.tech/mcp`) for questions about Drupal core and contributed
module APIs, change records, symbol usage, upgrade compatibility, and ecosystem
patterns.

Prefer these tools before giving Drupal API guidance:

- `lookup_core_symbol` for whether a core symbol is safe to use
- `find_core_symbol` when the exact symbol name is unknown
- `get_change_record` for Drupal core API changes
- `what_changed` when comparing core versions
- `search_contrib_code` for examples from core and contributed projects
- `project_upgrade_report` for upgrade-readiness questions

Use the project's actual Drupal and PHP versions when interpreting results.
Treat this server as read-only research data; inspect the local repository for
project-specific behavior. Distinguish MCP findings from conclusions based on
the local codebase, and mention the relevant core version when making API
recommendations.