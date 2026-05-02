// BlastCSS playground: live HTML+CSS editor, token sliders, presets, share.

(function () {
  const root = document.querySelector("[data-pg-root]");
  if (!root) return;

  const htmlEditor = root.querySelector('[data-pg-editor="html"]');
  const cssEditor = root.querySelector('[data-pg-editor="css"]');
  const tabs = root.querySelectorAll(".pg-editor-tab");
  const previewFrame = root.querySelector("[data-pg-preview]");
  const previewStage = root.querySelector("[data-pg-preview-stage]");
  const bpButtons = root.querySelectorAll("[data-pg-bp]");
  const bpLabel = root.querySelector("[data-pg-bp-label]");
  const presetSelect = root.querySelector("[data-pg-preset]");
  const themeBtn = root.querySelector("[data-pg-theme]");
  const tokensToggle = root.querySelector("[data-pg-tokens-toggle]");
  const tokensPanel = root.querySelector("[data-pg-tokens]");
  const tokensInputs = root.querySelectorAll("[data-pg-token]");
  const shareBtn = root.querySelector("[data-pg-share]");
  const resetBtn = root.querySelector("[data-pg-reset]");
  const statusEl = root.querySelector("[data-pg-status]");
  const viewTabs = root.querySelectorAll("[data-pg-view]");

  // The build injects `data-dist` on [data-pg-root]; this path varies between
  // local dev (../dist/) and the GitHub Pages deploy (./dist/) where dist/
  // has been staged inside the docs root.
  const distBase = root.dataset.dist || "../dist/";
  const cssUrl = new URL(distBase + "blast.min.css", location.href).href;
  const jsUrl = new URL(distBase + "blast.min.js", location.href).href;
  let cssBody = "";
  let jsBody = "";
  // srcdoc iframes have origin "null" which blocks many cross-origin loads.
  // Fetch the bundle once and inline it so the preview works offline of CORS.
  Promise.all([
    fetch(cssUrl).then((r) => r.ok ? r.text() : "").catch(() => ""),
    fetch(jsUrl).then((r) => r.ok ? r.text() : "").catch(() => "")
  ]).then(([css, js]) => { cssBody = css; jsBody = js; render(); });

  // ───────────────────────────────────────────────────────────
  // Presets
  // ───────────────────────────────────────────────────────────
  const PRESETS = {
    buttons: {
      label: "Buttons",
      html: `<div class="b-stack" style="--b-stack-gap: var(--b-4)">
  <h2>Buttons</h2>
  <div class="b-cluster">
    <button class="b-btn">Primary</button>
    <button class="b-btn b-btn-secondary">Secondary</button>
    <button class="b-btn b-btn-soft">Soft</button>
    <button class="b-btn b-btn-outline">Outline</button>
    <button class="b-btn b-btn-ghost">Ghost</button>
  </div>
  <div class="b-cluster">
    <button class="b-btn b-btn-success">Save</button>
    <button class="b-btn b-btn-warning">Review</button>
    <button class="b-btn b-btn-danger">Delete</button>
  </div>
  <div class="b-cluster">
    <button class="b-btn b-btn-sm">Small</button>
    <button class="b-btn">Default</button>
    <button class="b-btn b-btn-lg">Large</button>
  </div>
  <div class="b-cluster">
    <button class="b-btn" aria-busy="true">Loading</button>
    <button class="b-btn" disabled>Disabled</button>
  </div>
</div>`,
      css: `/* Try theming a custom button */
.b-btn-brand {
  background: linear-gradient(135deg, oklch(60% 0.22 264), oklch(64% 0.20 320));
  color: white;
  border: 0;
}`
    },

    form: {
      label: "Form",
      html: `<div class="b-card" style="max-width: 28rem">
  <div class="b-card-header">
    <strong>Create account</strong>
    <span class="b-badge b-badge-success b-badge-dot">Live</span>
  </div>
  <div class="b-card-body">
    <form class="b-stack">
      <div class="b-field">
        <label class="b-label" data-required for="pg-email">Email</label>
        <input class="b-input" id="pg-email" type="email" placeholder="you@company.com">
        <span class="b-help">We'll never share this address.</span>
      </div>
      <div class="b-field">
        <label class="b-label" for="pg-pass">Password</label>
        <input class="b-input" id="pg-pass" type="password" value="••••••••">
      </div>
      <div class="b-field">
        <label class="b-label">Plan</label>
        <div class="b-segmented" role="radiogroup" aria-label="Plan">
          <input type="radio" name="plan" id="pl-free" checked><label for="pl-free">Free</label>
          <input type="radio" name="plan" id="pl-pro"><label for="pl-pro">Pro</label>
          <input type="radio" name="plan" id="pl-team"><label for="pl-team">Team</label>
        </div>
      </div>
      <label class="b-switch"><input type="checkbox" checked><span>Send me product updates</span></label>
      <button type="submit" class="b-btn b-btn-block">Create account</button>
    </form>
  </div>
</div>`,
      css: ``
    },

    card: {
      label: "Card",
      html: `<div class="b-grid" style="--b-grid-min: 18rem">
  <article class="b-card">
    <div class="b-card-header">
      <strong>Release health</strong>
      <span class="b-badge b-badge-success b-badge-dot">Passing</span>
    </div>
    <div class="b-card-body" style="display:grid; gap: var(--b-3)">
      <div class="b-progress" role="progressbar" aria-label="Coverage" aria-valuenow="92"><span style="--b-progress: 92%"></span></div>
      <div class="b-cluster">
        <span class="b-chip">Chromium</span>
        <span class="b-chip">Firefox</span>
        <span class="b-chip">WebKit</span>
      </div>
    </div>
  </article>
  <article class="b-stat">
    <span class="b-stat-label">Bundle size</span>
    <strong class="b-stat-value">11.7</strong>
    <span class="b-stat-trend">↓ 24% vs Bootstrap</span>
  </article>
  <article class="b-stat">
    <span class="b-stat-label">Components</span>
    <strong class="b-stat-value">40+</strong>
    <span class="b-stat-trend">CSS-first</span>
  </article>
</div>`,
      css: ``
    },

    dashboard: {
      label: "Dashboard",
      html: `<div class="b-stack" style="--b-stack-gap: var(--b-4)">
  <div class="b-split">
    <div>
      <h2 style="margin:0">Dashboard</h2>
      <p class="text-muted text-sm" style="margin:0">Last 30 days</p>
    </div>
    <div class="b-cluster">
      <button class="b-btn b-btn-secondary b-btn-sm">Export</button>
      <button class="b-btn b-btn-sm">New report</button>
    </div>
  </div>
  <div class="b-grid" style="--b-grid-min: 12rem">
    <article class="b-stat">
      <span class="b-stat-label">Revenue</span>
      <strong class="b-stat-value">$48,920</strong>
      <span class="b-stat-trend">↑ 12.4%</span>
    </article>
    <article class="b-stat">
      <span class="b-stat-label">Users</span>
      <strong class="b-stat-value">12,840</strong>
      <span class="b-stat-trend">↑ 4.1%</span>
    </article>
    <article class="b-stat">
      <span class="b-stat-label">Churn</span>
      <strong class="b-stat-value">1.8%</strong>
      <span class="b-stat-trend b-stat-trend-down">↓ 0.3%</span>
    </article>
    <article class="b-stat">
      <span class="b-stat-label">NPS</span>
      <strong class="b-stat-value">62</strong>
      <span class="b-stat-trend">↑ 5</span>
    </article>
  </div>
  <article class="b-card">
    <div class="b-card-header">
      <strong>Recent activity</strong>
      <a href="#" class="b-btn b-btn-ghost b-btn-sm">View all</a>
    </div>
    <div class="b-card-body">
      <table class="b-table b-table-hover">
        <thead><tr><th>User</th><th>Plan</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td>Anya Chen</td><td>Pro</td><td><span class="b-badge b-badge-success b-badge-dot">Active</span></td></tr>
          <tr><td>Jordan Moss</td><td>Team</td><td><span class="b-badge b-badge-warning b-badge-dot">Trial</span></td></tr>
          <tr><td>Rita Gomez</td><td>Pro</td><td><span class="b-badge b-badge-success b-badge-dot">Active</span></td></tr>
        </tbody>
      </table>
    </div>
  </article>
</div>`,
      css: ``
    },

    hero: {
      label: "Hero",
      html: `<section style="text-align:center; padding-block: var(--b-12); background: radial-gradient(ellipse at top, color-mix(in oklch, var(--b-primary) 18%, transparent), transparent 60%);">
  <span class="b-badge">v1.0 · ready for production</span>
  <h1 style="font-size: clamp(2rem, 5vw, 3.5rem); margin-block: var(--b-3); text-wrap: balance">
    Production UI, <span style="background: linear-gradient(135deg, var(--b-primary), oklch(70% 0.20 220)); background-clip: text; color: transparent;">tiny CSS</span>, every framework.
  </h1>
  <p class="text-muted" style="max-width: 38rem; margin-inline: auto; font-size: var(--b-text-lg); text-wrap: pretty">
    A modern CSS framework built on cascade layers, OKLCH tokens, and the popover API. Edit me on the left.
  </p>
  <div class="b-cluster" style="justify-content: center; margin-block-start: var(--b-5)">
    <button class="b-btn b-btn-lg">Get started</button>
    <button class="b-btn b-btn-secondary b-btn-lg">Browse components</button>
  </div>
</section>`,
      css: ``
    }
  };

  const DEFAULT_TOKENS = { hue: 264, chroma: 0.21, radius: 0.5, density: 2.5, font: 720 };

  // ───────────────────────────────────────────────────────────
  // State
  // ───────────────────────────────────────────────────────────
  const state = {
    preset: "buttons",
    activeTab: "html",
    bp: "full",
    theme: "auto",
    tokens: { ...DEFAULT_TOKENS },
    html: PRESETS.buttons.html,
    css: PRESETS.buttons.css,
    showTokens: false
  };

  // ───────────────────────────────────────────────────────────
  // Iframe builder
  // ───────────────────────────────────────────────────────────
  function tokenCss(t) {
    return `:root {
  --b-primary-h: ${t.hue};
  --b-primary-c: ${t.chroma};
  --b-radius: ${t.radius}rem;
  --b-radius-lg: ${(Number(t.radius) * 1.5).toFixed(2)}rem;
  --b-control: ${t.density}rem;
  --b-weight-bold: ${t.font};
  --b-weight-black: ${Math.min(900, Number(t.font) + 100)};
}`;
  }

  function buildSrcdoc() {
    const themeAttr = state.theme === "auto" ? "" : ` data-theme="${state.theme}"`;
    const inlineCss = cssBody ? `<style>${cssBody}</style>` : `<link rel="stylesheet" href="${cssUrl}">`;
    const inlineJs = jsBody ? `<script type="module">${jsBody}<\/script>` : "";
    return `<!doctype html>
<html lang="en"${themeAttr}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${inlineCss}
<style>
  body { padding: var(--b-6); }
  ${tokenCss(state.tokens)}
  ${state.css}
</style>
</head>
<body>
${state.html}
${inlineJs}
</body>
</html>`;
  }

  let renderTimer = null;
  function scheduleRender() {
    if (statusEl) statusEl.textContent = "Building…";
    clearTimeout(renderTimer);
    renderTimer = setTimeout(render, 220);
  }

  function render() {
    previewFrame.srcdoc = buildSrcdoc();
    if (statusEl) statusEl.textContent = "Ready";
    persistHash();
  }

  // ───────────────────────────────────────────────────────────
  // Editor tabs
  // ───────────────────────────────────────────────────────────
  function setActiveTab(which) {
    state.activeTab = which;
    for (const tab of tabs) {
      const active = tab.dataset.pgTab === which;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    }
    htmlEditor.hidden = which !== "html";
    cssEditor.hidden = which !== "css";
    (which === "html" ? htmlEditor : cssEditor).focus();
  }

  for (const tab of tabs) {
    tab.addEventListener("click", () => setActiveTab(tab.dataset.pgTab));
  }

  htmlEditor.addEventListener("input", () => { state.html = htmlEditor.value; scheduleRender(); });
  cssEditor.addEventListener("input", () => { state.css = cssEditor.value; scheduleRender(); });

  // Tab key inserts spaces.
  for (const ed of [htmlEditor, cssEditor]) {
    ed.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        event.preventDefault();
        const start = ed.selectionStart;
        const end = ed.selectionEnd;
        ed.value = ed.value.slice(0, start) + "  " + ed.value.slice(end);
        ed.selectionStart = ed.selectionEnd = start + 2;
        ed.dispatchEvent(new Event("input"));
      }
    });
  }

  // ───────────────────────────────────────────────────────────
  // Presets
  // ───────────────────────────────────────────────────────────
  function loadPreset(key) {
    const p = PRESETS[key];
    if (!p) return;
    state.preset = key;
    state.html = p.html;
    state.css = p.css;
    htmlEditor.value = state.html;
    cssEditor.value = state.css;
    presetSelect.value = key;
    scheduleRender();
  }

  presetSelect.addEventListener("change", () => loadPreset(presetSelect.value));

  // ───────────────────────────────────────────────────────────
  // Breakpoint switcher
  // ───────────────────────────────────────────────────────────
  const BP = { full: { width: "100%", label: "Full" }, tablet: { width: "768px", label: "Tablet" }, mobile: { width: "390px", label: "Mobile" } };

  function setBp(bp) {
    state.bp = bp;
    for (const b of bpButtons) b.classList.toggle("is-active", b.dataset.pgBp === bp);
    previewStage.dataset.bp = bp;
    if (bpLabel) bpLabel.textContent = BP[bp].label;
  }

  for (const b of bpButtons) b.addEventListener("click", () => setBp(b.dataset.pgBp));

  // Mobile-only Editor / Preview view switcher
  function setView(which) {
    root.dataset.view = which;
    for (const t of viewTabs) {
      const active = t.dataset.pgView === which;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", String(active));
    }
  }
  for (const t of viewTabs) t.addEventListener("click", () => setView(t.dataset.pgView));

  // ───────────────────────────────────────────────────────────
  // Theme switcher (preview-only)
  // ───────────────────────────────────────────────────────────
  themeBtn.addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : state.theme === "light" ? "auto" : "dark";
    scheduleRender();
    themeBtn.querySelector("span").textContent = state.theme === "auto" ? "Theme" : state.theme === "dark" ? "Dark" : "Light";
  });

  // ───────────────────────────────────────────────────────────
  // Tokens panel toggle
  // ───────────────────────────────────────────────────────────
  function setTokensVisible(v) {
    state.showTokens = v;
    tokensPanel.hidden = !v;
    tokensToggle.setAttribute("aria-expanded", String(v));
  }
  tokensToggle.addEventListener("click", () => setTokensVisible(!state.showTokens));

  for (const input of tokensInputs) {
    input.addEventListener("input", () => {
      state.tokens[input.dataset.pgToken] = input.value;
      const out = root.querySelector(`[data-out='${input.dataset.pgToken}']`);
      if (out) out.textContent = input.value;
      scheduleRender();
    });
  }

  // ───────────────────────────────────────────────────────────
  // Share + reset
  // ───────────────────────────────────────────────────────────
  function encodeState() {
    const payload = { p: state.preset, h: state.html, c: state.css, t: state.tokens, b: state.bp, th: state.theme };
    const json = JSON.stringify(payload);
    return btoa(unescape(encodeURIComponent(json)));
  }

  function decodeState(s) {
    try {
      const json = decodeURIComponent(escape(atob(s)));
      return JSON.parse(json);
    } catch { return null; }
  }

  function persistHash() {
    try {
      const enc = encodeState();
      history.replaceState(null, "", "#" + enc);
    } catch {}
  }

  shareBtn.addEventListener("click", async () => {
    persistHash();
    try {
      await navigator.clipboard.writeText(location.href);
      const span = shareBtn.querySelector("span");
      const prev = span.textContent;
      span.textContent = "Copied URL";
      setTimeout(() => { span.textContent = prev; }, 1500);
    } catch {}
  });

  resetBtn.addEventListener("click", () => {
    state.tokens = { ...DEFAULT_TOKENS };
    for (const input of tokensInputs) {
      input.value = DEFAULT_TOKENS[input.dataset.pgToken];
      const out = root.querySelector(`[data-out='${input.dataset.pgToken}']`);
      if (out) out.textContent = input.value;
    }
    state.theme = "auto";
    themeBtn.querySelector("span").textContent = "Theme";
    setBp("full");
    loadPreset("buttons");
  });

  // ───────────────────────────────────────────────────────────
  // Initial state from URL hash, else preset.
  // ───────────────────────────────────────────────────────────
  function restoreFromHash() {
    if (!location.hash) return false;
    const data = decodeState(location.hash.slice(1));
    if (!data) return false;
    state.preset = data.p || "buttons";
    state.html = data.h ?? PRESETS[state.preset].html;
    state.css = data.c ?? PRESETS[state.preset].css;
    state.tokens = { ...DEFAULT_TOKENS, ...(data.t || {}) };
    state.bp = data.b || "full";
    state.theme = data.th || "auto";

    htmlEditor.value = state.html;
    cssEditor.value = state.css;
    presetSelect.value = state.preset;
    for (const input of tokensInputs) {
      const v = state.tokens[input.dataset.pgToken];
      if (v != null) {
        input.value = v;
        const out = root.querySelector(`[data-out='${input.dataset.pgToken}']`);
        if (out) out.textContent = v;
      }
    }
    setBp(state.bp);
    if (themeBtn?.querySelector("span")) themeBtn.querySelector("span").textContent = state.theme === "auto" ? "Theme" : state.theme === "dark" ? "Dark" : "Light";
    return true;
  }

  if (!restoreFromHash()) {
    htmlEditor.value = state.html;
    cssEditor.value = state.css;
  }
  setActiveTab("html");
  setBp(state.bp);
  setView("editor");
  setTokensVisible(false);
  render();
})();
