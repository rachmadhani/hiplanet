<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const buildId = route.params.buildId as string

const downloadUrl = computed(() => {
  return buildId ? `https://antiquewhite-guanaco-250612.hostingersite.com/builds/${buildId}.zip` : ''
})

onMounted(() => {
  if (downloadUrl.value) {
    window.location.href = downloadUrl.value
  }
})
</script>

<template>
  <div class="download-container">
    <div class="download-content">
      <!-- Wishlist Image -->
      <div class="image-wrapper">
        <img src="/hero-image/wishlist_image_1.jpg" alt="Hi Planet Wishlist" class="wishlist-image" />
      </div>

      <!-- Info Section -->
      <div class="info-section">
        <h2 class="title-text">Thank you for testing Hi Planet!</h2>
        <p class="download-status">
          Your download should start automatically. If it didn't,
          <a :href="downloadUrl" class="manual-link">click here to download manually</a>.
        </p>
      </div>

      <!-- Divider -->
      <div class="divider"></div>

      <!-- Description Section -->
      <div class="description-section">
        <p class="description-text">
          Hi Planet is a cozy, atmospheric game about restoring a beautiful planet. Build your sanctuary, cultivate life, and watch the ecosystem thrive. Every wishlist makes Steam show Hi Planet to more players — it is the single most helpful thing you can do to support our small team!
        </p>
      </div>

      <!-- Wishlist Button -->
      <div class="action-section">
        <a 
          href="https://store.steampowered.com/app/4745340/Hi_Planet_Save_The_Earth/?beta=1" 
          target="_blank" 
          class="wishlist-btn font-display"
        >
          <img src="/icon/steam-white.png" class="steam-icon" alt="Steam" />
          Wishlist on Steam
        </a>
      </div>

      <!-- Back Link (Kept exactly as requested) -->
      <div class="footer-section">
        <p class="status-text">
          <a href="https://hiplanetgame.com" class="back-link">← Back to Hi Planet</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.download-container {
  margin: 0;
  min-height: 100vh;
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
  overflow-y: auto;
  padding: 40px 20px;
}

.download-content {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 32px;
  max-width: 480px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.image-wrapper {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
}

.wishlist-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.wishlist-image:hover {
  transform: scale(1.02);
}

.title-text {
  font-family: "Space Grotesk", sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  margin: 8px 0 4px 0;
  color: #FFFFFF;
}

.download-status {
  font-size: 0.9rem;
  color: #A0AEC0;
  line-height: 1.5;
  margin: 0;
}

.manual-link {
  color: #FF6B35;
  text-decoration: underline;
  font-weight: 500;
  transition: color 0.2s ease;
}

.manual-link:hover {
  color: #FF8552;
}

.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12) 15%, rgba(255, 255, 255, 0.12) 85%, transparent);
  margin: 8px 0;
}

.description-text {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #E2E8F0;
  margin: 0;
  text-align: left;
}

.action-section {
  margin-top: 8px;
}

.wishlist-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #FF6B35;
  color: #FFFFFF;
  font-weight: 700;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  text-decoration: none;
  transition: background 0.25s ease, transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 14px rgba(255, 107, 53, 0.35);
  width: 100%;
  box-sizing: border-box;
}

.wishlist-btn:hover {
  background: #FF804D;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.5);
}

.wishlist-btn:active {
  transform: translateY(0);
}

.steam-icon {
  width: 18px;
  height: 18px;
  display: block;
}

.status-text {
  font-family: "Space Grotesk", sans-serif;
  font-size: 0.95rem;
  font-weight: 400;
  margin: 8px 0 0 0;
}

.back-link {
  color: #A0AEC0;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: #FFFFFF;
  text-decoration: underline;
}
</style>
