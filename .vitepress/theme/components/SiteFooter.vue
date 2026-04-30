<script setup lang="ts">
import { computed } from "vue";

const year = computed(() => new Date().getFullYear());
</script>

<template>
  <footer>
    <div
      class="alert alert-light"
      style="padding-top: 40px; margin-top: 50px; margin-bottom: 0; border-radius: 0"
    >
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <img src="/images/dog.png" style="width: 75px" alt="dog" />
          </div>
          <div class="col-md-6" style="text-align: right">
            <p>
              <small class="text-muted">
                Copyright, Evan Tahler {{ year }} <br />
                <a target="_blank" href="https://twitter.com/@evantahler"
                  >Twitter</a
                >
                |
                <a rel="me" href="https://mastodon.social/@evantahler"
                  >Mastodon</a
                >
                <br />
                <em>
                  <a
                    href="https://github.com/evantahler/www.evantahler.com"
                    target="_new"
                    >source for this site</a
                  >
                </em>
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
