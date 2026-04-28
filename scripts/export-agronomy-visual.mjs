import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';

const execFileAsync = promisify(execFile);

const repoRoot = process.cwd();
const desktopDir = path.join(process.env.HOME || '', 'Desktop');
const outputDir = path.join(desktopDir, 'agronomy-intelligence-operating-model');
const outputHtml = path.join(outputDir, 'agronomy-intelligence-operating-model.html');
const outputZip = path.join(desktopDir, 'agronomy-intelligence-operating-model.zip');

const read = (relativePath) => readFile(path.join(repoRoot, relativePath), 'utf8');
const dataUri = (content, mimeType) =>
  `data:${mimeType};base64,${Buffer.from(content, 'utf8').toString('base64')}`;

const escapeAttr = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const aiceComponent = await read('src/components/AiceGatewayCluster.astro');
const d3Bundle = await read('node_modules/d3/dist/d3.min.js');
const aiceIcon = await read('public/images/infrastructure/aice-icon-white.svg');
const logo = await read('public/images/infrastructure/logo.svg');

const styleMatch = aiceComponent.match(/<style is:inline>\s*([\s\S]*?)\s*<\/style>/);
const scriptMatch = aiceComponent.match(/<script>\s*([\s\S]*?)\s*<\/script>/);

if (!styleMatch || !scriptMatch) {
  throw new Error('Could not extract style/script from AiceGatewayCluster.astro');
}

const aiceIconUri = dataUri(aiceIcon, 'image/svg+xml');
const logoUri = dataUri(logo, 'image/svg+xml');

const leftData = {
  name: 'Agronomy Teams',
  children: [
    {
      name: 'Previous work',
      children: [
        { name: 'Have we done this work before?' },
        { name: 'Summarise reports and past activity' }
      ]
    },
    {
      name: 'Pre-meeting info',
      children: [
        { name: 'What should I know before we meet?' },
        { name: 'What is the useful background?' }
      ]
    },
    {
      name: 'Understanding clients',
      children: [
        { name: 'What do we do for this person?' },
        { name: 'Who has interacted with them?' }
      ]
    },
    {
      name: 'Justifying charges',
      children: [
        { name: 'What work supports this charge?' },
        { name: 'Who did the work and when?' }
      ]
    },
    {
      name: 'Building Mail Lists',
      children: [
        { name: 'Who in the area should we invite?' },
        { name: 'Who is missing from the list?' }
      ]
    }
  ]
};

const rightData = {
  name: 'Agronomy Systems',
  children: [
    { name: 'Accounts', children: [{ name: 'Xero' }] },
    { name: 'Operations', children: [{ name: 'Ignite' }, { name: 'WorkflowMax' }] },
    { name: 'Marketing', children: [{ name: 'Hubspot' }] },
    { name: 'General', children: [{ name: 'Outlook' }, { name: 'Sharepoint' }] }
  ]
};

const agentOrder = [
  'Previous work',
  'Pre-meeting info',
  'Understanding clients',
  'Justifying charges',
  'Building Mail Lists'
];

const agentToMcp = {
  'Previous work': 'General',
  'Pre-meeting info': 'Operations',
  'Understanding clients': 'Operations',
  'Justifying charges': 'Accounts',
  'Building Mail Lists': 'Marketing'
};

const questionToTools = {
  'Have we done this work before?': ['Sharepoint', 'Outlook', 'WorkflowMax'],
  'Summarise reports and past activity': ['Sharepoint', 'Outlook'],
  'What should I know before we meet?': ['Outlook', 'Sharepoint', 'Ignite'],
  'What is the useful background?': ['Sharepoint', 'Outlook'],
  'What do we do for this person?': ['Ignite', 'WorkflowMax', 'Hubspot'],
  'Who has interacted with them?': ['Outlook', 'Hubspot'],
  'What work supports this charge?': ['Xero', 'WorkflowMax'],
  'Who did the work and when?': ['WorkflowMax', 'Ignite'],
  'Who in the area should we invite?': ['Hubspot', 'Outlook'],
  'Who is missing from the list?': ['Hubspot']
};

