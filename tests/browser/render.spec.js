import { expect, test } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";
import { pages } from "./pages.js";

for (const pageInfo of pages) {
  test(`${pageInfo.path} renders and passes axe`, async ({ page }) => {
    await page.goto(pageInfo.url);
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page.locator("body")).toHaveCSS("box-sizing", "border-box");

    const screenshot = await page.screenshot({ fullPage: true });
    expect(screenshot.byteLength).toBeGreaterThan(5000);

    const results = await new AxeBuilder({ page })
      .disableRules(["color-contrast"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
