<script setup lang="ts">
import MarkdownContent from '../../../shared/ui/molecules/MarkdownContent.vue'

defineProps<{
  content: string
}>()
</script>

<template>
  <MarkdownContent :content="content" />
</template>
