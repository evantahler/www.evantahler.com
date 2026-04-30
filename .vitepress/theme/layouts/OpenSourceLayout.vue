<script setup lang="ts">
import { data as repos } from "../../data/github.data";
</script>

<template>
  <div>
    <h1>Open Source</h1>
    <hr />

    <img
      class="hero-image"
      src="/images/open-source-2.jpg"
      alt="open source"
    />

    <aside class="sponsor-callout">
      <p>
        <strong>You can now sponsor my work via Github Sponsorships!</strong>
      </p>
      <p>
        Working on these project is far more than just
        <a href="https://github.com/actionhero/actionhero/commits/main"
          >writing code</a
        >. It includes
        <a href="https://www.actionherojs.com/tutorials">documentation</a>,
        <a href="https://www.actionherojs.com/community"
          >community management</a
        >, <a href="/blog/tag/actionhero">education</a>, and
        <a href="https://www.actionherojs.com/solutions">support</a>. Help me
        continue to provide the open-source community with these tools... and
        of course, more features and code :D
      </p>
      <p style="text-align: center">
        <a
          href="https://github.com/users/evantahler/sponsorship"
          target="_new"
          class="btn btn-outline-primary"
          >Donate Today</a
        >
      </p>
    </aside>

    <p>
      I contribute to a number of Open Source projects because I belive it is a
      great way to give back to the programming community in both a professional
      and personal capacity... and a great way to learn about new technologies
      and tools!
    </p>

    <p>
      I am the creator and community manager for a number of popular Open Source
      projects, some of which are highlighed below.
    </p>

    <ul class="repo-list">
      <li
        v-for="repository in repos"
        :key="repository.html_url"
        class="repo"
      >
        <h5>
          <a target="_new" :href="repository.html_url">{{
            repository.full_name
          }}</a>
        </h5>
        <div class="repo-body">
          <img
            class="avatar"
            :alt="repository.html_url"
            width="75"
            height="75"
            :src="repository.owner.avatar_url"
          />
          <div>
            <p class="muted">
              ✨ {{ repository.stargazers_count }}, 🍴
              {{ repository.forks_count }}
            </p>
            <p>{{ repository.description }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.hero-image {
  width: 100%;
  max-height: 360px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 1.5rem;
}
.sponsor-callout {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem 1.25rem;
  margin: 1.5rem 0;
}
.repo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.repo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 1rem 1.25rem;
  margin-bottom: 0.75rem;
  background: var(--vp-c-bg-soft);
}
.repo h5 {
  margin: 0 0 0.5rem;
}
.repo-body {
  display: flex;
  gap: 1rem;
}
.avatar {
  border-radius: 6px;
}
</style>
