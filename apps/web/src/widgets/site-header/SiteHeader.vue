<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import { useTheme } from '../../app/theme'
import { navigationItems } from '../../features/navigation/config/navigation'
import { heroFallbackLinks } from '../../features/profile/config/hero'
import { useProfile } from '../../features/profile/composables/useProfile'

const { result } = useProfile()
const profile = computed(() => result.value?.profile)
const { theme, toggleTheme } = useTheme()
const displayName = computed(() => {
  const name = profile.value?.name || 'Abdelhamid Hachimi-Alaoui'
  return theme.value === 'dark' ? name.split(' ')[0] : name
})
const profileLine = computed(() => {
  const headline = profile.value?.headline || 'Software Engineer'
  if (theme.value === 'dark') return headline

  const locationParts = profile.value?.location?.split(',')
  const country = locationParts?.[locationParts.length - 1]?.trim() || 'Morocco'
  return `${headline} · ${country}`
})
const contactHref = computed(() => `mailto:${profile.value?.email || heroFallbackLinks.email}`)
</script>

<template>
  <header class="site-header">
    <div class="header-inner">
      <div class="brand-block">
        <RouterLink to="/" class="brand">{{ displayName }}</RouterLink>
        <span class="brand-subtitle">{{ profileLine || 'Software Engineer · Morocco' }}</span>
      </div>

      <nav class="nav" aria-label="Main navigation">
        <RouterLink
          v-for="item in navigationItems"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          exact-active-class="is-active"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="header-actions">
        <div class="availability" aria-label="Available for new roles">
          <span class="availability-dot" aria-hidden="true"></span>
          <span class="availability-dark">Available</span>
          <span class="availability-light">Available for new roles</span>
        </div>
        <a class="contact-link" :href="contactHref">Let's talk</a>
        <button
          class="theme-toggle"
          type="button"
          :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`"
          :title="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`"
          @click="toggleTheme"
        >
          <span class="material-symbols-outlined" aria-hidden="true">
            {{ theme === 'dark' ? 'light_mode' : 'dark_mode' }}
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 50;
  background: var(--color-header-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.header-inner {
  width: min(var(--layout-max-width), calc(100% - 2 * var(--layout-gutter)));
  min-height: var(--header-height);
  margin-inline: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
}

.brand-block {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2xs);
}

.brand {
  overflow: hidden;
  color: var(--color-text);
  font-size: var(--font-size-brand);
  font-weight: var(--font-weight-bold);
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
  transition: color var(--transition-standard);
}

.brand:hover {
  color: var(--color-accent);
}

.brand-subtitle {
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: var(--font-size-label);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
}

.nav {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  margin-left: var(--space-md);
}

.nav-link {
  font-family: var(--font-mono);
  font-size: var(--font-size-label-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  white-space: nowrap;
  transition: color var(--transition-standard);
}

.nav-link:hover,
.nav-link.is-active {
  color: var(--color-accent-strong);
}

.nav-link.is-active {
  border-bottom: 1px solid var(--color-accent-strong);
  color: var(--color-accent-strong);
}

.header-actions {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: var(--space-md);
}

.availability {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-sm);
  border: 1px solid var(--color-border-strong);
  background: var(--color-status-bg);
  color: var(--color-success);
  font-family: var(--font-mono);
  font-size: var(--font-size-label);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  white-space: nowrap;
}

.availability-dot,
.status-dot {
  width: 0.375rem;
  height: 0.375rem;
  flex: 0 0 auto;
  border-radius: var(--radius-full);
  background: var(--color-success);
  animation: status-pulse 1.8s ease-in-out infinite;
}

.availability-light {
  display: none;
}

:global(:root[data-theme='light'] .availability) {
  border-color: var(--color-status-border);
  border-radius: var(--radius-sm);
  letter-spacing: var(--tracking-label);
}

:global(:root[data-theme='light'] .availability-light) {
  display: inline;
}

:global(:root[data-theme='light'] .availability-dark) {
  display: none;
}

.contact-link {
  padding: var(--space-xs) var(--space-md);
  border: 1px solid var(--color-border-strong);
  background: var(--color-surface-alt);
  color: var(--color-text);
  font-family: var(--font-mono);
  font-size: var(--font-size-label-lg);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  white-space: nowrap;
  transition:
    color var(--transition-fast),
    background-color var(--transition-fast),
    border-color var(--transition-fast);
}

.contact-link:hover {
  border-color: var(--color-accent);
  background: var(--color-accent);
  color: var(--color-accent-contrast);
}

:global(:root[data-theme='light'] .contact-link) {
  border-color: transparent;
  border-radius: var(--radius-sm);
  background: var(--color-accent);
  color: var(--color-accent-contrast);
  box-shadow: var(--shadow-header-cta);
}

:global(:root[data-theme='light'] .contact-link:hover) {
  background: var(--color-accent-strong);
}

.theme-toggle {
  display: grid;
  width: 2rem;
  height: 2rem;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-full);
  background: var(--color-surface-soft);
  color: var(--color-accent);
  cursor: pointer;
  transition:
    color var(--transition-fast),
    background-color var(--transition-fast),
    border-color var(--transition-fast);
}

.theme-toggle:hover {
  border-color: var(--color-accent);
  background: var(--color-surface-alt);
}

.theme-toggle .material-symbols-outlined {
  font-size: 1.125rem;
}

@keyframes status-pulse {
  50% {
    opacity: 0.55;
  }
}

@media (max-width: 63.999rem) {
  :global(:root[data-theme='light'] .header-inner) {
    flex-wrap: wrap;
    justify-content: space-between;
    padding-block: var(--space-sm);
  }

  :global(:root[data-theme='light'] .nav) {
    order: 3;
    width: 100%;
    justify-content: center;
    margin: 0;
    gap: clamp(var(--space-md), 4vw, var(--space-lg));
  }
}

@media (max-width: 39.999rem) {
  .header-inner {
    flex-wrap: nowrap;
    padding-block: 0;
    row-gap: 0;
  }

  .brand {
    font-size: var(--font-size-label-lg);
  }

  .brand-subtitle {
    font-size: 0.625rem;
  }

  .header-actions {
    gap: var(--space-sm);
  }

  .availability {
    display: none;
  }

  .contact-link {
    padding: var(--space-xs) var(--space-sm);
    font-size: var(--font-size-label);
  }

  .nav {
    display: none;
  }

  .nav-link {
    font-size: 0.625rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .availability-dot {
    animation: none;
  }
}
</style>
