import { describe, expect, it } from "vitest";
import { cleanText, loadPage } from "./_helpers";

describe("resume page (/resume)", () => {
  const page = loadPage("/resume");

  it("renders an h1", () => {
    expect(cleanText(page.querySelector("h1")?.textContent)).not.toBe("");
  });

  it("renders at least one section heading", () => {
    const headings = page.querySelectorAll(".vp-doc h2, .vp-doc h3");
    expect(headings.length).toBeGreaterThan(0);
  });

  it("renders the resume photo", () => {
    const imgs = page.querySelectorAll(".vp-doc img");
    expect(imgs.length).toBeGreaterThan(0);
    expect(imgs[0].getAttribute("src")).toBeTruthy();
  });

  it("contains the word 'Engineer' (preserves prior smoke-test intent)", () => {
    const text = page.querySelector(".vp-doc")?.textContent ?? "";
    expect(text).toMatch(/Engineer/i);
  });

  it("body has non-trivial content", () => {
    const text = page.querySelector(".vp-doc")?.textContent ?? "";
    expect(text.length).toBeGreaterThan(800);
  });
});
