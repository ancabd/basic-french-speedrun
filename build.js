#!/usr/bin/env node
// Builds the single-file app: src/index.html + src/styles.css + src/js/*.js (in filename order) -> index.html
// No dependencies: run with `node build.js`.
const fs = require('fs'), path = require('path');
const root = __dirname, src = path.join(root, 'src');
const jsDir = path.join(src, 'js');
const files = fs.readdirSync(jsDir).filter(f => f.endsWith('.js')).sort();
const js = '"use strict";\n' + files.map(f => `/* ===== ${f} ===== */\n` + fs.readFileSync(path.join(jsDir, f), 'utf8')).join('\n');
const css = fs.readFileSync(path.join(src, 'styles.css'), 'utf8');
const tpl = fs.readFileSync(path.join(src, 'index.html'), 'utf8');
if (!tpl.includes('/*STYLES*/') || !tpl.includes('/*SCRIPT*/')) throw new Error('src/index.html is missing a placeholder');
// a script must never contain a literal closing script tag
if (/<\/script/i.test(js)) throw new Error('A source file contains "</script", which would end the inline script early');
const out = tpl.replace('/*STYLES*/', () => css).replace('/*SCRIPT*/', () => js);
fs.writeFileSync(path.join(root, 'index.html'), out);
console.log(`Built index.html from ${files.length} scripts (${(out.length / 1024).toFixed(0)} KB)`);
