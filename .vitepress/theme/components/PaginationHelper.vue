<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  page: number;
  totalPages: number;
  pageUrl: (page: number) => string;
}>();

const items = computed(() => {
  const out: Array<{
    label: string;
    href?: string;
    active?: boolean;
    key: string;
  }> = [];
  const { page, totalPages } = props;
  if (totalPages <= 1) return out;

  if (page > 1) {
    out.push({ label: "«", href: props.pageUrl(1), key: "first" });
    out.push({ label: "‹", href: props.pageUrl(page - 1), key: "prev" });
  }
  if (page - 2 >= 1)
    out.push({
      label: String(page - 2),
      href: props.pageUrl(page - 2),
      key: "p-2",
    });
  if (page - 1 >= 1)
    out.push({
      label: String(page - 1),
      href: props.pageUrl(page - 1),
      key: "p-1",
    });

  out.push({ label: String(page), active: true, key: "p" });

  if (page + 1 <= totalPages)
    out.push({
      label: String(page + 1),
      href: props.pageUrl(page + 1),
      key: "p+1",
    });
  if (page + 2 <= totalPages)
    out.push({
      label: String(page + 2),
      href: props.pageUrl(page + 2),
      key: "p+2",
    });

  if (page < totalPages) {
    out.push({ label: "›", href: props.pageUrl(page + 1), key: "next" });
    out.push({ label: "»", href: props.pageUrl(totalPages), key: "last" });
  }

  return out;
});
</script>

<template>
  <nav v-if="items.length > 0" class="pagination" aria-label="Pagination">
    <template v-for="item in items" :key="item.key">
      <a
        v-if="item.href && !item.active"
        class="page-link"
        :href="item.href"
        >{{ item.label }}</a
      >
      <span v-else class="page-link" :class="{ active: item.active }">{{
        item.label
      }}</span>
    </template>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin: 1rem 0;
}
.page-link {
  display: inline-block;
  padding: 0.4rem 0.7rem;
  min-width: 2rem;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-size: 0.9rem;
}
.page-link:hover {
  background: var(--vp-c-bg-soft);
}
.page-link.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}
</style>
