const r = await fetch("https://www.krishnapublicschoolmeerut.in/photogallery.php");
const html = await r.text();
// Pattern: <p ...>CATEGORY NAME</p><p><a ...GalleryCatId=N>
const re =
  /<p[^>]*>([^<]+)<\/p>\s*<p>\s*<a[^>]*GalleryCatId=(\d+)[^>]*>/g;
let m;
const mapping = [];
while ((m = re.exec(html))) {
  mapping.push({ id: parseInt(m[2]), name: m[1].trim() });
}
mapping.sort((a, b) => a.id - b.id);
console.log(JSON.stringify(mapping, null, 2));
