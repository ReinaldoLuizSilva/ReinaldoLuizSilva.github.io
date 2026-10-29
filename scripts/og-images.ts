// Generates the Open Graph share images (1200×630), one per language, into
// public/og/. Run `npm run og` after changing the name, title or headline; the
// PNGs are committed, so neither the build nor CI needs a browser.
//
// The card is plain HTML rendered by a local headless Chrome, using the site's
// own fonts and light-theme colors (read from tokens.css). Set CHROME_PATH if
// Chrome is not in its default Windows location.
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { profile } from '../src/data/profile.ts';
import type { Locale } from '../src/i18n/utils.ts';

const WIDTH = 1200;
const HEIGHT = 630;
const root = resolve(import.meta.dirname, '..');
const outDir = join(root, 'public', 'og');
const chrome = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const siteHost = 'reinaldoluizsilva.github.io';
const locales: Locale[] = ['pt', 'en'];

/** First (light theme) value of a raw palette token in tokens.css. */
function token(css: string, name: string): string {
  const match = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-f]{6})`, 'i'));
  if (!match?.[1]) throw new Error(`Token --color-${name} not found in tokens.css`);
  return match[1];
}

function fontDataUrl(file: string): string {
  const data = readFileSync(join(root, 'public', 'fonts', file)).toString('base64');
  return `data:font/woff2;base64,${data}`;
}

const escapeHtml = (text: string) =>
  text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const css = readFileSync(join(root, 'src', 'styles', 'tokens.css'), 'utf8');
const color = {
  bg: token(css, 'concrete'),
  fg: token(css, 'graphite'),
  muted: token(css, 'mist'),
  gcp: token(css, 'cobalt'),
  oci: token(css, 'oxide'),
  rule: token(css, 'joint'),
};
const sans = fontDataUrl('mona-sans-latin.woff2');
const mono = fontDataUrl('ibm-plex-mono-regular-latin1.woff2');

function cardHtml(locale: Locale): string {
  return `<!doctype html>
<html lang="${locale}">
<meta charset="utf-8">
<style>
  @font-face { font-family: 'Mona Sans'; src: url(${sans}) format('woff2');
    font-weight: 400 800; font-stretch: 100% 125%; }
  @font-face { font-family: 'IBM Plex Mono'; src: url(${mono}) format('woff2'); }
  * { box-sizing: border-box; margin: 0; }
  html, body { width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden; }
  body { display: grid; grid-template-rows: auto 1fr auto; padding: 64px 72px;
    background: ${color.bg}; color: ${color.fg}; font-family: 'Mona Sans', sans-serif; }
  .mono { font-family: 'IBM Plex Mono', monospace; font-size: 22px; color: ${color.muted}; }
  h1 { align-self: center; max-width: 19ch; font-size: 70px; font-weight: 800;
    font-stretch: 125%; line-height: 1; letter-spacing: -0.01em; }
  footer { display: flex; justify-content: space-between; align-items: end; gap: 48px;
    padding-top: 32px; border-top: 2px solid ${color.rule}; }
  .name { font-size: 34px; font-weight: 700; }
  .title { margin-top: 6px; font-size: 24px; color: ${color.muted}; }
  svg text { font-family: 'IBM Plex Mono', monospace; font-size: 17px; }
</style>
<body>
  <p class="mono">${siteHost}</p>
  <h1>${escapeHtml(profile.headline[locale])}</h1>
  <footer>
    <div>
      <p class="name">${escapeHtml(profile.name)}</p>
      <p class="title">${escapeHtml(profile.title[locale])}</p>
    </div>
    <svg width="372" height="84" viewBox="0 0 372 84" aria-hidden="true">
      <rect x="1" y="1" width="150" height="82" fill="none" stroke="${color.gcp}" stroke-width="2"/>
      <text x="18" y="48" fill="${color.gcp}">Google Cloud</text>
      <path d="M151 37 H219 M151 47 H219 M207 30 L220 42 L207 54" fill="none"
        stroke="${color.fg}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="221" y="1" width="150" height="82" fill="none" stroke="${color.oci}" stroke-width="2"/>
      <text x="238" y="48" fill="${color.oci}">Oracle Cloud</text>
    </svg>
  </footer>
</body>
</html>`;
}

/** Width and height from the PNG header (IHDR chunk). */
function pngSize(file: string): [number, number] {
  const header = readFileSync(file).subarray(16, 24);
  return [header.readUInt32BE(0), header.readUInt32BE(4)];
}

mkdirSync(outDir, { recursive: true });
const workDir = mkdtempSync(join(tmpdir(), 'og-'));
try {
  for (const locale of locales) {
    const htmlFile = join(workDir, `og-${locale}.html`);
    const pngFile = join(outDir, `og-${locale}.png`);
    writeFileSync(htmlFile, cardHtml(locale));
    execFileSync(
      chrome,
      [
        '--headless=new',
        // Throwaway profile: never touch the user's Chrome profile or extensions.
        `--user-data-dir=${join(workDir, 'profile')}`,
        '--disable-gpu',
        '--hide-scrollbars',
        '--force-device-scale-factor=1',
        `--window-size=${WIDTH},${HEIGHT}`,
        '--virtual-time-budget=3000',
        `--screenshot=${pngFile}`,
        pathToFileURL(htmlFile).href,
      ],
      { stdio: 'ignore' },
    );
    const [width, height] = pngSize(pngFile);
    if (width !== WIDTH || height !== HEIGHT) {
      throw new Error(`${pngFile} is ${width}×${height}, expected ${WIDTH}×${HEIGHT}`);
    }
    console.log(`public/og/og-${locale}.png  ${width}×${height}`);
  }
} finally {
  rmSync(workDir, { recursive: true, force: true });
}
