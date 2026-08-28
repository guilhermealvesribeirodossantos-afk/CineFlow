const toast = document.getElementById("toast");
const searchButton = document.getElementById("searchButton");
const searchPanel = document.getElementById("searchPanel");
const searchInput = document.getElementById("searchInput");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

document.getElementById("watchHero").addEventListener("click", () => {
  showToast("Player será conectado na próxima etapa.");
});

document.getElementById("detailsHero").addEventListener("click", () => {
  showToast("Página de detalhes entra na próxima versão.");
});

searchButton.addEventListener("click", () => {
  searchPanel.hidden = !searchPanel.hidden;
  if (!searchPanel.hidden) {
    searchInput.focus();
  }
});

searchInput.addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  document.querySelectorAll(".card").forEach((card) => {
    const title = (card.dataset.title || "").toLowerCase();
    card.style.display = !query || title.includes(query) ? "" : "none";
  });
});

document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    const rail = document.getElementById(button.dataset.scroll);
    rail.scrollBy({ left: rail.clientWidth * 0.85, behavior: "smooth" });
  });
});

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    showToast(`${card.dataset.title}: detalhes em breve.`);
  });
});

const navLinks = document.querySelectorAll(".mobile-nav a, .desktop-nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(`a[href="${link.getAttribute("href")}"]`)
      .forEach((item) => item.classList.add("active"));
  });
});
