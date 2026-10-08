<script setup lang="ts">
import { computed } from 'vue'

import ProjectList from '../../features/projects/components/ProjectList.vue'
import { useProjects } from '../../features/projects/composables/useProjects'

const { result, loading, error } = useProjects()
const projects = computed(() => result.value?.projects ?? [])
</script>

<template>
  <section class="panel">
    <header class="section-header">
      <p class="eyebrow">01 / Portfolio</p>
      <h2>Selected work</h2>
    </header>

    <div v-if="loading" class="state">Loading projects…</div>
    <div v-else-if="error" class="state error">Error: {{ error.message }}</div>
    <ProjectList v-else :projects="projects" />
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

.state {
  color: var(--color-text-muted);
  font-family: var(--font-mono);
}

.state.error {
  color: #ffb4ab;
}
</style>
