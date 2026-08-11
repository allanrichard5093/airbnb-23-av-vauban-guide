const root = document.documentElement;
const languageButton = document.querySelector('[data-language-toggle]');
const search = document.querySelector('#guide-search');
const cards = [...document.querySelectorAll('.contents-card')];
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
  cards.forEach((card) => {
    card.hidden = Boolean(term) && !normalize(`${card.dataset.search} ${card.textContent}`).includes(term);
  });
  sections.forEach((section) => {
    section.hidden = Boolean(term) && !normalize(section.textContent).includes(term);
  });
});

applyLanguage('fr');
