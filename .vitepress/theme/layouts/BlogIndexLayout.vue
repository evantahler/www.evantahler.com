<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";
import { data as posts } from "../../data/posts.data";
import { data as tagCounts } from "../../data/tags.data";
import FormattedDate from "../components/FormattedDate.vue";
import PaginationHelper from "../components/PaginationHelper.vue";

const PER_PAGE = 10;

const { params } = useData();

const currentPage = computed(() => {
  const p = Number(params.value?.page ?? 1);
  return Number.isFinite(p) && p > 0 ? p : 1;
});

const totalPages = computed(() =>
  Math.max(1, Math.ceil(posts.length / PER_PAGE)),
);

const paged = computed(() => {
  const start = (currentPage.value - 1) * PER_PAGE;
  return posts.slice(start, start + PER_PAGE);
});
</script>

<template>
  <div>
    <h1>
      <a href="/blog" class="plain">Evan's Blog</a>
    </h1>

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
            v-for="tag in [...post.meta.tags].sort()"
            :key="tag"
            :href="`/blog/tag/${tag}`"
            class="badge"
            >{{ tag }}</a
          >
        </div>
        <p v-if="post.meta.description">{{ post.meta.description }}</p>
        <em class="muted">
          <FormattedDate :dateString="post.meta.date" />
          <template v-if="post.meta.canonical">
            —
            <span>
              Originally posted at
              <a :href="post.meta.canonical" target="_blank">{{
                post.meta.canonical
                  .replace("https://", "")
                  .replace("http://", "")
                  .split("/")[0]
              }}</a>
            </span>
          </template>
        </em>
      </div>
    </article>

    <h2>Tags</h2>
    <p class="tag-cloud">
      <a
        v-for="t in tagCounts"
        :key="t.tag"
        :href="`/blog/tag/${t.tag}`"
        :style="{ fontSize: `${Math.min(28, 10 + t.count)}px` }"
        >{{ t.tag }}</a
      >
    </p>

    <hr />

    <PaginationHelper
      :page="currentPage"
      :totalPages="totalPages"
      :pageUrl="(n: number) => (n === 1 ? '/blog' : `/blog/page/${n}`)"
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
.tag-cloud a {
  display: inline-block;
  padding: 0.15rem 0.4rem;
  margin: 0.15rem 0.25rem;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}
.tag-cloud a:hover {
  text-decoration: underline;
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
