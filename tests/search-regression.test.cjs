const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const index = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const script = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8');

assert.match(index, /<section class="content-section" id="dehors">/);
assert.match(index, /<section class="content-section emergency-section" id="urgence">/);
assert.match(script, /section\.hidden = Boolean\(term\) && !normalize\(section\.textContent\)\.includes\(term\)/);

const sections = [
  { id: 'dehors', textContent: 'Dehors Stationnement et plage', hidden: false },
  { id: 'urgence', textContent: 'Sécurité Urgence immédiate', hidden: false },
  { id: 'aide', textContent: 'Départ et aide', hidden: false },
];
const term = 'urgence';
const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
sections.forEach((section) => {
  section.hidden = Boolean(term) && !normalize(section.textContent).includes(term);
});

assert.equal(sections.find((section) => section.id === 'urgence').hidden, false);
assert.equal(sections.find((section) => section.id === 'dehors').hidden, true);
assert.equal(sections.find((section) => section.id === 'aide').hidden, true);
console.log('Search regression passed: urgence only displays #urgence.');
