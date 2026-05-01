<script setup lang="ts">
import { computed } from "vue";
import { data as repos } from "../data/github.data";

const props = defineProps<{ name: string }>();

const repo = computed(() => repos.find((r) => r.full_name === props.name));
</script>

<template>
  <div v-if="repo" class="repo-card">
    <a :href="repo.html_url" target="_blank" rel="noopener">
      <img
        :src="`${repo.owner.avatar_url}&s=80`"
        :alt="`${repo.full_name} owner avatar`"
        width="48"
        height="48"
      />
    </a>
    <div class="repo-body">
      <p>
        <a :href="repo.html_url" target="_blank" rel="noopener">{{
          repo.full_name
        }}</a>
        — {{ repo.description }}
      </p>
      <p class="repo-stats">
        ✨ {{ repo.stargazers_count.toLocaleString("en-US") }} stars · 🍴
        {{ repo.forks_count.toLocaleString("en-US") }} forks
      </p>
    </div>
  </div>
</template>

<style scoped>
.repo-card {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}
.repo-card img {
  border-radius: 6px;
  display: block;
  flex-shrink: 0;
}
.repo-body {
  flex: 1;
  min-width: 0;
}
.repo-body p {
  margin: 0 0 0.4rem;
}
.repo-stats {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}
</style>
