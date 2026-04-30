import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import BlogPostCard from "./components/BlogPostCard.vue";
import BoldWords from "./components/BoldWords.vue";
import ContactCards from "./components/ContactCards.vue";
import FormattedDate from "./components/FormattedDate.vue";
import SpeakingEngagementCard from "./components/SpeakingEngagementCard.vue";
import Layout from "./Layout.vue";
import "./style.scss";

const theme: Theme = {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router }) {
    app.component("ContactCards", ContactCards);
    app.component("BoldWords", BoldWords);
    app.component("BlogPostCard", BlogPostCard);
    app.component("SpeakingEngagementCard", SpeakingEngagementCard);
    app.component("FormattedDate", FormattedDate);

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
