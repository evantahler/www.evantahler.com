<script setup lang="ts">
defineProps<{ text: string }>();
</script>

<template>
  <span class="bold-words">{{ text }}</span>
</template>

<style scoped>
.bold-words {
  color: var(--vp-c-warning-1);
  font-weight: 600;
}
</style>
