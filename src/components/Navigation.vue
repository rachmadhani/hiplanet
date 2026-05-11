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
      <img src="/logo/ecosoft_logo_design_original.png" class="brand-logo" alt="ECOSOFT" />
    </a>
    <ul class="nav-links" :class="{ 'mobile-open': isMobileMenuOpen }">
      <li><a href="#home" :class="{ active: activeSection === 'home' }">Home</a></li>
      <li><a href="#universe" :class="{ active: activeSection === 'universe' }">Universe</a></li>
      <li><a href="#games" :class="{ active: activeSection === 'games' }">Games</a></li>
      <li><a href="#community" :class="{ active: activeSection === 'community' }">Community</a></li>
      <li><a href="#devlog" :class="{ active: activeSection === 'devlog' }">Devlog</a></li>
      <li><a href="#community" class="nav-cta discord-btn">Join Discord</a></li>
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
  border-bottom: 1px solid var(--blue);
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
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
  align-items: center;
  height: 100%;
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
  display: flex;
  align-items: center;
}

.nav-links a:hover,
.nav-links a.active {
  color: #fff !important;
  background: var(--neon-blue);
  border-color: var(--neon-blue);
  box-shadow: 0 0 10px var(--blue-glow);
}

.nav-links a:hover {
  background: #0052cc;
  border-color: #0052cc;
}

.nav-cta {
  background: var(--neon-blue) !important;
  color: #fff !important;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
  height: fit-content;
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

.discord-btn {
  background: var(--neon-blue) !important;
  color: #fff !important;
  border-color: rgba(0, 102, 243, 0.3) !important;
}

.discord-btn:hover {
  background: #0052cc !important;
  box-shadow: 0 0 15px var(--blue-glow);
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
    top: 80px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: var(--bg2);
    padding: 2rem;
    border-bottom: 1px solid var(--blue);
    height: auto;
  }
  
  .nav-links.mobile-open {
    display: flex;
  }
  
  .nav-mobile-toggle {
    display: block;
  }
}
</style>
