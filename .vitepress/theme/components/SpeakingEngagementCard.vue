<script setup lang="ts">
import type { Talk } from "../../../data/talks";

defineProps<{ talk: Talk }>();
</script>

<template>
  <div class="card">
    <img class="card-img-top" :src="talk.image" :alt="talk.title" />
    <div class="card-body">
      <h5 class="card-title">{{ talk.title }}</h5>
      <div class="card-subtitle">{{ talk.date }}</div>
      <div class="card-text">
        <em>for {{ talk.where }}</em>
        <p>{{ talk.description }}</p>
        <ul v-if="talk.links.length" class="links">
          <li v-for="l in talk.links" :key="l.title">
            <a target="_new" :href="l.url">{{ l.title }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.links {
  margin: 0.5rem 0 0;
  padding-left: 1.25rem;
}
</style>
