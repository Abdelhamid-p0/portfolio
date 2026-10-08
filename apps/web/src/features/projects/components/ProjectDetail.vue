<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import type { ProjectEntity } from '../../../entities/project/types'
import MarkdownContent from '../../../shared/ui/molecules/MarkdownContent.vue'
import { formatProjectPeriod } from '../utils/dates'

const props = defineProps<{
  project: ProjectEntity
}>()

const projectPeriod = computed(() =>
  formatProjectPeriod(props.project.startDate, props.project.endDate),
)
</script>

<template>
  <article class="project-detail">
    <RouterLink class="back-link" to="/projects">← All projects</RouterLink>

    <header class="project-header">
      <div class="project-meta">
        <span class="project-index">Project</span>
        <time v-if="projectPeriod && project.startDate" :datetime="project.startDate">
          {{ projectPeriod }}
        </time>
        <span v-if="project.featured" class="featured-badge">Featured</span>
      </div>
      <h1>{{ project.title }}</h1>
      <p class="project-description">{{ project.description }}</p>
    </header>

    <figure v-if="project.imageUrl" class="project-image">
      <img :src="project.imageUrl" :alt="project.title" />
    </figure>

    <div v-if="project.technologies.length" class="technology-panel">
      <p class="technology-label">Technology stack</p>
      <ul class="technology-list" aria-label="Project technologies">
        <li v-for="technology in project.technologies" :key="technology.slug">
          <img v-if="technology.iconUrl" :src="technology.iconUrl" :alt="''" aria-hidden="true" />
          <span>{{ technology.name }}</span>
        </li>
      </ul>
    </div>

    <div v-if="project.githubUrl || project.liveUrl" class="project-actions">
      <a
        v-if="project.githubUrl"
        class="project-action"
        :href="project.githubUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub repository <span aria-hidden="true">↗</span>
      </a>
      <a
        v-if="project.liveUrl"
        class="project-action"
        :href="project.liveUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        Live demo <span aria-hidden="true">↗</span>
      </a>
    </div>

    <MarkdownContent v-if="project.content" :content="project.content" />
  </article>
</template>

<style scoped>
.project-detail {
  max-width: var(--layout-max-width);
  padding-bottom: var(--layout-work-section-space);
}

.back-link {
  display: inline-block;
  margin-bottom: var(--space-xl);
  color: var(--color-accent-strong);
  font-family: var(--font-mono);
  font-size: var(--font-size-label-lg);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  transition: color var(--transition-fast);
}

.back-link:hover {
  color: var(--color-accent);
}

.project-header {
  padding-bottom: var(--space-xl);
  border-bottom: 1px solid var(--color-border);
}

.project-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: var(--font-size-label-lg);
  text-transform: uppercase;
}

.project-index {
  color: var(--color-muted);
}

.project-meta time {
  color: var(--color-accent-strong);
}

.featured-badge {
  padding: var(--space-2xs) var(--space-xs);
  border: 1px solid var(--color-status-border);
  background: var(--color-status-bg);
  color: var(--color-success);
  font-size: var(--font-size-label);
  letter-spacing: var(--tracking-label);
}

h1 {
  margin: 0 0 var(--space-md);
  color: var(--color-heading);
  font-family: var(--font-sans);
  font-size: var(--font-size-display-mobile);
  font-weight: var(--font-weight-display);
  line-height: var(--line-height-tight);
}

.project-description {
  max-width: 48rem;
  margin: 0;
  color: var(--color-text-secondary);
  font-family: var(--font-body);
  font-size: var(--font-size-body-lg);
  line-height: var(--line-height-body);
}

.project-image {
  overflow: hidden;
  aspect-ratio: 16 / 9;
  margin: var(--space-xl) 0;
  border: 1px solid var(--color-border);
  background: var(--color-project-inset-bg);
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.technology-panel {
  margin-block: var(--space-xl);
  padding: var(--space-md);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
}

.technology-label {
  margin: 0 0 var(--space-sm);
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: var(--font-size-label);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

.technology-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin: 0;
  padding: 0;
  list-style: none;
}

.technology-list li {
  display: inline-flex;
  min-height: 1.5rem;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-2xs) var(--space-xs);
  border: 1px solid var(--color-border-subtle);
  background: var(--color-project-tag-bg);
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: var(--font-size-project-tag);
}

.technology-list img {
  width: 1rem;
  height: 1rem;
  object-fit: contain;
}

.project-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  margin: var(--space-xl) 0;
  padding-block: var(--space-md);
  border-block: 1px solid var(--color-border-subtle);
}

.project-action {
  color: var(--color-accent-strong);
  font-family: var(--font-mono);
  font-size: var(--font-size-label-lg);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  transition: color var(--transition-fast);
}

.project-action:hover {
  color: var(--color-accent);
}

@media (min-width: 40rem) {
  h1 {
    font-size: var(--font-size-display-tablet);
  }
}

@media (min-width: 64rem) {
  h1 {
    font-size: var(--font-size-display);
  }
}
</style>
