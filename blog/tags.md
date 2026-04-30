---
title: "Evan's Blog: Tags"
description: All tags used on Evan Tahler's blog.
---

<script setup>
import { data as tags } from "../.vitepress/data/tags.data";
</script>

# Tags

<hr />

<table style="width: 100%; border-collapse: collapse;">
  <thead>
    <tr>
      <th style="text-align: left; padding: 0.5rem; border-bottom: 1px solid var(--vp-c-divider);">Tag</th>
      <th style="text-align: right; padding: 0.5rem; border-bottom: 1px solid var(--vp-c-divider);">Posts</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="t in tags" :key="t.tag">
      <td style="padding: 0.5rem; border-bottom: 1px solid var(--vp-c-divider);"><a :href="`/blog/tag/${t.tag}`">{{ t.tag }}</a></td>
      <td style="text-align: right; padding: 0.5rem; border-bottom: 1px solid var(--vp-c-divider);">{{ t.count }}</td>
    </tr>
  </tbody>
</table>
