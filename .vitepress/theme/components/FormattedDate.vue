<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps<{ dateString: string }>();
const formatted = ref(props.dateString);

onMounted(() => {
  formatted.value = new Date(props.dateString).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
});
</script>

<template>
  <span>{{ formatted }}</span>
</template>
