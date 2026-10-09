import { describe, expect, it } from "vitest";
import { cleanText, loadPage } from "./_helpers";

const PATENT_NUMBERS = [
  "10,271,005",
  "9,522,341",
  "9,247,007",
  "9,077,858",
  "9,065,870",
  "9,055,269",
  "8,949,376",
  "8,781,115",
  "8,693,846",
  "8,521,004",
];

describe("patents page (/patents)", () => {
  const page = loadPage("/patents");
  const bodyText = page.querySelector(".vp-doc")?.textContent ?? "";

  it("renders an h1", () => {
    expect(cleanText(page.querySelector("h1")?.textContent)).toBe("Patents");
  });

  it("lists all ten granted patent numbers", () => {
    for (const number of PATENT_NUMBERS) {
      expect(bodyText).toContain(number);
    }
  });

  it("renders a front-page drawing for each granted patent", () => {
    const images = page.querySelectorAll(".vp-doc img.patent-image");
    expect(images.length).toBe(10);
  });

  it("does not name the assignee", () => {
    expect(bodyText).not.toMatch(/Disney Enterprises/i);
  });
});
