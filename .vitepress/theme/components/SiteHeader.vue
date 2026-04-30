<script setup lang="ts">
import { useRoute } from "vitepress";
import { computed, onMounted, ref } from "vue";

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
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">&nbsp;&nbsp;&nbsp;Evan Tahler</a>
      <button
        class="navbar-toggler"
        type="button"
        @click="expanded = !expanded"
        :aria-expanded="expanded"
        aria-controls="basic-navbar-nav"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        :class="{ show: expanded }"
        id="basic-navbar-nav"
      >
        <ul class="navbar-nav me-auto">
          <li class="nav-item" v-for="link in links" :key="link.href">
            <a
              class="nav-link"
              :class="{ active: isActive(link.href) }"
              :href="link.href"
            >
              &nbsp;{{ link.text }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
