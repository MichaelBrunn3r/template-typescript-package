import fs from 'fs';
import path from 'path';

console.log('Prepack');

const packageJson = JSON.parse(fs.readFileSync(path.resolve('package.json'), 'utf-8'));

const OUT_DIR = path.resolve(packageJson.publishConfig.directory);
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR);
}

// Copy package.json to output directory
console.log('Copied package.json to', path.resolve(OUT_DIR, 'package.json'));
fs.writeFileSync(path.resolve(OUT_DIR, 'package.json'), JSON.stringify(packageJson, null, 2));

// Copy files
packageJson.files.forEach((file: string) => {
  const src = path.resolve(file);
  const dest = path.resolve(OUT_DIR, file);

  if (!fs.existsSync(src) || fs.existsSync(dest)) return;

  console.log('Copying', src, 'to', dest);
  fs.copyFileSync(src, dest);
});
