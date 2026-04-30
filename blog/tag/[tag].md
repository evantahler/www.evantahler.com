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
</script>

# Posts tagged "{{ tag }}"

{{ filtered.length }} posts. [← All posts](/blog) · [All tags](/blog/tags)

<ul>
  <li v-for="p in filtered" :key="p.slug">
    <a :href="`/blog/post/${p.slug}`">{{ p.meta.title }}</a>
    <span style="color: var(--vp-c-text-2);"> — {{ p.meta.date }}</span>
  </li>
</ul>
