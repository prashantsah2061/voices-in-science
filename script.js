/* ============================================================
   VOICES IN SCIENCE — script
   ============================================================ */

// ---------- CONFIG ----------
// Edit these two values after you create your GitHub repo.
// Example: GITHUB_USER = "prashantsah2061", GITHUB_REPO = "voices-in-science"
const GITHUB_USER = "prashantsah2061";
const GITHUB_REPO = "voices-in-science";

// Email fallback for users without a GitHub account.
// Edit to your real address (or leave the placeholder).
const NOMINATION_EMAIL = "prashantsah2061@gmail.com";
// ----------------------------

const state = {
  profiles: [],
  filters: { region: "all", query: "" },
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// Load profiles from JSON
async function loadProfiles() {
  try {
    const res = await fetch("data/profiles.json");
    if (!res.ok) throw new Error("Could not load profiles.");
    const data = await res.json();
    state.profiles = data.profiles || [];
    render();
  } catch (err) {
    console.error(err);
    $("#profileGrid").innerHTML =
      '<p class="empty-state">Could not load profiles. Check that data/profiles.json exists.</p>';
  }
}

// Render the grid based on current filters
function render() {
  const grid = $("#profileGrid");
  const empty = $("#emptyState");
  const count = $("#archiveCount");

  const visible = state.profiles.filter((p) => {
    if (state.filters.region !== "all" && p.region !== state.filters.region) return false;
    if (state.filters.query) {
      const q = state.filters.query.toLowerCase();
      const hay = [p.name, p.country, p.field, p.hook].join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  count.textContent = `${visible.length} of ${state.profiles.length} profiles`;

  if (visible.length === 0) {
    grid.innerHTML = "";
    empty.hidden = false;
    return;
  }
  empty.hidden = true;

  grid.innerHTML = visible.map(cardHTML).join("");

  // Stagger reveal
  $$(".profile-card").forEach((card, i) => {
    card.style.animationDelay = `${Math.min(i * 40, 400)}ms`;
    card.addEventListener("click", () => openModal(card.dataset.id));
  });
}

function cardHTML(p) {
  const dates = p.died ? `${p.born} — ${p.died}` : `b. ${p.born}`;
  return `
    <button class="profile-card" data-id="${p.id}" type="button">
      <div class="card-meta">
        <span>${p.region}</span>
        <span class="card-flag" aria-hidden="true">${p.flag}</span>
      </div>
      <h3 class="card-name">${escapeHTML(p.name)}</h3>
      <p class="card-dates">${dates} &middot; ${escapeHTML(p.country)}</p>
      <p class="card-hook">${escapeHTML(p.hook)}</p>
      <div class="card-foot">
        <span class="card-field">${escapeHTML(p.field)}</span>
        <span class="card-arrow">→</span>
      </div>
    </button>
  `;
}

// ---------- MODAL ----------
function openModal(id) {
  const p = state.profiles.find((x) => x.id === id);
  if (!p) return;

  const dates = p.died ? `${p.born} — ${p.died}` : `Born ${p.born}`;
  const honorific = p.honorific ? p.honorific + " " : "";

  const bioHTML = p.bio.map((para) => `<p>${escapeHTML(para)}</p>`).join("");
  const achievementsHTML = (p.achievements || [])
    .map((a) => `<li>${escapeHTML(a)}</li>`)
    .join("");
  const sourcesHTML = (p.sources || [])
    .map(
      (s) =>
        `<li><a href="${encodeURI(s.url)}" target="_blank" rel="noopener">${escapeHTML(s.title)}</a></li>`
    )
    .join("");

  $("#modalContent").innerHTML = `
    <div class="modal-meta">
      <span>${escapeHTML(p.region)} &middot; ${escapeHTML(p.field)}</span>
      <span class="modal-flag" aria-hidden="true">${p.flag}</span>
    </div>
    <h2 class="modal-name" id="modalTitle">${escapeHTML(honorific + p.name)}</h2>
    <p class="modal-dates">${dates} &middot; ${escapeHTML(p.country)}</p>
    <p class="modal-hook">${escapeHTML(p.hook)}</p>

    <div class="modal-section">
      <h3>Biography</h3>
      ${bioHTML}
    </div>

    <div class="modal-section">
      <h3>Obstacles she faced</h3>
      <p>${escapeHTML(p.obstacles)}</p>
    </div>

    ${
      achievementsHTML
        ? `<div class="modal-section">
             <h3>Achievements</h3>
             <ul>${achievementsHTML}</ul>
           </div>`
        : ""
    }

    ${
      sourcesHTML
        ? `<div class="modal-section source-list">
             <h3>Sources</h3>
             <ul>${sourcesHTML}</ul>
           </div>`
        : ""
    }
  `;

  const modal = $("#profileModal");
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  $(".modal-panel").focus?.();
}

function closeModal() {
  $("#profileModal").hidden = true;
  document.body.style.overflow = "";
}

// ---------- NOMINATION ----------
function buildGitHubURL() {
  const title = encodeURIComponent("Nomination: [Name of person]");
  const body = encodeURIComponent(
    [
      "Thank you for nominating a woman scientist for the archive!",
      "Please fill in what you know. Anything you don't know, leave blank — the editor will research and fill it in.",
      "",
      "## Name",
      "(e.g., Tebello Nyokong)",
      "",
      "## Country",
      "(country of origin or where she did her work)",
      "",
      "## Region",
      "(Africa, Asia, Latin America, Middle East, or Other)",
      "",
      "## Field",
      "(Chemistry, Physics, Biology, Mathematics, Medicine, Engineering, etc.)",
      "",
      "## Born / Died",
      "(year of birth, and year of death if applicable)",
      "",
      "## What she contributed",
      "(2–3 sentences about her scientific work)",
      "",
      "## Obstacles she faced",
      "(2–3 sentences about the gender, racial, colonial, or class barriers she encountered)",
      "",
      "## Sources",
      "(at least one link — Wikipedia, peer-reviewed paper, biography, news article, official profile)",
      "",
      "## Photos",
      "(No photos needed for this archive)",
      "",
      "## Why she belongs in this archive",
      "(1–2 sentences in your own words)",
      "",
      "---",
      "*Submitted via the Voices in Science nomination form.*",
    ].join("\n")
  );
  const labels = "nomination";
  return `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/issues/new?title=${title}&body=${body}&labels=${labels}`;
}

function buildEmailURL() {
  const subject = encodeURIComponent("Voices in Science — nomination");
  const body = encodeURIComponent(
    [
      "Name:",
      "Country:",
      "Region:",
      "Field:",
      "Born / Died:",
      "",
      "What she contributed:",
      "",
      "Obstacles she faced:",
      "",
      "Sources (at least one link):",
      "",
      "Photos: (not needed)",
      "",
      "Why she belongs in the archive:",
    ].join("\n")
  );
  return `mailto:${NOMINATION_EMAIL}?subject=${subject}&body=${body}`;
}

// ---------- ESCAPE HTML ----------
function escapeHTML(str) {
  if (str == null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ---------- INIT ----------
document.addEventListener("DOMContentLoaded", () => {
  loadProfiles();

  // Region filter chips
  $$('[data-filter="region"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      $$('[data-filter="region"]').forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      state.filters.region = btn.dataset.value;
      render();
    });
  });

  // Search
  $("#searchInput").addEventListener("input", (e) => {
    state.filters.query = e.target.value.trim();
    render();
  });

  // Modal close
  document.addEventListener("click", (e) => {
    if (e.target.matches('[data-close="modal"]')) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !$("#profileModal").hidden) closeModal();
  });

  // Nomination buttons
  const nomBtn = $("#nominateBtn");
  nomBtn.href = buildGitHubURL();
  nomBtn.target = "_blank";
  nomBtn.rel = "noopener";

  const emailBtn = $("#emailBtn");
  emailBtn.href = buildEmailURL();

  // Footer repo link
  const footerRepo = $("#footerRepo");
  if (footerRepo) {
    footerRepo.href = `https://github.com/${GITHUB_USER}/${GITHUB_REPO}`;
    footerRepo.target = "_blank";
    footerRepo.rel = "noopener";
  }
});
