<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const activeSection = ref('home')
const isMobileMenuOpen = ref(false)

const sections = ['home', 'universe', 'games', 'community', 'devlog']

const handleScroll = () => {
  let current = ''
  sections.forEach(id => {
    const el = document.getElementById(id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 100) current = id
    }
  })
  activeSection.value = current
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav>
    <a href="#home" class="nav-logo">
      <img src="/logo/ecosoft_logo_design_white.png" class="brand-logo" alt="ECOSOFT" />
    </a>
    <ul class="nav-links" :class="{ 'mobile-open': isMobileMenuOpen }">
      <li><a href="#home" :style="{ color: activeSection === 'home' ? 'var(--green)' : '' }">Home</a></li>
      <li><a href="#universe" :style="{ color: activeSection === 'universe' ? 'var(--green)' : '' }">Universe</a></li>
      <li><a href="#games" :style="{ color: activeSection === 'games' ? 'var(--green)' : '' }">Games</a></li>
      <li><a href="#community" :style="{ color: activeSection === 'community' ? 'var(--green)' : '' }">Community</a></li>
      <li><a href="#devlog" :style="{ color: activeSection === 'devlog' ? 'var(--green)' : '' }">Devlog</a></li>
      <li><a href="#community" class="nav-cta">Join Discord</a></li>
      <li>
        <a href="https://store.steampowered.com" target="_blank" class="nav-cta steam-btn">
          <img src="/icon/steam-white.png" class="steam-icon" alt="Steam" />
          Wishlist On Steam
        </a>
      </li>
    </ul>
    <button class="nav-mobile-toggle" @click="isMobileMenuOpen = !isMobileMenuOpen">
      {{ isMobileMenuOpen ? '✕' : '☰' }} Menu
    </button>
  </nav>
</template>

<style scoped>
nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  background: rgba(6,10,16,0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.nav-logo {
  display: flex;
  align-items: center;
  height: 100%;
}

.brand-logo {
  height: 55px;
  width: auto;
  object-fit: contain;
}

@keyframes pulse {
  0%,100% { opacity:1; transform:scale(1); }
  50% { opacity:0.5; transform:scale(0.7); }
}

.nav-links {
  display: flex;
  gap: 0.25rem;
  list-style: none;
}

.nav-links a {
  font-family: 'Space Mono', monospace;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--muted);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.nav-links a:hover {
  color: var(--green);
  border-color: var(--border);
  background: rgba(15,255,108,0.05);
}

.nav-cta {
  background: var(--green) !important;
  color: var(--bg) !important;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
}

.steam-btn {
  background: #171a21 !important;
  color: #fff !important;
  border: 1px solid #66c0f4 !important;
}

.steam-icon {
  width: 18px;
  height: 18px;
}

.nav-cta:hover {
  background: #00cc55 !important;
  border-color: transparent !important;
}

.steam-btn:hover {
  background: #2a475e !important;
  border-color: #66c0f4 !important;
  box-shadow: 0 0 15px rgba(102, 192, 244, 0.4);
}

.nav-mobile-toggle {
  display: none;
  background: none;
  border: 1px solid var(--border);
  color: var(--text);
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
}

@media (max-width: 900px) {
  .nav-links {
    display: none;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: var(--bg2);
    padding: 2rem;
    border-bottom: 1px solid var(--border);
  }
  
  .nav-links.mobile-open {
    display: flex;
  }
  
  .nav-mobile-toggle {
    display: block;
  }
}
</style>
