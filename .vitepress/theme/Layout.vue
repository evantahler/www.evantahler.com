<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";
import SiteFooter from "./components/SiteFooter.vue";
import SiteHeader from "./components/SiteHeader.vue";
import BlogIndexLayout from "./layouts/BlogIndexLayout.vue";
import BlogPostLayout from "./layouts/BlogPostLayout.vue";
import BlogTagLayout from "./layouts/BlogTagLayout.vue";
import HomeLayout from "./layouts/HomeLayout.vue";
import NotFoundLayout from "./layouts/NotFoundLayout.vue";
import OpenSourceLayout from "./layouts/OpenSourceLayout.vue";

const { frontmatter, page } = useData();

const layoutName = computed(() => frontmatter.value.layout || "default");

const is404 = computed(() => page.value.isNotFound);
</script>

<template>
  <SiteHeader />

  <main class="site-main">
    <div class="container">
      <NotFoundLayout v-if="is404" />
      <HomeLayout v-else-if="layoutName === 'home'" />
      <BlogIndexLayout v-else-if="layoutName === 'blog-index'" />
      <BlogTagLayout v-else-if="layoutName === 'blog-tag'" />
      <BlogPostLayout v-else-if="layoutName === 'blog-post'" />
      <OpenSourceLayout v-else-if="layoutName === 'open-source'" />
      <NotFoundLayout v-else-if="layoutName === 'not-found'" />
      <article v-else class="vp-doc">
        <Content />
      </article>
    </div>
  </main>

  <SiteFooter />
</template>
