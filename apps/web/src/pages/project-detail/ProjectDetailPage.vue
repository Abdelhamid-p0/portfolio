<script setup lang="ts">
import { computed, toRef } from 'vue'

import ProjectDetail from '../../features/projects/components/ProjectDetail.vue'
import { useProject } from '../../features/projects/composables/useProject'
import NotFoundPage from '../not-found/NotFoundPage.vue'

const props = defineProps<{ slug: string }>()
const { result, loading, error } = useProject(toRef(props, 'slug'))
const project = computed(() => result.value?.project ?? null)
</script>

<template>
  <div>
    <div v-if="loading" class="state" role="status" aria-live="polite">
      <span class="state-mark" aria-hidden="true"></span>
      Loading project…
    </div>
    <p v-else-if="error" class="state" role="alert">
      Project information is temporarily unavailable.
    </p>
    <NotFoundPage v-else-if="!project" />
    <ProjectDetail v-else :project="project" />
  </div>
</template>

<style scoped>
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
