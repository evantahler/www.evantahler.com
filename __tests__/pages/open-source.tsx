import React from "react";
import { render } from "react-dom";
import { act } from "react-dom/test-utils";

import OpenSourcePage from "../../pages/open-source";

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
  it("renders the section", async () => {
    act(() => {
      render(<OpenSourcePage />, container);
    });
    const header = container.querySelector("p");
    expect(header.textContent).toContain("Sponsorships");
  });
});
