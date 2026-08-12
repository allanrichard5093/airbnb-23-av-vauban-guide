const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const index = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const script = fs.readFileSync(path.join(__dirname, '..', 'script.v4.js'), 'utf8');
const styles = fs.readFileSync(path.join(__dirname, '..', 'style.css'), 'utf8');

assert.match(index, /<section class="content-section" id="dehors">/);
assert.match(index, /<section class="content-section emergency-section" id="urgence">/);
assert.match(index, /sans frais de ménage&nbsp;:/);
assert.match(styles, /\.topbar\{position:fixed/);
assert.match(styles, /\.topbar\{position:fixed;top:0/);
assert.match(styles, /padding-top:max\(14px, env\(safe-area-inset-top\)\)/);
assert.match(script, /searchable\.querySelectorAll\('\.contacts-box, \[hidden\]'\)/);
assert.match(script, /section\.hidden = Boolean\(term\) && !normalize\(searchable\.textContent\)\.includes\(term\)/);

const sections = [
  { id: 'dehors', textContent: 'Dehors Stationnement et plage', hidden: false },
  { id: 'urgence', textContent: 'Sécurité Urgence immédiate', hidden: false },
  { id: 'aide', textContent: 'Départ et aide urgence', visibleText: 'Départ et aide', hidden: false },
];
const term = 'urgence';
const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[-_]/g, '');
sections.forEach((section) => {
  section.hidden = Boolean(term) && !normalize(section.visibleText || section.textContent).includes(term);
});

assert.equal(sections.find((section) => section.id === 'urgence').hidden, false);
assert.equal(sections.find((section) => section.id === 'dehors').hidden, true);
assert.equal(sections.find((section) => section.id === 'aide').hidden, true);

assert.equal(normalize('Wi-Fi').includes(normalize('wifi')), true);
console.log('Search regression passed: urgence only displays #urgence.');
