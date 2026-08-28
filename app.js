const header = document.getElementById('header');
const toast = document.getElementById('toast');
const searchToggle = document.getElementById('searchToggle');
const searchBox = document.getElementById('searchBox');
const searchInput = document.getElementById('searchInput');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 35);
});

function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(window.cineflowToast);
  window.cineflowToast = setTimeout(() => toast.classList.remove('show'), 2200);
}

document.getElementById('watchHero').addEventListener('click', () => {
  notify('🎬 Player interno será conectado na próxima etapa.');
});

document.getElementById('infoHero').addEventListener('click', () => {
  notify('ⓘ Página completa do filme será nossa próxima evolução.');
});

searchToggle.addEventListener('click', () => {
  searchBox.classList.toggle('open');
  if (searchBox.classList.contains('open')) searchInput.focus();
});

searchInput.addEventListener('input', e => {
  const term = e.target.value.trim().toLowerCase();
  document.querySelectorAll('.movie-card').forEach(card => {
    const title = card.dataset.title.toLowerCase();
    card.classList.toggle('hidden-card', term && !title.includes(term));
  });
});

document.querySelectorAll('[data-target]').forEach(button => {
  button.addEventListener('click', () => {
    const row = document.getElementById(button.dataset.target);
    row.scrollBy({ left: Math.max(450, row.clientWidth * .75), behavior: 'smooth' });
  });
});

document.querySelectorAll('.movie-card').forEach(card => {
  card.addEventListener('click', () => notify(`▶ ${card.dataset.title} — detalhes em breve.`));
});

const mobileLinks = document.querySelectorAll('.mobile-nav a');
mobileLinks.forEach(link => link.addEventListener('click', () => {
  mobileLinks.forEach(x => x.classList.remove('active'));
  link.classList.add('active');
}));

document.querySelectorAll('.dot').forEach((dot, index, dots) => {
  dot.addEventListener('click', () => {
    dots.forEach(x => x.classList.remove('active'));
    dot.classList.add('active');
    if (index > 0) notify('Novos destaques serão adicionados em breve.');
  });
});
