import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const required = {
  "dist/blast.min.css": [
    ".b-btn",
    ".b-card",
    ".b-dropdown",
    ".b-accordion",
    ".b-toast",
    ".b-tooltip",
    ".b-spinner",
    ".b-drawer",
    ".b-switch",
    ".b-pagination",
    ".b-breadcrumb",
    ".b-container",
    ".b-segmented",
    ".b-combobox",
    ".b-command",
    ".b-tag-input",
    ".b-stepper",
    ".b-popover",
    ".b-kbd",
    ".d-flex",
    "@layer blast.tokens",
    "light-dark(",
    "@container",
    "@starting-style"
  ],
  "dist/blast.core.min.css": [".b-container", ".b-field", ".b-sr-only"],
  "dist/blast.components.min.css": [".b-btn", ".b-dropdown", ".b-accordion", ".b-toast", ".b-spinner", ".b-drawer", "@starting-style"],
  "dist/blast.components-extra.min.css": [".b-segmented", ".b-combobox", ".b-command", ".b-tag-input", ".b-stepper"],
  "dist/blast.utilities.min.css": [".d-flex", ".grid-auto", ".text-muted", ".sm\\:w-full", ".\\@sm\\:grid-2"],
  "dist/blast.motion.min.css": ["b-anim-fade-in", "view-transition"]
};

let failed = false;

for (const [file, selectors] of Object.entries(required)) {
  const css = await readFile(resolve(file), "utf8");

  if (css.includes("@import")) {
    console.error(`fail      ${file} contains unresolved @import`);
    failed = true;
  }

  for (const selector of selectors) {
    if (!css.includes(selector)) {
      console.error(`fail      ${file} missing ${selector}`);
      failed = true;
    }
  }

  if (!failed) {
    console.log(`ok        ${file}`);
  }
}

const js = await readFile(resolve("dist/blast.min.js"), "utf8");
for (const symbol of ["autoInit", "initDialogs", "initTabs", "initToasts", "initCombobox", "initCommand", "initTagInput", "initSegmented", "showToast", "viewTransition"]) {
  if (!js.includes(symbol)) {
    console.error(`fail      dist/blast.min.js missing ${symbol}`);
    failed = true;
  }
}

if (failed) {
  process.exitCode = 1;
}
