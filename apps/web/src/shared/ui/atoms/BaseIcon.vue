<script setup lang="ts">
interface Props {
  symbol: string
}

defineProps<Props>()
</script>

<template>
  <span class="material-symbols-outlined base-icon" aria-hidden="true">{{ symbol }}</span>
</template>

<style scoped>
.base-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}
</style>
