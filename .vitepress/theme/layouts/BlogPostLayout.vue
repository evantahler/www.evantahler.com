<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";
import BlogSidebar from "../components/BlogSidebar.vue";
import FormattedDate from "../components/FormattedDate.vue";

const { frontmatter } = useData();

const title = computed(() => frontmatter.value.title);
const date = computed(() => frontmatter.value.date);
const tags = computed<string[]>(() => frontmatter.value.tags ?? []);
const canonical = computed<string | undefined>(
  () => frontmatter.value.canonical,
);
</script>

<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h1>{{ title }}</h1>
        <p>
          <small>
            <template v-for="tag in [...tags].sort()" :key="tag">
              <a :href="`/blog/tag/${tag}`">
                <span class="badge bg-info">{{ tag }}</span>
              </a>
              &nbsp;
            </template>
          </small>
          <br />
          <em>
            <small>
              <FormattedDate :dateString="date" />
              <template v-if="canonical">
                -
                <span class="text-info">
                  Originally posted at
                  <a :href="canonical" target="_blank">{{ canonical }}</a>
                </span>
              </template>
              <br />
              <a class="btn btn-sm btn-outline-primary" href="/blog"
                >↞ See all posts</a
              >
            </small>
          </em>
        </p>
        <hr />
      </div>
    </div>

    <div class="row">
      <div class="col-md-9">
        <article class="vp-doc" id="markdown">
          <Content />
        </article>
      </div>
      <div class="col-md-3">
        <BlogSidebar />
      </div>
    </div>

    <br />

    <div class="row">
      <div class="col">
        <a href="/blog" class="btn btn-outline-primary">↞ See all posts</a>
      </div>
    </div>
  </div>
</template>
