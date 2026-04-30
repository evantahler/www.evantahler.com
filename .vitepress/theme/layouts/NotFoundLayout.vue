<script setup lang="ts">
import fuzzysort from "fuzzysort";
import { useRoute } from "vitepress";
import { computed, onMounted, ref, watch } from "vue";
import { data as posts } from "../../data/posts.data";

type Page = { href: string; title: string; tags: string };

const route = useRoute();

const allPages = computed<Page[]>(() => {
  const base: Page[] = [
    { href: "/", title: "home", tags: "" },
    { href: "/resume", title: "resume", tags: "" },
    { href: "/speaking", title: "speaking", tags: "" },
    { href: "/blog", title: "blog", tags: "" },
    { href: "/contact", title: "contact", tags: "" },
    { href: "/open-source", title: "open source", tags: "" },
  ];
  for (const post of posts) {
    base.push({
      href: `/blog/post/${post.slug}`,
      title: post.meta.title,
      tags: post.meta.tags.join("-"),
    });
  }
  return base;
});

const searchTerm = ref("");
const matches = ref<{ page: Page; score: number }[]>([]);

function search() {
  if (!searchTerm.value) return;
  const results = fuzzysort.go(searchTerm.value, allPages.value, {
    keys: ["title", "href", "tags"],
    limit: 10,
  });
  matches.value = results.map((r) => ({ page: r.obj, score: r.score }));
}

onMounted(() => {
  const path = route.path || "/";
  searchTerm.value = path
    .replace(/\//g, " ")
    .replace(/_/g, " ")
    .replace(/-\w+$/, " ")
    .split("-")
    .slice(0, 3)
    .join("-")
    .split("?")[0]
    .trim();
  search();
});

watch(searchTerm, search);
</script>

<template>
  <div>
    <h1>This page cannot be found</h1>
    <p>
      Here are the most relevant pages for <code>{{ searchTerm }}</code
      >:
    </p>
    <template v-if="matches.length > 0">
      <div v-for="m in matches" :key="m.page.href">
        <div class="card mb-3">
          <div class="card-header">
            <h4>{{ m.page.title }}</h4>
          </div>
          <div class="card-body">
            <p>
              <a :href="m.page.href">{{ m.page.href }}</a>
              <br />
              <small>Match Score: {{ m.score }}</small>
            </p>
          </div>
        </div>
      </div>
    </template>
    <p v-else>No Results</p>
  </div>
</template>
