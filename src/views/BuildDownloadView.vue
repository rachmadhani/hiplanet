<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const buildId = route.params.buildId as string

onMounted(() => {
  if (buildId) {
    const downloadUrl = `https://antiquewhite-guanaco-250612.hostingersite.com/builds/${buildId}.zip`
    window.location.href = downloadUrl
  }
})
</script>

<template>
  <div class="download-container">
    <div class="download-content">
      <p class="status-text">Nothing to see here. <a href="https://hiplanetgame.com" class="back-link">← Back to Hi Planet</a></p>
    </div>
  </div>
</template>

<style scoped>
.download-container {
  margin: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0A1834;
  color: #FFF5E5;
  font-family: system-ui, -apple-system, sans-serif;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999; /* Cover the whole page including navigation header */
}

.download-content {
  padding: 20px;
}

.status-text {
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  font-size: 1.1rem;
  font-weight: 400;
}

.back-link {
  color: #FF6B35;
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.2s;
  margin-left: 8px;
}

.back-link:hover {
  text-decoration: underline;
  opacity: 0.9;
}
</style>
