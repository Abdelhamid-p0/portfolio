<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { navigationItems } from '../../features/navigation/config/navigation'
</script>

<template>
  <header class="site-header">
    <div class="header-inner">
      <div class="brand-block">
        <RouterLink to="/" class="brand">Abdelhamid Hachimi-Alaoui</RouterLink>
        <span class="brand-subtitle">Software Engineer · Morocco</span>
      </div>

      <nav class="nav" aria-label="Main navigation">
        <RouterLink
          v-for="item in navigationItems"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          active-class="is-active"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 30;
  backdrop-filter: blur(16px);
  background: rgba(18, 19, 22, 0.8);
  border-bottom: 1px solid var(--color-border);
}

.header-inner {
  width: min(1200px, calc(100% - 2rem));
  margin: 0 auto;
  min-height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand-block {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.brand {
  font-weight: 700;
  letter-spacing: -0.04em;
  font-size: 0.95rem;
}

.brand-subtitle {
  color: var(--color-text-muted);
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-link {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  transition: color 0.2s ease;
}

.nav-link:hover,
.nav-link.is-active {
  color: var(--color-accent-strong);
}

@media (max-width: 720px) {
  .header-inner {
    flex-direction: column;
    justify-content: center;
    min-height: 5rem;
    padding: 0.75rem 0;
  }

  .nav {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
