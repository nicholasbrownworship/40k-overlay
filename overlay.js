// overlay.js
// Reads state from localStorage written by control.html, updates overlay live.
// Key is shared between pages. Works best if both pages are loaded the same way
// (e.g., both as local files in the same browser profile / OBS, or both served from the same local server).

const KEY = "crusade_overlay_state_v1";

const els = {
  sessionNum: document.getElementById("sessionNum"),
  turnNum: document.getElementById("turnNum"),
  location: document.getElementById("location"),
  controlPct: document.getElementById("controlPct"),
  controlOwner: document.getElementById("controlOwner"),
  attackers: document.getElementById("attackers"),
  defenders: document.getElementById("defenders"),
  archiveRef: document.getElementById("archiveRef"),
  hash: document.getElementById("hash"),
};

function up(v){ return String(v ?? "").toUpperCase(); }

function applyState(s){
  if (!s) return;

  if (s.session != null) els.sessionNum.textContent = String(s.session);
  if (s.turn != null) els.turnNum.textContent = String(s.turn);

  if (s.location != null) els.location.textContent = up(s.location);

  if (s.control_pct != null) els.controlPct.textContent = `${Number(s.control_pct)}%`;
  if (s.control_owner != null) els.controlOwner.textContent = up(s.control_owner);

  if (s.attackers != null) els.attackers.textContent = up(s.attackers);
  if (s.defenders != null) els.defenders.textContent = up(s.defenders);

  if (s.archive_ref != null) els.archiveRef.textContent = up(s.archive_ref);
  if (s.hash != null) els.hash.textContent = up(s.hash);
}

function readState(){
  try{
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  }catch{
    return null;
  }
}

function refresh(){
  const s = readState();
  if (s) applyState(s);
}

// Update immediately
refresh();

// Update when another tab changes it (may not fire in all OBS setups)
window.addEventListener("storage", (e) => {
  if (e.key === KEY) refresh();
});

// Poll as a fallback for environments that don't reliably fire storage events
setInterval(refresh, 400);
