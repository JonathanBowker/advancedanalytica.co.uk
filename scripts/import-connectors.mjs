import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const sourceRoot = path.resolve(
  process.argv[2] ?? '/Users/jbb/Desktop/airbyte-connector-archiver/archive/rewritten-connectors'
);
const projectRoot = process.cwd();
const contentRoot = path.join(projectRoot, 'src/content/connectors');
const imageRoot = path.join(projectRoot, 'public/images/connectors');
const publicConnectorRoot = path.join(projectRoot, 'public/connectors');
const beginMarker = '<!-- BEGIN ADVANCED ANALYTICA REWRITE -->';
const endMarker = '<!-- END ADVANCED ANALYTICA REWRITE -->';

const replaceLogoPaths = (value) =>
  value.replaceAll('../logos/sources/', '/images/connectors/sources/')
    .replaceAll('../logos/destinations/', '/images/connectors/destinations/');

await rm(contentRoot, { recursive: true, force: true });
await rm(imageRoot, { recursive: true, force: true });
await mkdir(contentRoot, { recursive: true });
await mkdir(imageRoot, { recursive: true });
await mkdir(publicConnectorRoot, { recursive: true });

let imported = 0;
for (const section of ['sources', 'destinations']) {
  const sourceDirectory = path.join(sourceRoot, section);
  const destinationDirectory = path.join(contentRoot, section);
  await mkdir(destinationDirectory, { recursive: true });

  const files = (await readdir(sourceDirectory)).filter((file) => file.endsWith('.md') && file !== 'README.md');
  for (const file of files) {
    const source = await readFile(path.join(sourceDirectory, file), 'utf8');
    const frontmatterEnd = source.indexOf('\n---\n', 4);
    if (!source.startsWith('---\n') || frontmatterEnd < 0) {
      throw new Error(`Invalid frontmatter: ${section}/${file}`);
    }

    const frontmatter = source.slice(0, frontmatterEnd + 5);
    const begin = source.indexOf(beginMarker);
    const end = source.indexOf(endMarker);
    const guide = begin >= 0 && end > begin
      ? source.slice(begin + beginMarker.length, end).trim()
      : `# ${file.replace(/\.md$/, '').replaceAll('-', ' ')}\n\nA connector guide isn't available yet.`;
    const output = replaceLogoPaths(`${frontmatter}\n${guide}\n`);
    await writeFile(path.join(destinationDirectory, file), output);
    imported += 1;
  }
}

await cp(path.join(sourceRoot, 'logos'), imageRoot, { recursive: true });
await cp(path.join(sourceRoot, 'AIRBYTE-LICENSE'), path.join(publicConnectorRoot, 'AIRBYTE-LICENSE'));
await cp(path.join(sourceRoot, 'catalog.json'), path.join(publicConnectorRoot, 'catalog.json'));

console.log(JSON.stringify({ imported, sourceRoot, contentRoot, imageRoot }, null, 2));
