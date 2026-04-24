const r = await fetch("https://www.krishnapublicschoolmeerut.in/hwclass.php");
const html = await r.text();
const re = /<p[^>]*>([^<]+)<\/p>\s*<p[^>]*>\s*<a[^>]*DCatId=(\d+)[^>]*>/g;
let m;
const mapping = [];
while ((m = re.exec(html))) {
  mapping.push({ id: parseInt(m[2]), name: m[1].trim() });
}
mapping.sort((a, b) => a.id - b.id);
console.log(JSON.stringify(mapping, null, 2));
