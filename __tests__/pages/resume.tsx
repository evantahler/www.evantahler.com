import React from "react";
import { render } from "react-dom";
import { act } from "react-dom/test-utils";

import ResumePage from "../../pages/resume";

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
      render(<ResumePage />, container);
    });
    const header = container.querySelector("p");
    expect(header.textContent).toContain("CTO");
  });
});
