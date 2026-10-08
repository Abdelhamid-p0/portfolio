<script setup lang="ts">
import { computed } from 'vue'

import { useProfile } from '../../features/profile/composables/useProfile'
import AboutPreviewSection from '../../widgets/about-preview/AboutPreviewSection.vue'
import ExperiencePreviewSection from '../../widgets/experience-preview/ExperiencePreviewSection.vue'
import HeroSection from '../../widgets/hero/HeroSection.vue'
import SelectedProjectsSection from '../../widgets/selected-projects/SelectedProjectsSection.vue'
import SiteFooter from '../../widgets/site-footer/SiteFooter.vue'
import SiteHeader from '../../widgets/site-header/SiteHeader.vue'
import WritingPreviewSection from '../../widgets/writing-preview/WritingPreviewSection.vue'

const { result, loading, error } = useProfile()
const profile = computed(() => result.value?.profile ?? null)
</script>

<template>
  <div class="page-shell">
    <SiteHeader />

    <main class="page-main">
      <HeroSection :profile="profile" :loading="loading" :error="error?.message ?? undefined" />
      <SelectedProjectsSection />
      <ExperiencePreviewSection />
      <WritingPreviewSection />
      <AboutPreviewSection :profile="profile" />
    </main>

    <SiteFooter />
  </div>
</template>

<style scoped>
.page-shell {
  min-height: 100vh;
  background: var(--color-bg);
  color: var(--color-text);
}

.page-main {
  width: min(1200px, calc(100% - 2rem));
  margin: 0 auto;
  padding-bottom: 2rem;
}
</style>
