<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";
import { data as posts } from "../../data/posts.data";
import { data as tagCounts } from "../../data/tags.data";
import BlogPostCard from "../components/BlogPostCard.vue";
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
    <div class="row">
      <div class="col">
        <h1>
          <a href="/blog" style="text-decoration: none; color: black"
            >Evan's Blog</a
          >
        </h1>
      </div>
    </div>

    <hr />

    <div v-for="post in paged" :key="post.slug" class="card mb-3">
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <a :href="`/blog/post/${post.slug}`">
              <img
                style="max-width: 100%"
                class="rounded"
                :src="post.meta.image || '/images/misc/announce.png'"
                :alt="post.meta.title"
              />
            </a>
          </div>
          <div class="col">
            <h4>
              <a :href="`/blog/post/${post.slug}`" style="color: black">{{
                post.meta.title
              }}</a>
            </h4>
            <small>
              <template v-for="tag in [...post.meta.tags].sort()" :key="tag">
                <a :href="`/blog/tag/${tag}`">
                  <span class="badge bg-info">{{ tag }}</span> </a
                >&nbsp;
              </template>
            </small>
            <br />
            <p v-if="post.meta.description">{{ post.meta.description }}</p>
            <em>
              <small>
                <FormattedDate :dateString="post.meta.date" />
                <template v-if="post.meta.canonical">
                  -
                  <span class="text-info">
                    Originally posted at
                    <a :href="post.meta.canonical" target="_blank">{{
                      post.meta.canonical
                        .replace("https://", "")
                        .replace("http://", "")
                        .split("/")[0]
                    }}</a>
                  </span>
                </template>
              </small>
            </em>
          </div>
        </div>
      </div>
    </div>

    <h2>Tags</h2>

    <p>
      <a
        v-for="t in tagCounts"
        :key="t.tag"
        :href="`/blog/tag/${t.tag}`"
        :style="{
          fontSize: `${Math.min(35, 8 + Math.round(t.count * 1.5))}px`,
          marginRight: '8px',
          color: 'var(--bs-primary)',
          textDecoration: 'none',
        }"
        >{{ t.tag }}</a
      >
    </p>

    <hr />
    <br />

    <PaginationHelper
      :page="currentPage"
      :totalPages="totalPages"
      :pageUrl="(n) => (n === 1 ? '/blog' : `/blog/page/${n}`)"
    />
  </div>
</template>
