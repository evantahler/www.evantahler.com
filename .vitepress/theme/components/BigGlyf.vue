<script setup lang="ts">
defineProps<{
  name: string;
  href: string;
  variant?: string;
}>();
</script>

<template>
  <a
    :class="['btn', 'btn-lg', `btn-${variant || 'primary'}`]"
    style="min-width: 100px"
    :href="href"
    target="_blank"
  >
    <i :class="['fa', `fa-${name}`]"></i>
  </a>
</template>
