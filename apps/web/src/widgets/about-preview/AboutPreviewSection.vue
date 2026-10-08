<script setup lang="ts">
import { computed } from 'vue'

import { useProfile } from '../../features/profile/composables/useProfile'

const { result, loading, error } = useProfile()
const profile = computed(() => result.value?.profile ?? null)
</script>

<template>
  <section id="about" class="about-preview" aria-labelledby="about-preview-title">
    <header class="section-header">
      <p class="eyebrow">
        <span class="eyebrow-dark">04 / Perspective</span>
        <span class="eyebrow-light">04 / Perspective ─── ◈ ───</span>
      </p>
      <h2 id="about-preview-title">About</h2>
    </header>

    <div v-if="loading" class="state" role="status" aria-live="polite">
      <span class="state-mark" aria-hidden="true"></span>
      Loading profile…
    </div>
    <p v-else-if="error" class="state" role="alert">
      Profile information is temporarily unavailable.
    </p>
    <div v-else-if="profile" class="profile-preview">
      <p class="profile-name">
        <span>{{ profile.name }}</span>
        <span v-if="profile.headline" class="profile-divider" aria-hidden="true">·</span>
        <span v-if="profile.headline">{{ profile.headline }}</span>
      </p>
      <p v-if="profile.bio" class="profile-bio">{{ profile.bio }}</p>
      <p v-if="profile.location" class="profile-location">{{ profile.location }}</p>
    </div>
    <p v-else class="state">Profile information is not available yet.</p>
  </section>
</template>

<style scoped>
.about-preview {
  padding-block: var(--layout-work-section-space);
  border-bottom: 1px solid var(--color-border);
  scroll-margin-top: calc(var(--header-height) + var(--space-md));
}

.section-header {
  margin-bottom: var(--space-xl);
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

h2 {
  margin: 0;
  color: var(--color-heading);
  font-size: var(--font-size-section-title);
  font-weight: var(--font-weight-section-title);
  line-height: var(--line-height-tight);
}

.profile-preview {
  max-width: 56rem;
}

.profile-name {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin: 0 0 var(--space-sm);
  color: var(--color-heading);
  font-family: var(--font-sans);
  font-size: var(--font-size-project-title);
  font-weight: var(--font-weight-semibold);
}

.profile-divider,
.profile-location {
  color: var(--color-muted);
}

.profile-bio {
  display: -webkit-box;
  overflow: hidden;
  margin: 0;
  color: var(--color-text-secondary);
  font-family: var(--font-body);
  font-size: var(--font-size-body);
  line-height: var(--line-height-body);
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.profile-location {
  margin: var(--space-sm) 0 0;
  font-family: var(--font-mono);
  font-size: var(--font-size-label-lg);
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
}

.state-mark {
  width: 0.5rem;
  height: 0.5rem;
  flex: 0 0 auto;
  border-radius: var(--radius-full);
  background: var(--color-accent);
}
</style>
