import { test, expect, describe, beforeEach, afterEach, it } from "bun:test";
import React from "react";
import { createRoot, Root } from "react-dom/client";
import { act } from "react";

import ContactPage from "../../pages/contact";

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

describe("Introduction Section", () => {
  it("renders the section", () => {
    act(() => {
      root = createRoot(container);
      root.render(<ContactPage />);
    });
    const header = container.querySelector("p");
    expect(header.textContent).toContain("Delicious Hat");
  });
});
