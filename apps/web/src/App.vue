<script setup lang="ts">
import SiteHeader from './widgets/site-header/SiteHeader.vue'
</script>

<template>
  <div class="app-shell">
    <SiteHeader />
    <main class="site-main">
      <div class="site-container">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style>
.app-shell {
  min-height: 100vh;
  background: var(--color-bg);
  color: var(--color-text);
}

.site-main {
  min-height: 100vh;
  padding-top: var(--header-height);
}

.site-container {
  width: min(var(--layout-max-width), calc(100% - 2 * var(--layout-gutter)));
  margin-inline: auto;
  padding-block: var(--layout-section-space);
}
</style>
