<script setup lang="ts">
defineProps<{ slug?: string }>()
</script>

<template>
  <div class="page-shell">
    <section class="content-card">
      <h1>Project detail</h1>
      <p>Slug: {{ slug ?? 'unknown' }}</p>
    </section>
  </div>
</template>

<style scoped>
.page-shell {
  padding: 0;
}

.content-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 2rem;
}

h1 {
  margin: 0 0 0.5rem;
}

p {
  margin: 0;
  color: var(--color-text-muted);
}
</style>
