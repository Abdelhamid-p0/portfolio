<script setup lang="ts">
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'

const props = defineProps<{
  content: string
}>()

const markdown = new MarkdownIt({ html: false })
const renderNestedHeading: NonNullable<typeof markdown.renderer.rules.heading_open> = (
  tokens,
  tokenIndex,
  options,
  _environment,
  renderer,
) => {
  const token = tokens[tokenIndex]!
  const level = Math.min(Number(token.tag.slice(1)) + 1, 6)
  token.tag = `h${level}`
  return renderer.renderToken(tokens, tokenIndex, options)
}

markdown.renderer.rules.heading_open = renderNestedHeading
markdown.renderer.rules.heading_close = renderNestedHeading
const renderedContent = computed(() => markdown.render(props.content))
</script>

<template>
  <div class="markdown-content" v-html="renderedContent"></div>
</template>

<style scoped>
.markdown-content {
  color: var(--color-text-secondary);
  font-family: var(--font-body);
  font-size: var(--font-size-body);
  line-height: var(--line-height-body);
  overflow-wrap: anywhere;
}

.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4) {
  margin: var(--space-2xl) 0 var(--space-md);
  color: var(--color-heading);
  font-family: var(--font-sans);
  font-size: var(--font-size-project-title);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
}

.markdown-content :deep(p) {
  margin: 0 0 var(--space-md);
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  display: grid;
  gap: var(--space-sm);
  margin: 0 0 var(--space-lg);
  padding-left: var(--space-lg);
}

.markdown-content :deep(a) {
  color: var(--color-accent-strong);
  text-decoration: underline;
  text-underline-offset: 0.15em;
}

.markdown-content :deep(blockquote) {
  margin: var(--space-lg) 0;
  padding-left: var(--space-md);
  border-left: 2px solid var(--color-border-strong);
  color: var(--color-muted);
}

.markdown-content :deep(code) {
  padding: 0 var(--space-xs);
  background: var(--color-surface-alt);
  color: var(--color-heading);
  font-family: var(--font-mono);
  font-size: 0.9em;
}

.markdown-content :deep(pre) {
  overflow-x: auto;
  margin: var(--space-lg) 0;
  padding: var(--space-md);
  border: 1px solid var(--color-border);
  background: var(--color-surface-soft);
}

.markdown-content :deep(pre code) {
  padding: 0;
  background: transparent;
}
</style>