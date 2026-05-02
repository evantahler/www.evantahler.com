<script setup lang="ts">
import { computed } from "vue";
import { data as allPosts } from "../data/posts.data";

const recent = computed(() => allPosts.slice(0, 4));

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const year = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer-inner">
      <div class="site-footer-grid">
        <section class="site-footer-col">
          <h3>Recent posts</h3>
          <ul>
            <li v-for="p in recent" :key="p.slug">
              <a :href="p.url">{{ p.meta.title }}</a>
              <span class="site-footer-date">{{ fmt(p.meta.date) }}</span>
            </li>
          </ul>
          <p class="site-footer-allposts">
            <a href="/blog">All posts →</a>
          </p>
        </section>

        <section class="site-footer-col">
          <h3>Subscribe</h3>
          <p>
            New posts go out via
            <a href="/feed.xml"><code>/feed.xml</code></a>
            (RSS, drop into Feedly, NetNewsWire, etc.).
          </p>
          <p>
            Reading with an LLM? Help yourself to
            <a href="/llms.txt"><code>/llms.txt</code></a> and
            <a href="/llms-full.txt"><code>/llms-full.txt</code></a>.
          </p>
        </section>

        <section class="site-footer-col">
          <h3>Elsewhere</h3>
          <ul class="site-footer-socials">
            <li>
              <a href="https://twitter.com/evantahler" rel="noopener" target="_blank">
                Twitter / X (@evantahler)
              </a>
            </li>
            <li>
              <a href="https://github.com/evantahler" rel="noopener" target="_blank">
                GitHub (@evantahler)
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/evantahler" rel="noopener" target="_blank">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://mastodon.social/@evantahler" rel="me noopener" target="_blank">
                Mastodon
              </a>
            </li>
          </ul>
        </section>
      </div>

      <div class="site-footer-bottom">
        <img src="/images/dog.png" alt="" class="footer-dog" aria-hidden="true" />
        <p class="site-footer-meta">
          <a href="https://github.com/evantahler/www.evantahler.com" target="_blank" rel="noopener">source for this site</a>
          · Copyright © {{ year }} Evan Tahler
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  z-index: var(--vp-z-index-footer, 30);
  border-top: 1px solid var(--vp-c-gutter);
  background: var(--vp-c-bg);
  padding: 2.5rem 1.5rem 2rem;
}

.site-footer-inner {
  max-width: var(--vp-layout-max-width, 1440px);
  margin: 0 auto;
}

.site-footer-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2.5rem;
  margin-bottom: 2.5rem;
}

@media (max-width: 720px) {
  .site-footer-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.75rem;
  }
}

.site-footer-col h3 {
  margin: 0 0 0.85rem;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--vp-c-text-3);
}

.site-footer-col p {
  margin: 0 0 0.6rem;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.site-footer-col ul {
  list-style: none;
  padding: 0;
  margin: 0 0 0.5rem;
}

.site-footer-col li {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  line-height: 1.4;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.site-footer-col a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.2s;
}

.site-footer-col a:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}

.site-footer-col code {
  font-size: 0.95em;
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--vp-c-default-soft);
}

.site-footer-date {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.site-footer-allposts {
  margin-top: 0.25rem;
  font-size: 0.85rem;
}

.site-footer-allposts a {
  color: var(--vp-c-brand-1);
}

.site-footer-socials li {
  flex-direction: row;
}

.site-footer-bottom {
  text-align: center;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
}

.footer-dog {
  display: inline-block;
  width: 75px;
  height: auto;
  margin-bottom: 0.5rem;
}

.site-footer-meta {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}

.site-footer-meta a {
  color: var(--vp-c-text-2);
  text-decoration: none;
}

.site-footer-meta a:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}
</style>
