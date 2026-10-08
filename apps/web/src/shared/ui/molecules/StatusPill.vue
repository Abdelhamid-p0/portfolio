<script setup lang="ts">
interface Props {
  text: string
}

defineProps<Props>()
</script>

<template>
  <span class="status-pill">{{ text }}</span>
</template>

<style scoped>
.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid var(--color-border);
  background: rgba(115, 219, 154, 0.08);
  color: var(--color-accent);
  border-radius: 999px;
  padding: 0.35rem 0.7rem;
  font-family: var(--font-mono);
  font-size: 0.66rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
