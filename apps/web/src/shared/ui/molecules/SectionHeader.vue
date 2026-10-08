<script setup lang="ts">
interface Props {
  eyebrow: string
  title: string
}

defineProps<Props>()
</script>

<template>
  <header class="section-header">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h2>{{ title }}</h2>
  </header>
</template>

<style scoped>
.section-header {
  margin-bottom: 1.5rem;
}

.eyebrow {
  margin: 0 0 0.5rem;
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h2 {
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  letter-spacing: -0.05em;
}
</style>
