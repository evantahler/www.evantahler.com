<script setup lang="ts">
import { computed } from "vue";

const year = computed(() => new Date().getFullYear());
</script>

<template>
  <footer class="site-footer">
    <div class="inner">
      <img src="/images/dog.png" alt="dog" class="dog" />
      <small class="muted">
        Copyright, Evan Tahler {{ year }} <br />
        <a target="_blank" href="https://twitter.com/@evantahler">Twitter</a>
        |
        <a rel="me" href="https://mastodon.social/@evantahler">Mastodon</a>
        <br />
        <em>
          <a
            href="https://github.com/evantahler/www.evantahler.com"
            target="_new"
            >source for this site</a
          >
        </em>
      </small>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--vp-c-bg-soft);
  border-top: 1px solid var(--vp-c-divider);
  padding: 2.5rem 1rem 1.5rem;
  margin-top: 3rem;
}
.inner {
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.dog {
  width: 75px;
  height: auto;
}
.muted {
  text-align: right;
  color: var(--vp-c-text-2);
}
.muted a {
  color: var(--vp-c-brand-1);
}
@media (max-width: 768px) {
  .inner {
    flex-direction: column;
    text-align: center;
  }
  .muted {
    text-align: center;
  }
}
</style>
