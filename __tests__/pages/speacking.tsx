import React from "react";
import { render } from "react-dom";
import { act } from "react-dom/test-utils";

import SpeakingPage from "../../pages/speaking";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = undefined;
});

describe("Resume Section", () => {
  it("renders the section", () => {
    act(() => {
      render(<SpeakingPage />, container);
    });
    const header = container.querySelector("h2");
    expect(header.textContent).toContain("Featured Talks");
  });
});
