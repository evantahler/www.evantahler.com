import { test, expect, describe, beforeEach, afterEach, it } from "bun:test";
import React from "react";
import { createRoot, Root } from "react-dom/client";
import { act } from "react";

import OpenSourcePage from "../../pages/open-source";

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = undefined;
  act(() => root.unmount());
});

describe("Resume Section", () => {
  it("renders the section", async () => {
    act(() => {
      root = createRoot(container);
      root.render(<OpenSourcePage />);
    });
    const header = container.querySelector("p");
    expect(header.textContent).toContain("Sponsorships");
  });
});
