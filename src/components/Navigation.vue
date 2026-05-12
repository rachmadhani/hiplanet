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
      <img src="/logo/ecosoft_logo_design_original.png" class="brand-logo desktop-logo" alt="ECOSOFT" />
      <img src="/logo/ecosoft_logo_mobile.png" class="brand-logo mobile-logo" alt="ECOSOFT" />
    </a>
    <ul class="nav-links" :class="{ 'mobile-open': isMobileMenuOpen }">
      <li><a href="#home" :class="{ active: activeSection === 'home' }">Home</a></li>
      <li class="dropdown">
        <a href="#universe" :class="{ active: activeSection === 'universe' }">
          Universe <span class="dropdown-arrow"></span>
        </a>
        <ul class="dropdown-menu">
          <li><a href="#comic">Comic Book</a></li>
          <li><a href="#concept">Concept Art</a></li>
          <li><a href="#wiki">World Lore</a></li>
          <li><a href="#characters">Characters</a></li>
        </ul>
      </li>
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

.mobile-logo {
  display: none;
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

.nav-links li a:hover,
.nav-links li a.active {
  color: var(--neon-blue);
}

/* DROPDOWN */
.dropdown {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}

.dropdown-arrow {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 6px;
  vertical-align: middle;
  border-top: 4px solid currentColor;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  transition: transform 0.3s ease;
}

.dropdown:hover .dropdown-arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: rgba(10, 24, 52, 0.98);
  border: 1px solid var(--neon-blue);
  backdrop-filter: blur(20px);
  min-width: 180px;
  list-style: none;
  padding: 0.75rem 0;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 4px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.dropdown-menu li a {
  display: block;
  padding: 0.6rem 1.5rem !important;
  font-size: 0.85rem !important;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #fff !important;
  transition: all 0.2s ease !important;
  border-bottom: none !important;
}

.dropdown-menu li a:hover {
  background: rgba(0, 102, 243, 0.15);
  color: var(--neon-blue) !important;
  padding-left: 1.8rem !important;
}

.nav-links a:hover,
.nav-links a.active {
  color: #fff !important;
  background: var(--neon-blue);
  border-color: var(--neon-blue);
  box-shadow: 0 0 15px var(--blue-glow);
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

  .desktop-logo {
    display: none;
  }

  .mobile-logo {
    display: block;
    height: 40px;
  }
}
</style>
