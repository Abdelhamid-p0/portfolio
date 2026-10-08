<script setup lang="ts">
import { computed, toRef } from 'vue'
import { RouterLink } from 'vue-router'

import PostContent from '../../features/writing/components/PostContent.vue'
import { usePost } from '../../features/writing/composables/usePost'

const props = defineProps<{ slug: string }>()
const { result, loading, error } = usePost(toRef(props, 'slug'))
const post = computed(() => result.value?.post ?? null)

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date))
}
</script>

<template>
  <article class="post-detail">
    <div v-if="loading" class="state" role="status" aria-live="polite">
      <span class="state-mark" aria-hidden="true"></span>
      Loading article…
    </div>
    <p v-else-if="error" class="state" role="alert">This article is temporarily unavailable.</p>
    <p v-else-if="!post" class="state">This article is unavailable or has not been published.</p>
    <template v-else>
      <RouterLink class="back-link" to="/writing">← Back to writing</RouterLink>

      <header class="post-header">
        <div class="post-meta">
          <time :datetime="post.publishedAt || post.createdAt">
            {{ formatDate(post.publishedAt || post.createdAt) }}
          </time>
          <ul v-if="post.domains.length" class="domain-list" aria-label="Post domains">
            <li v-for="domain in post.domains" :key="domain.slug" class="domain-badge">
              {{ domain.name }}
            </li>
          </ul>
        </div>
        <h1>{{ post.title }}</h1>
        <p v-if="post.excerpt" class="post-excerpt">{{ post.excerpt }}</p>
      </header>

      <figure v-if="post.coverImageUrl" class="post-cover">
        <img :src="post.coverImageUrl" :alt="post.title" />
      </figure>

      <PostContent v-if="post.content" :content="post.content" />
    </template>
  </article>
</template>

<style scoped>
.post-detail {
  max-width: 52rem;
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

.post-header {
  padding-bottom: var(--space-xl);
  border-bottom: 1px solid var(--color-border);
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: var(--font-size-post-date);
}

.domain-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin: 0;
  padding: 0;
  list-style: none;
}

.domain-badge {
  padding: var(--space-2xs) var(--space-xs);
  border: 1px solid var(--color-border-subtle);
  background: var(--color-post-domain-bg);
  color: var(--color-post-domain-text);
  font-size: var(--font-size-post-domain);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
}

h1 {
  margin: 0 0 var(--space-md);
  color: var(--color-heading);
  font-family: var(--font-sans);
  font-size: var(--font-size-display-mobile);
  font-weight: var(--font-weight-display);
  line-height: var(--line-height-tight);
}

.post-excerpt {
  margin: 0;
  color: var(--color-text-secondary);
  font-family: var(--font-body);
  font-size: var(--font-size-body-lg);
  line-height: var(--line-height-body);
}

.post-cover {
  overflow: hidden;
  aspect-ratio: 16 / 9;
  margin: var(--space-xl) 0;
  border: 1px solid var(--color-border);
}

.post-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
