import fs from 'fs';
import path from 'path';

const redirects = [
  { from: '7-key-factors-for-choosing-salon-crm-software', to: '/blog/7-key-factors-for-choosing-salon-crm-software' },
  { from: 'why-salons-fall-behind-without-crm-software', to: '/blog/why-salons-fall-behind-without-crm-software' },
  { from: 'the-importance-of-integrated-marketing', to: '/blog/the-importance-of-integrated-marketing' },
  { from: 'how-to-automate-your-salon-marketing-with-swalook', to: '/blog/how-to-automate-your-salon-marketing-with-swalook' },
];

const OUT_DIR = path.join(process.cwd(), 'out');

for (const r of redirects) {
  const dir = path.join(OUT_DIR, r.from);
  fs.mkdirSync(dir, { recursive: true });
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <meta http-equiv="refresh" content="0;url=${r.to}">
  <link rel="canonical" href="${r.to}">
  <script>window.location.href="${r.to}"</script>
</head>
<body>
  <p>Redirecting to <a href="${r.to}">${r.to}</a></p>
</body>
</html>`;
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf-8');
}

console.log(`Redirect files created for ${redirects.length} old blog paths`);
