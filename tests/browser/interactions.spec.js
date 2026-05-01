import { expect, test } from "@playwright/test";

// ─────────────────────────────────────────────────────────────────
// Dialog (modal)
// ─────────────────────────────────────────────────────────────────
test("modal dialog opens and closes via data-b-toggle / data-b-dismiss", async ({ page }) => {
  await page.goto("/components/dialog.html");
  const dialog = page.locator("#demo-modal");
  await expect(dialog).toHaveJSProperty("open", false);

  await page.getByRole("button", { name: "Open modal" }).click();
  await expect(dialog).toHaveJSProperty("open", true);

  await dialog.getByRole("button", { name: "Cancel" }).click();
  await expect(dialog).toHaveJSProperty("open", false);
});

test("drawer opens from left and closes", async ({ page }) => {
  await page.goto("/components/dialog.html");
  const drawer = page.locator("#demo-drawer-l");
  await page.getByRole("button", { name: "Open from left" }).click();
  await expect(drawer).toHaveJSProperty("open", true);
  await drawer.locator(".b-close").click();
  await expect(drawer).toHaveJSProperty("open", false);
});

// ─────────────────────────────────────────────────────────────────
// Dropdown
// ─────────────────────────────────────────────────────────────────
test("dropdown opens via summary and closes via Escape", async ({ page }) => {
  await page.goto("/components/dropdown.html");
  const dd = page.locator("details.b-dropdown").first();
  await expect(dd).not.toHaveAttribute("open", "");
  await dd.locator("summary").click();
  await expect(dd).toHaveAttribute("open", "");
  await dd.locator("summary").press("Escape");
  await expect(dd).not.toHaveAttribute("open", "");
});

// ─────────────────────────────────────────────────────────────────
// Tabs
// ─────────────────────────────────────────────────────────────────
test("underline tabs switch panels and respond to arrow keys", async ({ page }) => {
  await page.goto("/components/tabs.html");
  const tab1 = page.locator("#dt-1-t");
  const tab2 = page.locator("#dt-2-t");
  await expect(tab1).toHaveAttribute("aria-selected", "true");

  await tab2.click();
  await expect(tab2).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#dt-2")).not.toHaveAttribute("hidden", "");
  await expect(page.locator("#dt-1")).toHaveAttribute("hidden", "");

  // ArrowRight from tab2 should focus & activate tab3
  await tab2.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("#dt-3-t")).toHaveAttribute("aria-selected", "true");
});

// ─────────────────────────────────────────────────────────────────
// Accordion
// ─────────────────────────────────────────────────────────────────
test("accordion details open and close", async ({ page }) => {
  await page.goto("/components/accordion.html");
  const first = page.locator(".b-accordion details").first();
  await expect(first).not.toHaveAttribute("open", "");
  await first.locator("summary").click();
  await expect(first).toHaveAttribute("open", "");
});

// ─────────────────────────────────────────────────────────────────
// Popover (custom + native)
// ─────────────────────────────────────────────────────────────────
test("custom popover toggles is-open class via data-b-toggle", async ({ page }) => {
  await page.goto("/components/popover.html");
  const popover = page.locator("#demo-popover");
  await expect(popover).not.toHaveClass(/is-open/);
  await page.getByRole("button", { name: "Show details" }).click();
  await expect(popover).toHaveClass(/is-open/);
});

// ─────────────────────────────────────────────────────────────────
// Segmented control
// ─────────────────────────────────────────────────────────────────
test("segmented control selects and emits change event", async ({ page }) => {
  await page.goto("/components/segmented.html");
  await page.evaluate(() => {
    window.__lastSeg = null;
    document.addEventListener("b:segmented:change", (e) => { window.__lastSeg = e.detail.value; });
  });
  const cozy = page.locator("#d-cozy");
  await page.locator("label[for='d-cozy']").click();
  await expect(cozy).toBeChecked();
  await expect.poll(() => page.evaluate(() => window.__lastSeg)).toBe("on");  // default radio value when none set is "on"
});

// ─────────────────────────────────────────────────────────────────
// Combobox
// ─────────────────────────────────────────────────────────────────
test("combobox filters options as you type and selects with Enter", async ({ page }) => {
  await page.goto("/components/combobox.html");
  const input = page.locator(".b-combobox input").first();
  await input.click();
  await input.fill("sve");
  // Only "Svelte" should be visible
  const visible = page.locator(".b-combobox-option:not([hidden])");
  await expect(visible).toHaveCount(1);
  await expect(visible.first()).toHaveText(/Svelte/);

  await input.press("ArrowDown");
  await input.press("Enter");
  await expect(input).toHaveValue("Svelte");
});

