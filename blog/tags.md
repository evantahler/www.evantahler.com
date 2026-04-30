---
title: "Evan's Blog: Tags"
description: All tags used on Evan Tahler's blog.
---

<script setup>
import { data as tags } from "../.vitepress/data/tags.data";
</script>

# Tags

<hr />

<table class="table table-striped">
  <thead>
    <tr><th>Tag</th><th style="text-align: right">Posts</th></tr>
  </thead>
  <tbody>
    <tr v-for="t in tags" :key="t.tag">
      <td><a :href="`/blog/tag/${t.tag}`">{{ t.tag }}</a></td>
      <td style="text-align: right">{{ t.count }}</td>
    </tr>
  </tbody>
</table>
