<script setup lang="ts">
import { computed, ref } from 'vue'

import type { DomainEntity } from '../../../entities/domain/types'
import type { PostEntity } from '../../../entities/post/types'
import PostCard from './PostCard.vue'

const props = withDefaults(
  defineProps<{
    posts: PostEntity[]
    filterable?: boolean
  }>(),
  { filterable: false },
)

const activeDomain = ref<string | null>(null)

const domainFilters = computed(() => {
  const domains = new Map<string, { domain: DomainEntity; count: number }>()

  for (const post of props.posts) {
    for (const domain of post.domains) {
      const existing = domains.get(domain.slug)
      domains.set(domain.slug, { domain, count: (existing?.count ?? 0) + 1 })
    }
  }

  return [...domains.values()].sort((first, second) =>
    first.domain.name.localeCompare(second.domain.name),
  )
})

const visiblePosts = computed(() =>
  activeDomain.value
    ? props.posts.filter((post) => post.domains.some((domain) => domain.slug === activeDomain.value))
    : props.posts,
)
</script>

<template>
  <div class="post-list-wrap">
    <div v-if="filterable && posts.length" class="domain-filters" aria-label="Filter posts by domain">
      <button
        class="domain-filter"
        :class="{ 'is-active': activeDomain === null }"
        type="button"
        :aria-pressed="activeDomain === null"
        @click="activeDomain = null"
      >
        All ({{ posts.length }})
      </button>
      <button
        v-for="filter in domainFilters"
        :key="filter.domain.slug"
        class="domain-filter"
        :class="{ 'is-active': activeDomain === filter.domain.slug }"
        type="button"
        :aria-pressed="activeDomain === filter.domain.slug"
        @click="activeDomain = filter.domain.slug"
      >
        {{ filter.domain.name }} ({{ filter.count }})
      </button>
    </div>

    <ol class="post-list" aria-label="Published writing">
      <li v-for="post in visiblePosts" :key="post.slug">
        <PostCard :post="post" />
      </li>
    </ol>
  </div>
</template>

<style scoped>
.post-list-wrap {
  min-width: 0;
}

.domain-filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-bottom: var(--space-xl);
  padding-bottom: var(--space-sm);
  border-bottom: 1px solid var(--color-border);
}

.domain-filter {
  padding: var(--space-2xs) var(--space-sm);
  border: 0;
  background: transparent;
  color: var(--color-text-secondary);
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: var(--font-size-label-lg);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  transition:
    color var(--transition-fast),
    background-color var(--transition-fast);
}

.domain-filter:hover {
  background: var(--color-surface);
  color: var(--color-text);
}

.domain-filter.is-active {
  background: var(--color-surface-alt);
  color: var(--color-accent-strong);
  font-weight: var(--font-weight-bold);
}

.post-list {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  border-block: 1px solid var(--color-border);
  list-style: none;
}

.post-list li + li {
  border-top: 1px solid var(--color-border);
}
</style>