import { describe, expect, it } from "vitest";
import { cleanText, loadPage } from "./_helpers";

describe("open-source page (/open-source)", () => {
  const page = loadPage("/open-source");

  it("renders an h1", () => {
    expect(cleanText(page.querySelector("h1")?.textContent)).not.toBe("");
  });

  it("renders the 'Featured Projects' section heading", () => {
    const headings = page
      .querySelectorAll(".vp-doc h2")
      .map((h) => cleanText(h.textContent));
    expect(headings).toContain("Featured Projects");
  });

  it("renders the GitHub Sponsorships call-to-action link", () => {
    // The repo grid is hydrated client-side from a live GitHub API call
    // that may be rate-limited at build time, so we don't assert on
    // individual repo cards. The sponsorship link is in the markdown
    // and must always render.
    const sponsorship = page.querySelector(
      '.vp-doc a[href*="github.com/users/evantahler/sponsorship"]',
    );
    expect(sponsorship).toBeTruthy();
  });

  it("body has the intro markdown content", () => {
    const text = page.querySelector(".vp-doc")?.textContent ?? "";
    expect(text).toMatch(/open source/i);
    expect(text.length).toBeGreaterThan(200);
  });
});
