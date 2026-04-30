<script setup lang="ts">
import type { Talk } from "../../../data/talks";

defineProps<{ talk: Talk }>();
</script>

<template>
  <div>
    <div class="card">
      <img class="card-img-top" :src="talk.image" :alt="talk.title" />
      <div class="card-body">
        <h5 class="card-title">{{ talk.title }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ talk.date }}</h6>
        <div class="card-text">
          <em>for {{ talk.where }}</em>
          <br /><br />
          {{ talk.description }}
          <br />
          <template v-for="l in talk.links" :key="l.title">
            <br />*
            <a target="_new" :href="l.url">{{ l.title }}</a>
          </template>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>
