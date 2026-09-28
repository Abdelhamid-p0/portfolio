<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'

import { GET_PROFILE, type ProfileQueryResult } from './api/graphql/queries/profile.query'

const { result, loading, error } = useQuery<ProfileQueryResult>(GET_PROFILE)

const profile = computed(() => result.value?.profile ?? null)
</script>

<template>
  <main>
    <h1>Apollo GraphQL connectivity check</h1>

    <p v-if="loading">Loading...</p>
    <p v-else-if="error">Error: {{ error.message }}</p>

    <div v-else-if="profile">
      <p><strong>Name:</strong> {{ profile.name }}</p>
      <p><strong>Headline:</strong> {{ profile.headline || 'N/A' }}</p>
      <p><strong>Location:</strong> {{ profile.location || 'N/A' }}</p>
    </div>

    <p v-else>No profile data returned.</p>
  </main>
</template>

<style scoped>
main {
  margin: 2rem auto;
  max-width: 640px;
  padding: 1.5rem;
  font-family: sans-serif;
}

h1 {
  margin-bottom: 1rem;
}

p {
  margin: 0.5rem 0;
}
</style>
