<script setup lang="ts">
import { computed, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'

const route = useRoute()
const isAdmin = computed(() => route.path.startsWith('/admin'))

watch(isAdmin, (val) => {
  if (val) {
    document.body.classList.add('admin-body')
  } else {
    document.body.classList.remove('admin-body')
  }
}, { immediate: true })
</script>

<template>
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
</style>
