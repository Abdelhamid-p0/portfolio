<script setup lang="ts">
import { RouterLink } from 'vue-router'

import type { PostEntity } from '../../../entities/post/types'

defineProps<{
  post: PostEntity
}>()

function formatDate(post: PostEntity) {
  const date = post.publishedAt || post.createdAt
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date))
}
</script>

<template>
  <article class="post-card">
    <div class="post-meta">
      <time :datetime="post.publishedAt || post.createdAt">{{ formatDate(post) }}</time>
      <ul v-if="post.domains.length" class="domain-list" aria-label="Post domains">
        <li v-for="domain in post.domains" :key="domain.slug" class="domain-badge">
          {{ domain.name }}
        </li>
      </ul>
    </div>

    <h3>
      <RouterLink :to="{ name: 'post-detail', params: { slug: post.slug } }">
        {{ post.title }}
      </RouterLink>
    </h3>
    <p v-if="post.excerpt" class="post-excerpt">{{ post.excerpt }}</p>

    <figure v-if="post.coverImageUrl" class="post-cover">
      <img :src="post.coverImageUrl" :alt="post.title" loading="lazy" />
    </figure>

    <RouterLink
      class="post-open-link"
      :to="{ name: 'post-detail', params: { slug: post.slug } }"
      :aria-label="`Read ${post.title}`"
    >
      <span aria-hidden="true">↗</span>
    </RouterLink>
  </article>
</template>

<style scoped>
.post-card {
  position: relative;
  padding: var(--space-sm);
  margin-inline: calc(-1 * var(--space-sm));
  transition: background-color var(--transition-standard);
}

.post-card:hover {
  background: var(--color-post-hover);
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--space-sm);
  margin-bottom: var(--space-xs);
  color: var(--color-muted);
  font-family: var(--font-mono);
  font-size: var(--font-size-post-date);
  line-height: var(--line-height-label);
}

.post-meta time {
  flex: 0 0 auto;
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

h3 {
  margin: 0 0 var(--space-xs);
  color: var(--color-heading);
  font-family: var(--font-sans);
  font-size: var(--font-size-post-title);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
}

h3 a {
  transition: color var(--transition-standard);
}

h3 a:hover {
  color: var(--color-accent-strong);
}

.post-excerpt {
  margin: 0;
  padding-right: var(--space-xl);
  color: var(--color-text-secondary);
  font-family: var(--font-body);
  font-size: var(--font-size-body);
  line-height: var(--line-height-body);
}

.post-open-link {
  position: absolute;
  right: var(--space-sm);
  bottom: var(--space-sm);
  display: grid;
  width: 1.5rem;
  height: 1.5rem;
  place-items: center;
  color: var(--color-muted);
  opacity: 0;
  transition:
    color var(--transition-fast),
    opacity var(--transition-fast);
}

.post-card:hover .post-open-link,
.post-open-link:focus-visible {
  color: var(--color-accent-strong);
  opacity: 1;
}

.post-cover {
  overflow: hidden;
  aspect-ratio: 16 / 9;
  margin: var(--space-md) 0 0;
  border: 1px solid var(--color-border-subtle);
}

.post-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 39.999rem) {
  .post-open-link {
    opacity: 1;
  }
}
</style>