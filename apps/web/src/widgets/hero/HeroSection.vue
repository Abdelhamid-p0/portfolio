<script setup lang="ts">
import { computed } from 'vue'

import {
  heroFallbackHeadline,
  heroFallbackLinks,
  heroSpecialties,
} from '../../features/profile/config/hero'
import { useProfile } from '../../features/profile/composables/useProfile'

const { result, loading, error } = useProfile()
const profile = computed(() => result.value?.profile)
const roleLine = computed(() =>
  [profile.value?.headline || heroFallbackHeadline, ...heroSpecialties].join(' · '),
)
const socialLinks = computed(() => [
  { label: 'GitHub', href: profile.value?.githubUrl || heroFallbackLinks.github },
  { label: 'LinkedIn', href: profile.value?.linkedinUrl || heroFallbackLinks.linkedin },
  {
    label: 'Email',
    href: `mailto:${profile.value?.email || heroFallbackLinks.email}`,
  },
])
</script>

<template>
  <section class="hero">
    <div class="hero-motif" aria-hidden="true">
      <svg viewBox="0 0 500 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          class="motif-blue-dashed"
          d="M40 220L130 110L190 170L280 70L380 190L440 140L500 220"
          stroke-dasharray="3 3"
          stroke-width="1.2"
        />
        <path
          class="motif-warm"
          d="M0 230L100 130L160 180L250 90L340 170L420 100L500 210"
          stroke-width="1.5"
        />
        <g transform="translate(370 70)">
          <rect
            class="motif-blue"
            width="42"
            height="42"
            x="0"
            y="0"
            stroke-width="1.2"
            transform="rotate(45 21 21)"
          />
          <rect class="motif-warm" width="42" height="42" x="0" y="0" stroke-width="1.2" />
          <circle class="motif-blue-fill" cx="21" cy="21" r="3" />
        </g>
      </svg>
    </div>

    <div class="hero-content">
      <div class="status-row">
        <div class="status-pill">
          <span class="status-dot" aria-hidden="true"></span>
          <span>Available for new roles</span>
        </div>
        <span class="status-separator" aria-hidden="true">//</span>
        <span class="status-label">{{ roleLine }}</span>
      </div>

      <h1>
        Building software.<br class="desktop-break" />
        Exploring what's next.
      </h1>

      <p v-if="profile?.bio" class="hero-description">{{ profile.bio }}</p>
      <p v-else-if="loading" class="hero-description profile-state">Loading profile…</p>
      <p v-else class="hero-description profile-state">
        {{
          error ? 'Profile details are temporarily unavailable.' : 'Profile biography unavailable.'
        }}
      </p>
    </div>

    <div class="hero-actions">
      <div class="primary-actions">
        <RouterLink class="hero-action action-primary" to="/projects">
          <span>View my work</span>
          <span aria-hidden="true">→</span>
        </RouterLink>
        <RouterLink class="hero-action action-secondary" to="/writing">
          Read my writing ↗
        </RouterLink>
      </div>

      <div class="social-links" aria-label="Profile links">
        <template v-for="(link, index) in socialLinks" :key="link.label">
          <span v-if="index" class="social-separator" aria-hidden="true">·</span>
          <a
            :href="link.href"
            :target="link.label === 'Email' ? undefined : '_blank'"
            :rel="link.label === 'Email' ? undefined : 'noopener noreferrer'"
          >
            {{ link.label }}
          </a>
        </template>
        <span class="social-separator" aria-hidden="true">·</span>
        <a
          v-if="heroFallbackLinks.resume"
          :href="heroFallbackLinks.resume"
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume / CV <span aria-hidden="true">↗</span>
        </a>
        <span v-else class="resume-unavailable" aria-disabled="true"
          >Resume / CV <span aria-hidden="true">↗</span></span
        >
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding: var(--hero-padding-top) 0 var(--hero-padding-bottom);
  border-bottom: 1px solid var(--color-border);
}

