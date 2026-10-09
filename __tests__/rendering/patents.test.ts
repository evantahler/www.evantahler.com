import { describe, expect, it } from "vitest";
import { cleanText, loadPage } from "./_helpers";

describe("patents page (/patents)", () => {
  const page = loadPage("/patents");

  it("renders an h1", () => {
    expect(cleanText(page.querySelector("h1")?.textContent)).not.toBe("");
  });

  it("renders the Patents section heading", () => {
    const h2s = page
      .querySelectorAll(".vp-doc h2")
      .map((h) => cleanText(h.textContent));
    expect(h2s).toContain("Patents");
  });

  it("renders an image alongside each patent", () => {
    const h3s = page.querySelectorAll(".vp-doc h3");
    const images = page.querySelectorAll(".vp-doc img.honor-image");
    expect(h3s.length).toBe(10);
    expect(images.length).toBe(h3s.length);
    for (const img of images) {
      expect(img.getAttribute("alt")).toBeTruthy();
    }
  });

  it("links each granted patent to Google Patents", () => {
    const links = page
      .querySelectorAll(".vp-doc a")
      .map((a) => a.getAttribute("href") ?? "")
      .filter((href) => /patents\.google\.com\/patent\/US\d+B2/.test(href));
    expect(links.length).toBe(10);
  });

  it("is linked from the nav", () => {
    const navLinks = page
      .querySelectorAll("a")
      .map((a) => a.getAttribute("href"));
    expect(navLinks).toContain("/patents");
  });
});
