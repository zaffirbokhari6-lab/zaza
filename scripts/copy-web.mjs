import { cp, mkdir, rm } from 'node:fs/promises';

const files = ['index.html', 'privacy.html', 'manifest.webmanifest', 'service-worker.js', 'icon.svg'];
await rm('www', { recursive: true, force: true });
await mkdir('www', { recursive: true });
for (const file of files) await cp(file, `www/${file}`);
await cp('assets', 'www/assets', { recursive: true });
console.log(`Copied ${files.length} web files to www/`);
