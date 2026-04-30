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
  <div>
    <div class="card">
      <a :href="`/blog/post/${post.slug}`">
        <img
          class="card-img-top"
          style="max-height: 400px; object-fit: cover"
          :src="post.meta.image"
          :alt="post.meta.title"
        />
      </a>

      <div class="card-body">
        <h5 class="card-title">
          <a :href="`/blog/post/${post.slug}`">{{ post.meta.title }}</a>
        </h5>
        <h6 class="card-subtitle mb-2 text-muted">
          <FormattedDate :dateString="post.meta.date" />
          <template v-if="post.meta.canonical">
            -
            <small>
              <em>
                Originally posted at
                <a :href="post.meta.canonical" target="_blank">{{
                  canonicalHost
                }}</a>
              </em>
            </small>
          </template>
        </h6>
        <div class="card-text">
          {{ post.meta.description }}
          <br /><br />
          <small>
            <template v-for="tag in post.meta.tags" :key="tag">
              <a :href="`/blog/tag/${tag}`">
                <span class="badge bg-info">{{ tag }}</span>
              </a>
              {{ " " }}
            </template>
          </small>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>
