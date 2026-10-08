import { createRouter, createWebHistory } from 'vue-router'

import AboutPage from '../../pages/about/AboutPage.vue'
import ExperiencePage from '../../pages/experience/ExperiencePage.vue'
import HomePage from '../../pages/home/HomePage.vue'
import NotFoundPage from '../../pages/not-found/NotFoundPage.vue'
import PostDetailPage from '../../pages/post-detail/PostDetailPage.vue'
import ProjectDetailPage from '../../pages/project-detail/ProjectDetailPage.vue'
import ProjectsPage from '../../pages/projects/ProjectsPage.vue'
import WritingPage from '../../pages/writing/WritingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsPage,
    },
    {
      path: '/projects/:slug',
      name: 'project-detail',
      component: ProjectDetailPage,
      props: true,
    },
    {
      path: '/experience',
      name: 'experience',
      component: ExperiencePage,
    },
    {
      path: '/writing',
      name: 'writing',
      component: WritingPage,
    },
    {
      path: '/writing/:slug',
      name: 'post-detail',
      component: PostDetailPage,
      props: true,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPage,
    },
  ],
})

export default router
