<script setup lang="ts">
import { useData } from "vitepress";
import CopyOrDownloadAsMarkdownButtons from "vitepress-plugin-llms/vitepress-components/CopyOrDownloadAsMarkdownButtons.vue";
import { computed } from "vue";
import BlogSidebar from "../components/BlogSidebar.vue";
import FormattedDate from "../components/FormattedDate.vue";

const { frontmatter } = useData();

const title = computed(() => frontmatter.value.title);
const date = computed(() => frontmatter.value.date);
const tags = computed<string[]>(() => frontmatter.value.tags ?? []);
const canonical = computed<string | undefined>(
  () => frontmatter.value.canonical,
);
</script>

<template>
  <div>
    <header class="post-header">
      <h1>{{ title }}</h1>
      <div class="tags">
        <a
          v-for="tag in [...tags].sort()"
          :key="tag"
          :href="`/blog/tag/${tag}`"
          class="badge"
          >{{ tag }}</a
        >
      </div>
      <p class="muted small">
        <em>
          <FormattedDate :dateString="date" />
          <template v-if="canonical">
            —
            <span>
              Originally posted at
              <a :href="canonical" target="_blank">{{ canonical }}</a>
            </span>
          </template>
        </em>
        <br />
        <a class="btn btn-sm btn-outline-primary" href="/blog"
          >↞ See all posts</a
        >
      </p>
      <hr />
    </header>

    <div class="post-body">
      <main>
        <ClientOnly>
          <CopyOrDownloadAsMarkdownButtons />
        </ClientOnly>
        <article class="vp-doc" id="markdown">
          <Content />
        </article>
      </main>
      <BlogSidebar />
    </div>

    <p>
      <a href="/blog" class="btn btn-outline-primary">↞ See all posts</a>
    </p>
  </div>
</template>

<style scoped>
.post-header h1 {
  margin: 0 0 0.5rem;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.5rem;
}
.tags .badge {
  text-decoration: none;
}
.small {
  font-size: 0.9rem;
}
.post-body {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 2rem;
  margin-top: 1.5rem;
}
.post-body main {
  min-width: 0;
}
@media (max-width: 768px) {
  .post-body {
    grid-template-columns: 1fr;
  }
}
</style>
