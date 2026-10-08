<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import { useExperiences } from '../../features/experiences/composables/useExperiences'
import ExperienceTimeline from '../../features/experiences/components/ExperienceTimeline.vue'

const { result, loading, error } = useExperiences()
const experiences = computed(() => result.value?.experiences ?? [])
const previewExperiences = computed(() => experiences.value.slice(0, 2))
</script>

<template>
  <section id="experience" class="experience-preview" aria-labelledby="experience-preview-title">
    <header class="section-header">
      <div>
        <p class="eyebrow">
          <span class="eyebrow-dark">02 / Background</span>
          <span class="eyebrow-light">02 / Background ─── ◈ ───</span>
        </p>
        <h2 id="experience-preview-title">Experience</h2>
      </div>
      <p class="section-description">
        Professional internships, software engineering responsibilities, and distributed backend
        achievements.
      </p>
    </header>

    <div v-if="loading" class="state" role="status" aria-live="polite">
      <span class="state-mark" aria-hidden="true"></span>
      Loading experience…
    </div>
    <p v-else-if="error" class="state" role="alert">
      Experience information is temporarily unavailable.
    </p>
    <p v-else-if="!experiences.length" class="state">No experience details are available yet.</p>
    <ExperienceTimeline v-else :experiences="previewExperiences" />

    <RouterLink class="all-experience-link" to="/experience">
      View full experience <span aria-hidden="true">→</span>
    </RouterLink>
  </section>
</template>

<style scoped>
.experience-preview {
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

h2,
h1 {
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
  border-radius: var(--radius-full);
  background: var(--color-accent);
}

.all-experience-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  margin-top: var(--space-lg);
  color: var(--color-accent-strong);
  font-family: var(--font-mono);
  font-size: var(--font-size-label-lg);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  transition: color var(--transition-fast);
}

.all-experience-link:hover {
  color: var(--color-accent);
}

@media (min-width: 48rem) {
  .section-header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}
</style>
