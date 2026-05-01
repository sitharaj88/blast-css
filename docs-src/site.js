// BlastCSS docs interactive bits — search, sidebar, copy, scrollspy, demos, anchors.

(function () {
  // ───────────────────────────────────────────────────────────
  // Mobile sidebar toggle
  // ───────────────────────────────────────────────────────────
  const menuBtn = document.querySelector("[data-docs-menu]");
  const sidebar = document.querySelector("[data-docs-sidebar]");
  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
      const open = sidebar.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(open));
    });
    sidebar.addEventListener("click", (event) => {
      if (event.target.closest("a")) sidebar.classList.remove("is-open");
    });
  }

  // ───────────────────────────────────────────────────────────
  // Tiny toast helper for click feedback
  // ───────────────────────────────────────────────────────────
  function flash(text, near) {
    const el = document.createElement("div");
    el.className = "docs-flash";
    el.textContent = text;
    document.body.appendChild(el);
    if (near?.getBoundingClientRect) {
      const r = near.getBoundingClientRect();
      el.style.left = `${r.left + window.scrollX}px`;
      el.style.top = `${r.top + window.scrollY - 30}px`;
    } else {
      el.classList.add("docs-flash-center");
    }
    requestAnimationFrame(() => el.classList.add("is-visible"));
    setTimeout(() => {
      el.classList.remove("is-visible");
      setTimeout(() => el.remove(), 200);
    }, 1100);
  }

  // ───────────────────────────────────────────────────────────
  // Copy buttons (code blocks + bare data-copy-text)
  // ───────────────────────────────────────────────────────────
  document.addEventListener("click", async (event) => {
    const btn = event.target.closest("[data-b-copy]");
    if (!btn) return;
    let text = btn.dataset.copyText;
    if (!text) {
      const code = btn.closest(".b-code")?.querySelector("code") || btn.parentElement?.querySelector("code");
      if (code) text = code.innerText;
    }
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      btn.dataset.copied = "true";
      const label = btn.querySelector("span");
      const prev = label?.textContent;
      if (label) label.textContent = "Copied";
      setTimeout(() => {
        btn.dataset.copied = "";
        if (label && prev) label.textContent = prev;
      }, 1500);
    } catch (_) {
      const label = btn.querySelector("span");
      if (label) label.textContent = "Copy failed";
    }
  });

  // ───────────────────────────────────────────────────────────
  // Heading anchor click → copy URL with hash
  // ───────────────────────────────────────────────────────────
  document.addEventListener("click", async (event) => {
    const anchor = event.target.closest(".b-anchor-link");
    if (!anchor) return;
    // Let normal navigation happen, but also copy the full URL.
    const heading = anchor.closest("h1, h2, h3, h4, h5, h6");
    const id = heading?.id;
    if (!id) return;
    const url = location.origin + location.pathname + "#" + id;
    try {
      await navigator.clipboard.writeText(url);
      flash("Link copied", anchor);
    } catch {}
  });

  // ───────────────────────────────────────────────────────────
  // Demo Preview / Code tabs
  // ───────────────────────────────────────────────────────────
  document.addEventListener("click", (event) => {
    const tab = event.target.closest(".b-demo-tab");
    if (!tab) return;
    const demo = tab.closest(".b-demo");
    const which = tab.dataset.tab;
    for (const t of demo.querySelectorAll(".b-demo-tab")) {
      const active = t.dataset.tab === which;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", String(active));
    }
    // Toggle preview/code panes — works for single AND multi-variant demos.
    for (const panel of demo.querySelectorAll("[data-panel]")) {
      panel.hidden = panel.dataset.panel !== which;
    }
  });

  // ───────────────────────────────────────────────────────────
  // Multi-variant demo tabs
  // ───────────────────────────────────────────────────────────
  document.addEventListener("click", (event) => {
    const vt = event.target.closest(".b-demo-variant-tab");
    if (!vt) return;
    const demo = vt.closest(".b-demo");
    const which = vt.dataset.variant;
    for (const t of demo.querySelectorAll(".b-demo-variant-tab")) {
      const active = t.dataset.variant === which;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", String(active));
    }
    for (const pane of demo.querySelectorAll(".b-demo-variant")) {
      pane.classList.toggle("is-active", pane.dataset.variantPane === which);
    }
  });

  // ───────────────────────────────────────────────────────────
  // Per-demo theme switcher
  // ───────────────────────────────────────────────────────────
  document.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-demo-theme]");
    if (!btn) return;
    const demo = btn.closest(".b-demo");
    const previews = demo.querySelectorAll(".b-demo-preview");
    const current = demo.dataset.theme;
    let next;
    if (!current) next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    else if (current === "dark") next = "light";
    else next = "dark";
    demo.dataset.theme = next;
    for (const p of previews) p.dataset.theme = next;
  });

  // ───────────────────────────────────────────────────────────
  // Scrollspy for table of contents
  // ───────────────────────────────────────────────────────────
  const toc = document.querySelector(".docs-toc");
  if (toc) {
    const links = new Map();
    for (const a of toc.querySelectorAll("a")) {
      const id = a.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (target) links.set(target, a);
    }
    if (links.size && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            for (const a of toc.querySelectorAll("a")) a.classList.remove("is-active");
            links.get(entry.target)?.classList.add("is-active");
          }
        }
      }, { rootMargin: "-30% 0px -65% 0px", threshold: 0 });
      for (const target of links.keys()) observer.observe(target);
    }
  }

  // ───────────────────────────────────────────────────────────
  // Search dialog with grouping, fuzzy matching, recency
  // ───────────────────────────────────────────────────────────
  const searchDialog = document.getElementById("docs-search-dialog");
  const searchTriggers = document.querySelectorAll("[data-docs-search]");
  const searchList = document.querySelector("[data-docs-search-list]");

  if (searchDialog && searchList) {
    const brand = document.querySelector(".docs-brand");
    const rootHref = brand ? new URL(brand.getAttribute("href"), location.href) : new URL("./", location.href);
    const indexUrl = new URL("search-index.json", rootHref).href;

    let index = null;
    const ensureIndex = async () => {
      if (index) return index;
      const res = await fetch(indexUrl);
      index = await res.json();
      return index;
    };

    const resolveItemUrl = (relUrl) => new URL(relUrl, rootHref).href;
    const escapeHtml = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const highlightMatch = (text, query) => {
      if (!query) return escapeHtml(text);
      const safe = escapeHtml(text);
      const q = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return safe.replace(new RegExp(q, "ig"), (m) => `<mark>${m}</mark>`);
    };

    const recentKey = "b-docs-recent";
    const getRecent = () => {
      try { return JSON.parse(localStorage.getItem(recentKey) || "[]"); } catch { return []; }
    };
    const pushRecent = (entry) => {
      try {
        const recent = getRecent().filter((r) => r.url !== entry.url);
        recent.unshift({ title: entry.title, url: entry.url, section: entry.section || "" });
        localStorage.setItem(recentKey, JSON.stringify(recent.slice(0, 5)));
      } catch {}
    };

    // Subsequence test: do all chars of `q` appear in order in `s`?
    const fuzzy = (s, q) => {
      let si = 0, qi = 0;
      while (si < s.length && qi < q.length) {
        if (s[si] === q[qi]) qi++;
        si++;
      }
      return qi === q.length;
    };

    const score = (entry, q) => {
      const t = entry.title.toLowerCase();
      const d = (entry.description || "").toLowerCase();
      let s = 0;
      // Exact substring beats everything.
      if (t === q) s += 50;
      else if (t.startsWith(q)) s += 14;
      else if (t.includes(q)) s += 8;
      else if (fuzzy(t, q)) s += 4;

      if (d.includes(q)) s += 3;
      else if (fuzzy(d, q)) s += 1;

      for (const h of entry.headings || []) {
        if (h.toLowerCase().includes(q)) s += 2;
      }

      // Recency boost: pages visited recently get a small bump.
      const recent = getRecent();
      const ri = recent.findIndex((r) => r.url === entry.url);
      if (ri >= 0) s += Math.max(0, 3 - ri);

      return s;
    };

    const filter = (q) => {
      if (!index) return [];
      const t = q.toLowerCase();
      if (!t) return [];
      return index
        .map((entry) => ({ entry, s: score(entry, t) }))
        .filter((x) => x.s > 0)
        .sort((a, b) => b.s - a.s || a.entry.title.localeCompare(b.entry.title))
        .map((x) => x.entry)
        .slice(0, 16);
    };

    const renderEmpty = () => {
      const recent = getRecent();
      if (recent.length) {
        searchList.innerHTML = `<li><div class="b-command-group-label">Recent</div></li>` + recent.map((it) => `<li><a class="b-command-item" href="${resolveItemUrl(it.url)}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          <span style="display:flex;flex-direction:column;gap:2px">
            <strong style="font-size:.875rem">${escapeHtml(it.title)}</strong>
            ${it.section ? `<span style="color:var(--b-muted);font-size:.75rem">${escapeHtml(it.section)}</span>` : ""}
          </span>
        </a></li>`).join("");
      } else {
        searchList.innerHTML = `<li><div class="b-command-item" aria-disabled="true" style="justify-content:center;color:var(--b-muted)">Start typing to search</div></li>`;
      }
    };

    const renderResults = (items, query) => {
      if (!items.length) {
        searchList.innerHTML = `<li><div class="b-command-item" aria-disabled="true" style="justify-content:center;color:var(--b-muted)">No matches for "${escapeHtml(query)}"</div></li>`;
        return;
      }
      const groups = new Map();
      for (const it of items) {
        const key = it.section || "Other";
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(it);
      }
      const html = [];
      for (const [section, list] of groups) {
        html.push(`<li><div class="b-command-group-label">${escapeHtml(section)}</div></li>`);
        for (const it of list) {
          html.push(`<li><a class="b-command-item" href="${resolveItemUrl(it.url)}" data-search-pick='${encodeURIComponent(JSON.stringify({ title: it.title, url: it.url, section: it.section }))}'>
            <span style="display:flex;flex-direction:column;gap:2px;flex:1">
              <strong style="font-size:.875rem">${highlightMatch(it.title, query)}</strong>
              ${it.description ? `<span style="color:var(--b-muted);font-size:.75rem">${highlightMatch(it.description, query)}</span>` : ""}
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:.5;flex-shrink:0" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a></li>`);
        }
      }
      searchList.innerHTML = html.join("");
    };

    const open = async () => {
      await ensureIndex();
      renderEmpty();
      searchDialog.showModal();
      searchDialog.querySelector("input")?.focus();
    };

    for (const trigger of searchTriggers) {
      trigger.addEventListener("click", () => open());
    }

    document.addEventListener("keydown", (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        if (document.querySelector(".b-command[data-shortcut]")) return;
        event.preventDefault();
        if (searchDialog.open) searchDialog.close();
        else open();
      }
      if (event.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA" && !searchDialog.open) {
        event.preventDefault();
        open();
      }
    });

    const input = searchDialog.querySelector("input");
    input?.addEventListener("input", () => {
      const q = input.value.trim();
      if (!q) renderEmpty();
      else renderResults(filter(q), q);
    });

    searchDialog.addEventListener("click", (event) => {
      if (event.target === searchDialog) searchDialog.close();

      const pick = event.target.closest("[data-search-pick]");
      if (pick) {
        try { pushRecent(JSON.parse(decodeURIComponent(pick.dataset.searchPick))); } catch {}
      }
    });

    searchDialog.addEventListener("close", () => {
      if (input) input.value = "";
      searchList.innerHTML = "";
    });
  }
})();
