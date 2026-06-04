import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminWrapper from '../admin/AdminWrapper.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
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
      path: '/characters',
      name: 'characters',
      component: () => import('../views/CharactersView.vue')
    },
    {
      path: '/concept-art',
      name: 'concept-art',
      component: () => import('../views/ConceptArtView.vue')
    },
    {
      path: '/devlog',
      name: 'devlog',
      component: () => import('../views/DevlogView.vue')
    },
    {
      path: '/econews',
      name: 'econews',
      component: () => import('../views/EcoNewsView.vue')
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
      path: '/become-a-tester/apply',
      name: 'become-a-tester-apply',
      component: () => import('../views/TesterApplyView.vue')
    },
    {
      path: '/builds/:buildId',
      name: 'build-download',
      component: () => import('../views/BuildDownloadView.vue')
    },
    {
      path: '/admin',
      component: AdminWrapper,
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('@admin/views/Ecommerce.vue')
        },
        {
          path: 'calendar',
          name: 'admin-calendar',
          component: () => import('@admin/views/Others/Calendar.vue')
        },
        {
          path: 'profile',
          name: 'admin-profile',
          component: () => import('@admin/views/Others/UserProfile.vue')
        },
        {
          path: 'form-elements',
          name: 'admin-form-elements',
          component: () => import('@admin/views/Forms/FormElements.vue')
        },
        {
          path: 'basic-tables',
          name: 'admin-basic-tables',
          component: () => import('@admin/views/Tables/BasicTables.vue')
        },
        {
          path: 'line-chart',
          name: 'admin-line-chart',
          component: () => import('@admin/views/Chart/LineChart/LineChart.vue')
        },
        {
          path: 'bar-chart',
          name: 'admin-bar-chart',
          component: () => import('@admin/views/Chart/BarChart/BarChart.vue')
        },
        {
          path: 'alerts',
          name: 'admin-alerts',
          component: () => import('@admin/views/UiElements/Alerts.vue')
        },
        {
          path: 'avatars',
          name: 'admin-avatars',
          component: () => import('@admin/views/UiElements/Avatars.vue')
        },
        {
          path: 'badge',
          name: 'admin-badge',
          component: () => import('@admin/views/UiElements/Badges.vue')
        },
        {
          path: 'buttons',
          name: 'admin-buttons',
          component: () => import('@admin/views/UiElements/Buttons.vue')
        },
        {
          path: 'images',
          name: 'admin-images',
          component: () => import('@admin/views/UiElements/Images.vue')
        },
        {
          path: 'videos',
          name: 'admin-videos',
          component: () => import('@admin/views/UiElements/Videos.vue')
        },
        {
          path: 'blank',
          name: 'admin-blank',
          component: () => import('@admin/views/Pages/BlankPage.vue')
        },
        {
          path: 'error-404',
          name: 'admin-404',
          component: () => import('@admin/views/Errors/FourZeroFour.vue')
        },
        {
          path: 'signin',
          name: 'admin-signin',
          component: () => import('@admin/views/Auth/Signin.vue')
        },
        {
          path: 'signup',
          name: 'admin-signup',
          component: () => import('@admin/views/Auth/Signup.vue')
        },
        {
          path: 'tester-applications',
          name: 'admin-tester-applications',
          component: () => import('@admin/views/TesterApplications.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Normalize path by lowercasing and stripping trailing slashes for safety
  const path = to.path.toLowerCase().replace(/\/$/, '')
  const isAuthRoute = to.name === 'admin-signin' || 
                      to.name === 'admin-signup' || 
                      path === '/admin/signin' || 
                      path === '/admin/signup'
  
  const isAdminPath = path === '/admin' || path.startsWith('/admin/')
  
  if (isAdminPath && !isAuthRoute) {
    if (!authStore.isAuthenticated) {
      next({ name: 'admin-signin' })
    } else {
      next()
    }
  } else if (isAdminPath && isAuthRoute && authStore.isAuthenticated) {
    next({ name: 'admin-dashboard' })
  } else {
    next()
  }
})

export default router
