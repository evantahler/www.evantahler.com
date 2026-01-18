import { test, expect, describe, beforeEach, afterEach, it } from "bun:test";
import React from "react";
import { createRoot, Root } from "react-dom/client";
import { act } from "react";

import SpeakingPage from "../../pages/speaking";

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
  it("renders the section", () => {
    act(() => {
      root = createRoot(container);
      root.render(<SpeakingPage />);
    });
    const header = container.querySelector("h2");
    expect(header.textContent).toContain("Featured Talks");
  });
});
