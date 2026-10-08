<script setup lang="ts">
import { computed } from 'vue'

import { useExperiences } from '../../features/experiences/composables/useExperiences'

const { result, loading, error } = useExperiences()
const experiences = computed(() => result.value?.experiences ?? [])
</script>

<template>
  <section class="panel">
    <header class="section-header">
      <p class="eyebrow">02 / Experience</p>
      <h2>Experience</h2>
    </header>

    <div v-if="loading" class="state">Loading experiences…</div>
    <div v-else-if="error" class="state error">Error: {{ error.message }}</div>
    <ul v-else class="timeline">
      <li v-for="item in experiences" :key="item.slug" class="experience-item">
        <div class="dot" />
        <div>
          <strong>{{ item.role }}</strong>
          <p>{{ item.company }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.panel {
  padding: 3rem 0;
  border-bottom: 1px solid var(--color-border);
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

.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;
}

.experience-item {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1rem;
}

.dot {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: var(--color-accent);
  margin-top: 0.3rem;
}

strong {
  display: block;
  margin-bottom: 0.25rem;
}

p {
  margin: 0;
  color: var(--color-text-muted);
}

.state {
  color: var(--color-text-muted);
  font-family: var(--font-mono);
}

.state.error {
  color: #ffb4ab;
}
</style>
