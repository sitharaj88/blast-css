const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])"
].join(",");

function getTarget(trigger) {
  const selector = trigger.getAttribute("data-b-target") || trigger.getAttribute("href");
  if (!selector || selector === "#") return null;
  return document.querySelector(selector);
}

export function initDialogs(root = document) {
  root.addEventListener("click", (event) => {
    const opener = event.target.closest("[data-b-toggle='dialog']");
    if (opener) {
      const dialog = getTarget(opener);
      if (dialog?.showModal) {
        event.preventDefault();
        dialog.showModal();
      }
    }

    const closer = event.target.closest("[data-b-dismiss='dialog']");
    if (closer) {
      const dialog = closer.closest("dialog");
      if (dialog) {
        event.preventDefault();
        dialog.close();
      }
    }
  });
}

export function initCollapse(root = document) {
  root.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-b-toggle='collapse']");
    if (!trigger) return;

    const target = getTarget(trigger);
    if (!target) return;

    event.preventDefault();
    const open = target.classList.toggle("is-open");
    trigger.setAttribute("aria-expanded", String(open));
  });
}

export function initTabs(root = document) {
  root.addEventListener("click", (event) => {
    const tab = event.target.closest("[role='tab'][aria-controls]");
    if (!tab) return;

    const tablist = tab.closest("[role='tablist']");
    if (!tablist) return;

    event.preventDefault();
    const tabs = [...tablist.querySelectorAll("[role='tab'][aria-controls]")];

    for (const item of tabs) {
      const selected = item === tab;
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
      const panel = document.getElementById(item.getAttribute("aria-controls"));
      if (panel) panel.hidden = !selected;
    }
  });

  root.addEventListener("keydown", (event) => {
    const tab = event.target.closest("[role='tab'][aria-controls]");
    if (!tab || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;

    const tabs = [...tab.closest("[role='tablist']").querySelectorAll("[role='tab'][aria-controls]")];
    const current = tabs.indexOf(tab);
    let next = current;

    if (event.key === "ArrowRight") next = (current + 1) % tabs.length;
    if (event.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;

    event.preventDefault();
    tabs[next].focus();
    tabs[next].click();
  });
}

export function initDropdowns(root = document) {
  root.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const dropdown = event.target.closest(".b-dropdown[open]");
    if (dropdown) {
      dropdown.removeAttribute("open");
      dropdown.querySelector("summary")?.focus();
    }
  });

  document.addEventListener("click", (event) => {
    for (const dropdown of document.querySelectorAll(".b-dropdown[open]")) {
      if (!dropdown.contains(event.target)) dropdown.removeAttribute("open");
    }
  });
}

export function initToasts(root = document) {
  root.addEventListener("click", (event) => {
    const closer = event.target.closest("[data-b-dismiss='toast']");
    if (!closer) return;

    const toast = closer.closest(".b-toast");
    if (toast) {
      event.preventDefault();
      toast.classList.add("is-hidden");
      setTimeout(() => toast.remove(), 220);
    }
  });
}

export function showToast({ title, body, variant = "", duration = 4000, stack } = {}) {
  const target = stack || document.querySelector(".b-toast-stack") || (() => {
    const el = document.createElement("div");
    el.className = "b-toast-stack";
    document.body.appendChild(el);
    return el;
  })();

  const toast = document.createElement("div");
  toast.className = "b-toast" + (variant ? " b-alert-" + variant : "");
  toast.setAttribute("role", "status");
  if (title) {
    const t = document.createElement("strong");
    t.textContent = title;
    toast.appendChild(t);
  }
  if (body) {
    const b = document.createElement("span");
    b.textContent = body;
    toast.appendChild(b);
  }
  target.appendChild(toast);
  if (duration > 0) {
    setTimeout(() => {
      toast.classList.add("is-hidden");
      setTimeout(() => toast.remove(), 220);
    }, duration);
  }
  return toast;
}

