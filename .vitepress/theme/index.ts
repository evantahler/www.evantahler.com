import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { h } from "vue";
import BlogPostHeader from "./BlogPostHeader.vue";
import "./style.css";

const theme: Theme = {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "doc-before": () => h(BlogPostHeader),
    });
  },
  enhanceApp({ router }) {
    if (typeof window !== "undefined") {
      import("@vercel/analytics").then(({ inject }) => {
        inject();
      });
      router.onAfterRouteChanged = (to) => {
        // @ts-expect-error vercel analytics global
        window.va?.("event", { name: "pageview" });
        // @ts-expect-error gtag global
        window.gtag?.("event", "page_view", { page_path: to });
      };
    }
  },
};

export default theme;
