<script setup lang="ts">
import SiteFooter from '../../widgets/site-footer/SiteFooter.vue'
import SiteHeader from '../../widgets/site-header/SiteHeader.vue'
</script>

<template>
  <div>
    <SiteHeader />
    <main class="page-shell">
      <section class="content-card">
        <h1>Writing</h1>
        <p>Writing list and article pages are planned for the next implementation step.</p>
      </section>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.page-shell {
  width: min(1200px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 5rem 0 3rem;
}

.content-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 2rem;
}

h1 {
  margin: 0 0 0.5rem;
}

p {
  margin: 0;
  color: var(--color-text-muted);
}
</style>
