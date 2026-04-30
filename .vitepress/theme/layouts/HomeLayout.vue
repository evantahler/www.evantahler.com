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
    <div class="card">
      <div class="card-body" style="padding-left: 0">
        <div class="row">
          <div class="col-md-3">
            <img
              width="262"
              height="398"
              src="/images/bitmoji/5.png"
              alt="evan icon"
            />
          </div>
          <div class="col-md-9" style="padding-left: 2rem">
            <div class="row">
              <div class="col-md-12">
                <h1>Hi, I'm Evan!</h1>
                <br />
                <h4>
                  I use my <BoldWords text="Software Engineering" />,
                  <BoldWords text="Product Management" />, and
                  <BoldWords text="Leadership" /> skills to build teams that
                  create world-class digital products.
                </h4>
                <br />
                <p>
                  I am the head of engineering at
                  <a href="https://www.arcade.dev" target="_blank"
                    >Arcade.dev,</a
                  >
                  I advise <a href="/resume">startups</a>, and am the creator of
                  <a href="https://www.actionherojs.com" target="_blank"
                    >Actionherojs.</a
                  >
                </p>
              </div>
            </div>
            <div style="padding: 30px"></div>
            <ContactCards variant="info" />
          </div>
        </div>
      </div>
    </div>

    <br />

    <h2>Latest <a href="/blog">Blog</a> Posts</h2>

    <div class="row">
      <div class="col-md-6">
        <BlogPostCard v-if="latestPosts[0]" :post="latestPosts[0]" />
      </div>
      <div class="col-md-6">
        <BlogPostCard v-if="latestPosts[1]" :post="latestPosts[1]" />
      </div>
    </div>

    <br />

    <div class="row">
      <div class="col-md-6">
        <h2>Featured <a href="/blog">Blog</a> Posts</h2>
        <br />
        <BlogPostCard
          v-for="(post, idx) in featuredPosts"
          :key="`featured-post-${idx}`"
          :post="post"
        />
      </div>
      <div class="col-md-6">
        <h2>Featured <a href="/speaking">Talks</a></h2>
        <br />
        <SpeakingEngagementCard
          v-for="(talk, idx) in featuredTalks"
          :key="`talk-${idx}`"
          :talk="talk"
        />
      </div>
    </div>
  </div>
</template>
