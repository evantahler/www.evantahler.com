<script setup lang="ts">
import { data as repos } from "../../data/github.data";
</script>

<template>
  <div>
    <h1>Open Source</h1>
    <hr />

    <img
      src="/images/open-source-2.jpg"
      alt="open source"
      style="width: 100%; height: 500px; object-fit: cover; border-radius: 6px"
    />
    <br /><br />

    <div class="alert alert-light">
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
      <div style="text-align: center">
        <p>
          <a
            href="https://github.com/users/evantahler/sponsorship"
            target="_new"
            class="btn btn-outline-primary"
            >Donate Today</a
          >
        </p>
      </div>
    </div>

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

    <ul class="list-group">
      <li
        v-for="repository in repos"
        :key="repository.html_url"
        class="list-group-item"
      >
        <div class="row">
          <div class="col-md-12">
            <h5>
              <a target="_new" :href="repository.html_url">{{
                repository.full_name
              }}</a>
            </h5>
          </div>
        </div>
        <div class="row">
          <div class="col-md-1">
            <img
              :alt="repository.html_url"
              width="75"
              height="75"
              :src="repository.owner.avatar_url"
            />
          </div>
          <div class="col-md-11">
            <p>
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
