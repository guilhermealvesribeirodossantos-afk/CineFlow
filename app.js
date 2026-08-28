const toast=document.getElementById("toast");
const searchInput=document.getElementById("searchInput");
const searchWrap=document.getElementById("searchWrap");
const mobileSearch=document.getElementById("mobileSearch");

function notify(message){
  toast.textContent=message;
  toast.classList.add("show");
  clearTimeout(window.__cineflowToast);
  window.__cineflowToast=setTimeout(()=>toast.classList.remove("show"),2200);
}

document.getElementById("playHero").addEventListener("click",()=>notify("🎬 Player interno será a próxima etapa."));
document.getElementById("moreHero").addEventListener("click",()=>notify("ⓘ Página de detalhes entra na próxima versão."));

mobileSearch.addEventListener("click",()=>{
  searchWrap.classList.toggle("open");
  if(searchWrap.classList.contains("open")) searchInput.focus();
});

searchInput.addEventListener("input",e=>{
  const term=e.target.value.trim().toLowerCase();
  document.querySelectorAll(".card").forEach(card=>{
    const title=(card.dataset.title||"").toLowerCase();
    card.classList.toggle("filtered-out",term && !title.includes(term));
  });
});

document.querySelectorAll(".card").forEach(card=>{
  card.addEventListener("click",()=>notify(`▶ ${card.dataset.title} — detalhes em breve.`));
});

document.querySelectorAll(".see-all").forEach(btn=>{
  btn.addEventListener("click",()=>notify("Catálogo completo será ativado em breve."));
});

const bottomLinks=document.querySelectorAll(".bottom-nav a");
bottomLinks.forEach(link=>{
  link.addEventListener("click",()=>{
    bottomLinks.forEach(x=>x.classList.remove("active"));
    link.classList.add("active");
  });
});

const dots=document.querySelectorAll(".dots button");
dots.forEach((dot,index)=>{
  dot.addEventListener("click",()=>{
    dots.forEach(x=>x.classList.remove("active"));
    dot.classList.add("active");
    if(index>0) notify("Novos destaques do banner entram em breve.");
  });
});

document.querySelectorAll(".hero-arrow").forEach(arrow=>{
  arrow.addEventListener("click",()=>notify("Carrossel principal entra na próxima evolução."));
});
