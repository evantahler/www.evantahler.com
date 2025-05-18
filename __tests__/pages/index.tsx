import React from "react";
import { createRoot, Root } from "react-dom/client";
import { act } from "react";

import IndexPage from "../../pages/index";

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
      root.render(<IndexPage featuredPosts={[]} latestPosts={[]} />);
    });
    const header = container.querySelector("h1");
    expect(header.textContent).toBe("Hi, I'm Evan!");
  });
});
