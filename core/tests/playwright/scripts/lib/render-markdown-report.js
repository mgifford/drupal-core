'use strict';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function renderInline(text) {
  let html = escapeHtml(text);
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  html = html.replace(/(^|\s)(https?:\/\/[^\s<]+)/g, '$1<a href="$2">$2</a>');
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
  return `<div class="table-wrap"><table>${thead}${tbody}</table></div>`;
}

function renderMarkdownBody(markdown) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  const headings = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      blocks.push('<hr>');
      index += 1;
      continue;
    }

    // Raw HTML block pass-through: <details> blocks are collected in full
    // (including blank lines and nested content) until the closing </details>.
    if (/^<details[\s>]/.test(line.trim())) {
      const rawLines = [line];
      index += 1;
      while (index < lines.length) {
        rawLines.push(lines[index]);
        const done = /^<\/details>\s*$/.test(lines[index].trim());
        index += 1;
        if (done) break;
      }
      blocks.push(rawLines.join('\n'));
      continue;
    }

    if (line.startsWith('```')) {
      const codeLines = [];
      const language = line.slice(3).trim();
      index += 1;
      while (index < lines.length && !lines[index].startsWith('```')) {
        codeLines.push(lines[index]);
        index += 1;
      }
      index += 1;
      const className = language ? ` class="language-${escapeHtml(language)}"` : '';
      blocks.push(`<pre><code${className}>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
      continue;
    }

    if (/^#{1,6}\s/.test(line)) {
      const level = line.match(/^#+/)[0].length;
      const text = line.replace(/^#{1,6}\s+/, '');
      const slug = slugify(text);
      headings.push({ level, text, slug });
      const anchor = level >= 2 ? `<a class="heading-anchor" href="#${slug}" aria-label="Link to ${escapeHtml(text)} section">#</a>` : '';
      blocks.push(`<h${level} id="${slug}">${renderInline(text)}${anchor}</h${level}>`);
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
      && !/^---+$/.test(lines[index].trim())
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

  return {
    body: blocks.join('\n'),
    headings,
  };
}

function renderToc(headings) {
  const tocHeadings = headings.filter((heading) => heading.level === 2 || heading.level === 3);
  if (tocHeadings.length === 0) {
    return '';
  }

  return `
    <nav class="toc" aria-label="Table of contents">
      <h2>Contents</h2>
      <ol>
        ${tocHeadings.map((heading) => `<li class="level-${heading.level}"><a href="#${heading.slug}">${escapeHtml(heading.text)}</a></li>`).join('')}
      </ol>
    </nav>`;
}

function renderMarkdownReport({ title, description, markdown, sourceLabel }) {
  const { body, headings } = renderMarkdownBody(markdown);
  const toc = renderToc(headings);
  const renderedSource = sourceLabel ? `<p class="meta">Source markdown: <code>${escapeHtml(sourceLabel)}</code></p>` : '';

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <style>
    :root {
      --page-bg: #eef2f8;
      --card-bg: #ffffff;
      --surface-bg: #f7f9fc;
      --text: #1c2431;
      --muted: #546173;
      --border: #d5dce7;
      --link: #0e4fb5;
      --accent: #b7ccf6;
      --table-stripe: #f5f8ff;
      --shadow: 0 12px 34px rgba(20, 35, 60, 0.08);
    }
    @media (prefers-color-scheme: dark) {
      :root {
        --page-bg: #111722;
        --card-bg: #1a2331;
        --surface-bg: #131b27;
        --text: #e8edf5;
        --muted: #93a0b5;
        --border: #2b3950;
        --link: #8cb8ff;
        --accent: #23395f;
        --table-stripe: #162032;
        --shadow: 0 12px 34px rgba(0, 0, 0, 0.35);
      }
    }
    * { box-sizing: border-box; }
    html { color-scheme: light dark; scroll-behavior: smooth; }
    body {
      margin: 0;
      padding: 2rem 1rem 4rem;
      font: 16px/1.7 Georgia, "Iowan Old Style", "Palatino Linotype", serif;
      background:
        radial-gradient(circle at top left, rgba(14, 79, 181, 0.08), transparent 28%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.18), transparent 16%),
        var(--page-bg);
      color: var(--text);
    }
    a { color: var(--link); }
    a:hover, a:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }
    .page {
      max-width: 1120px;
      margin: 0 auto;
      display: grid;
      gap: 1.25rem;
    }
    .hero,
    .toc,
    .content {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 1rem;
      box-shadow: var(--shadow);
    }
    .hero {
      padding: 1.5rem;
    }
    .hero h1 {
      margin: 0 0 0.5rem;
      line-height: 1.15;
      font-size: clamp(2rem, 4vw, 3rem);
    }
    .lede,
    .meta {
      color: var(--muted);
      margin: 0.35rem 0 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    .toc {
      padding: 1rem 1.25rem;
    }
    .toc h2 {
      margin: 0 0 0.65rem;
      font-size: 1rem;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    .toc ol {
      margin: 0;
      padding-left: 1.2rem;
      display: grid;
      gap: 0.4rem;
    }
    .toc li.level-3 {
      margin-left: 1rem;
      color: var(--muted);
    }
    .content {
      padding: 1.5rem;
      overflow: hidden;
    }
    h1, h2, h3, h4, h5, h6 {
      line-height: 1.25;
      scroll-margin-top: 1rem;
    }
    h2, h3 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    h2 {
      margin-top: 2.4rem;
      padding-bottom: 0.45rem;
      border-bottom: 1px solid var(--border);
    }
    h3 {
      margin-top: 1.8rem;
    }
    .heading-anchor {
      text-decoration: none;
      opacity: 0;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    h2:hover .heading-anchor,
    h2:focus-within .heading-anchor,
    h3:hover .heading-anchor,
    h3:focus-within .heading-anchor {
      opacity: 1;
    }
    p, ul, ol, blockquote, pre, .table-wrap, hr {
      margin: 1rem 0;
    }
    ul, ol {
      padding-left: 1.5rem;
    }
    li + li {
      margin-top: 0.35rem;
    }
    code, pre {
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    }
    code {
      background: rgba(127, 127, 127, 0.14);
      padding: 0.1rem 0.35rem;
      border-radius: 0.3rem;
      font-size: 0.95em;
    }
    pre {
      overflow-x: auto;
      padding: 1rem;
      border: 1px solid var(--border);
      border-radius: 0.85rem;
      background: var(--surface-bg);
    }
    blockquote {
      border-left: 4px solid var(--link);
      padding: 0.25rem 0 0.25rem 1rem;
      color: var(--muted);
      margin-left: 0;
      background: linear-gradient(90deg, rgba(14, 79, 181, 0.08), transparent 60%);
    }
    details {
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      padding: 0.5rem 1rem;
      margin: 0.75rem 0;
      background: var(--surface-bg);
    }
    details[open] {
      padding-bottom: 0.75rem;
    }
    details summary {
      cursor: pointer;
      font-weight: 600;
      padding: 0.25rem 0;
      list-style: none;
      color: var(--text);
    }
    details summary::-webkit-details-marker { display: none; }
    details summary::before {
      content: '▶ ';
      font-size: 0.7em;
      color: var(--muted);
    }
    details[open] summary::before { content: '▼ '; }
    details table {
      margin-top: 0.75rem;
      min-width: 0;
    }
    hr {
      border: 0;
      border-top: 1px solid var(--border);
    }
    .table-wrap {
      overflow-x: auto;
      border: 1px solid var(--border);
      border-radius: 0.85rem;
      background: var(--surface-bg);
    }
    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 680px;
    }
    th, td {
      border-bottom: 1px solid var(--border);
      padding: 0.7rem 0.85rem;
      text-align: left;
      vertical-align: top;
    }
    th {
      position: sticky;
      top: 0;
      z-index: 1;
      background: var(--accent);
      color: var(--text);
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      font-size: 0.92rem;
    }
    tbody tr:nth-child(even) td {
      background: var(--table-stripe);
    }
    @media (min-width: 900px) {
      .page {
        grid-template-columns: minmax(0, 1fr) 280px;
        align-items: start;
      }
      .hero,
      .content {
        grid-column: 1;
      }
      .toc {
        grid-column: 2;
        position: sticky;
        top: 1rem;
      }
    }
  </style>
</head>
<body>
  <div class="page">
    <header class="hero">
      <h1>${escapeHtml(title)}</h1>
      <p class="lede">${escapeHtml(description)}</p>
      ${renderedSource}
    </header>
    ${toc}
    <main class="content">
      ${body}
    </main>
  </div>
</body>
</html>`;
}

module.exports = {
  renderMarkdownReport,
};
