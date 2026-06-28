// Comprehensive accessibility sweep: runs axe-core against every generated
// docs page (components, guides, utilities, top-level tools) — not just the
// curated visual manifest. Guards against regressions on any single page.
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { expect, test } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";

const here = dirname(fileURLToPath(import.meta.url));
const docsDir = resolve(here, "../../docs");

function htmlIn(subdir) {
  try {
    return readdirSync(resolve(docsDir, subdir))
      .filter((f) => f.endsWith(".html"))
      .map((f) => (subdir ? `${subdir}/${f}` : f));
  } catch {
    return [];
  }
}

const pages = [
  ...htmlIn(""),
  ...htmlIn("components"),
  ...htmlIn("guides"),
  ...htmlIn("utilities")
].filter((p) => !p.endsWith("404.html"));

test.describe("a11y sweep (all docs pages)", () => {
  for (const path of pages) {
    test(`${path} passes axe`, async ({ page }) => {
      const errors = [];
      page.on("pageerror", (e) => errors.push(String(e)));
      await page.goto(`/${path}`, { waitUntil: "load" });
      await expect(page.locator("h1").first()).toBeVisible();

      const results = await new AxeBuilder({ page })
        .disableRules(["color-contrast"])
        .analyze();
      expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);

      // No uncaught script errors on the page (catches broken bundles/demos).
      expect(errors, errors.join("\n")).toEqual([]);
    });
  }
});
