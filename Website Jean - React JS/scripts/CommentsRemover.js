const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../src');

function removeComments(content, ext) {
  if (ext === '.css') {
    return content.replace(/\/\*[\s\S]*?\*\//g, '');
  }
  return content.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|\s)\/\/.*$/gm, '');
}

function processDir(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else {
      const ext = path.extname(entry.name);
      if (['.js', '.jsx', '.css'].includes(ext)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const cleaned = removeComments(content, ext);
        fs.writeFileSync(fullPath, cleaned, 'utf8');
        console.log(`Limpo: ${fullPath}`);
      }
    }
  });
}

processDir(rootDir);
console.log('Todos os comentários foram removidos.');
