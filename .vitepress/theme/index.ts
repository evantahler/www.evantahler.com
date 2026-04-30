import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ router }) {
    if (typeof window !== "undefined") {
      import("@vercel/analytics").then(({ inject }) => {
        inject();
      });
      router.onAfterRouteChanged = () => {
        // @ts-expect-error vercel analytics global
        window.va?.("event", { name: "pageview" });
      };
    }
  },
};

export default theme;
