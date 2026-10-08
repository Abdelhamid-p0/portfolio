<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  profile: {
    type: Object as PropType<{
      name?: string | null
      headline?: string | null
      location?: string | null
    } | null>,
    default: null,
  },
})
</script>

<template>
  <section class="panel">
    <header class="section-header">
      <p class="eyebrow">04 / About</p>
      <h2>About</h2>
    </header>

    <div v-if="profile" class="about-card">
      <h3>{{ profile.name }}</h3>
      <p>{{ profile.headline || 'Software Engineer' }}</p>
      <p class="muted">{{ profile.location || 'Location not specified' }}</p>
    </div>
  </section>
</template>

<style scoped>
.panel {
  padding: 3rem 0 1rem;
}

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

.about-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
}

h3 {
  margin: 0 0 0.5rem;
}

p {
  margin: 0;
  color: var(--color-text-muted);
}

.muted {
  margin-top: 0.5rem;
}
</style>
