const toast = document.getElementById("toast");
const searchInput = document.getElementById("searchInput");
const searchWrap = document.getElementById("searchWrap");
const mobileSearch = document.getElementById("mobileSearch");
const topbar = document.getElementById("topbar");

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.__cineflowToast);
  window.__cineflowToast = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 24) {
    topbar.style.background = "rgba(0,0,0,.985)";
  } else {
    topbar.style.background = "rgba(0,0,0,.95)";
  }
});

document.getElementById("playHero").addEventListener("click", () => {
  notify("🎬 Player interno será conectado na próxima etapa.");
});

document.getElementById("moreHero").addEventListener("click", () => {
  notify("ⓘ Página de detalhes entra na próxima versão.");
});

mobileSearch.addEventListener("click", () => {
  searchWrap.classList.toggle("open");
  if (searchWrap.classList.contains("open")) {
    searchInput.focus();
  }
});

searchInput.addEventListener("input", (event) => {
  const term = event.target.value.trim().toLowerCase();

  document.querySelectorAll(".card").forEach((card) => {
    const title = (card.dataset.title || "").toLowerCase();
    card.classList.toggle("filtered-out", term && !title.includes(term));
  });
});

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    notify(`▶ ${card.dataset.title} — detalhes em breve.`);
  });
});

document.querySelectorAll(".see-all").forEach((button) => {
  button.addEventListener("click", () => {
    notify("Catálogo completo será ativado em breve.");
  });
});

document.querySelectorAll(".row-next").forEach((button) => {
  button.addEventListener("click", () => {
    const row = document.getElementById(button.dataset.row);
    if (!row) return;

    row.scrollBy({
      left: Math.max(420, row.clientWidth * 0.75),
      behavior: "smooth"
    });
  });
});

const bottomLinks = document.querySelectorAll(".bottom-nav a");
bottomLinks.forEach((link) => {
  link.addEventListener("click", () => {
    bottomLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

const dots = document.querySelectorAll(".dots button");
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    dots.forEach((item) => item.classList.remove("active"));
    dot.classList.add("active");

    if (index > 0) {
      notify("Novos destaques do banner entram em breve.");
    }
  });
});

document.querySelectorAll(".hero-arrow").forEach((arrow) => {
  arrow.addEventListener("click", () => {
    notify("Carrossel principal entra na próxima evolução.");
  });
});

document.querySelectorAll(".desktop-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".desktop-nav a").forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});
