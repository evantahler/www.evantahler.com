import { describe, expect, it } from "vitest";
import { talks } from "../../data/talks";

describe("talks data", () => {
  it("has at least one talk", () => {
    expect(talks.length).toBeGreaterThan(0);
  });

  it.each(talks)("'$title' has all required fields", (talk) => {
    expect(talk.title.trim()).not.toBe("");
    expect(talk.date.trim()).not.toBe("");
    expect(talk.where.trim()).not.toBe("");
    expect(talk.description.trim()).not.toBe("");
    expect(talk.image).toMatch(/^(\/|https?:\/\/)/);
  });

  it.each(talks)("'$title' has valid links", (talk) => {
    expect(Array.isArray(talk.links)).toBe(true);
    for (const link of talk.links) {
      expect(link.title.trim()).not.toBe("");
      expect(link.url).toMatch(/^https?:\/\//);
    }
  });
});