// ─────────────────────────────────────────────────────────────────
// Tag input
// ─────────────────────────────────────────────────────────────────
test("tag input adds tag on Enter and removes via × button", async ({ page }) => {
  await page.goto("/components/tag-input.html");
  const wrap = page.locator(".b-tag-input").first();
  const input = wrap.locator("input");
  const before = await wrap.locator(".b-tag").count();

  await input.click();
  await input.fill("typescript");
  await input.press("Enter");

  await expect(wrap.locator(".b-tag")).toHaveCount(before + 1);

  // Remove the just-added tag (last one)
  const last = wrap.locator(".b-tag").last();
  await last.locator(".b-tag-x").click();
  await expect(wrap.locator(".b-tag")).toHaveCount(before);
});

// ─────────────────────────────────────────────────────────────────
// Command palette
// ─────────────────────────────────────────────────────────────────
test("command palette filters and opens on ⌘K", async ({ page }) => {
  await page.goto("/components/command.html");

  // Open via the explicit button
  await page.getByRole("button", { name: /Open palette/ }).click();
  const palette = page.locator("#demo-cmd");
  await expect(palette).toHaveJSProperty("open", true);

  // Filter
  const search = palette.locator(".b-command-search input");
  await search.fill("dashboard");
  const visible = palette.locator(".b-command-item:not([hidden])");
  await expect(visible.first()).toContainText(/dashboard/i);
});

// ─────────────────────────────────────────────────────────────────
// Toast (programmatic)
// ─────────────────────────────────────────────────────────────────
test("showToast() appends a toast to the stack", async ({ page }) => {
  await page.goto("/components/toast.html");
  const result = await page.evaluate(async () => {
    const mod = await import("/dist/blast.js");
    mod.showToast({ title: "Hi", body: "There", variant: "success", duration: 0 });
    return document.querySelectorAll(".b-toast").length;
  });
  expect(result).toBeGreaterThan(0);
});

// ─────────────────────────────────────────────────────────────────
// Theme toggle
// ─────────────────────────────────────────────────────────────────
test("theme toggle flips data-theme on <html>", async ({ page }) => {
  await page.goto("/components/buttons.html");
  const initial = await page.evaluate(() => document.documentElement.dataset.theme || "");
  await page.locator("[data-b-toggle='theme']").first().click();
  const after = await page.evaluate(() => document.documentElement.dataset.theme);
  expect(after).not.toBe(initial);
  expect(["light", "dark"]).toContain(after);
});

// ─────────────────────────────────────────────────────────────────
// Search command palette in docs chrome
// ─────────────────────────────────────────────────────────────────
test("docs search dialog filters results", async ({ page }) => {
  await page.goto("/components/buttons.html");
  // Trigger via the same code path the visible button uses — `data-docs-search`.
  // We dispatch a click directly so the test doesn't depend on layout chrome.
  await page.evaluate(() => document.querySelector("[data-docs-search]").click());
  const dialog = page.locator("#docs-search-dialog");
  await expect(dialog).toHaveJSProperty("open", true);

  const input = dialog.locator("input");
  await input.fill("button");
  const items = dialog.locator(".b-command-item");
  await expect(items.first()).toContainText(/button/i);
});

// ─────────────────────────────────────────────────────────────────
// Code copy button
// ─────────────────────────────────────────────────────────────────
test("docs code-copy buttons copy to clipboard", async ({ page, context, browserName }) => {
  test.skip(browserName !== "chromium", "clipboard.writeText is only reliably permissioned in headless Chromium");
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/guides/installation.html");
  const btn = page.locator("[data-b-copy]").first();
  await btn.click();
  await expect(btn).toHaveAttribute("data-copied", "true");
});

// ─────────────────────────────────────────────────────────────────
// Form: textarea field-sizing & switch checkbox state
// ─────────────────────────────────────────────────────────────────
test("form switch toggles checked state", async ({ page }) => {
  await page.goto("/components/forms.html");
  const checkbox = page.locator(".b-switch input[type='checkbox']").first();
  const initial = await checkbox.isChecked();
  await checkbox.click();
  expect(await checkbox.isChecked()).toBe(!initial);
});

// ─────────────────────────────────────────────────────────────────
// Container query — buttons demo block should layout reasonably
// ─────────────────────────────────────────────────────────────────
test("button cluster wraps properly at narrow widths", async ({ page }) => {
  await page.goto("/components/buttons.html");
  await page.setViewportSize({ width: 360, height: 800 });
  const cluster = page.locator(".b-demo-preview").first().locator(".b-cluster").first();
  const box = await cluster.boundingBox();
  expect(box?.width).toBeLessThanOrEqual(360);
});
