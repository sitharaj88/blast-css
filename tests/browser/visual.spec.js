import { expect, test } from "@playwright/test";
import { pages, viewports } from "./pages.js";

for (const pageInfo of pages) {
  for (const viewport of viewports) {
    test(`${pageInfo.path} visual ${viewport.name}`, async ({ page, browserName }) => {
      test.skip(browserName !== "chromium", "visual baselines are captured in Chromium only");
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(pageInfo.url);
      await expect(page).toHaveScreenshot(`${pageInfo.name}-${viewport.name}.png`, {
        fullPage: true,
        animations: "disabled",
        maxDiffPixelRatio: 0.02
      });
    });
  }
}
