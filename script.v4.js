const root = document.documentElement;
const main = document.querySelector('main');
const languageButton = document.querySelector('[data-language-toggle]');
const search = document.querySelector('#guide-search');
const introSections = [...document.querySelectorAll('main > .hero, main > .quick-start')];
const sections = [...document.querySelectorAll('main .content-section')];
const topbar = document.querySelector('.topbar');
let language = 'fr';

function syncTopbarHeight() {
  root.style.setProperty('--topbar-height', `${topbar.getBoundingClientRect().height}px`);
}

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
  const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[-_]/g, '');
  const term = normalize(search.value.trim());
  main.classList.toggle('is-searching', Boolean(term));
  introSections.forEach((section) => {
    section.hidden = Boolean(term);
  });
  sections.forEach((section) => {
    const searchable = section.cloneNode(true);
    searchable.querySelectorAll('.contacts-box, [hidden]').forEach((element) => element.remove());
    section.hidden = Boolean(term) && !normalize(searchable.textContent).includes(term);
  });
});

applyLanguage('fr');
syncTopbarHeight();
new ResizeObserver(syncTopbarHeight).observe(topbar);
window.addEventListener('resize', syncTopbarHeight);