const diagramConfig = {
  title: 'Agronomy Intelligence Operating Model',
  leftData,
  rightData,
  agentOrder,
  agentToMcp,
  questionToTools,
  controlLayer: 'DATA CONTROL LAYER',
  tagline: 'FIELD-FIRST DECISION SUPPORT',
  leftColumnOffset: -130
};

const componentScript = scriptMatch[1]
  .replace("import * as d3 from 'd3';", 'const d3 = window.d3;')
  .replaceAll("'/images/infrastructure/aice-icon-white.svg'", JSON.stringify(aiceIconUri));

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Agronomy Intelligence Operating Model</title>
  <meta name="description" content="A standalone agronomy intelligence operating model visual for client sharing.">
  <style>
    :root {
      color-scheme: dark;
      --ink: #030508;
      --paper: #f8fafc;
      --muted: rgba(248, 250, 252, 0.72);
      --accent: #14B8A6;
      --orange: #ff8c69;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      background:
        radial-gradient(circle at 50% 34%, rgba(226, 232, 240, 0.16), transparent 34rem),
        linear-gradient(135deg, #030508 0%, #080b10 52%, #030508 100%);
      color: var(--paper);
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    main {
      width: min(1180px, calc(100vw - 40px));
      margin: 0 auto;
      padding: 32px 0;
    }

    .client-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      margin-bottom: 22px;
    }

    .client-header img {
      width: 168px;
      height: auto;
      display: block;
    }

    .client-kicker {
      margin: 0;
      color: var(--muted);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }

    .client-title {
      margin: 12px 0 8px;
      max-width: 880px;
      font-size: clamp(2rem, 5vw, 4rem);
      line-height: 0.98;
      letter-spacing: -0.045em;
    }

    .client-lead {
      margin: 0 0 24px;
      max-width: 760px;
      color: var(--muted);
      font-size: clamp(1rem, 1.6vw, 1.2rem);
      line-height: 1.55;
    }

    .visual-shell {
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(226, 232, 240, 0.14);
      border-radius: 28px;
      background: #030508;
      box-shadow: 0 24px 80px rgba(0, 0, 0, 0.42);
    }

    .visual-halo {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at center, rgba(226,232,240,0.2), rgba(18,22,29,0.9) 42%, rgba(3,5,8,1) 74%);
    }

    svg {
      position: relative;
      display: block;
      width: 100%;
      height: auto;
    }

    ${styleMatch[1]}
  </style>
</head>
<body>
  <main>
    <header class="client-header" aria-label="Advanced Analytica">
      <img src="${logoUri}" alt="Advanced Analytica">
      <p class="client-kicker">Client visual</p>
    </header>

    <p class="client-kicker">Agronomy intelligence</p>
    <h1 class="client-title">From scattered knowledge to controlled operation.</h1>
    <p class="client-lead">
      This standalone visual shows how common agronomy questions can connect through a controlled AICE layer into trusted systems, records, and communication tools.
    </p>

    <section
      data-aice-gateway-cluster
      data-aice-config='${escapeAttr(JSON.stringify(diagramConfig))}'
      class="visual-shell"
      aria-label="Agronomy intelligence operating model visualisation"
    >
      <div class="visual-halo"></div>
      <svg viewBox="0 0 1200 720" role="img" aria-label="Agronomy intelligence operating model visualisation"></svg>
    </section>
  </main>

  <script>${d3Bundle}</script>
  <script>${componentScript}</script>
</body>
</html>
`;

await rm(outputDir, { recursive: true, force: true });
await rm(outputZip, { force: true });
await mkdir(outputDir, { recursive: true });
await writeFile(outputHtml, html, 'utf8');
await execFileAsync('zip', ['-r', outputZip, path.basename(outputDir)], { cwd: desktopDir });

console.log(outputHtml);
console.log(outputZip);
