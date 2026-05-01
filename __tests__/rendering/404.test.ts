import { describe, expect, it } from "vitest";
import { cleanText, loadPage } from "./_helpers";

describe("404 page (/404)", () => {
  const page = loadPage("/404");

  it("emits a 'Page not found' title (server-rendered shell)", () => {
    const title = cleanText(page.querySelector("title")?.textContent);
    expect(title.toLowerCase()).toContain("not found");
  });

  it("includes the site description meta tag", () => {
    const desc = page
      .querySelector('meta[name="description"]')
      ?.getAttribute("content");
    expect((desc ?? "").length).toBeGreaterThan(0);
  });
});
