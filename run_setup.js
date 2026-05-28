#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const baseDir = __dirname;

const directories = [
  'client/app/lobby',
  'client/app/game/code-duel',
  'client/app/game/bug-hunter',
  'client/app/game/guess-output',
  'client/components/landing',
  'client/components/game',
  'client/components/common',
  'client/components/ui',
  'client/hooks',
  'client/lib',
  'client/store',
  'server/src/socket',
  'server/src/game',
  'server/src/types',
  'server/data'
];

console.log('Creating directories in:', baseDir);
console.log('');

directories.forEach(dir => {
  const fullPath = path.join(baseDir, dir);
  fs.mkdirSync(fullPath, { recursive: true });
  console.log('Created:', dir);
});

console.log('\nAll directories created successfully!');

// Now list the directory structure
console.log('\n========== CLIENT DIRECTORY STRUCTURE ==========\n');
try {
  const clientOutput = execSync('dir /s "' + path.join(baseDir, 'client') + '"', { encoding: 'utf8' });
  console.log(clientOutput);
} catch (e) {
  console.log('(Listing client directory)');
  const listDir = (dir, prefix = '') => {
    try {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      items.forEach(item => {
        console.log(prefix + (item.isDirectory() ? '[DIR]  ' : '[FILE] ') + item.name);
        if (item.isDirectory()) {
          listDir(path.join(dir, item.name), prefix + '  ');
        }
      });
    } catch (err) {}
  };
  listDir(path.join(baseDir, 'client'));
}

console.log('\n========== SERVER DIRECTORY STRUCTURE ==========\n');
try {
  const serverOutput = execSync('dir /s "' + path.join(baseDir, 'server') + '"', { encoding: 'utf8' });
  console.log(serverOutput);
} catch (e) {
  console.log('(Listing server directory)');
  const listDir = (dir, prefix = '') => {
    try {
      const items = fs.readdirSync(dir, { withFileTypes: true });
      items.forEach(item => {
        console.log(prefix + (item.isDirectory() ? '[DIR]  ' : '[FILE] ') + item.name);
        if (item.isDirectory()) {
          listDir(path.join(dir, item.name), prefix + '  ');
        }
      });
    } catch (err) {}
  };
  listDir(path.join(baseDir, 'server'));
}
