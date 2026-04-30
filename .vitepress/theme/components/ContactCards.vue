<script setup lang="ts">
import BigGlyf from "./BigGlyf.vue";

defineProps<{ variant?: string }>();
</script>

<template>
  <div class="contact-buttons">
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
</template>

<style scoped>
.contact-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}
</style>
