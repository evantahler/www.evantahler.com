---
title: "Evan Tahler: Speaking"
description: Talks Evan Tahler has given on Node.js, Ruby, DevOps, AI, Data Engineering and Product Management.
---

<script setup>
import { talks } from "./data/talks";
</script>

# Speaking

![speaking](/images/speaking-2.jpg)

I've given a number of technical talks, focusing on Node.js, Ruby, AI, and DevOps.

## Featured Talks

<div v-for="talk in talks" :key="talk.title" class="talk">
  <img v-if="talk.image" :src="talk.image" :alt="talk.title" class="talk-image" />
  <div class="talk-body">
    <h3>{{ talk.title }}</h3>
    <p><em>{{ talk.where }} — {{ talk.date }}</em></p>
    <p>{{ talk.description }}</p>
    <ul v-if="talk.links?.length">
      <li v-for="l in talk.links" :key="l.title">
        <a :href="l.url" target="_blank">{{ l.title }}</a>
      </li>
    </ul>
  </div>
</div>

<style scoped>
.talk {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 1.5rem;
  align-items: start;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--vp-c-divider);
}
.talk-image {
  width: 100%;
  height: auto;
  border-radius: 6px;
}
.talk-body h3 {
  margin: 0 0 0.5rem;
}
@media (max-width: 640px) {
  .talk {
    grid-template-columns: 1fr;
  }
}
</style>
