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

<div v-for="talk in talks" :key="talk.title" style="margin-bottom: 2rem;">
  <h3>{{ talk.title }}</h3>
  <p><em>{{ talk.where }} — {{ talk.date }}</em></p>
  <p>{{ talk.description }}</p>
  <ul>
    <li v-for="l in talk.links" :key="l.title">
      <a :href="l.url" target="_blank">{{ l.title }}</a>
    </li>
  </ul>
</div>
