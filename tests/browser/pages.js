import manifest from "../visual-manifest.json" with { type: "json" };

export const pages = manifest.pages.map((page) => ({
  name: page.replace(/[/.]/g, "-"),
  path: page,
  url: `/${page}`
}));

export const viewports = manifest.viewports;
