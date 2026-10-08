<script setup lang="ts">
import type { ProjectSummary } from '../composables/useProjects'

defineProps<{
  projects: ProjectSummary[]
}>()
</script>

<template>
  <ul class="project-list">
    <li v-for="project in projects" :key="project.slug" class="project-item">
      <h3>{{ project.title }}</h3>
      <p>{{ project.description || 'Project summary not available yet.' }}</p>
      <div v-if="project.technologies?.length" class="tag-list">
        <span v-for="technology in project.technologies" :key="technology.name">{{
          technology.name
        }}</span>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.project-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;
}

.project-item {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  padding: 1rem;
}

.project-item h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
}

.project-item p {
  margin: 0 0 0.75rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-list span {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.6rem;
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: 999px;
  color: var(--color-text);
  font-size: 0.72rem;
  font-family: var(--font-mono);
}
</style>
