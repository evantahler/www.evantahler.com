<script setup lang="ts">
import { computed } from "vue";
import FormattedDate from "./FormattedDate.vue";

type PostMeta = {
  title: string;
  description?: string;
  date: string;
  tags: string[];
  image: string;
  canonical?: string;
};

const props = defineProps<{
  post: { slug: string; meta: PostMeta };
}>();

const canonicalHost = computed(() => {
  const c = props.post.meta.canonical;
  if (!c) return "";
  return c.replace("https://", "").replace("http://", "").split("/")[0];
});
</script>

<template>
  <div class="card">
    <a :href="`/blog/post/${post.slug}`">
      <img class="card-img-top" :src="post.meta.image" :alt="post.meta.title" />
    </a>
    <div class="card-body">
      <h5 class="card-title">
        <a :href="`/blog/post/${post.slug}`">{{ post.meta.title }}</a>
      </h5>
      <div class="card-subtitle">
        <FormattedDate :dateString="post.meta.date" />
        <template v-if="post.meta.canonical">
          —
          <em>
            Originally posted at
            <a :href="post.meta.canonical" target="_blank">{{
              canonicalHost
            }}</a>
          </em>
        </template>
      </div>
      <p class="card-text">{{ post.meta.description }}</p>
      <div class="tags">
        <a
          v-for="tag in post.meta.tags"
          :key="tag"
          :href="`/blog/tag/${tag}`"
          class="badge"
        >
          {{ tag }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-img-top {
  max-height: 400px;
}
.card-title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}
.card-title a:hover {
  color: var(--vp-c-brand-1);
}
.card-text {
  margin: 0.75rem 0;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.5rem;
}
.tags .badge {
  text-decoration: none;
}
.tags .badge:hover {
  filter: brightness(1.1);
}
</style>
