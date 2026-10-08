<script setup lang="ts">
import type { ProjectSummary } from '../composables/useProjects'
import ProjectCard from './ProjectCard.vue'

defineProps<{
  projects: ProjectSummary[]
}>()
</script>

<template>
  <ul class="project-list" aria-label="Featured projects">
    <li v-for="(project, index) in projects" :key="project.slug">
      <ProjectCard :project="project" :position="index + 1" />
    </li>
  </ul>
</template>

<style scoped>
.project-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--layout-column-gap);
}

li {
  min-width: 0;
}

@media (min-width: 64rem) {
  .project-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
