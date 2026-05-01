import { expect, test } from "@playwright/test";

const docsUrl = "/docs/index.html";
const kitchenUrl = "/examples/kitchen-sink.html";

test("optional helpers open and close dialogs", async ({ page }) => {
  await page.goto(docsUrl);
  await page.getByRole("button", { name: "Open modal" }).click();
  await expect(page.locator("#doc-modal")).toHaveJSProperty("open", true);
  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.locator("#doc-modal")).toHaveJSProperty("open", false);
});

test("optional helpers toggle collapse", async ({ page }) => {
  await page.goto(docsUrl);
  const panel = page.locator("#doc-collapse");
  await expect(panel).not.toHaveClass(/is-open/);
  await page.getByRole("button", { name: "Toggle" }).click();
  await expect(panel).toHaveClass(/is-open/);
});

test("optional helpers switch tabs", async ({ page }) => {
  await page.goto(docsUrl);
  await page.getByRole("tab", { name: "JS" }).click();
  await expect(page.getByRole("tab", { name: "JS" })).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#tab-b")).not.toHaveAttribute("hidden", "");
});

test("drawer opens from kitchen sink", async ({ page }) => {
  await page.goto(kitchenUrl);
  await page.getByRole("button", { name: "Open drawer" }).click();
  await expect(page.locator("#drawer")).toHaveJSProperty("open", true);
});
