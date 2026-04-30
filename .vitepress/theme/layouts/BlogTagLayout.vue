<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";
import { data as posts } from "../../data/posts.data";
import FormattedDate from "../components/FormattedDate.vue";
import PaginationHelper from "../components/PaginationHelper.vue";

const PER_PAGE = 10;

const { params } = useData();

const tag = computed(() => params.value?.tag ?? "");
const currentPage = computed(() => {
  const p = Number(params.value?.page ?? 1);
  return Number.isFinite(p) && p > 0 ? p : 1;
});

const filtered = computed(() =>
  posts.filter((p) => (p.meta.tags ?? []).includes(tag.value)),
);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filtered.value.length / PER_PAGE)),
);

const paged = computed(() => {
  const start = (currentPage.value - 1) * PER_PAGE;
  return filtered.value.slice(start, start + PER_PAGE);
});

function capitalize(s: string) {
  return s
    .split(" ")
    .map((w) => (w[0] ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}
</script>

<template>
  <div>
    <h1>
      <a class="plain" href="/blog">Evan's Blog: {{ capitalize(tag) }}</a>
    </h1>
    <p>
      <a class="btn btn-sm btn-outline-primary" href="/blog">↞ See all posts</a>
    </p>

    <hr />

    <article v-for="post in paged" :key="post.slug" class="post-row">
      <a class="thumb" :href="`/blog/post/${post.slug}`">
        <img
          :src="post.meta.image || '/images/misc/announce.png'"
          :alt="post.meta.title"
        />
      </a>
      <div class="meta">
        <h4>
          <a class="plain" :href="`/blog/post/${post.slug}`">{{
            post.meta.title
          }}</a>
        </h4>
        <div class="tags">
          <a
            v-for="t in [...post.meta.tags].sort()"
            :key="t"
            :href="`/blog/tag/${t}`"
            class="badge"
            >{{ t }}</a
          >
        </div>
        <p v-if="post.meta.description">{{ post.meta.description }}</p>
        <em class="muted"><FormattedDate :dateString="post.meta.date" /></em>
      </div>
    </article>

    <PaginationHelper
      :page="currentPage"
      :totalPages="totalPages"
      :pageUrl="(n: number) => (n === 1 ? `/blog/tag/${tag}` : `/blog/tag/${tag}/${n}`)"
    />
  </div>
</template>

<style scoped>
h1 .plain,
h4 .plain {
  color: var(--vp-c-text-1);
  text-decoration: none;
}
h1 .plain:hover,
h4 .plain:hover {
  color: var(--vp-c-brand-1);
}
.post-row {
  display: flex;
  gap: 1.25rem;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin-bottom: 1rem;
}
.thumb {
  flex: 0 0 25%;
  max-width: 25%;
}
.thumb img {
  width: 100%;
  height: auto;
  border-radius: 6px;
  display: block;
}
.meta {
  flex: 1;
  min-width: 0;
}
.meta h4 {
  margin: 0 0 0.5rem;
  font-size: 1.15rem;
  font-weight: 600;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.5rem;
}
.tags .badge {
  text-decoration: none;
}
@media (max-width: 768px) {
  .post-row {
    flex-direction: column;
  }
  .thumb {
    flex-basis: auto;
    max-width: 100%;
  }
}
</style>
