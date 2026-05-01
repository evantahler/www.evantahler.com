import { describe, expect, it } from "vitest";
import { cleanText, loadPage } from "./_helpers";

describe("speaking page (/speaking)", () => {
  const page = loadPage("/speaking");
  const bodyText = page.querySelector(".vp-doc")?.textContent ?? "";

  it("renders an h1", () => {
    expect(cleanText(page.querySelector("h1")?.textContent)).not.toBe("");
  });

  it("renders the 'Featured Talks' section heading", () => {
    const h2s = page
      .querySelectorAll(".vp-doc h2")
      .map((h) => cleanText(h.textContent));
    expect(h2s).toContain("Featured Talks");
  });

  it("renders one h3 per talk so each appears in the page outline", () => {
    const h3s = page.querySelectorAll(".vp-doc h3");
    expect(h3s.length).toBeGreaterThanOrEqual(8);
    for (const h of h3s) {
      expect(cleanText(h.textContent)).not.toBe("");
      expect(h.getAttribute("id")).toBeTruthy();
    }
  });

  it("renders a talk image alongside each talk", () => {
    const images = page.querySelectorAll(".vp-doc img.talk-image");
    const h3s = page.querySelectorAll(".vp-doc h3");
    expect(images.length).toBe(h3s.length);
  });

  it("has the intro markdown content", () => {
    expect(bodyText).toMatch(/technical talks/i);
    expect(bodyText.length).toBeGreaterThan(500);
  });
});
