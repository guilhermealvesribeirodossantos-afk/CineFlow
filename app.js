const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const toast = $("#toast");
const searchInput = $("#searchInput");
const searchWrap = $("#searchWrap");
const mobileSearch = $("#mobileSearch");
const topbar = $("#topbar");

const catalog = {
  continueWatching: [
    { id:"c1", title:"Horizonte Zero", year:"2026", age:"14", quality:"4K", match:"96%", progress:"67%", a:"#19375d", b:"#07101c" },
    { id:"c2", title:"Código Vermelho", year:"2025", age:"16", quality:"HD", match:"93%", progress:"35%", a:"#731516", b:"#160506" },
    { id:"c3", title:"Além da Fronteira", year:"2026", age:"14", quality:"4K", match:"97%", progress:"82%", a:"#315132", b:"#081309" },
    { id:"c4", title:"Última Transmissão", year:"2025", age:"16", quality:"HD", match:"91%", progress:"21%", a:"#5b3b16", b:"#130b04" }
  ],
  trending: [
    { id:"t1", title:"Redenção", year:"2026", age:"16", quality:"4K", match:"98%", a:"#762021", b:"#100506" },
    { id:"t2", title:"Sombra do Medo", year:"2026", age:"16", quality:"HD", match:"95%", a:"#45324d", b:"#0d0710" },
    { id:"t3", title:"O Último Guerreiro", year:"2025", age:"14", quality:"4K", match:"94%", a:"#73511d", b:"#100c04" },
    { id:"t4", title:"Além do Silêncio", year:"2026", age:"14", quality:"HD", match:"92%", a:"#1d4254", b:"#061017" },
    { id:"t5", title:"Ecos do Passado", year:"2026", age:"14", quality:"4K", match:"96%", a:"#4f2938", b:"#10070b" },
    { id:"t6", title:"Cidade Perdida", year:"2025", age:"12", quality:"HD", match:"89%", a:"#5a4824", b:"#110d05" },
    { id:"t7", title:"A Última Noite", year:"2025", age:"16", quality:"4K", match:"93%", a:"#3c1719", b:"#090304" }
  ],
  releases: [
    { id:"r1", title:"Entre Dois Mundos", year:"2026", age:"14", quality:"4K", match:"97%", a:"#17375f", b:"#050a11" },
    { id:"r2", title:"O Preço da Vingança", year:"2026", age:"16", quality:"HD", match:"94%", a:"#6a241f", b:"#120604" },
    { id:"r3", title:"Queda Final", year:"2026", age:"14", quality:"4K", match:"91%", a:"#4a4d55", b:"#0a0b0d" },
    { id:"r4", title:"Tempestade Infinita", year:"2026", age:"12", quality:"4K", match:"96%", a:"#17495a", b:"#041014" },
    { id:"r5", title:"Linha do Tempo", year:"2026", age:"14", quality:"HD", match:"90%", a:"#40572c", b:"#091007" },
    { id:"r6", title:"O Segredo de Alice", year:"2026", age:"14", quality:"4K", match:"95%", a:"#5e3150", b:"#100810" }
  ],
  series: [
    { id:"s1", title:"Reino de Cinzas", year:"3 temporadas", age:"16", quality:"4K", match:"98%", a:"#5b3418", b:"#100803" },
    { id:"s2", title:"Arquivo 47", year:"4 temporadas", age:"14", quality:"HD", match:"95%", a:"#183b58", b:"#050d14" },
    { id:"s3", title:"Distrito Sombrio", year:"2 temporadas", age:"16", quality:"4K", match:"93%", a:"#3f252b", b:"#0d0507" },
    { id:"s4", title:"Império", year:"5 temporadas", age:"16", quality:"4K", match:"96%", a:"#67501d", b:"#100c03" },
    { id:"s5", title:"Ponto Cego", year:"2 temporadas", age:"14", quality:"HD", match:"92%", a:"#2d3b32", b:"#07100a" },
    { id:"s6", title:"Subsolo", year:"1 temporada", age:"16", quality:"4K", match:"97%", a:"#393941", b:"#09090b" }
  ],
  recommended: [
    { id:"p1", title:"Operação Eclipse", year:"2026", age:"14", quality:"4K", match:"99%", a:"#3c3f68", b:"#080914" },
    { id:"p2", title:"Sem Retorno", year:"2025", age:"16", quality:"HD", match:"97%", a:"#632727", b:"#100505" },
    { id:"p3", title:"Mundo Oculto", year:"2026", age:"14", quality:"4K", match:"95%", a:"#214736", b:"#061009" },
    { id:"p4", title:"Depois da Meia-Noite", year:"2025", age:"16", quality:"HD", match:"93%", a:"#352045", b:"#0a0510" },
    { id:"p5", title:"Zona de Impacto", year:"2026", age:"14", quality:"4K", match:"96%", a:"#6b421f", b:"#110a04" }
  ]
};

const allTitles = Object.values(catalog).flat();
let selectedTitle = null;
let myList = JSON.parse(localStorage.getItem("cineflow-my-list") || "[]");

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.__toast);
  window.__toast = setTimeout(() => toast.classList.remove("show"), 2200);
}

function cardHTML(item, landscape = false) {
  const progress = landscape ? `<div class="progress"><i style="--progress:${item.progress || "50%"}"></i></div>` : "";
  return `
    <article class="movie-card" data-id="${item.id}" data-title="${item.title.toLowerCase()}">
      <div class="poster" style="--cardA:${item.a};--cardB:${item.b}">
        <span class="quality">${item.quality}</span>
        <span class="poster-title">${item.title}</span>
        ${progress}
      </div>
      <div class="card-data">
        <strong>${item.title}</strong>
        <small>
          <span class="match">${item.match} relevante</span>
          <span>${item.year}</span>
          <span>${item.age}</span>
        </small>
      </div>
    </article>`;
}

