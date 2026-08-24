const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const cache = JSON.parse(fs.readFileSync(path.join(__dirname, '../unsplash-image-cache.json'), 'utf-8'));
const outDir = path.join(__dirname, '../images/cached');

// Widest a hero image is ever displayed at (see .hero-image in main.scss) is 1400px;
// download at 2x that for retina displays.
const FULL_WIDTH = 2800;

function fullImageUrl(rawUrl) {
  const url = new URL(rawUrl);
  url.searchParams.set('w', FULL_WIDTH);
  url.searchParams.set('fm', 'jpg');
  url.searchParams.set('q', 80);
  return url.href;
}

async function download(url, outPath) {
  if (fs.existsSync(outPath)) {
    console.log(`--> skipping ${path.basename(outPath)} (already downloaded)`);
    return;
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  fs.writeFileSync(outPath, await res.buffer());
  console.log(`--> saved ${path.basename(outPath)}`);
}

async function main() {
  const ids = Object.keys(cache);
  console.log(`==> downloading images for ${ids.length} unsplash photos`);
  for (const id of ids) {
    const { urls } = cache[id];
    await download(fullImageUrl(urls.raw), path.join(outDir, `unsplash-${id}.jpg`));
    await download(urls.thumb, path.join(outDir, `unsplash-${id}-thumb.jpg`));
  }
  console.log('==> done');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
