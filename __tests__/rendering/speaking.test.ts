import { describe, expect, it } from "vitest";
import { talks } from "../../data/talks";
import { cleanText, loadPage } from "./_helpers";

describe("speaking page (/speaking)", () => {
  const page = loadPage("/speaking");
  const bodyText = page.querySelector(".vp-doc")?.textContent ?? "";
  const imgSrcs = new Set(
    page
      .querySelectorAll(".vp-doc img")
      .map((i) => i.getAttribute("src") ?? ""),
  );
  const linkHrefs = new Set(
    page
      .querySelectorAll('.vp-doc a[href^="http"]')
      .map((a) => a.getAttribute("href") ?? ""),
  );

  it("renders an h1", () => {
    expect(cleanText(page.querySelector("h1")?.textContent)).not.toBe("");
  });

  it.each(talks)("'$title' is rendered with title text", (talk) => {
    expect(bodyText).toContain(talk.title);
  });

  it.each(talks)("'$title' is rendered with image", (talk) => {
    expect(imgSrcs.has(talk.image)).toBe(true);
  });

  it.each(
    talks.filter((t) => t.links.length > 0),
  )("'$title' has at least one of its declared links", (talk) => {
    const found = talk.links.some((l) => linkHrefs.has(l.url));
    expect(
      found,
      `Expected one of ${JSON.stringify(talk.links.map((l) => l.url))}`,
    ).toBe(true);
  });
});
