import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseScholarStats, updateScholarStats } from '../scripts/update-scholar-stats.mjs';

const profile = (values = ['1,271', '900', '18', '12', '24', '20']) =>
  `<div id="gsc_prf_in">Yu Wang</div><table id="gsc_rsb_st"><tbody>${[0, 2, 4].map(i =>
    `<tr><td>Metric</td><td class="gsc_rsb_std">${values[i]}</td><td class="gsc_rsb_std">${values[i + 1]}</td></tr>`).join('')}</tbody></table>`;

test('reads all-time citations and h-index, rather than recent-period values', () => {
  assert.deepEqual(parseScholarStats(profile()), { citations: 1271, hIndex: 18 });
});

test('rejects blocked pages, incomplete statistics, and invalid numbers', () => {
  for (const html of ['<html>Captcha</html>', profile(['271', '271', '-', '8']),
    profile(['271', '271', '999', '8', '8', '8']), profile().replace('Yu Wang', 'Other Author')]) {
    assert.throws(() => parseScholarStats(html));
  }
});

test('allows zero citations and h-index', () => {
  assert.deepEqual(parseScholarStats(profile(['0', '0', '0', '0', '0', '0'])), { citations: 0, hIndex: 0 });
});

test('failed requests or parsing leave the last successful data untouched', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'scholar-stats-'));
  const output = join(dir, 'scholar-stats.js');
  try {
    await writeFile(output, 'last successful snapshot');
    for (const fetcher of [async () => { throw new Error('offline'); },
      async () => ({ ok: false, status: 429 }),
      async () => ({ ok: true, text: async () => '<html>Captcha</html>' })]) {
      await assert.rejects(updateScholarStats({ output, fetcher }));
      assert.equal(await readFile(output, 'utf8'), 'last successful snapshot');
    }
    await updateScholarStats({ output, fetcher: async () => ({ ok: true, text: async () => profile() }), now: new Date('2026-10-19T00:00:00Z') });
    const source = await readFile(output, 'utf8');
    const data = JSON.parse(source.match(/window.SCHOLAR_STATS = ([\s\S]+);/)[1]);
    assert.equal(data.citations, 1271);
    assert.equal(data.hIndex, 18);
    assert.equal(data.updatedAt, '2026-10-19T00:00:00.000Z');
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
