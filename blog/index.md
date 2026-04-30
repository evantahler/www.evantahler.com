---
title: "Evan's Blog"
description: Evan Tahler's blog on software engineering, AI, data engineering, and leadership.
---

<script setup>
import { computed } from "vue";
import { data as posts } from "../.vitepress/data/posts.data";

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

{{ posts.length }} posts. [Browse by tag](/blog/tags).

<div v-for="[year, items] in grouped" :key="year">
  <h2 :id="year">{{ year }}</h2>
  <ul>
    <li v-for="p in items" :key="p.slug">
      <a :href="`/blog/post/${p.slug}`">{{ p.meta.title }}</a>
      <span style="color: var(--vp-c-text-2);"> — {{ fmt(p.meta.date) }}</span>
    </li>
  </ul>
</div>
