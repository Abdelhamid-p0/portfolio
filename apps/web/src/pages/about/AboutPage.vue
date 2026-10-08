<script setup lang="ts">
import { computed } from 'vue'

import { useProfile } from '../../features/profile/composables/useProfile'
import { useTechnologies } from '../../features/technologies/composables/useTechnologies'

type SocialLink = {
  label: string
  href: string
  external: boolean
}

const { result: profileResult, loading: profileLoading, error: profileError } = useProfile()
const {
  result: technologyResult,
  loading: technologyLoading,
  error: technologyError,
} = useTechnologies()

const profile = computed(() => profileResult.value?.profile ?? null)
const technologies = computed(() => technologyResult.value?.technologies ?? [])
const socialLinks = computed<SocialLink[]>(() => {
  if (!profile.value) return []

  const links: SocialLink[] = []
  if (profile.value.githubUrl) {
    links.push({ label: 'GitHub', href: profile.value.githubUrl, external: true })
  }
  if (profile.value.linkedinUrl) {
    links.push({ label: 'LinkedIn', href: profile.value.linkedinUrl, external: true })
  }
  if (profile.value.email) {
    links.push({ label: 'Email', href: `mailto:${profile.value.email}`, external: false })
  }

  return links
})
</script>

<template>
  <div class="about-page">
    <section class="about-intro" aria-labelledby="about-title">
      <p class="eyebrow">
        <span class="eyebrow-dark">04 / Perspective</span>
        <span class="eyebrow-light">04 / Perspective ─── ◈ ───</span>
      </p>
      <h1 id="about-title">About</h1>

      <div v-if="profileLoading" class="state" role="status" aria-live="polite">
        <span class="state-mark" aria-hidden="true"></span>
        Loading profile…
      </div>
      <p v-else-if="profileError" class="state" role="alert">
        Profile information is temporarily unavailable.
      </p>
      <p v-else-if="!profile" class="state">Profile information is not available yet.</p>
      <div v-else class="profile-content">
        <div class="profile-identity">
          <img
            v-if="profile.avatarUrl"
            class="profile-avatar"
            :src="profile.avatarUrl"
            :alt="profile.name"
          />
          <div>
            <h2>{{ profile.name }}</h2>
            <div class="profile-meta">
              <span v-if="profile.headline">{{ profile.headline }}</span>
              <span v-if="profile.location" class="meta-separator" aria-hidden="true">·</span>
              <span v-if="profile.location">{{ profile.location }}</span>
            </div>
          </div>
        </div>

        <p v-if="profile.bio" class="profile-bio">{{ profile.bio }}</p>
        <ul v-if="socialLinks.length" class="social-links" aria-label="Profile links">
          <li v-for="link in socialLinks" :key="link.label">
            <a
              :href="link.href"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noopener noreferrer' : undefined"
            >
              {{ link.label }} <span v-if="link.external" aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
      </div>
    </section>

    <section class="stack-section" aria-labelledby="stack-title">
      <header class="stack-header">
        <div>
          <p class="eyebrow">
            <span class="eyebrow-dark">05 / Inventory</span>
            <span class="eyebrow-light">05 / Inventory ─── ◈ ───</span>
          </p>
          <h2 id="stack-title">Technical Stack</h2>
        </div>
      </header>

      <div v-if="technologyLoading" class="state" role="status" aria-live="polite">
        <span class="state-mark" aria-hidden="true"></span>
        Loading technologies…
      </div>
      <p v-else-if="technologyError" class="state" role="alert">
        The technology inventory is temporarily unavailable.
      </p>
      <p v-else-if="!technologies.length" class="state">No technologies are available yet.</p>
      <ul v-else class="technology-list" aria-label="Technologies">
        <li v-for="technology in technologies" :key="technology.slug" class="technology-item">
          <img
            v-if="technology.iconUrl"
            :src="technology.iconUrl"
            :alt="''"
            aria-hidden="true"
            loading="lazy"
          />
          <span>{{ technology.name }}</span>
        </li>
      </ul>
    </section>

    <section v-if="profile?.email" class="contact-banner" aria-label="Contact">
      <a :href="`mailto:${profile.email}`"
        >Initiate conversation <span aria-hidden="true">→</span></a
      >
    </section>
  </div>
</template>

<style scoped>
.about-page {
  padding-bottom: var(--layout-work-section-space);
}

.about-intro {
  padding-bottom: var(--layout-work-section-space);
  border-bottom: 1px solid var(--color-border);
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

h1,
.stack-header h2 {
  margin: 0;
  color: var(--color-heading);
  font-size: var(--font-size-section-title);
  font-weight: var(--font-weight-section-title);
  line-height: var(--line-height-tight);
}

.profile-content {
  max-width: 56rem;
  margin-top: var(--space-xl);
}

.profile-identity {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-lg);
}

.profile-avatar {
  width: 4rem;
  height: 4rem;
  flex: 0 0 auto;
  border-radius: var(--radius-full);
  object-fit: cover;
}

.profile-identity h2 {
  margin: 0 0 var(--space-xs);
  color: var(--color-heading);
  font-family: var(--font-sans);
  font-size: var(--font-size-project-title);
  font-weight: var(--font-weight-bold);
}

.profile-meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: var(--font-size-label-lg);
}

.profile-bio {
  margin: 0;
  color: var(--color-text-secondary);
  font-family: var(--font-body);
  font-size: var(--font-size-body-lg);
  line-height: var(--line-height-body);
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-lg);
  margin: var(--space-lg) 0 0;
  padding: 0;
  list-style: none;
  font-family: var(--font-mono);
  font-size: var(--font-size-label-lg);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
}

.social-links a {
  color: var(--color-muted);
  transition: color var(--transition-fast);
}

.social-links a:hover {
  color: var(--color-accent-strong);
}

.stack-section {
  padding-top: var(--layout-work-section-space);
}

.stack-header {
  margin-bottom: var(--space-xl);
}

.technology-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin: 0;
  padding: 0;
  list-style: none;
}

.technology-item {
  display: inline-flex;
  min-height: 2rem;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-sm);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  font-family: var(--font-mono);
  font-size: var(--font-size-label-lg);
  line-height: var(--line-height-label);
}

.technology-item img {
  width: 1rem;
  height: 1rem;
  object-fit: contain;
}

.state {
  display: flex;
  min-height: 3rem;
  align-items: center;
  gap: var(--space-sm);
  margin: var(--space-xl) 0 0;
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

.contact-banner {
  display: flex;
  justify-content: flex-end;
  margin-top: var(--space-2xl);
  padding: var(--space-lg);
  border: 1px solid var(--color-border-strong);
  background: var(--color-surface-alt);
}

.contact-banner a {
  color: var(--color-accent-strong);
  font-family: var(--font-mono);
  font-size: var(--font-size-label-lg);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
}

@media (max-width: 39.999rem) {
  .profile-identity {
    align-items: flex-start;
  }
}
</style>
