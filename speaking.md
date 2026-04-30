---
title: "Evan Tahler: Speaking"
description: Talks Evan Tahler has given on Node.js, Ruby, DevOps, AI, Data Engineering and Product Management.
---

<script setup>
import { talks } from "./data/talks";
</script>

# Speaking

<hr />

<img src="/images/speaking-2.jpg" alt="speaking" style="width: 100%; max-height: 360px; object-fit: cover; border-radius: 6px" />

<p>I've given a number of technical talks, focusing on Node.js, Ruby, and DevOps.</p>

<h2>Featured Talks</h2>

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
  <SpeakingEngagementCard v-for="talk in talks" :key="talk.title" :talk="talk" />
</div>
