<script setup lang="ts">
import { useData, useRoute } from "vitepress";
import { computed } from "vue";
import { data as allPosts } from "../data/posts.data";

const { frontmatter } = useData();
const route = useRoute();

const isPost = computed(() => route.path.startsWith("/blog/post/"));

const currentTags = computed<string[]>(() => frontmatter.value.tags ?? []);

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const related = computed(() => {
  if (!isPost.value) return [];
  const tags = new Set(currentTags.value);
  const currentPath = route.path.replace(/\/$/, "");
  return allPosts
    .filter((p) => {
      const url = p.url.replace(/\/$/, "").replace(/\.html$/, "");
      return url !== currentPath;
    })
    .map((p) => {
      const overlap = (p.meta.tags ?? []).filter((t) => tags.has(t)).length;
      return { post: p, overlap };
    })
    .filter((x) => x.overlap > 0)
    .sort((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap;
      return (
        new Date(b.post.meta.date).valueOf() -
        new Date(a.post.meta.date).valueOf()
      );
    })
    .slice(0, 3)
    .map((x) => x.post);
});
</script>

<template>
  <footer v-if="isPost" class="post-footer">
    <section class="byline">
      <img
        src="/images/bitmoji/4.png"
        alt="Evan Tahler"
        class="byline-avatar"
      />
      <div class="byline-body">
        <p class="byline-name">Written by <strong>Evan Tahler</strong></p>
        <p class="byline-bio">
          Head of Engineering at
          <a href="https://www.arcade.dev">Arcade.dev</a>, creator of
          <a href="https://www.actionherojs.com">Actionhero</a> and
          <a href="https://www.keryxjs.com">Keryx</a>.
          <a href="/about">More about me →</a>
        </p>
      </div>
    </section>

    <section v-if="related.length > 0" class="related">
      <h2>Keep reading</h2>
      <ul class="related-list">
        <li v-for="p in related" :key="p.slug">
          <a :href="p.url" class="related-link">
            <img
              v-if="p.meta.image"
              :src="p.meta.image"
              :alt="p.meta.title"
              class="related-thumb"
              loading="lazy"
            />
            <span v-else class="related-thumb related-thumb-placeholder" aria-hidden="true"></span>
            <span class="related-text">
              <span class="related-date">{{ fmt(p.meta.date) }}</span>
              <span class="related-title">{{ p.meta.title }}</span>
            </span>
          </a>
        </li>
      </ul>
    </section>

    <section class="subscribe">
      <div class="subscribe-card">
        <div class="subscribe-icon" aria-hidden="true">📡</div>
        <div class="subscribe-body">
          <h2>Liked this?</h2>
          <p>
            Subscribe via
            <a href="/feed.xml"><code>/feed.xml</code></a> in your reader of
            choice. If you happen to be an LLM, grab the whole site at
            <a href="/llms-full.txt"><code>/llms-full.txt</code></a>. New post
            announcements show up on
            <a href="https://twitter.com/evantahler">Twitter</a> and
            <a href="https://mastodon.social/@evantahler" rel="me">Mastodon</a>.
          </p>
        </div>
      </div>
    </section>
  </footer>
</template>

<style scoped>
.post-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.byline {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.byline-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
  flex: 0 0 auto;
}
.byline-body {
  min-width: 0;
}
.byline-name {
  margin: 0 0 0.2rem;
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
}
.byline-bio {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}
.byline-bio a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}
.byline-bio a:hover {
  text-decoration: underline;
}

.related h2,
.subscribe-body h2 {
  margin: 0 0 0.75rem;
  padding-top: 0;
  border-top: none;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.related h2 {
  color: var(--vp-c-text-1);
}
.subscribe-body h2 {
  color: var(--vp-c-brand-1);
}

.related-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.related-list li + li {
  margin-top: 0.25rem;
}
.related-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 8px;
  color: inherit;
  text-decoration: none;
  transition: background 0.2s;
}
.related-link:hover {
  background: var(--vp-c-bg-soft);
  text-decoration: none;
}
.related-thumb {
  flex: 0 0 auto;
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
}
.related-thumb-placeholder {
  border: 1px dashed var(--vp-c-divider);
}
.related-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 0.15rem;
}
.related-date {
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-3);
}
.related-title {
  font-weight: 600;
  line-height: 1.3;
  color: var(--vp-c-text-1);
}
.related-link:hover .related-title {
  color: var(--vp-c-brand-1);
}

.subscribe-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 12px;
  background: rgba(234, 88, 12, 0.06);
  border: 1px solid rgba(234, 88, 12, 0.35);
}
:global(.dark) .subscribe-card {
  background: rgba(251, 146, 60, 0.06);
  border-color: rgba(251, 146, 60, 0.35);
}
.subscribe-icon {
  font-size: 1.75rem;
  line-height: 1;
}
.subscribe-body p {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}
.subscribe-body a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}
.subscribe-body a:hover {
  text-decoration: underline;
}
.subscribe-body code {
  font-size: 0.95em;
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--vp-c-default-soft);
}
</style>
