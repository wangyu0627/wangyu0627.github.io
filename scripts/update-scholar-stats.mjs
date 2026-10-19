import { writeFile, rename } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

const profileURL = 'https://scholar.google.com/citations?user=3ZhIpB0AAAAJ&hl=en';
const outputPath = fileURLToPath(new URL('../scholar-stats.js', import.meta.url));

export function parseScholarStats(html) {
  const name = html.match(/<[^>]+\bid=["']gsc_prf_in["'][^>]*>([\s\S]*?)<\/div>/)?.[1]
    .replace(/<[^>]+>/g, '').trim();
  if (name !== 'Yu Wang') throw new Error('Expected Scholar profile was not returned.');
  const table = html.match(/<table\b[^>]*\bid=["']gsc_rsb_st["'][^>]*>([\s\S]*?)<\/table>/)?.[1];
  if (!table) throw new Error('Scholar statistics table is missing.');
  const cells = [...table.matchAll(/<td\b[^>]*\bclass=["'][^"']*\bgsc_rsb_std\b[^"']*["'][^>]*>([\s\S]*?)<\/td>/g)];
  if (cells.length !== 6) throw new Error('Scholar statistics table has changed.');
  const values = cells.map(cell => {
    const value = cell[1].replace(/<[^>]+>/g, '').trim();
    if (!/^(?:\d+|\d{1,3}(?:,\d{3})+)$/.test(value)) throw new Error('Invalid Scholar metric.');
    const number = Number(value.replace(/,/g, ''));
    if (!Number.isSafeInteger(number)) throw new Error('Scholar metric is out of range.');
    return number;
  });
  const [citations, , hIndex] = values;
  if (hIndex > citations) throw new Error('Inconsistent Scholar statistics.');
  return { citations, hIndex };
}

export async function updateScholarStats({ output = outputPath, fetcher = fetch, now = new Date() } = {}) {
  const response = await fetcher(profileURL, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`Google Scholar returned HTTP ${response.status}.`);
  const stats = { ...parseScholarStats(await response.text()), updatedAt: now.toISOString() };
  const source = `// Last successful Google Scholar snapshot. Updated by scripts/update-scholar-stats.mjs.\nwindow.SCHOLAR_STATS = ${JSON.stringify(stats, null, 2)};\n`;
  await writeFile(output + '.tmp', source, 'utf8');
  await rename(output + '.tmp', output);
  return stats;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  try {
    console.log(JSON.stringify(await updateScholarStats()));
  } catch (error) {
    console.error(`Scholar update failed; keeping the last successful snapshot. ${error.message}`);
    process.exitCode = 1;
  }
}
