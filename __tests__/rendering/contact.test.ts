import { describe, expect, it } from "vitest";
import { cleanText, loadPage } from "./_helpers";

describe("contact page (/contact)", () => {
  const page = loadPage("/contact");

  it("renders an h1", () => {
    expect(cleanText(page.querySelector("h1")?.textContent)).not.toBe("");
  });

  it("contains the 'Delicious Hat' phrase (preserves prior smoke-test intent)", () => {
    const text = page.querySelector(".vp-doc")?.textContent ?? "";
    expect(text).toMatch(/Delicious Hat/);
  });

  it("renders at least one external contact link", () => {
    const externalLinks = page.querySelectorAll(
      '.vp-doc a[href^="http"], .vp-doc a[href^="mailto:"]',
    );
    expect(externalLinks.length).toBeGreaterThan(0);
  });
});
