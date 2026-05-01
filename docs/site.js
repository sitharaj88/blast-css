// BlastCSS docs interactive bits — search, sidebar, copy buttons, scrollspy, demo tabs.

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
    for (const panel of demo.querySelectorAll("[data-panel]")) {
      panel.hidden = panel.dataset.panel !== which;
    }
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
  // Search dialog with grouping + highlighting
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
      // Group by section
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

    const filter = (q) => {
      if (!index) return [];
      const t = q.toLowerCase();
      if (!t) return [];
      return index
        .map((entry) => {
          let score = 0;
          if (entry.title.toLowerCase().includes(t)) score += 5;
          if (entry.title.toLowerCase().startsWith(t)) score += 3;
          if ((entry.description || "").toLowerCase().includes(t)) score += 2;
          for (const h of entry.headings || []) {
            if (h.toLowerCase().includes(t)) score += 1;
          }
          return { entry, score };
        })
        .filter((s) => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((s) => s.entry)
        .slice(0, 16);
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
