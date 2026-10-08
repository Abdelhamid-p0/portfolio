<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  profile: {
    type: Object as PropType<{
      name?: string | null
      headline?: string | null
      location?: string | null
    } | null>,
    default: null,
  },
  loading: { type: Boolean, default: false },
  error: { type: String as PropType<string | null>, default: undefined },
})
</script>

<template>
  <section class="hero">
    <div class="status-row">
      <span class="status-pill">Available for new roles</span>
      <span class="status-label">Software Engineer · Full-Stack · Generative AI</span>
    </div>

    <h1>Building software. Exploring what’s next.</h1>

    <div v-if="loading" class="state">Loading profile…</div>
    <div v-else-if="error" class="state error">Error: {{ error }}</div>
    <div v-else-if="profile" class="profile-meta">
      <p><strong>Name:</strong> {{ profile.name }}</p>
      <p><strong>Headline:</strong> {{ profile.headline || 'N/A' }}</p>
      <p><strong>Location:</strong> {{ profile.location || 'N/A' }}</p>
    </div>
    <div v-else class="state">No profile data available.</div>
  </section>
</template>

<style scoped>
.hero {
  padding: 4rem 0 2.5rem;
  border-bottom: 1px solid var(--color-border);
}

.status-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: rgba(115, 219, 154, 0.08);
  color: var(--color-accent);
  font-size: 0.7rem;
  font-family: var(--font-mono);
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.status-label {
  color: var(--color-text-muted);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h1 {
  margin: 0 0 1rem;
  max-width: 700px;
  font-size: clamp(2.25rem, 6vw, 4.75rem);
  line-height: 0.98;
  letter-spacing: -0.06em;
}

.profile-meta {
  display: grid;
  gap: 0.5rem;
  color: var(--color-text-muted);
}

.profile-meta strong {
  color: var(--color-text);
}

.state {
  color: var(--color-text-muted);
  font-family: var(--font-mono);
}

.state.error {
  color: #ffb4ab;
}
</style>
