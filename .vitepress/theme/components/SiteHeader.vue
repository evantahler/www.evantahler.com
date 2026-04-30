<script setup lang="ts">
import { useRoute } from "vitepress";
import { ref } from "vue";

const route = useRoute();

const links = [
  { href: "/resume", text: "Resume" },
  { href: "/blog", text: "Blog" },
  { href: "/open-source", text: "Open Source" },
  { href: "/speaking", text: "Speaking" },
  { href: "/contact", text: "Contact" },
];

const expanded = ref(false);

function isActive(href: string) {
  if (!route.path) return false;
  if (href === "/blog") return route.path.startsWith("/blog");
  return route.path === href || route.path === `${href}/`;
}
</script>

<template>
  <nav class="site-header">
    <div class="inner">
      <a class="brand" href="/">Evan Tahler</a>
      <button
        class="toggle"
        type="button"
        aria-label="Toggle navigation"
        :aria-expanded="expanded"
        @click="expanded = !expanded"
      >
        ☰
      </button>
      <ul class="nav" :class="{ open: expanded }">
        <li v-for="link in links" :key="link.href">
          <a :href="link.href" :class="{ active: isActive(link.href) }">
            {{ link.text }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.site-header {
  background: var(--vp-c-brand-1);
  color: #fff;
}
.inner {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
}
.brand {
  font-size: 1.15rem;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
}
.brand:hover {
  text-decoration: none;
}
.nav {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 0.25rem;
  flex: 1;
}
.nav li a {
  display: inline-block;
  padding: 0.4rem 0.75rem;
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: 0.95rem;
}
.nav li a:hover,
.nav li a.active {
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
}
.toggle {
  display: none;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #fff;
  font-size: 1rem;
  border-radius: 4px;
  padding: 0.25rem 0.55rem;
  cursor: pointer;
}
@media (max-width: 768px) {
  .inner {
    flex-wrap: wrap;
  }
  .toggle {
    display: inline-block;
    margin-left: auto;
  }
  .nav {
    display: none;
    flex-basis: 100%;
    flex-direction: column;
  }
  .nav.open {
    display: flex;
  }
}
</style>
