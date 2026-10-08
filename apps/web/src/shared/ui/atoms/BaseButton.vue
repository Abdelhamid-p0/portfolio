<script setup lang="ts">
interface Props {
  label: string
  variant?: 'primary' | 'secondary'
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
})
</script>

<template>
  <button :class="['base-button', `variant-${variant}`]">
    {{ label }}
  </button>
</template>

<style scoped>
.base-button {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.65rem 1rem;
  cursor: pointer;
  font-family: var(--font-mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.variant-primary {
  background: var(--color-accent);
  color: var(--color-bg);
}

.variant-secondary {
  background: transparent;
  color: var(--color-text);
}
</style>
