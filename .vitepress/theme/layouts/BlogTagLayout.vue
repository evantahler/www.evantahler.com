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
    <div class="row">
      <div class="col">
        <h1>
          <a href="/blog" style="text-decoration: none; color: black"
            >Evan's Blog: {{ capitalize(tag) }}</a
          >
        </h1>
        <a class="btn btn-sm btn-outline-primary" href="/blog">↞ See all posts</a>
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
              <template v-for="t in [...post.meta.tags].sort()" :key="t">
                <a :href="`/blog/tag/${t}`">
                  <span class="badge bg-info">{{ t }}</span> </a
                >&nbsp;
              </template>
            </small>
            <br />
            <p v-if="post.meta.description">{{ post.meta.description }}</p>
            <em>
              <small><FormattedDate :dateString="post.meta.date" /></small>
            </em>
          </div>
        </div>
      </div>
    </div>

    <PaginationHelper
      :page="currentPage"
      :totalPages="totalPages"
      :pageUrl="(n) => (n === 1 ? `/blog/tag/${tag}` : `/blog/tag/${tag}/${n}`)"
    />
  </div>
</template>
