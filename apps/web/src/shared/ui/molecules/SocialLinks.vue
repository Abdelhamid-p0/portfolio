<script setup lang="ts">
interface SocialLink {
  label: string
  href: string
}

const links: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Email', href: 'mailto:contact@abdelhamid.engineer' },
]
</script>

<template>
  <ul class="social-links">
    <li v-for="link in links" :key="link.label">
      <a :href="link.href" target="_blank" rel="noreferrer">{{ link.label }}</a>
    </li>
  </ul>
</template>

<style scoped>
.social-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.social-links a {
  color: var(--color-text-muted);
}
</style>
