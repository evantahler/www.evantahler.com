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

  it("renders both callout cards (llms.txt and RSS)", () => {
    const cards = page.querySelectorAll(".callout-card");
    expect(cards.length).toBe(2);
    const text = cleanText(
      page.querySelector(".callout-grid")?.textContent,
    ).toLowerCase();
    expect(text).toContain("llms.txt");
    expect(text).toContain("feed.xml");
  });

  it("links to the RSS feed from the home callout", () => {
    const rssLink = page.querySelector('.callout-grid a[href="/feed.xml"]');
    expect(rssLink).toBeTruthy();
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
