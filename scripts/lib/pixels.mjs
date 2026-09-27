// Turns screenshots into text, for when images can't be viewed: a tone map shows layout (darker
// characters are darker areas) and a diff map shows where two frames differ (blank means unchanged).
// Decodes 8-bit, non-interlaced PNGs, which is what Chrome produces.
import { inflateSync } from 'node:zlib';

export function decodePng(buffer) {
  let pos = 8, width, height, channels;
  const idat = [];
  while (pos < buffer.length) {
    const length = buffer.readUInt32BE(pos), type = buffer.toString('ascii', pos + 4, pos + 8), data = buffer.subarray(pos + 8, pos + 8 + length);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0); height = data.readUInt32BE(4);
      if (data[8] !== 8 || data[12] !== 0) throw new Error('Only 8-bit, non-interlaced PNGs are supported');
      channels = { 0: 1, 2: 3, 4: 2, 6: 4 }[data[9]];
      if (!channels) throw new Error('Unsupported PNG colour type');
    } else if (type === 'IDAT') idat.push(data);
    else if (type === 'IEND') break;
    pos += 12 + length;
  }
  const raw = inflateSync(Buffer.concat(idat)), stride = width * channels, pixels = Buffer.alloc(stride * height);
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)], line = raw.subarray(y * (stride + 1) + 1), out = pixels.subarray(y * stride, (y + 1) * stride);
    const prev = y ? pixels.subarray((y - 1) * stride, y * stride) : null;
    for (let x = 0; x < stride; x++) {
      const a = x >= channels ? out[x - channels] : 0, b = prev ? prev[x] : 0, c = prev && x >= channels ? prev[x - channels] : 0;
      let v = line[x];
      if (filter === 1) v += a;
      else if (filter === 2) v += b;
      else if (filter === 3) v += (a + b) >> 1;
      else if (filter === 4) { const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c); v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c; }
      out[x] = v & 255;
    }
  }
  const rgb = (x, y) => { const i = y * stride + x * channels; return channels >= 3 ? [pixels[i], pixels[i + 1], pixels[i + 2]] : [pixels[i], pixels[i], pixels[i]]; };
  return { width, height, rgb };
}

const ramp = ' .:-=+*#%@';
// Average colour per character cell; cells are twice as tall as wide to match terminal fonts.
function cells(image, cols) {
  const size = image.width / cols, rows = Math.round(image.height / size / 2), grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      const sum = [0, 0, 0];
      let n = 0;
      for (let y = Math.floor(r * size * 2); y < Math.min(image.height, (r + 1) * size * 2); y += 2)
        for (let x = Math.floor(c * size); x < Math.min(image.width, (c + 1) * size); x += 2) { const p = image.rgb(x, y); sum[0] += p[0]; sum[1] += p[1]; sum[2] += p[2]; n++; }
      row.push(sum.map(v => v / Math.max(n, 1)));
    }
    grid.push(row);
  }
  return grid;
}

export const toneMap = (image, cols = 80) => cells(image, cols).map(row => row.map(([r, g, b]) => ramp[9 - Math.min(9, Math.floor((r + g + b) / 3 / 25.6))]).join('').trimEnd()).join('\n');

export function diffMap(a, b, cols = 80) {
  const ca = cells(a, cols), cb = cells(b, cols);
  return ca.map((row, r) => row.map((p, c) => {
    const q = cb[r]?.[c] ?? p, d = Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]) + Math.abs(p[2] - q[2]);
    return d < 1.5 ? ' ' : ramp[Math.min(9, Math.ceil(d / 4))];
  }).join('').trimEnd()).join('\n');
}
