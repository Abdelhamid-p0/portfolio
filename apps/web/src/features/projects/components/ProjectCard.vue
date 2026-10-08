<script setup lang="ts">
import type { ProjectSummary } from '../composables/useProjects'
import { formatProjectYear } from '../utils/dates'

defineProps<{
  project: ProjectSummary
  position: number
}>()
</script>

<template>
  <article class="project-card">
    <div class="project-meta">
      <span>PROJECT {{ String(position).padStart(2, '0') }}</span>
      <time v-if="project.startDate" :datetime="project.startDate">
        {{ formatProjectYear(project.startDate) }}
      </time>
    </div>

    <div class="project-body">
      <div class="project-main">
        <div class="project-heading">
          <h3>
            <RouterLink :to="{ name: 'project-detail', params: { slug: project.slug } }">
              {{ project.title }}
            </RouterLink>
          </h3>
          <span v-if="project.featured" class="featured-badge">Featured</span>
        </div>

        <p class="project-description">{{ project.description }}</p>

        <figure v-if="project.imageUrl" class="project-image">
          <img :src="project.imageUrl" :alt="project.title" loading="lazy" />
        </figure>

        <div v-if="project.technologies?.length" class="technology-panel">
          <p class="technology-label">
            <span class="material-symbols-outlined" aria-hidden="true">account_tree</span>
            Technology stack
          </p>
          <ul class="technology-list" aria-label="Project technologies">
            <li v-for="technology in project.technologies" :key="technology.slug">
              {{ technology.name }}
            </li>
          </ul>
        </div>
      </div>

      <div class="project-footer">
        <RouterLink
          class="project-detail-link"
          :to="{ name: 'project-detail', params: { slug: project.slug } }"
        >
          View project <span aria-hidden="true">↗</span>
        </RouterLink>
        <div v-if="project.githubUrl || project.liveUrl" class="project-links">
          <a
            v-if="project.githubUrl"
            :href="project.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
          <a
            v-if="project.liveUrl"
            :href="project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Live demo ↗
          </a>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  display: flex;
  min-width: 0;
  flex-direction: column;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-project-card);
  background: var(--color-surface);
  transition:
    border-color var(--transition-standard),
    box-shadow var(--transition-standard);
}

.project-card:hover {
  border-color: var(--color-accent-strong);
  box-shadow: var(--shadow-project-hover);
}

.project-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  padding: var(--project-meta-padding-y) var(--project-card-padding);
  border-bottom: 1px solid var(--color-border-subtle);
  background: var(--color-project-meta-bg);
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: var(--font-size-label-lg);
  line-height: var(--line-height-label);
}

.project-meta time:last-child {
  color: var(--color-warm);
  font-weight: var(--font-weight-semibold);
}

.project-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--project-card-padding);
}

.project-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-md);
  margin-bottom: var(--space-sm);
}

h3 {
  min-width: 0;
  margin: 0;
  color: var(--color-heading);
  font-size: var(--font-size-project-title);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}

h3 a {
  transition: color var(--transition-fast);
}

h3 a:hover {
  color: var(--color-accent);
}

.featured-badge {
  flex: 0 0 auto;
  padding: var(--space-2xs) var(--space-sm);
  border: 1px solid var(--color-border);
  background: var(--color-status-bg);
  color: var(--color-success);
  font-family: var(--font-mono);
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
}

.project-description {
  margin: 0 0 var(--space-md);
  color: var(--color-text-secondary);
  font-family: var(--font-body);
  font-size: var(--font-size-body);
  line-height: var(--line-height-body);
}

.project-image {
  overflow: hidden;
  aspect-ratio: 16 / 9;
  margin: 0 0 var(--space-lg);
  border: 1px solid var(--color-border-subtle);
  background: var(--color-project-inset-bg);
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.technology-panel {
  margin-bottom: var(--space-lg);
  padding: var(--space-sm);
  border: 1px solid var(--color-border-subtle);
  background: var(--color-project-inset-bg);
}

.technology-label {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  margin: 0 0 var(--space-xs);
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: var(--font-size-label);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
}

.technology-label .material-symbols-outlined {
  color: var(--color-accent);
  font-size: 0.875rem;
}

.technology-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2xs);
  margin: 0;
  padding: 0;
  list-style: none;
}

.technology-list li {
  display: inline-flex;
  min-height: 1.5rem;
  align-items: center;
  padding: var(--space-2xs) var(--space-xs);
  border: 1px solid var(--color-border-subtle);
  background: var(--color-project-tag-bg);
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: var(--font-size-project-tag);
  line-height: var(--line-height-label);
}

.project-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  padding-top: var(--space-md);
  border-top: 1px solid var(--color-border-subtle);
  font-family: var(--font-mono);
  font-size: var(--font-size-label);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
}

.project-detail-link,
.project-links a {
  transition: color var(--transition-fast);
}

.project-detail-link {
  color: var(--color-accent-strong);
  font-weight: var(--font-weight-semibold);
}

.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  color: var(--color-muted);
}

.project-links a:hover {
  color: var(--color-accent-strong);
}

@media (max-width: 39.999rem) {
  .project-meta,
  .project-body {
    padding-inline: var(--space-md);
  }

  .project-heading {
    flex-direction: column;
    gap: var(--space-sm);
  }
}
</style>
