'use strict';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderInline(text) {
  let html = escapeHtml(text);
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  return html;
}

function isTableSeparator(line) {
  return /^\|(?:\s*:?-+:?\s*\|)+\s*$/.test(line);
}

function renderTable(lines) {
  const rows = lines
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim()));

  if (rows.length < 2 || !isTableSeparator(lines[1])) {
    return null;
  }

  const header = rows[0];
  const body = rows.slice(2);

  const thead = `<thead><tr>${header.map((cell) => `<th scope="col">${renderInline(cell)}</th>`).join('')}</tr></thead>`;
  const tbody = `<tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join('')}</tr>`).join('')}</tbody>`;
  return `<table>${thead}${tbody}</table>`;
}

function renderMarkdownBody(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.startsWith('```')) {
      const codeLines = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith('```')) {
        codeLines.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push(`<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
      continue;
    }

    if (/^#{1,6}\s/.test(line)) {
      const level = line.match(/^#+/)[0].length;
      const text = line.replace(/^#{1,6}\s+/, '');
      const slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      blocks.push(`<h${level} id="${slug}">${renderInline(text)}</h${level}>`);
      index += 1;
      continue;
    }

    if (line.startsWith('> ')) {
      const quoteLines = [];
      while (index < lines.length && lines[index].startsWith('> ')) {
        quoteLines.push(lines[index].slice(2));
        index += 1;
      }
      blocks.push(`<blockquote><p>${quoteLines.map(renderInline).join('<br>')}</p></blockquote>`);
      continue;
    }

    if (line.trim().startsWith('|')) {
      const tableLines = [];
      while (index < lines.length && lines[index].trim().startsWith('|')) {
        tableLines.push(lines[index]);
        index += 1;
      }
      const table = renderTable(tableLines);
      if (table) {
        blocks.push(table);
        continue;
      }
      blocks.push(`<p>${tableLines.map(renderInline).join('<br>')}</p>`);
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*[-*]\s+/, ''));
        index += 1;
      }
      blocks.push(`<ul>${items.map((item) => `<li>${renderInline(item)}</li>`).join('')}</ul>`);
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\s*\d+\.\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*\d+\.\s+/, ''));
        index += 1;
      }
      blocks.push(`<ol>${items.map((item) => `<li>${renderInline(item)}</li>`).join('')}</ol>`);
      continue;
    }

    const paragraph = [line];
    index += 1;
    while (
      index < lines.length
      && lines[index].trim()
      && !lines[index].startsWith('```')
      && !/^#{1,6}\s/.test(lines[index])
      && !lines[index].startsWith('> ')
      && !lines[index].trim().startsWith('|')
      && !/^\s*[-*]\s+/.test(lines[index])
      && !/^\s*\d+\.\s+/.test(lines[index])
    ) {
      paragraph.push(lines[index]);
      index += 1;
    }
    blocks.push(`<p>${renderInline(paragraph.join(' '))}</p>`);
  }

  return blocks.join('\n');
}

function renderMarkdownReport({ title, description, markdown, sourceLabel }) {
  const body = renderMarkdownBody(markdown);
  const renderedSource = sourceLabel ? `<p class="meta">Source markdown: <code>${escapeHtml(sourceLabel)}</code></p>` : '';

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <style>
    :root {
      --page-bg: #f4f6fa;
      --card-bg: #ffffff;
      --text: #1e2430;
      --muted: #556070;
      --border: #d7dde7;
      --link: #0e4fb5;
      --shadow: 0 6px 22px rgba(20, 35, 60, 0.08);
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --page-bg: #12161f;
        --card-bg: #1d2330;
        --text: #e8edf5;
        --muted: #8b95aa;
        --border: #2e3750;
        --link: #6aa3ff;
        --shadow: 0 6px 22px rgba(0, 0, 0, 0.35);
      }
    }
    * { box-sizing: border-box; }
    html { color-scheme: light dark; }
    body {
      margin: 0;
      padding: 2rem 1rem 4rem;
      font: 16px/1.65 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: var(--page-bg);
      color: var(--text);
    }
    main {
      max-width: 960px;
      margin: 0 auto;
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 1rem;
      box-shadow: var(--shadow);
      padding: 1.5rem;
    }
    h1, h2, h3, h4, h5, h6 { line-height: 1.25; }
    h1 { margin: 0 0 0.5rem; font-size: 2rem; }
    h2 { margin-top: 2rem; padding-bottom: 0.35rem; border-bottom: 1px solid var(--border); }
    p, ul, ol, table, blockquote, pre { margin: 1rem 0; }
    a { color: var(--link); }
    a:focus-visible, a:hover { outline: 2px solid currentColor; outline-offset: 2px; }
    .lede, .meta { color: var(--muted); }
    code, pre { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
    code {
      background: rgba(127, 127, 127, 0.12);
      padding: 0.1rem 0.3rem;
      border-radius: 0.25rem;
    }
    pre {
      overflow-x: auto;
      padding: 1rem;
      border: 1px solid var(--border);
      border-radius: 0.75rem;
      background: rgba(127, 127, 127, 0.08);
    }
    blockquote {
      border-left: 4px solid var(--link);
      padding: 0.25rem 0 0.25rem 1rem;
      color: var(--muted);
      margin-left: 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      border: 1px solid var(--border);
    }
    th, td {
      border: 1px solid var(--border);
      padding: 0.6rem 0.75rem;
      text-align: left;
      vertical-align: top;
    }
    th { background: rgba(127, 127, 127, 0.08); }
  </style>
</head>
<body>
  <main>
    <h1>${escapeHtml(title)}</h1>
    <p class="lede">${escapeHtml(description)}</p>
    ${renderedSource}
    ${body}
  </main>
</body>
</html>`;
}

module.exports = {
  renderMarkdownReport,
};