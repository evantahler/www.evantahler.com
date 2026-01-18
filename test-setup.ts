import { JSDOM } from "jsdom";

// Set up DOM globals for testing
const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
  url: "http://localhost:3000",
});
globalThis.document = dom.window.document;
globalThis.window = dom.window as any;
globalThis.navigator = dom.window.navigator;
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
