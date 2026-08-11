const root = document.documentElement;
const languageButton = document.querySelector('[data-language-toggle]');
const search = document.querySelector('#guide-search');
const introSections = [...document.querySelectorAll('main > .hero, main > .quick-start')];
const sections = [...document.querySelectorAll('main .content-section')];
let language = 'fr';

function applyLanguage(next) {
  language = next;
  root.lang = language;
  document.querySelectorAll('[data-fr][data-en]').forEach((element) => {
    element.innerHTML = element.dataset[language];
  });
  document.querySelectorAll('[data-placeholder-fr][data-placeholder-en]').forEach((element) => {
    element.placeholder = element.dataset[`placeholder${language === 'fr' ? 'Fr' : 'En'}`];
  });
  languageButton.textContent = language === 'fr' ? 'EN' : 'FR';
}

languageButton.addEventListener('click', () => applyLanguage(language === 'fr' ? 'en' : 'fr'));
search.addEventListener('input', () => {
  const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const term = normalize(search.value.trim());
  introSections.forEach((section) => {
    section.hidden = Boolean(term);
  });
  sections.forEach((section) => {
    section.hidden = Boolean(term) && !normalize(section.textContent).includes(term);
  });
});

applyLanguage('fr');
