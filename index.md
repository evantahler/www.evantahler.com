---
layout: home
title: Evan Tahler
description: Evan Tahler — Software Engineer, Product Manager, and Leader. Head of Engineering at Arcade.dev, creator of Actionhero, Keryx, and more.

hero:
  name: "Hi, I'm Evan!"
  text: "Software Engineering, Product Management, and Leadership."
  tagline: I build teams that create world-class digital products. I'm Head of Engineering at Arcade.dev and the creator of Actionhero, Keryx, and more.
  image:
    src: /images/bitmoji/4.png
    alt: evan
  actions:
    - theme: brand
      text: Read the Blog
      link: /blog
    - theme: alt
      text: Get in touch
      link: /contact
---

<script setup>
import { computed } from "vue";
import { data as posts } from "./.vitepress/data/posts.data";

const featured = computed(() =>
  posts.filter((p) => p.meta.featured).slice(0, 4),
);

function fmt(d) {
  return new Date(d).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
</script>

<section class="home-section">
  <div class="home-section-head">
    <h2>Featured posts</h2>
    <a href="/blog" class="home-section-link">All posts →</a>
  </div>
  <div class="featured-grid">
    <a
      v-for="p in featured"
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

<section class="home-section llms-section">
  <div class="llms-card">
    <div class="llms-icon" aria-hidden="true">🤖</div>
    <div class="llms-body">
      <h2>Reading this with an LLM?</h2>
      <p>
        This site publishes
        <a href="/llms.txt"><code>/llms.txt</code></a> and
        <a href="/llms-full.txt"><code>/llms-full.txt</code></a>
        so agents and assistants can ingest the content directly. Help yourself.
      </p>
    </div>
  </div>
</section>
