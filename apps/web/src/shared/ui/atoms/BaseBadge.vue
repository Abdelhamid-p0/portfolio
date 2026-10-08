<script setup lang="ts">
interface Props {
  text: string
}

defineProps<Props>()
</script>

<template>
  <span class="base-badge">{{ text }}</span>
</template>

<style scoped>
.base-badge {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  padding: 0.25rem 0.6rem;
  background: var(--color-surface-alt);
  color: var(--color-text-muted);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
