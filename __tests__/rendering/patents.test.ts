import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { cleanText, distPath, loadPage } from "./_helpers";

const GRANTED = [
  { number: "11,582,507", id: "US11582507" },
  { number: "10,271,005", id: "US10271005" },
  { number: "9,959,897", id: "US9959897" },
  { number: "9,522,341", id: "US9522341" },
  { number: "9,247,007", id: "US9247007" },
  { number: "9,077,858", id: "US9077858" },
  { number: "9,065,870", id: "US9065870" },
  { number: "9,055,269", id: "US9055269" },
  { number: "8,949,376", id: "US8949376" },
  { number: "8,781,115", id: "US8781115" },
  { number: "8,693,846", id: "US8693846" },
  { number: "8,548,613", id: "US8548613" },
  { number: "8,521,004", id: "US8521004" },
  { number: "8,327,009", id: "US8327009" },
  { number: "8,280,223", id: "US8280223" },
];

const NOT_GRANTED = ["US20100232771", "US20100228811", "US20090304365"];

// Structural markers only. A literal assignee name does not belong in the repo.
const ASSIGNEE_MARKERS = /assignee|inventors?:|\bInc\.?\b|Enterprises/i;

function patentsSlice(full: string): string {
  const start = full.indexOf("url: /patents.md");
  if (start < 0) return "";
  const rest = full.slice(start);
  const next = rest.indexOf("\nurl: /", 1);
  return next === -1 ? rest : rest.slice(0, next);
}

describe("patents page (/patents)", () => {
  const page = loadPage("/patents");
  const html = readFileSync(distPath("patents.html"), "utf8");
  const companion = readFileSync(distPath("patents.md"), "utf8");
  const llms = readFileSync(distPath("llms.txt"), "utf8");
  const llmsFullSlice = patentsSlice(
    readFileSync(distPath("llms-full.txt"), "utf8"),
  );
  const bodyText = page.querySelector(".vp-doc")?.textContent ?? "";

  it("renders an h1", () => {
    expect(cleanText(page.querySelector("h1")?.textContent)).toBe("Patents");
  });

  it("lists all fifteen granted patent numbers", () => {
    for (const patent of GRANTED) {
      expect(bodyText).toContain(patent.number);
    }
    expect(bodyText).toMatch(/fifteen granted/i);
  });

  it("renders one h3 per patent, each with an id", () => {
    const h3s = page.querySelectorAll(".vp-doc h3");
    expect(h3s.length).toBe(GRANTED.length);
    for (const h of h3s) {
      expect(cleanText(h.textContent)).not.toBe("");
      expect(h.getAttribute("id")).toBeTruthy();
    }
  });

  it("renders a front-page drawing for each granted patent", () => {
    const images = page.querySelectorAll(".vp-doc img.patent-image");
    const h3s = page.querySelectorAll(".vp-doc h3");
    expect(images.length).toBe(h3s.length);
  });

  it("points each Google Patents link at its own patent number", () => {
    const hrefs = page
      .querySelectorAll('a[href*="patents.google.com"]')
      .map((a) => a.getAttribute("href") ?? "");
    for (const patent of GRANTED) {
      expect(hrefs.some((href) => href.includes(patent.id))).toBe(true);
    }
    for (const id of NOT_GRANTED) {
      expect(hrefs.some((href) => href.includes(id))).toBe(true);
    }
    expect(hrefs.some((href) => href.includes("WO2009148514"))).toBe(false);
  });

  it("does not name an assignee in the page, its markdown, or llms output", () => {
    for (const text of [html, companion, llmsFullSlice]) {
      expect(text).not.toMatch(ASSIGNEE_MARKERS);
    }
    expect(llms).toMatch(/Fifteen granted United States patents/);
    expect(llms).not.toMatch(/Ten granted/);
  });
});
