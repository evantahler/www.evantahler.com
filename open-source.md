---
title: "Evan Tahler: Open Source Software"
description: Evan Tahler's contributions to open source software including Actionhero, Grouparoo, Airbyte, and node-resque.
---

<script setup>
import { data as repos } from "./.vitepress/data/github.data";
</script>

# Open Source

I contribute to a number of open source projects because I believe it is a great way to give back to the programming community in both a professional and personal capacity — and a great way to learn about new technologies and tools.

You can [sponsor my open source work via GitHub Sponsorships](https://github.com/users/evantahler/sponsorship).

## Featured Projects

<div v-for="r in repos" :key="r.html_url" style="display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid var(--vp-c-divider);">
  <a :href="r.html_url" target="_blank" style="flex-shrink: 0;">
    <img :src="`${r.owner.avatar_url}&s=80`" :alt="`${r.full_name} owner avatar`" width="48" height="48" style="border-radius: 6px; display: block;" />
  </a>
  <div style="flex: 1; min-width: 0;">
    <h3 style="margin-top: 0;">
      <a :href="r.html_url" target="_blank">{{ r.full_name }}</a>
    </h3>
    <p>{{ r.description }}</p>
    <p style="color: var(--vp-c-text-2); font-size: 0.9rem;">
      ✨ {{ r.stargazers_count.toLocaleString("en-US") }} stars · 🍴 {{ r.forks_count.toLocaleString("en-US") }} forks
    </p>
  </div>
</div>
