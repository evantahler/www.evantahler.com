---
title: Tag
---

<script setup>
import { useData } from "vitepress";
import { computed } from "vue";
import { data as posts } from "../../.vitepress/data/posts.data";

const { params } = useData();
const tag = computed(() => params.value?.tag ?? "");
const filtered = computed(() =>
  posts.filter((p) => (p.meta.tags ?? []).includes(tag.value))
);

function fmt(date) {
  return new Date(date).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
</script>

# Posts tagged "{{ tag }}"

{{ filtered.length }} posts. [← All posts](/blog) · [All tags](/blog/tags)

<ul class="post-list">
  <li v-for="p in filtered" :key="p.slug">
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

<style scoped>
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
