<script setup lang="ts">
import { computed } from 'vue'

import ProjectList from '../../features/projects/components/ProjectList.vue'
import { useFeaturedProjects } from '../../features/projects/composables/useProjects'

const { result, loading, error } = useFeaturedProjects()
const projects = computed(() => result.value?.featuredProjects ?? [])
</script>

<template>
  <section id="work" class="selected-work" aria-labelledby="selected-work-title">
    <header class="section-header">
      <div>
        <p class="eyebrow">
          <span class="eyebrow-dark">01 / Portfolio</span>
          <span class="eyebrow-light">01 / Selected work ─── ◈ ───</span>
        </p>
        <h2 id="selected-work-title">Selected work</h2>
      </div>
      <p class="section-description">
        A few projects and technical experiments I've designed, engineered, benchmarked, and
        deployed.
      </p>
    </header>

    <div v-if="loading" class="state" role="status" aria-live="polite">
      <span class="state-mark" aria-hidden="true"></span>
      Loading featured projects…
    </div>
    <p v-else-if="error" class="state" role="alert">
      Featured projects are temporarily unavailable.
    </p>
    <p v-else-if="!projects.length" class="state">No featured projects are available yet.</p>
    <ProjectList v-else :projects="projects" list-label="Featured projects" />
  </section>
</template>

<style scoped>
.selected-work {
  padding-block: var(--layout-work-section-space);
  border-bottom: 1px solid var(--color-border);
  scroll-margin-top: calc(var(--header-height) + var(--space-md));
}

.section-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  margin-bottom: var(--layout-work-header-space);
}

.eyebrow {
  margin: 0 0 var(--space-2xs);
  color: var(--color-section-eyebrow);
  font-family: var(--font-mono);
  font-size: var(--font-size-label-lg);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

.eyebrow-light {
  display: none;
}

:global(:root[data-theme='light'] .eyebrow-dark) {
  display: none;
}

:global(:root[data-theme='light'] .eyebrow-light) {
  display: inline;
}

h2 {
  margin: 0;
  color: var(--color-heading);
  font-size: var(--font-size-section-title);
  font-weight: var(--font-weight-section-title);
  line-height: var(--line-height-tight);
}

.section-description {
  max-width: 28rem;
  margin: 0;
  color: var(--color-text-secondary);
  font-family: var(--font-section-description);
  font-size: var(--font-size-section-description);
  line-height: var(--line-height-body);
}

.state {
  display: flex;
  min-height: 3rem;
  align-items: center;
  gap: var(--space-sm);
  margin: 0;
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: var(--font-size-label-lg);
  line-height: var(--line-height-body);
}

.state-mark {
  width: 0.5rem;
  height: 0.5rem;
  flex: 0 0 auto;
  border: 1px solid var(--color-accent);
  border-radius: var(--radius-full);
  background: var(--color-accent);
}

@media (min-width: 48rem) {
  .section-header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}
</style>
