<script setup lang="ts">
import { computed } from 'vue'

import PostList from '../../features/writing/components/PostList.vue'
import { usePosts } from '../../features/writing/composables/usePosts'

const { result, loading, error } = usePosts()
const posts = computed(() => result.value?.posts ?? [])
</script>

<template>
  <section class="writing-page" aria-labelledby="writing-page-title">
    <header class="section-header">
      <div>
        <p class="eyebrow">
          <span class="eyebrow-dark">03 / Thoughts</span>
          <span class="eyebrow-light">03 / Writing &amp; notes ─── ◈ ───</span>
        </p>
        <h1 id="writing-page-title">
          <span class="title-dark">Writing</span>
          <span class="title-light">Engineering Notes</span>
        </h1>
      </div>
      <p class="section-description">
        <span class="description-dark">Things I build, break, learn and rethink. Engineering notes over generic tutorials.</span>
        <span class="description-light">Things I build, break, learn and rethink. Thoughtful engineering notes over generic tutorials.</span>
      </p>
    </header>

    <div v-if="loading" class="state" role="status" aria-live="polite">
      <span class="state-mark" aria-hidden="true"></span>
      Loading writing…
    </div>
    <p v-else-if="error" class="state" role="alert">
      Writing is temporarily unavailable.
    </p>
    <p v-else-if="!posts.length" class="state">
      No published writing is available yet.
    </p>
    <PostList v-else :posts="posts" filterable />
  </section>
</template>

<style scoped>
.writing-page {
  padding-bottom: var(--layout-work-section-space);
}

.section-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  margin-bottom: var(--layout-work-header-space);
}

.eyebrow {
  margin: 0 0 var(--space-2xs);
  color: var(--color-section-eyebrow);
  font-family: var(--font-mono);
  font-size: var(--font-size-label-lg);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

.eyebrow-light,
.title-light,
.description-light {
  display: none;
}

:global(:root[data-theme='light'] .eyebrow-dark),
:global(:root[data-theme='light'] .title-dark),
:global(:root[data-theme='light'] .description-dark) {
  display: none;
}

:global(:root[data-theme='light'] .eyebrow-light),
:global(:root[data-theme='light'] .title-light),
:global(:root[data-theme='light'] .description-light) {
  display: inline;
}

h1 {
  margin: 0;
  color: var(--color-heading);
  font-size: var(--font-size-section-title);
  font-weight: var(--font-weight-section-title);
  line-height: var(--line-height-tight);
}

.section-description {
  max-width: 28rem;
  margin: 0;
  color: var(--color-text-secondary);
  font-family: var(--font-section-description);
  font-size: var(--font-size-section-description);
  line-height: var(--line-height-body);
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
  line-height: var(--line-height-body);
}

.state-mark {
  width: 0.5rem;
  height: 0.5rem;
  flex: 0 0 auto;
  border-radius: var(--radius-full);
  background: var(--color-accent);
}

@media (min-width: 48rem) {
  .section-header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}
</style>