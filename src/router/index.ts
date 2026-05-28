import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/comic',
      name: 'comic',
      component: () => import('../views/ComicView.vue')
    },
    {
      path: '/world-lore',
      name: 'world-lore',
      component: () => import('../views/WorldLoreView.vue')
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('../views/GameView.vue')
    },
    {
      path: '/become-a-tester',
      name: 'become-a-tester',
      component: () => import('../views/TesterView.vue')
    },
    {
      path: '/builds/:buildId',
      name: 'build-download',
      component: () => import('../views/BuildDownloadView.vue')
    }
  ]
})

export default router
