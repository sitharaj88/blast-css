// BlastCSS docs interactive bits — search, sidebar, copy buttons, scrollspy.

(function () {
  // Mobile sidebar toggle
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

  // Copy buttons on code blocks
  document.addEventListener("click", async (event) => {
    const btn = event.target.closest("[data-b-copy]");
    if (!btn) return;
    const code = btn.closest(".b-code")?.querySelector("code");
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code.innerText);
      btn.dataset.copied = "true";
      const prev = btn.textContent;
      btn.textContent = "Copied";
      setTimeout(() => { btn.dataset.copied = ""; btn.textContent = prev; }, 1500);
    } catch (_) {
      btn.textContent = "Copy failed";
    }
  });

  // Scrollspy for table of contents
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

  // Search dialog
  const searchDialog = document.getElementById("docs-search-dialog");
  const searchTriggers = document.querySelectorAll("[data-docs-search]");
  const searchList = document.querySelector("[data-docs-search-list]");

  if (searchDialog && searchList) {
    // Resolve docs root from a known link to a top-level page (the brand link).
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

    const render = (items) => {
      searchList.innerHTML = items.length ? items.map((it) => `<li><a class="b-command-item" href="${resolveItemUrl(it.url)}">
        <span style="display:flex;flex-direction:column;gap:2px;">
          <strong style="font-size:.875rem">${escapeHtml(it.title)}</strong>
          <span style="color:var(--b-muted);font-size:.75rem">${escapeHtml(it.description || it.url)}</span>
        </span>
      </a></li>`).join("") : `<li><div class="b-command-item" aria-disabled="true">No results</div></li>`;
    };

    function escapeHtml(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

    const filter = (q) => {
      if (!index) return [];
      const t = q.toLowerCase();
      if (!t) return index.slice(0, 12);
      return index
        .map((entry) => {
          let score = 0;
          if (entry.title.toLowerCase().includes(t)) score += 5;
          if ((entry.description || "").toLowerCase().includes(t)) score += 2;
          for (const h of entry.headings || []) {
            if (h.toLowerCase().includes(t)) score += 1;
          }
          return { entry, score };
        })
        .filter((s) => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((s) => s.entry)
        .slice(0, 12);
    };

    const open = async () => {
      await ensureIndex();
      render(filter(""));
      searchDialog.showModal();
      searchDialog.querySelector("input")?.focus();
    };

    for (const trigger of searchTriggers) {
      trigger.addEventListener("click", () => open());
    }

    document.addEventListener("keydown", (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (searchDialog.open) searchDialog.close();
        else open();
      }
      if (event.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        event.preventDefault();
        open();
      }
    });

    const input = searchDialog.querySelector("input");
    input?.addEventListener("input", () => render(filter(input.value)));
    searchDialog.addEventListener("click", (event) => {
      if (event.target === searchDialog) searchDialog.close();
    });
    searchDialog.addEventListener("close", () => {
      if (input) input.value = "";
      searchList.innerHTML = "";
    });
  }
})();
