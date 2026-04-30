---
title: "Evan's Blog: Tags"
description: All tags used on Evan Tahler's blog.
---

<script setup>
import { data as tags } from "../.vitepress/data/tags.data";
</script>

# Tags

[← All posts](/blog)

<ul>
  <li v-for="t in tags" :key="t.tag">
    <a :href="`/blog/tag/${t.tag}`">{{ t.tag }}</a>
    <span style="color: var(--vp-c-text-2);"> — {{ t.count }}</span>
  </li>
</ul>
