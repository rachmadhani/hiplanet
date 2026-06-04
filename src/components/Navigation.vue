<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

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
    <RouterLink to="/" class="nav-logo">
      <img src="/logo/ecosoft_logo_design_original.png" class="brand-logo desktop-logo" alt="ECOSOFT" />
      <img src="/logo/ecosoft_logo_mobile.png" class="brand-logo mobile-logo" alt="ECOSOFT" />
    </RouterLink>
    <ul class="nav-links" :class="{ 'mobile-open': isMobileMenuOpen }">
      <li><RouterLink to="/">Home</RouterLink></li>
      <li class="dropdown">
        <RouterLink to="/world-lore">
          Universe <span class="dropdown-arrow"></span>
        </RouterLink>
        <ul class="dropdown-menu">
          <li><RouterLink to="/comic">Comic Book</RouterLink></li>
          <li><RouterLink to="/concept-art">Concept Art</RouterLink></li>
          <li><RouterLink to="/world-lore">World Lore</RouterLink></li>
          <li><RouterLink to="/characters">Characters</RouterLink></li>
        </ul>
      </li>
      <li><RouterLink to="/game">Games</RouterLink></li>
      <li class="dropdown">
        <RouterLink to="/community">
          Community <span class="dropdown-arrow"></span>
        </RouterLink>
         <ul class="dropdown-menu">
          <li><RouterLink to="/become-a-tester">Become a tester</RouterLink></li>
          <li><a href="https://www.luvblu.com/" target="_blank">#Luvblu</a></li>
        </ul>
      </li>
      <li><RouterLink to="/devlog">Devlog</RouterLink></li>
      <li><RouterLink to="/econews">Eco News</RouterLink></li>
      <li><a href="https://discord.gg/ZkpAZFrda" target="_blank" class="nav-cta discord-btn">Join Discord</a></li>
      <li>
        <a href="https://store.steampowered.com/app/4745340/Hi_Planet_Save_The_Earth/?beta=1" target="_blank" class="nav-cta steam-btn">
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
  padding: 0 clamp(1.5rem, 3vw, 3rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: clamp(75px, 6vw, 90px);
}

.nav-logo {
  display: flex;
  align-items: center;
  height: 100%;
}

.brand-logo {
  height: clamp(44px, 3.8vw, 60px);
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
  gap: clamp(0.4rem, 0.8vw, 1.25rem);
  list-style: none;
  align-items: center;
  height: 100%;
}

.nav-links a {
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.68rem, 0.75vw, 0.8rem);
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--muted);
  text-decoration: none;
  padding: 0.6rem clamp(0.6rem, 1vw, 1.25rem);
  border-radius: 6px;
  transition: all 0.2s;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
}

.nav-links li a:hover,
.nav-links li a.active,
.nav-links li a.router-link-active {
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
  min-width: 210px;
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

.nav-links > li > a:hover,
.nav-links > li > a.active,
.nav-links > li > a.router-link-active {
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
    top: 100%;
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
