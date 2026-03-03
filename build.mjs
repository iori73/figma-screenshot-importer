import * as esbuild from 'esbuild';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isWatch = process.argv.includes('--watch');

async function buildCode() {
  const ctx = await esbuild.context({
    entryPoints: [resolve(__dirname, 'src/code.ts')],
    bundle: false,
    outfile: resolve(__dirname, 'code.js'),
    target: 'es2020',
    format: 'esm',
    minify: !isWatch,
  });
  if (isWatch) { await ctx.watch(); console.log('[watch] code.ts'); }
  else { await ctx.rebuild(); ctx.dispose(); }
}

async function buildUI() {
  const result = await esbuild.build({
    entryPoints: [resolve(__dirname, 'src/ui/main.ts')],
    bundle: true,
    write: false,
    target: 'es2020',
    format: 'iife',
    minify: !isWatch,
  });

  const jsBundle = result.outputFiles[0].text;
  const css = readFileSync(resolve(__dirname, 'src/ui/styles.css'), 'utf-8');
  const htmlTemplate = readFileSync(resolve(__dirname, 'src/ui/index.html'), 'utf-8');

  const finalHtml = htmlTemplate
    .replace('/* __STYLES__ */', css)
    .replace('/* __SCRIPT__ */', jsBundle);

  writeFileSync(resolve(__dirname, 'ui.html'), finalHtml);
  console.log('[build] ui.html');
}

async function main() {
  try {
    await Promise.all([buildCode(), buildUI()]);
    if (!isWatch) console.log('Build complete.');
  } catch (e) {
    console.error('Build failed:', e);
    process.exit(1);
  }
}

main();
