<script setup lang="ts">
import type { ExperienceEntity } from '../../../entities/experience/types'
import ExperienceCard from './ExperienceCard.vue'

defineProps<{
  experiences: ExperienceEntity[]
}>()
</script>

<template>
  <ol class="experience-timeline" aria-label="Work experience">
    <li v-for="experience in experiences" :key="experience.slug">
      <ExperienceCard :experience="experience" />
    </li>
  </ol>
</template>

<style scoped>
.experience-timeline {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  list-style: none;
}

.experience-timeline li {
  min-width: 0;
  padding-block: var(--space-xl);
}

.experience-timeline li + li {
  border-top: 1px solid var(--color-border);
}
</style>
