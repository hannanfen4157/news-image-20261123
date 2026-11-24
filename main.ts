// news-image-20261123 — entry program (Node 22, standard library only).
//
// The entry is the PNG sitting next to this file: a front page summing up
// the world news of Monday 23 November 2026. This program has one job —
// copy that image into the output directory the grader provides — so the
// grader's two runs write byte-identical files.
//
// Outside the grader's container, point MAKEFUN_OUTPUT_DIR at a scratch
// directory instead of /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });

const source = new URL('./entry.png', import.meta.url);
if (!existsSync(source) || !statSync(source).isFile()) {
  throw new Error(`entry.png is missing from the repository (looked for ${source.pathname})`);
}

const target = join(outDir, 'entry.png');
copyFileSync(source, target);

// The grader runs this program twice and requires identical bytes both
// times, so confirm the copy landed whole before exiting.
if (statSync(target).size !== statSync(source).size) {
  throw new Error('entry.png copy is incomplete');
}
