import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { ref } from "vue";

const dataState = {
  frontmatter: ref<Record<string, unknown>>({}),
};
const routeState = { path: ref("/") };

vi.mock("vitepress", () => ({
  useData: () => ({ frontmatter: dataState.frontmatter }),
  useRoute: () => ({
    get path() {
      return routeState.path.value;
    },
  }),
}));

const BlogPostHeader = (
  await import("../../.vitepress/theme/BlogPostHeader.vue")
).default;

function setRoute(path: string) {
  routeState.path.value = path;
}

function setFrontmatter(fm: Record<string, unknown>) {
  dataState.frontmatter.value = fm;
}

describe("BlogPostHeader.vue", () => {
  it("renders nothing on non-blog routes", () => {
    setRoute("/about");
    setFrontmatter({ title: "About", date: "2024-01-01" });
    const wrapper = mount(BlogPostHeader);
    expect(wrapper.find("header.post-header").exists()).toBe(false);
  });

  it("renders title, formatted date and tags on blog post routes", () => {
    setRoute("/blog/post/foo");
    setFrontmatter({
      title: "Hello World",
      date: "2024-01-15T00:00:00.000Z",
      tags: ["js", "node"],
    });
    const wrapper = mount(BlogPostHeader);
    expect(wrapper.find("header.post-header").exists()).toBe(true);
    expect(wrapper.find("h1").text()).toBe("Hello World");

    const meta = wrapper.find(".meta").text();
    expect(meta).toMatch(/2024/);
    expect(meta).toMatch(/Jan/);

    const tagLinks = wrapper.findAll("a.tag");
    expect(tagLinks).toHaveLength(2);
    expect(tagLinks[0].attributes("href")).toBe("/blog/tag/js");
    expect(tagLinks[0].text()).toBe("js");
    expect(tagLinks[1].attributes("href")).toBe("/blog/tag/node");
  });

  it("renders 'Originally posted at' block when canonical is set", () => {
    setRoute("/blog/post/foo");
    setFrontmatter({
      title: "Hello",
      date: "2024-01-15",
      canonical: "https://example.com/x",
    });
    const wrapper = mount(BlogPostHeader);
    const meta = wrapper.find(".meta");
    expect(meta.text()).toMatch(/Originally posted at/);
    const link = meta.find('a[href="https://example.com/x"]');
    expect(link.exists()).toBe(true);
    expect(link.attributes("target")).toBe("_blank");
    expect(link.attributes("rel")).toBe("noopener");
  });

  it("omits 'Originally posted at' when canonical is absent", () => {
    setRoute("/blog/post/foo");
    setFrontmatter({ title: "Hello", date: "2024-01-15" });
    const wrapper = mount(BlogPostHeader);
    expect(wrapper.find(".meta").text()).not.toMatch(/Originally posted at/);
  });

  it("omits .tags container when tags are absent or empty", () => {
    setRoute("/blog/post/foo");
    setFrontmatter({ title: "Hello", date: "2024-01-15" });
    let wrapper = mount(BlogPostHeader);
    expect(wrapper.find(".tags").exists()).toBe(false);

    setFrontmatter({ title: "Hello", date: "2024-01-15", tags: [] });
    wrapper = mount(BlogPostHeader);
    expect(wrapper.find(".tags").exists()).toBe(false);
  });

  it("formats date in en-us long format", () => {
    setRoute("/blog/post/foo");
    setFrontmatter({ title: "Hello", date: "2024-03-04T12:00:00.000Z" });
    const wrapper = mount(BlogPostHeader);
    const text = wrapper.find(".meta em").text();
    // "Monday, Mar 4, 2024" — exact day-name depends on the date.
    expect(text).toMatch(/^[A-Z][a-z]+, [A-Z][a-z]+ \d{1,2}, \d{4}$/);
    expect(text).toMatch(/2024/);
    expect(text).toMatch(/Mar/);
  });

  it("emits empty meta when date is missing", () => {
    setRoute("/blog/post/foo");
    setFrontmatter({ title: "Hello" });
    const wrapper = mount(BlogPostHeader);
    expect(wrapper.find(".meta em").text().trim()).toBe("");
  });
});
