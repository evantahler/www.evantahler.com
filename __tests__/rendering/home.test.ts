import { describe, expect, it } from "vitest";
import { cleanText, loadPage } from "./_helpers";

describe("home page (/)", () => {
  const page = loadPage("/");

  it("has a title with the site name", () => {
    expect(cleanText(page.querySelector("title")?.textContent)).toContain(
      "Evan Tahler",
    );
  });

  it("renders an h1 mentioning Evan", () => {
    const h1 = page.querySelector("h1");
    expect(h1).toBeTruthy();
    expect(cleanText(h1?.textContent)).toMatch(/Evan/);
  });

  it("renders the VitePress hero block", () => {
    expect(page.querySelector(".VPHero, .vp-hero")).toBeTruthy();
  });

  it("renders the llms-card callout", () => {
    expect(page.querySelector(".llms-card")).toBeTruthy();
  });

  it("links to at least one blog post (featured grid)", () => {
    const postLinks = page.querySelectorAll('a[href^="/blog/post/"]');
    expect(postLinks.length).toBeGreaterThan(0);
  });

  it("emits a self-referential canonical link in the head", () => {
    const link = page.querySelector('head link[rel="canonical"]');
    expect(link).toBeTruthy();
    expect(link?.getAttribute("href")).toBe("https://www.evantahler.com/");
  });
});
