<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'
import Preloader from './components/Preloader.vue'

const route = useRoute()
const router = useRouter()
const isAdmin = computed(() => route.path.startsWith('/admin'))

const isSiteLoading = ref(true)
const isPageTransitioning = ref(false)

watch(isAdmin, (val) => {
  if (val) {
    document.body.classList.add('admin-body')
  } else {
    document.body.classList.remove('admin-body')
  }
}, { immediate: true })

// Route change loading spinner transition
router.beforeEach((to, from, next) => {
  const isTransitioningFrontend = !to.path.startsWith('/admin') && !from.path.startsWith('/admin')
  
  if (isTransitioningFrontend && !isSiteLoading.value) {
    isPageTransitioning.value = true
  }
  next()
})

router.afterEach(() => {
  setTimeout(() => {
    isPageTransitioning.value = false
  }, 450) // smooth transition duration
})
</script>

<template>
  <!-- Global preloader for initial site access -->
  <Transition name="fade-preloader">
    <Preloader v-if="!isAdmin && isSiteLoading" @loaded="isSiteLoading = false" />
  </Transition>

  <!-- Route transition loading overlay -->
  <Transition name="fade-transition">
    <div v-if="!isAdmin && isPageTransitioning" class="route-transition-overlay">
      <div class="transition-stars"></div>
      <div class="spinner-box">
        <img src="/logo/ecosoft_logo_mobile.png" alt="Loading..." class="transition-logo" />
        <div class="transition-spinner-ring"></div>
      </div>
    </div>
  </Transition>

  <div v-if="isAdmin">
    <RouterView />
  </div>

  <div v-else class="app-container">
    <Navigation />
    <main class="content">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  width: 100%;
}

/* Page Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Route Transition Overlay */
.route-transition-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background-color: rgba(6, 10, 16, 0.82);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.transition-stars {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    radial-gradient(1px 1px at 25% 35%, rgba(255,255,255,0.4), transparent),
    radial-gradient(1px 1px at 75% 65%, rgba(255,255,255,0.3), transparent),
    radial-gradient(1.5px 1.5px at 50% 15%, rgba(0, 200, 255, 0.4), transparent);
}

.spinner-box {
  position: relative;
  width: 65px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.transition-logo {
  width: 44px;
  height: 44px;
  object-fit: contain;
  filter: drop-shadow(0 0 8px rgba(0, 102, 243, 0.7));
  animation: transitionPulse 1.2s infinite ease-in-out;
}

@keyframes transitionPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}

.transition-spinner-ring {
  position: absolute;
  inset: 0;
  border: 2px solid rgba(0, 102, 243, 0.1);
  border-top-color: var(--blue);
  border-radius: 50%;
  animation: spinnerRotate 0.8s linear infinite;
  box-shadow: 0 0 10px rgba(0, 200, 255, 0.15);
}

@keyframes spinnerRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Preloader & Transition Animations */
.fade-preloader-leave-active {
  transition: opacity 0.5s ease-out;
}
.fade-preloader-leave-to {
  opacity: 0;
}

.fade-transition-enter-active,
.fade-transition-leave-active {
  transition: opacity 0.3s ease;
}
.fade-transition-enter-from,
.fade-transition-leave-to {
  opacity: 0;
}
</style>
