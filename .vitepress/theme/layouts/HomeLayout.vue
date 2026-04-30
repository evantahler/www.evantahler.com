<script setup lang="ts">
import { computed } from "vue";
import { talks } from "../../../data/talks";
import { data as allPosts } from "../../data/posts.data";
import BlogPostCard from "../components/BlogPostCard.vue";
import BoldWords from "../components/BoldWords.vue";
import ContactCards from "../components/ContactCards.vue";
import SpeakingEngagementCard from "../components/SpeakingEngagementCard.vue";

const featuredPosts = computed(() => allPosts.filter((p) => p.meta.featured));
const latestPosts = computed(() => allPosts.slice(0, 2));
const featuredTalks = talks.slice(0, 3);
</script>

<template>
  <div>
    <section class="hero">
      <img
        class="bitmoji"
        src="/images/bitmoji/5.png"
        alt="evan icon"
        width="262"
        height="398"
      />
      <div class="hero-body">
        <h1>Hi, I'm Evan!</h1>
        <h4>
          I use my <BoldWords text="Software Engineering" />,
          <BoldWords text="Product Management" />, and
          <BoldWords text="Leadership" /> skills to build teams that create
          world-class digital products.
        </h4>
        <p>
          I am the head of engineering at
          <a href="https://www.arcade.dev" target="_blank">Arcade.dev,</a>
          I advise <a href="/resume">startups</a>, and am the creator of
          <a href="https://www.actionherojs.com" target="_blank"
            >Actionherojs.</a
          >
        </p>
        <ContactCards variant="info" />
      </div>
    </section>

    <h2>Latest <a href="/blog">Blog</a> Posts</h2>
    <div class="row">
      <div class="col-6">
        <BlogPostCard v-if="latestPosts[0]" :post="latestPosts[0]" />
      </div>
      <div class="col-6">
        <BlogPostCard v-if="latestPosts[1]" :post="latestPosts[1]" />
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <h2>Featured <a href="/blog">Blog</a> Posts</h2>
        <BlogPostCard
          v-for="(post, idx) in featuredPosts"
          :key="`featured-post-${idx}`"
          :post="post"
        />
      </div>
      <div class="col-6">
        <h2>Featured <a href="/speaking">Talks</a></h2>
        <SpeakingEngagementCard
          v-for="(talk, idx) in featuredTalks"
          :key="`talk-${idx}`"
          :talk="talk"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin-bottom: 2rem;
}
.bitmoji {
  flex: 0 0 auto;
  width: 220px;
  height: auto;
  border-radius: 6px;
}
.hero-body {
  flex: 1;
}
.hero-body h1 {
  margin: 0 0 0.75rem;
  font-size: 2.4rem;
  font-weight: 700;
}
.hero-body h4 {
  margin: 0 0 1rem;
  font-weight: 500;
  line-height: 1.45;
}
.hero-body p {
  margin: 0 0 1.25rem;
}
@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
