<script setup lang="ts">
import type { ExperienceEntity } from '../../../entities/experience/types'

defineProps<{
  experience: ExperienceEntity
}>()

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date))
}
</script>

<template>
  <article class="experience-card">
    <div
      class="experience-dates"
      :aria-label="`Dates: ${formatDate(experience.startDate)}${experience.current ? ' – Present' : experience.endDate ? ` – ${formatDate(experience.endDate)}` : ''}`"
    >
      <time :datetime="experience.startDate">{{ formatDate(experience.startDate) }}</time>
      <span
        v-if="experience.current || experience.endDate"
        class="date-separator"
        aria-hidden="true"
      >
        —
      </span>
      <time v-if="experience.endDate && !experience.current" :datetime="experience.endDate">
        {{ formatDate(experience.endDate) }}
      </time>
      <span v-else-if="experience.current" class="present-date">Present</span>
      <span v-if="experience.current" class="current-label">Current</span>
    </div>

    <div class="experience-content">
      <h3>
        <span>{{ experience.role }}</span>
        <span class="company-divider" aria-hidden="true">@</span>
        <span>{{ experience.company }}</span>
      </h3>
      <p>{{ experience.description }}</p>
    </div>
  </article>
</template>

<style scoped>
.experience-card {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: var(--space-lg);
}

.experience-dates {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-xs);
  color: var(--color-accent-strong);
  font-family: var(--font-mono);
  font-size: var(--font-size-label-lg);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-label);
}

.date-separator {
  color: var(--color-muted);
}

.present-date {
  color: var(--color-success);
}

.current-label {
  margin-left: var(--space-xs);
  padding: var(--space-2xs) var(--space-xs);
  border: 1px solid var(--color-status-border);
  background: var(--color-status-bg);
  color: var(--color-success);
  font-size: var(--font-size-label);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
}

.experience-content {
  min-width: 0;
}

h3 {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--space-xs);
  margin: 0 0 var(--space-sm);
  color: var(--color-heading);
  font-family: var(--font-sans);
  font-size: var(--font-size-project-title);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}

.company-divider {
  color: var(--color-muted);
  font-weight: var(--font-weight-regular);
}

.experience-content p {
  margin: 0;
  color: var(--color-text-secondary);
  font-family: var(--font-body);
  font-size: var(--font-size-experience-description);
  line-height: var(--line-height-experience-description);
}

@media (min-width: 64rem) {
  .experience-card {
    flex-direction: row;
    gap: var(--space-lg);
  }

  .experience-dates {
    flex: 0 0 var(--experience-date-column);
    flex-direction: row;
    flex-wrap: wrap;
    align-items: baseline;
    gap: var(--space-xs);
  }

  .date-separator {
    display: inline;
  }
}
</style>
