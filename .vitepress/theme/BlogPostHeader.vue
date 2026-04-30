<script setup lang="ts">
import { useData, useRoute } from "vitepress";
import { computed } from "vue";

const { frontmatter } = useData();
const route = useRoute();

const isPost = computed(() => route.path.startsWith("/blog/post/"));

const formattedDate = computed(() => {
  const d = frontmatter.value.date;
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
});

const canonicalHost = computed(() => {
  const c = frontmatter.value.canonical;
  if (!c) return "";
  return c.replace(/^https?:\/\//, "").split("/")[0];
});
</script>

<template>
  <header v-if="isPost" class="post-header">
    <h1>{{ frontmatter.title }}</h1>
    <p class="meta">
      <em>{{ formattedDate }}</em>
      <template v-if="frontmatter.canonical">
        <span class="sep">·</span>
        <em>
          Originally posted at
          <a :href="frontmatter.canonical" target="_blank" rel="noopener">{{
            canonicalHost
          }}</a>
        </em>
      </template>
    </p>
    <div v-if="frontmatter.tags?.length" class="tags">
      <a
        v-for="tag in frontmatter.tags"
        :key="tag"
        :href="`/blog/tag/${tag}`"
        class="tag"
        >{{ tag }}</a
      >
    </div>
  </header>
</template>

<style scoped>
.post-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}
.post-header h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  letter-spacing: -0.02em;
}
.meta {
  margin: 0 0 0.75rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}
.sep {
  margin: 0 0.4rem;
  opacity: 0.6;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.tag {
  display: inline-block;
  padding: 0.15rem 0.55rem;
  font-size: 0.8rem;
  border-radius: 999px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  text-decoration: none;
}
.tag:hover {
  background: var(--vp-c-brand-1);
  color: #fff;
}
</style>