.hero-content,
.hero-actions {
  position: relative;
  z-index: 1;
}

.hero-motif {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  width: 50%;
  max-height: 21.25rem;
  align-items: center;
  justify-content: flex-end;
  opacity: 0.14;
  pointer-events: none;
}

.hero-motif svg {
  width: 100%;
  height: 100%;
}

.motif-blue,
.motif-blue-dashed {
  stroke: var(--color-accent-strong);
}

.motif-warm {
  stroke: var(--color-warm);
}

.motif-blue-fill {
  fill: var(--color-accent);
}

:global(:root[data-theme='dark'] .hero-motif) {
  display: none;
}

.status-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-xl);
}

.desktop-break {
  display: none;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-sm);
  border: 1px solid var(--color-border-strong);
  background: var(--color-status-bg);
  color: var(--color-success);
  font-size: var(--font-size-label);
  font-family: var(--font-mono);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

.status-dot {
  width: 0.5rem;
  height: 0.5rem;
}

.status-separator {
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: var(--font-size-label-lg);
}

.status-label {
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: var(--font-size-label);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

h1 {
  max-width: var(--layout-max-width);
  margin: 0 0 var(--space-lg);
  color: var(--color-heading);
  font-size: var(--font-size-display-mobile);
  font-weight: var(--font-weight-display);
  line-height: var(--line-height-tight);
}

.hero-description {
  max-width: var(--hero-description-width);
  margin: 0 0 var(--space-2xl);
  color: var(--color-text-secondary);
  font-family: var(--font-body);
  font-size: var(--font-size-body-lg);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-body);
}

.profile-state {
  font-family: var(--font-mono);
  font-size: var(--font-size-body);
}

.hero-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  padding-top: var(--space-md);
  border-top: 1px solid var(--color-border-subtle);
}

.primary-actions,
.social-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-md);
}

.hero-action {
  display: inline-flex;
  min-height: 2.5rem;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  padding: var(--hero-action-padding-y) var(--hero-action-padding-x);
  font-family: var(--font-mono);
  font-size: var(--font-size-label-lg);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  transition:
    color var(--transition-fast),
    background-color var(--transition-fast),
    border-color var(--transition-fast);
}

.action-primary {
  border: 1px solid var(--color-accent-strong);
  background: var(--color-accent-strong);
  color: var(--color-accent-contrast);
  font-weight: var(--font-weight-bold);
}

.action-primary:hover {
  border-color: var(--color-accent);
  background: var(--color-accent);
}

.action-secondary {
  border: 1px solid var(--color-border-strong);
  background: transparent;
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
}

.action-secondary:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

:global(:root[data-theme='light'] .action-secondary) {
  border-color: var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
}

.social-links {
  gap: var(--space-md);
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: var(--font-size-label-lg);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

.social-links a {
  color: var(--color-muted);
  transition: color var(--transition-fast);
}

.social-links a:hover {
  color: var(--color-accent-strong);
}

.social-separator {
  color: var(--color-border);
}

.resume-unavailable {
  color: var(--color-text);
  cursor: not-allowed;
}

@media (min-width: 40rem) {
  h1 {
    font-size: var(--font-size-display-tablet);
  }

  .desktop-break {
    display: initial;
  }
}

@media (min-width: 64rem) {
  h1 {
    font-size: var(--font-size-display);
  }

  .hero-actions {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-lg);
  }
}

@media (max-width: 39.999rem) {
  .hero-motif {
    width: 100%;
    opacity: 0.08;
  }

  .status-separator {
    display: none;
  }

  .status-label {
    flex-basis: 100%;
  }

  .hero-description {
    font-size: var(--font-size-body);
  }

  .primary-actions {
    gap: var(--space-sm);
  }

  .hero-action {
    flex: 1 1 auto;
    padding-inline: var(--space-sm);
    font-size: 0.625rem;
  }

  .social-links {
    gap: var(--space-sm);
    font-size: 0.625rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .status-dot {
    animation: none;
  }
}
</style>
