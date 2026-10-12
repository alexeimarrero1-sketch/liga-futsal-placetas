const TEAM_NAMES=["FC CPA","Zaza FC","Esperanza del Norte","Minas FC","Cabaret","Picsina","La Plaza","Parquesito","Laureles","Nueva Generación","KC"];
const demoResults=[
 {home:"Cabaret",away:"Picsina",hg:1,ag:0,date:"Ejemplo · resultado de demostración"},
 {home:"Zaza FC",away:"FC CPA",hg:2,ag:2,date:"Ejemplo · resultado de demostración"}
];
const defaultState={teams:TEAM_NAMES,results:demoResults};
let state;
try { state=JSON.parse(localStorage.getItem("placetas-demo-state")) || defaultState; } catch {state=defaultState;}
const view=document.getElementById("view");
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function save(){localStorage.setItem("placetas-demo-state",JSON.stringify(state));}
function standings(){
 const map={}; state.teams.forEach(n=>map[n]={name:n,pj:0,gf:0,gc:0,pts:0,w:0,d:0,l:0});
 state.results.forEach(m=>{if(!map[m.home]||!map[m.away])return;let h=map[m.home],a=map[m.away];h.pj++;a.pj++;h.gf+=+m.hg;h.gc+=+m.ag;a.gf+=+m.ag;a.gc+=+m.hg;if(+m.hg>+m.ag){h.pts+=3;h.w++;a.l++;}else if(+m.hg<+m.ag){a.pts+=3;a.w++;h.l++;}else{h.pts++;a.pts++;h.d++;a.d++;}});
 return Object.values(map).sort((a,b)=>b.pts-a.pts||(b.gf-b.gc)-(a.gf-a.gc)||b.gf-a.gf);
}
function matchCard(m){return `<article class="card"><div class="muted">${esc(m.date||"Fecha por confirmar")}</div><div class="match"><div class="side">${esc(m.home)}</div><div class="score">${m.hg} – ${m.ag}</div><div class="side">${esc(m.away)}</div></div><div style="text-align:center;margin-top:8px"><span class="pill">FINAL · DEMO</span></div></article>`;}
function home(){return `<div class="grid"><div class="stat"><strong>${state.teams.length}</strong><span>Equipos inscritos</span></div><div class="stat"><strong>${state.results.length}</strong><span>Resultados guardados en este teléfono</span></div></div><article class="card" style="margin-top:11px"><h3>Últimos resultados de ejemplo</h3><p class="muted">Estos marcadores son demostrativos. Sustitúyelos por datos oficiales cuando esté conectado el servidor.</p>${state.results.slice(0,3).map(matchCard).join("")}</article><article class="card"><h3>Información de la liga</h3><p>Calendario, clasificación, jugadores, goleadores y noticias de la Liga de Futsal de Placetas.</p><span class="pill">Modo prototipo</span></article>`;}
function games(){return `<h3>Partidos y resultados</h3><p class="muted">Marcadores guardados localmente en este dispositivo.</p>${state.results.length?state.results.map(matchCard).join(""):'<div class="card empty">Todavía no hay partidos.</div>'}`;}
function table(){return `<article class="card"><h3>Clasificación provisional</h3><p class="muted">Se calcula automáticamente con los marcadores almacenados en este teléfono. No es la tabla oficial.</p><div style="overflow:auto"><table><thead><tr><th>#</th><th>Equipo</th><th class="num">PJ</th><th class="num">DG</th><th class="num">Pts</th></tr></thead><tbody>${standings().map((t,i)=>`<tr><td>${i+1}</td><td>${esc(t.name)}</td><td class="num">${t.pj}</td><td class="num">${t.gf-t.gc}</td><td class="num"><b>${t.pts}</b></td></tr>`).join("")}</tbody></table></div></article>`;}
function teams(){return `<article class="card"><h3>Equipos participantes</h3><p class="muted">Se han cargado los nombres de referencia. Los escudos originales se incorporarán cuando se añadan los archivos oficiales.</p>${state.teams.map((t,i)=>`<div class="team"><div class="badge">${i+1}</div><div><b>${esc(t)}</b><div class="muted">Plantilla y escudo por incorporar</div></div></div>`).join("")}</article>`;}
function admin(){return `<article class="card"><h3>Administrador de demostración</h3><div class="notice warning">Este panel NO está protegido por contraseña y solo guarda datos en este navegador. No lo uses para publicar resultados oficiales.</div><label>Equipo local</label><select id="home">${state.teams.map(t=>`<option>${esc(t)}</option>`).join("")}</select><label>Equipo visitante</label><select id="away">${state.teams.map(t=>`<option>${esc(t)}</option>`).join("")}</select><div class="grid"><div><label>Goles local</label><input id="hg" type="number" min="0" max="99" value="0"></div><div><label>Goles visitante</label><input id="ag" type="number" min="0" max="99" value="0"></div></div><label>Fecha / jornada</label><input id="date" placeholder="Ej.: Jornada 1 · 20/10/2026"><button class="primary" id="add">Guardar solo en este teléfono</button><div id="msg"></div><hr style="border:0;border-top:1px solid #e1e7ef;margin:18px 0"><button class="secondary" id="export">Exportar copia JSON</button> <button class="secondary" id="reset">Restaurar demo</button></article>`;}
function render(tab="inicio"){
 document.querySelectorAll(".tab").forEach(b=>b.classList.toggle("active",b.dataset.tab===tab));
 view.innerHTML=tab==="inicio"?home():tab==="partidos"?games():tab==="tabla"?table():tab==="equipos"?teams():admin();
 if(tab==="admin"){
  document.getElementById("add").onclick=()=>{let h=document.getElementById("home").value,a=document.getElementById("away").value,hg=document.getElementById("hg").value,ag=document.getElementById("ag").value,date=document.getElementById("date").value.trim()||"Fecha por confirmar";
   if(h===a){document.getElementById("msg").innerHTML='<div class="notice warning">Elige dos equipos distintos.</div>';return}
   if(hg===""||ag===""||+hg<0||+ag<0){document.getElementById("msg").innerHTML='<div class="notice warning">Introduce goles válidos.</div>';return}
   state.results.unshift({home:h,away:a,hg:+hg,ag:+ag,date});save();document.getElementById("msg").innerHTML='<div class="notice">Marcador guardado localmente. No se ha publicado en internet.</div>';
  };
  document.getElementById("export").onclick=()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="liga-placetas-copia.json";a.click();URL.revokeObjectURL(url);};
  document.getElementById("reset").onclick=()=>{if(confirm("¿Restaurar los datos de demostración?")){state=JSON.parse(JSON.stringify(defaultState));save();render("admin");}};
 }
}
document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>render(b.dataset.tab)));
function network(){const n=document.getElementById("net");n.textContent=navigator.onLine?"● En línea":"● Sin conexión";n.style.color=navigator.onLine?"#baf7ca":"#ffd58a";}
window.addEventListener("online",network);window.addEventListener("offline",network);network();render();
