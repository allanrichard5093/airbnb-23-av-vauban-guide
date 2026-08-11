const root = document.documentElement;
const languageButton = document.querySelector('[data-language-toggle]');
const search = document.querySelector('#guide-search');
const cards = [...document.querySelectorAll('.contents-card')];
let language = 'fr';

function applyLanguage(next) {
  language = next;
  root.lang = language;
  document.querySelectorAll('[data-fr][data-en]').forEach((element) => {
    element.textContent = element.dataset[language];
  });
  document.querySelectorAll('[data-placeholder-fr][data-placeholder-en]').forEach((element) => {
    element.placeholder = element.dataset[`placeholder${language === 'fr' ? 'Fr' : 'En'}`];
  });
  languageButton.textContent = language === 'fr' ? 'EN' : 'FR';
}

languageButton.addEventListener('click', () => applyLanguage(language === 'fr' ? 'en' : 'fr'));
search.addEventListener('input', () => {
  const term = search.value.trim().toLowerCase();
  cards.forEach((card) => {
    card.hidden = term && !card.dataset.search.includes(term);
  });
});

applyLanguage('fr');
