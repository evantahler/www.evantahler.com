---
title: "Evan's Blog"
description: Evan Tahler's blog on software engineering, AI, data engineering, and leadership.
---

<script setup>
import { computed } from "vue";
import { data as posts } from "../.vitepress/data/posts.data";

const latest = computed(() => posts.slice(0, 2));

const grouped = computed(() => {
  const map = new Map();
  for (const p of posts) {
    const year = p.meta.date.slice(0, 4);
    if (!map.has(year)) map.set(year, []);
    map.get(year).push(p);
  }
  return [...map.entries()].sort(([a], [b]) => b.localeCompare(a));
});

function fmt(date) {
  return new Date(date).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
</script>

# Blog

![blog](/images/blog.png)

{{ posts.length }} posts. [Browse by tag](/blog/tags).

<section class="latest-section">
  <h2 class="latest-heading">Latest posts</h2>
  <div class="featured-grid">
    <a
      v-for="p in latest"
      :key="p.slug"
      :href="p.url"
      class="featured-card"
    >
      <div v-if="p.meta.image" class="featured-image">
        <img :src="p.meta.image" :alt="p.meta.title" loading="lazy" />
      </div>
      <div class="featured-body">
        <span class="featured-date">{{ fmt(p.meta.date) }}</span>
        <h3 class="featured-title">{{ p.meta.title }}</h3>
        <p v-if="p.meta.description" class="featured-desc">
          {{ p.meta.description }}
        </p>
      </div>
    </a>
  </div>
</section>

<h2 class="archive-heading">Archive</h2>

<div v-for="[year, items] in grouped" :key="year">
  <h2 :id="year">{{ year }}</h2>
  <ul class="post-list">
    <li v-for="p in items" :key="p.slug">
      <a :href="`/blog/post/${p.slug}`" class="post-link">
        <img
          v-if="p.meta.image"
          :src="p.meta.image"
          :alt="p.meta.title"
          class="post-thumb"
          loading="lazy"
        />
        <span v-else class="post-thumb post-thumb-placeholder" aria-hidden="true"></span>
        <span class="post-text">
          <span class="post-title">{{ p.meta.title }}</span>
          <span class="post-date">{{ fmt(p.meta.date) }}</span>
        </span>
      </a>
    </li>
  </ul>
</div>

<style scoped>
.latest-section {
  margin: 1.5rem 0 2rem;
}
.post-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.post-list li + li {
  margin-top: 0.25rem;
}
.post-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.4rem 0.5rem;
  border-radius: 6px;
  text-decoration: none;
  color: inherit;
}
.post-link:hover {
  background: var(--vp-c-bg-soft);
  text-decoration: none;
}
.post-thumb {
  flex: 0 0 auto;
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
}
.post-thumb-placeholder {
  border: 1px dashed var(--vp-c-divider);
}
.post-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.post-title {
  color: var(--vp-c-brand-1);
  font-weight: 500;
  line-height: 1.3;
}
.post-date {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}
</style>