export function initPopovers(root = document) {
  root.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-b-toggle='popover']");
    if (!trigger) return;

    const popover = getTarget(trigger);
    if (!popover) return;

    event.preventDefault();

    if (popover.hasAttribute("popover")) {
      if (popover.matches(":popover-open")) popover.hidePopover();
      else popover.showPopover();
      anchorPopover(trigger, popover);
      return;
    }

    const open = popover.classList.toggle("is-open");
    trigger.setAttribute("aria-expanded", String(open));
    anchorPopover(trigger, popover);
  });

  root.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    for (const popover of document.querySelectorAll(".b-popover.is-open")) {
      popover.classList.remove("is-open");
    }
  });

  document.addEventListener("click", (event) => {
    for (const popover of document.querySelectorAll(".b-popover.is-open")) {
      const trigger = document.querySelector(`[data-b-target="#${popover.id}"]`);
      if (popover.contains(event.target)) continue;
      if (trigger?.contains(event.target)) continue;
      popover.classList.remove("is-open");
    }
  });
}

function anchorPopover(trigger, popover) {
  if (CSS?.supports?.("anchor-name", "--a")) {
    const anchorName = `--b-anchor-${trigger.id || Math.random().toString(36).slice(2, 8)}`;
    trigger.style.anchorName = anchorName;
    popover.style.setProperty("--b-anchor", anchorName);
  }
  const rect = trigger.getBoundingClientRect();
  popover.style.insetBlockStart = `${rect.bottom + window.scrollY + 8}px`;
  popover.style.insetInlineStart = `${rect.left + window.scrollX}px`;
}

export function initSegmented(root = document) {
  root.addEventListener("change", (event) => {
    const input = event.target.closest(".b-segmented input[type='radio']");
    if (!input) return;
    input.dispatchEvent(new CustomEvent("b:segmented:change", { bubbles: true, detail: { value: input.value } }));
  });
}

export function initCombobox(root = document) {
  for (const cb of root.querySelectorAll?.(".b-combobox") || []) {
    if (cb.dataset.bInit) continue;
    cb.dataset.bInit = "1";

    const input = cb.querySelector("input");
    const list = cb.querySelector(".b-combobox-list");
    if (!input || !list) continue;

    list.hidden = true;
    input.setAttribute("role", "combobox");
    input.setAttribute("aria-autocomplete", "list");
    input.setAttribute("aria-expanded", "false");
    if (list.id) input.setAttribute("aria-controls", list.id);
    list.setAttribute("role", "listbox");

    const options = [...list.querySelectorAll(".b-combobox-option")];
    options.forEach((opt) => opt.setAttribute("role", "option"));

    const open = () => { list.hidden = false; input.setAttribute("aria-expanded", "true"); };
    const close = () => { list.hidden = true; input.setAttribute("aria-expanded", "false"); };

    input.addEventListener("focus", open);
    input.addEventListener("input", () => {
      open();
      const q = input.value.trim().toLowerCase();
      options.forEach((opt) => {
        const text = opt.textContent.toLowerCase();
        opt.hidden = q && !text.includes(q);
      });
    });
    input.addEventListener("blur", () => setTimeout(close, 120));

    list.addEventListener("mousedown", (event) => {
      const opt = event.target.closest(".b-combobox-option");
      if (!opt) return;
      event.preventDefault();
      input.value = opt.dataset.value || opt.textContent.trim();
      close();
      input.dispatchEvent(new CustomEvent("b:combobox:select", { bubbles: true, detail: { value: input.value } }));
    });

    input.addEventListener("keydown", (event) => {
      const visible = options.filter((o) => !o.hidden);
      const current = visible.findIndex((o) => o.getAttribute("aria-selected") === "true");
      if (event.key === "ArrowDown") {
        event.preventDefault();
        open();
        const next = visible[(current + 1) % visible.length];
        if (next) {
          visible.forEach((o) => o.setAttribute("aria-selected", "false"));
          next.setAttribute("aria-selected", "true");
          next.scrollIntoView({ block: "nearest" });
        }
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        open();
        const prev = visible[(current - 1 + visible.length) % visible.length];
        if (prev) {
          visible.forEach((o) => o.setAttribute("aria-selected", "false"));
          prev.setAttribute("aria-selected", "true");
          prev.scrollIntoView({ block: "nearest" });
        }
      } else if (event.key === "Enter" && current >= 0) {
        event.preventDefault();
        const opt = visible[current];
        input.value = opt.dataset.value || opt.textContent.trim();
        close();
        input.dispatchEvent(new CustomEvent("b:combobox:select", { bubbles: true, detail: { value: input.value } }));
      } else if (event.key === "Escape") {
        close();
      }
    });
  }
}