function renderRows() {
  $("#continueRow").innerHTML = catalog.continueWatching.map(i => cardHTML(i, true)).join("");
  $("#trendingRow").innerHTML = catalog.trending.map(i => cardHTML(i)).join("");
  $("#releasesRow").innerHTML = catalog.releases.map(i => cardHTML(i)).join("");
  $("#seriesRow").innerHTML = catalog.series.map(i => cardHTML(i)).join("");
  $("#recommendedRow").innerHTML = catalog.recommended.map(i => cardHTML(i)).join("");
  renderMyList();
  bindCards();
}

function renderMyList() {
  const list = myList.map(id => allTitles.find(item => item.id === id)).filter(Boolean);
  $("#myListRow").innerHTML = list.map(i => cardHTML(i)).join("");
  $("#myListRow").style.display = list.length ? "grid" : "none";
  $("#emptyList").style.display = list.length ? "none" : "flex";
}

function bindCards() {
  $$(".movie-card").forEach(card => {
    card.onclick = () => {
      const item = allTitles.find(x => x.id === card.dataset.id);
      if (item) openDetails(item);
    };
  });
}

function openDetails(item) {
  selectedTitle = item;
  $("#modalTitle").textContent = item.title;
  $("#modalMeta").innerHTML = `
    <span class="match">${item.match} relevante</span>
    <span>${item.year}</span>
    <span class="age">${item.age}</span>
    <span>${item.quality}</span>`;
  $("#modalDescription").textContent =
    `${item.title} faz parte do catálogo demonstrativo do CineFlow. Nesta etapa, a página de detalhes e a Minha Lista já funcionam.`;
  $("#modalImage").style.background =
    `radial-gradient(circle at 70% 35%, rgba(255,255,255,.18), transparent 18%), linear-gradient(135deg, ${item.a}, ${item.b})`;
  updateAddButton();
  $("#detailsModal").classList.add("open");
  $("#detailsModal").setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
}

function closeDetails() {
  $("#detailsModal").classList.remove("open");
  $("#detailsModal").setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}

function toggleList(item = selectedTitle) {
  if (!item) return;
  if (myList.includes(item.id)) {
    myList = myList.filter(id => id !== item.id);
    notify("Removido da Minha Lista");
  } else {
    myList.push(item.id);
    notify("Adicionado à Minha Lista");
  }
  localStorage.setItem("cineflow-my-list", JSON.stringify(myList));
  renderMyList();
  bindCards();
  updateAddButton();
}

function updateAddButton() {
  if (!selectedTitle) return;
  $("#modalAdd").textContent = myList.includes(selectedTitle.id) ? "✓" : "＋";
}

window.addEventListener("scroll", () => {
  topbar.classList.toggle("scrolled", window.scrollY > 20);
});

mobileSearch.addEventListener("click", () => {
  searchWrap.classList.toggle("open");
  if (searchWrap.classList.contains("open")) searchInput.focus();
});

searchInput.addEventListener("input", e => {
  const term = e.target.value.trim().toLowerCase();
  $$(".movie-card").forEach(card => {
    card.classList.toggle("filtered-out", term && !card.dataset.title.includes(term));
  });
});

$("#playHero").onclick = () => notify("🎬 Player será conectado na próxima etapa.");
$("#moreHero").onclick = () => openDetails(catalog.trending[0]);
$("#addHero").onclick = () => toggleList(catalog.trending[0]);

$("#modalClose").onclick = closeDetails;
$("#modalBackdrop").onclick = closeDetails;
$("#modalPlay").onclick = () => notify("▶ Player interno entra na próxima etapa.");
$("#modalAdd").onclick = () => toggleList();

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeDetails();
});

$$(".see-all").forEach(btn => {
  btn.onclick = () => notify("Catálogo completo será conectado na próxima versão.");
});

const heroScenes = [
  ["THE LAST<br>DISCOVERY", "Em um mundo transformado, uma descoberta esquecida pode ser a última esperança para reconstruir o futuro.", "#142532", "#7b3b20"],
  ["HORIZONTE<br>ZERO", "Uma missão impossível começa quando o último sinal vindo do outro lado do planeta reaparece.", "#132c4b", "#4a171b"],
  ["REINO DE<br>CINZAS", "Alianças frágeis e antigas ameaças disputam o controle de um reino à beira do colapso.", "#4f3518", "#17100a"],
  ["ARQUIVO<br>47", "Uma equipe encontra registros que jamais deveriam ter existido.", "#163c52", "#191426"]
];

$$("#heroDots button").forEach((dot, index) => {
  dot.onclick = () => {
    $$("#heroDots button").forEach(d => d.classList.remove("active"));
    dot.classList.add("active");
    const scene = heroScenes[index];
    $("#heroTitle").innerHTML = scene[0];
    $("#heroDescription").textContent = scene[1];
    $("#heroBackdrop").style.background =
      `radial-gradient(circle at 70% 36%, rgba(245,124,42,.28), transparent 18%), linear-gradient(120deg, ${scene[2]} 0%, #17232b 48%, ${scene[3]} 100%)`;
  };
});

$$(".bottom-nav a").forEach(link => {
  link.onclick = () => {
    $$(".bottom-nav a").forEach(x => x.classList.remove("active"));
    link.classList.add("active");
  };
});

renderRows();
