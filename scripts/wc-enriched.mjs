// One-off helper: count words of string-literal content in each enriched TS file.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dir = path.resolve(__dirname, "../src/content/enriched");

const files = fs.readdirSync(dir).filter(f => f.endsWith(".ts")).sort();

const rows = [];
let total = 0;

for (const name of files) {
  const src = fs.readFileSync(path.join(dir, name), "utf8");
  // Strip block and line comments so docstrings don't count.
  const stripped = src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
  // Capture string literals: template, double-quoted, single-quoted.
  const re = /`([^`]*)`|"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'/g;
  let m;
  const parts = [];
  while ((m = re.exec(stripped)) !== null) {
    parts.push(m[1] ?? m[2] ?? m[3] ?? "");
  }
  const text = parts.join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  const lines = src.split("\n").length;
  rows.push({ name, words, lines, bytes: Buffer.byteLength(src, "utf8") });
  total += words;
}

const pad = (s, n) => String(s).padEnd(n);
const rpad = (s, n) => String(s).padStart(n);
console.log(`${pad("file", 22)} ${rpad("words", 7)} ${rpad("lines", 6)} ${rpad("bytes", 7)}`);
console.log("-".repeat(48));
for (const r of rows) {
  console.log(`${pad(r.name, 22)} ${rpad(r.words, 7)} ${rpad(r.lines, 6)} ${rpad(r.bytes, 7)}`);
}
console.log("-".repeat(48));
console.log(`${pad("TOTAL", 22)} ${rpad(total, 7)}`);