export function initTagInput(root = document) {
  for (const wrap of root.querySelectorAll?.(".b-tag-input") || []) {
    if (wrap.dataset.bInit) continue;
    wrap.dataset.bInit = "1";

    const input = wrap.querySelector("input");
    if (!input) continue;

    wrap.addEventListener("click", (event) => {
      if (event.target === wrap) input.focus();
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === ",") {
        event.preventDefault();
        const value = input.value.trim().replace(/,$/, "");
        if (!value) return;
        addTag(wrap, input, value);
      } else if (event.key === "Backspace" && !input.value) {
        const tags = wrap.querySelectorAll(".b-tag");
        const last = tags[tags.length - 1];
        if (last) last.remove();
      }
    });

    wrap.addEventListener("click", (event) => {
      const x = event.target.closest(".b-tag-x");
      if (!x) return;
      event.preventDefault();
      x.closest(".b-tag")?.remove();
    });
  }
}

function addTag(wrap, input, value) {
  const tag = document.createElement("span");
  tag.className = "b-tag";
  tag.textContent = value;
  const x = document.createElement("button");
  x.className = "b-tag-x";
  x.type = "button";
  x.setAttribute("aria-label", `Remove ${value}`);
  x.textContent = "×";
  tag.appendChild(x);
  wrap.insertBefore(tag, input);
  input.value = "";
  wrap.dispatchEvent(new CustomEvent("b:tag:add", { bubbles: true, detail: { value } }));
}

export function initCommand(root = document) {
  for (const palette of root.querySelectorAll?.(".b-command") || []) {
    if (palette.dataset.bInit) continue;
    palette.dataset.bInit = "1";

    const search = palette.querySelector(".b-command-search input");
    const items = [...palette.querySelectorAll(".b-command-item")];
    if (!search) continue;

    let activeIdx = 0;
    const setActive = (idx) => {
      const visible = items.filter((i) => !i.hidden);
      if (!visible.length) return;
      visible.forEach((i) => i.setAttribute("aria-selected", "false"));
      activeIdx = ((idx % visible.length) + visible.length) % visible.length;
      visible[activeIdx].setAttribute("aria-selected", "true");
      visible[activeIdx].scrollIntoView({ block: "nearest" });
    };

    search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();
      items.forEach((item) => {
        item.hidden = q && !item.textContent.toLowerCase().includes(q);
      });
      activeIdx = 0;
      setActive(0);
    });

    search.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") { event.preventDefault(); setActive(activeIdx + 1); }
      else if (event.key === "ArrowUp") { event.preventDefault(); setActive(activeIdx - 1); }
      else if (event.key === "Enter") {
        event.preventDefault();
        const visible = items.filter((i) => !i.hidden);
        visible[activeIdx]?.click();
      }
    });

    palette.addEventListener("close", () => {
      search.value = "";
      items.forEach((i) => { i.hidden = false; i.setAttribute("aria-selected", "false"); });
      activeIdx = 0;
    });

    setActive(0);
  }

  root.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      const palette = document.querySelector("dialog.b-command, .b-command[data-shortcut]");
      if (!palette) return;
      event.preventDefault();
      if (palette.tagName === "DIALOG") {
        if (palette.open) palette.close();
        else palette.showModal();
        palette.querySelector(".b-command-search input")?.focus();
      }
    }
  });
}

export function initTheme() {
  const apply = (theme) => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("b-theme", theme); } catch {}
    document.dispatchEvent(new CustomEvent("b:theme:change", { detail: { theme } }));
  };

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-b-toggle='theme']");
    if (!trigger) return;
    event.preventDefault();
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    apply(next);
  });

  try {
    const saved = localStorage.getItem("b-theme");
    if (saved === "light" || saved === "dark") apply(saved);
  } catch {}
}

export function trapDialogFocus(dialog) {
  dialog.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;

    const focusable = [...dialog.querySelectorAll(focusableSelector)];
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

export function viewTransition(callback) {
  if (typeof document.startViewTransition !== "function") {
    callback();
    return Promise.resolve();
  }
  return document.startViewTransition(callback).finished;
}

export function autoInit(root = document) {
  initDialogs(root);
  initCollapse(root);
  initTabs(root);
  initDropdowns(root);
  initToasts(root);
  initPopovers(root);
  initSegmented(root);
  initCombobox(root);
  initTagInput(root);
  initCommand(root);
  initTheme();

  for (const dialog of root.querySelectorAll?.("dialog") || []) {
    trapDialogFocus(dialog);
  }
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => autoInit());
  } else {
    autoInit();
  }
}
