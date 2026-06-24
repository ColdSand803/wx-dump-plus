const fs = require('fs');
let content = fs.readFileSync('web/vite.config.ts', 'utf8');
const old = '    plugins: [';
const rep = `    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler"
            }
        }
    },
    plugins: [`;
if (content.includes(old)) {
  content = content.replace(old, rep);
  fs.writeFileSync('web/vite.config.ts', content);
  console.log('OK: vite.config.ts');
} else {
  console.error('Pattern not found');
}
