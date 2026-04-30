<script setup lang="ts">
import BigGlyf from "./BigGlyf.vue";

defineProps<{ variant?: string }>();
</script>

<template>
  <div class="row">
    <div class="col" style="text-align: center">
      <div class="btn-group" style="width: 100%" role="group">
        <BigGlyf
          name="twitter"
          href="https://twitter.com/evantahler"
          :variant="variant"
        />
        <BigGlyf
          name="linkedin"
          href="https://linkedin.com/in/evantahler"
          :variant="variant"
        />
        <BigGlyf
          name="github"
          href="https://github.com/evantahler"
          :variant="variant"
        />
      </div>
    </div>
  </div>
</template>
