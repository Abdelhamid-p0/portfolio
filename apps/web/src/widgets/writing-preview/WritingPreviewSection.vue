<script setup lang="ts">
import { computed } from 'vue'

import { usePosts } from '../../features/writing/composables/usePosts'

const { result, loading, error } = usePosts()
const posts = computed(() => result.value?.posts ?? [])
</script>

<template>
  <section class="panel">
    <header class="section-header">
      <p class="eyebrow">03 / Writing</p>
      <h2>Writing</h2>
    </header>

    <div v-if="loading" class="state">Loading posts…</div>
    <div v-else-if="error" class="state error">Error: {{ error.message }}</div>
    <ul v-else class="post-list">
      <li v-for="post in posts.slice(0, 3)" :key="post.slug">
        <h3>{{ post.title }}</h3>
        <p>{{ post.excerpt || 'Post summary will be added in the next phase.' }}</p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.panel {
  padding: 3rem 0;
  border-bottom: 1px solid var(--color-border);
}

.section-header {
  margin-bottom: 1.5rem;
}

.eyebrow {
  margin: 0 0 0.5rem;
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h2 {
  margin: 0;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  letter-spacing: -0.05em;
}

.post-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;
}

.post-list li {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 1rem;
}

h3 {
  margin: 0 0 0.5rem;
}

p {
  margin: 0;
  color: var(--color-text-muted);
}

.state {
  color: var(--color-text-muted);
  font-family: var(--font-mono);
}

.state.error {
  color: #ffb4ab;
}
</style>
