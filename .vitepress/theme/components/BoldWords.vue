<script setup lang="ts">
defineProps<{ text: string }>();
</script>

<template>
  <span style="color: var(--bs-warning)">{{ text }}</span>
</template>
