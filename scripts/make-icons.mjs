import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { deflateSync } from 'node:zlib';

const N = 1024;
const bg = [231, 240, 232, 255], green = [38, 121, 83, 255], gold = [213, 168, 59, 255];
const pixels = Buffer.alloc(N * N * 4);
function paint(x, y, color) { const i = (y * N + x) * 4; pixels.set(color, i); }
for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) paint(x, y, bg);
for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
  const nx = x / N, ny = y / N;
  const sunX = .73 * N, sunY = .27 * N, sunR = .059 * N;
  if ((x - sunX) ** 2 + (y - sunY) ** 2 < sunR ** 2) paint(x, y, gold);
  if (nx < .17 || nx > .83) continue;
  for (let row = 0; row < 3; row++) {
    const center = .40 + row * .105 + .045 * Math.sin(nx * Math.PI * 2 - 1.1);
    if (Math.abs(ny - center) < .027) paint(x, y, green);
  }
}

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1; crcTable[n] = c >>> 0; }
function crc32(buffer) { let c = 0xffffffff; for (const b of buffer) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; }
function chunk(type, data) { const name = Buffer.from(type), length = Buffer.alloc(4), crc = Buffer.alloc(4); length.writeUInt32BE(data.length); crc.writeUInt32BE(crc32(Buffer.concat([name, data]))); return Buffer.concat([length, name, data, crc]); }
function encodePng(size) {
  const rows = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y++) {
    const rowOffset = y * (size * 4 + 1); rows[rowOffset] = 0;
    for (let x = 0; x < size; x++) {
      const srcX = Math.floor(x * N / size), srcY = Math.floor(y * N / size);
      const src = (srcY * N + srcX) * 4, dst = rowOffset + 1 + x * 4;
      pixels.copy(rows, dst, src, src + 4);
    }
  }
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4); ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(rows)), chunk('IEND', Buffer.alloc(0))]);
}

await mkdir('assets', { recursive: true });
for (const size of [180, 192, 512, 1024]) await writeFile(`assets/icon-${size}.png`, encodePng(size));
await copyFile('assets/icon-1024.png', 'assets/icon.png');
console.log('Generated Hawa PNG icons: 180, 192, 512, and 1024 px.');
