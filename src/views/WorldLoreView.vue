<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

let observer: IntersectionObserver | null = null

const activePopupImage = ref<string | null>(null)
const activePopupTitle = ref<string>('')

const openPopup = (imgUrl: string, title: string) => {
  activePopupImage.value = imgUrl
  activePopupTitle.value = title
  document.body.style.overflow = 'hidden'
}

const closePopup = () => {
  activePopupImage.value = null
  activePopupTitle.value = ''
  document.body.style.overflow = ''
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && activePopupImage.value) {
    closePopup()
  }
}

const handleParallax = () => {
  const scroll = window.scrollY
  const stars = document.querySelector('.stars-overlay') as HTMLElement
  if (stars) {
    stars.style.transform = `translateY(${scroll * 0.25}px)`
  }
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.05 }
  )

  window.addEventListener('scroll', handleParallax)
  window.addEventListener('keydown', handleKeydown)
  document.querySelectorAll('.fade-up-lore').forEach((el) => observer?.observe(el))
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleParallax)
  window.removeEventListener('keydown', handleKeydown)
  if (observer) {
    observer.disconnect()
  }
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="world-lore-page">
    <!-- ============ TICKER ============ -->
    <!-- <div class="world-ticker">
      <div class="ticker-content font-display">
        <span>◆ THE WORLD · ECOPOLIS &amp; POLLUTOPIA</span>
        <span>◆ TWO CITIES · ONE GALAXY</span>
        <span>◆ TEN HEROES · TEN CLEAN ENERGIES</span>
        <span>◆ STOP THE COSMIC WORMHOLE</span>
        <span>◆ THE WORLD · ECOPOLIS &amp; POLLUTOPIA</span>
        <span>◆ TWO CITIES · ONE GALAXY</span>
        <span>◆ TEN HEROES · TEN CLEAN ENERGIES</span>
        <span>◆ STOP THE COSMIC WORMHOLE</span>
      </div>
    </div> -->

    <!-- ============ 1. PAGE HERO ============ -->
    <section id="hero" class="hero-world-bg">
      <div class="stars-overlay"></div>
      <div class="relative-container">
        <div class="hero-grid-layout">
          <!-- Left Content -->
          <div class="hero-left-content">
            <!-- Tag -->
            <div class="fade-up-lore d-2 tag-container">
              <span class="tag-line"></span>
              Worldbuilding · Episode 1
            </div>

            <!-- Main headline — two cities -->
            <h1 class="fade-up-lore d-2 main-title font-display">
              TWO PLANETS.<br />
              <span class="accent-neon-blue">ONE</span> <span class="accent-neon-blue">EARTH.</span>
            </h1>

            <p class="fade-up-lore d-3 main-description font-serif">
              On one side, <span class="accent-earth highlight-span">ECOPOLIS</span> —
              a circular eco-friendly planet powered by solar energy.<br />
              On the other, <span class="accent-magenta highlight-span">POLLUTOPIA</span> —
              a wasteland of factories, lava, and robotic industry.<br />
              <span class="accent-amber block-subtitle">Between them, a war for Earth's five energies.</span>
            </p>

            <div class="fade-up-lore d-4 actions-row">
              <button @click="openPopup('/world-lore/world-lore-hero-1.png', 'ECOPOLIS')" class="btn-outline btn-earth font-display">
                → Explore Ecopolis
              </button>
              <button @click="openPopup('/world-lore/world-lore-hero-2.png', 'POLLUTOPIA')" class="btn-outline btn-magenta font-display">
                → Enter Pollutopia
              </button>
            </div>
          </div>

          <!-- Right Photo Grid -->
          <div class="hero-right-photos fade-up-lore d-3">
            <div class="photo-grid-wrapper">
              <div class="photo-card card-1" @click="openPopup('/world-lore/world-lore-hero-1.png', 'ECOPOLIS')">
                <img src="/world-lore/world-lore-hero-1.png" alt="Ecopolis concept" class="hero-photo" />
                <div class="photo-overlay">
                  <span class="photo-caption font-display">ECOPOLIS</span>
                </div>
              </div>
              <div class="photo-card card-2" @click="openPopup('/world-lore/world-lore-hero-2.png', 'POLLUTOPIA')">
                <img src="/world-lore/world-lore-hero-2.png" alt="Pollutopia concept" class="hero-photo" />
                <div class="photo-overlay">
                  <span class="photo-caption font-display">POLLUTOPIA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 2. ECOPOLIS · HOME ============ -->
    <section id="ecopolis" class="ecopolis-bg fade-up-lore">
      <div class="stars-overlay opacity-25"></div>
      <div class="container">
        <div class="section-intro">
          <div class="section-line accent-earth">Ecopolis · Home of the Hi Planet Team</div>
          <h2 class="section-title font-display">
            WHERE THE<br />
            <span class="accent-neon-blue">HEROES LIVE.</span>
          </h2>
          <p class="section-desc font-serif">
            A city where many planets gather. Modern buildings, flowing rivers, forests.
            Built on the belief that the future is clean — and shared.
          </p>
        </div>

        <div class="map-slot" @click="openPopup('/world-lore/hiplanet_map_ecopolis.png', 'ECOPOLIS MAP')">
          <img src="/world-lore/hiplanet_map_ecopolis_layout.jpg" alt="Ecopolis Map" class="map-img" />
          <!-- <div class="map-content">
            <div class="map-title font-display">ECOPOLIS</div>
            <div class="map-subtitle font-pixel">// CIRCULAR PLANET · 16 NAMED LOCATIONS</div>
          </div> -->
        </div>

        <div class="destinations-grid">
        
          <div class="area-card featured-card">
            <div class="card-header">
              <div class="card-num font-display accent-amber">01</div>
              <span class="card-badge accent-amber font-pixel">CORE</span>
            </div>
            <div class="card-title font-display">GALACTIC NEXUS CONTROL CENTER</div>
            <p class="card-text">
              The central tower. Stage gateway, elder's chamber, launchpad to Pollutopia.
            </p>
          </div>

          <div class="area-card arena-card">
            <div class="card-header">
              <div class="card-num font-display accent-coral">02</div>
              <span class="card-badge font-pixel">ARENA</span>
            </div>
            <div class="card-title font-display">GALACTIC COMBAT ARENA</div>
            <p class="card-text">
              Athena's training ground. 1v1 / 2v2 battles, tournaments, live ops events.
            </p>
          </div>

          <div class="area-card">
            <div class="card-header">
              <div class="card-num font-display accent-green">03</div>
              <span class="card-badge font-pixel">SCHOOL</span>
            </div>
            <div class="card-title font-display">STELLAR BURST ACADEMY</div>
            <p class="card-text">
              Professor Oracle's classroom. Quest pickup, reward delivery, daily &amp; weekly missions.
            </p>
          </div>

          <div class="area-card">
            <div class="card-header">
              <div class="card-num font-display accent-cyan">04</div>
              <span class="card-badge font-pixel">ECONOMY</span>
            </div>
            <div class="card-title font-display">COSMIC FORUM HUB</div>
            <p class="card-text">
              Cosmic Recycling Center + Cosmic Energy Store (PUA's shop). Eco Cube economy lives here.
            </p>
          </div>

          <div class="area-card">
            <div class="card-header">
              <div class="card-num font-display accent-earth">05</div>
              <span class="card-badge font-pixel">11 HOMES</span>
            </div>
            <div class="card-title font-display">ECO BALANCE VILLAGE</div>
            <p class="card-text">
              The heroes' homes. 11 buildings — one for each Hi Planet Team member.
            </p>
          </div>
        </div>

        <p class="asset-note">
          → Asset: official Ecopolis planet map (5 key destinations + 11 character homes = 16 locations)
        </p>
      </div>
    </section>

    <!-- ============ 3. ECO BALANCE VILLAGE — 10 ENERGY HOUSES ⭐ ============ -->
    <!-- <section id="village" class="village-section fade-up-lore">
      <div class="stars-overlay opacity-25"></div>
      <div class="container">
        <div class="section-intro">
          <div class="section-line accent-green">Area A · Eco Balance Village</div>
          <h2 class="section-title font-display">
            TEN HEROES.<br />
            <span class="accent-green">TEN CLEAN ENERGIES.</span>
          </h2>
          <p class="section-desc font-serif">
            Every hero in the Hi Planet Team embodies a real-world renewable energy.
            Their homes aren't just houses — they're miniature power plants.
            The environmental message is the cast itself.
          </p>
        </div>

      
        <div class="energy-grid">
         
          <div class="energy-card" style="--energy-color: var(--coral);">
            <div class="energy-header">
              <span class="energy-name font-display">HI</span>
              <span class="energy-emoji">⚡</span>
            </div>
            <div class="energy-type font-display accent-coral">ELECTRICAL ENERGY</div>
            <p class="energy-desc">
              Current and circuits. The team's electrical backbone — the leader's power.
            </p>
          </div>

        
          <div class="energy-card" style="--energy-color: var(--amber);">
            <div class="energy-header">
              <span class="energy-name font-display">RA</span>
              <span class="energy-emoji">☀️</span>
            </div>
            <div class="energy-type font-display accent-amber">SOLAR ENERGY</div>
            <p class="energy-desc">
              Photovoltaic panels turn sunlight into power. RA channels the sun itself.
            </p>
          </div>

        
          <div class="energy-card" style="--energy-color: var(--cream);">
            <div class="energy-header">
              <span class="energy-name font-display">MOOLU</span>
              <span class="energy-emoji">🌿</span>
            </div>
            <div class="energy-type font-display font-cream">ECO ENERGY · LAB</div>
            <p class="energy-desc">
              Item crafting and material reuse. The lab where waste becomes new tools.
            </p>
          </div>

        
          <div class="energy-card" style="--energy-color: var(--cyan);">
            <div class="energy-header">
              <span class="energy-name font-display">MERC</span>
              <span class="energy-emoji">💨</span>
            </div>
            <div class="energy-type font-display accent-cyan">WIND ENERGY</div>
            <p class="energy-desc">
              Wind turbines turn motion into power. Mercury's speed becomes electricity.
            </p>
          </div>

        
          <div class="energy-card" style="--energy-color: var(--earth);">
            <div class="energy-header">
              <span class="energy-name font-display">NEP</span>
              <span class="energy-emoji">💧</span>
            </div>
            <div class="energy-type font-display accent-earth">HYDRO ENERGY</div>
            <p class="energy-desc">
              Flowing water spins turbines. Neptune's seas, turned to current.
            </p>
          </div>

        
          <div class="energy-card" style="--energy-color: #D97706;">
            <div class="energy-header">
              <span class="energy-name font-display">JUPI</span>
              <span class="energy-emoji">☢️</span>
            </div>
            <div class="energy-type font-display" style="color: #D97706;">NUCLEAR ENERGY</div>
            <p class="energy-desc">
              Fusion at the heart of a star. Jupiter's gravity becomes raw power.
            </p>
          </div>

        
          <div class="energy-card" style="--energy-color: #FF4D2E;">
            <div class="energy-header">
              <span class="energy-name font-display">MA</span>
              <span class="energy-emoji">🌱</span>
            </div>
            <div class="energy-type font-display" style="color: #FF4D2E;">BIOMASS ENERGY</div>
            <p class="energy-desc">
              Plants and waste become fuel. Mars' soil, transformed into life.
            </p>
          </div>

         
          <div class="energy-card" style="--energy-color: #D4A574;">
            <div class="energy-header">
              <span class="energy-name font-display">SATU</span>
              <span class="energy-emoji">🔥</span>
            </div>
            <div class="energy-type font-display" style="color: #D4A574;">GEOTHERMAL</div>
            <p class="energy-desc">
              Earth's deep heat surfaces as power. Saturn's stone holds furnace-warmth.
            </p>
          </div>

         
          <div class="energy-card" style="--energy-color: var(--earth);">
            <div class="energy-header">
              <span class="energy-name font-display">URA</span>
              <span class="energy-emoji">⚙️</span>
            </div>
            <div class="energy-type font-display accent-earth">KINETIC ENERGY</div>
            <p class="energy-desc">
              Motion is stored, then released. Uranus' tilt powers everything that moves.
            </p>
          </div>

         
          <div class="energy-card" style="--energy-color: #E8C547;">
            <div class="energy-header">
              <span class="energy-name font-display">V</span>
              <span class="energy-emoji">✨</span>
            </div>
            <div class="energy-type font-display" style="color: #E8C547;">OPTICAL ENERGY</div>
            <p class="energy-desc">
              Light focused, refracted, amplified. Venus' brilliance, channeled.
            </p>
          </div>

         
          <div class="energy-card" style="--energy-color: var(--violet);">
            <div class="energy-header">
              <span class="energy-name font-display">PLU</span>
              <span class="energy-emoji">🏔️</span>
            </div>
            <div class="energy-type font-display accent-violet">ENERGY SAVING</div>
            <p class="energy-desc">
              Perpetual snow holds heat captive for millennia. PLU's gift is preservation — saving the energy already made.
            </p>
          </div>
        </div>

        <p class="asset-note">
          → 11 buildings in Eco Balance Village · Energy-character assignments locked from GDD · V/PLU draft v0.1
        </p>
      </div>
    </section> -->

    <!-- ============ POPUP MODAL LIGHTBOX ============ -->
    <Transition name="fade">
      <div v-if="activePopupImage" class="lightbox-overlay" @click.self="closePopup">
        <button class="lightbox-close" @click="closePopup" aria-label="Close lightbox">✕</button>
        <div class="lightbox-content">
          <img :src="activePopupImage" :alt="activePopupTitle" class="lightbox-img" />
          <div class="lightbox-caption font-display">{{ activePopupTitle }}</div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Page Layout */
.world-lore-page {
  position: relative;
  /* background: var(--midnight); */
  color: var(--cream);
  min-height: 100vh;
  width: 100%;
}

.container {
  max-width: 1660px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Typography & Display helpers */
.font-display {
  font-family: 'Anton', sans-serif;
  letter-spacing: 0.02em;
}

.font-serif {
  font-family: 'Fraunces', serif;
}

.font-pixel {
  font-family: 'Press Start 2P', system-ui;
}

.font-cream {
  color: var(--cream);
}

.accent-earth {
  color: var(--earth);
}

.accent-magenta {
  color: var(--magenta);
}

.accent-neon-blue{
  color: var(--neon-blue);
}

.accent-blue {
  color: var(--blue);
}

.accent-amber {
  color: var(--amber);
}

.accent-coral {
  color: var(--coral);
}

.accent-cyan {
  color: var(--cyan);
}

.accent-green {
  color: var(--green);
}

.accent-violet {
  color: var(--violet);
}

/* Background overlay details */
.stars-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    radial-gradient(1.5px 1.5px at 12% 24%, rgba(255, 255, 255, 0.9), transparent),
    radial-gradient(1px 1px at 58% 71%, rgba(255, 255, 255, 0.6), transparent),
    radial-gradient(2px 2px at 82% 18%, rgba(255, 255, 255, 0.85), transparent),
    radial-gradient(1px 1px at 38% 82%, rgba(255, 255, 255, 0.55), transparent),
    radial-gradient(1.5px 1.5px at 91% 44%, rgba(255, 255, 255, 0.8), transparent),
    radial-gradient(1px 1px at 28% 58%, rgba(255, 255, 255, 0.5), transparent),
    radial-gradient(1.5px 1.5px at 70% 35%, rgba(255, 255, 255, 0.7), transparent),
    radial-gradient(1px 1px at 5% 70%, rgba(255, 255, 255, 0.45), transparent);
  z-index: 0;
}

.grain {
  position: relative;
}

.grain::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E");
  opacity: 0.08;
  mix-blend-mode: overlay;
  z-index: 1;
}

/* Animations */
.fade-up-lore {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.fade-up-lore.visible {
  opacity: 1;
  transform: translateY(0);
}

.d-1 { transition-delay: 0.1s; }
.d-2 { transition-delay: 0.2s; }
.d-3 { transition-delay: 0.3s; }
.d-4 { transition-delay: 0.4s; }

/* ============ TICKER ============ */
.world-ticker {
  position: fixed;
  top: clamp(60px, 5vw, 80px);
  left: 0;
  right: 0;
  z-index: 40;
  background: var(--coral);
  color: var(--midnight);
  overflow: hidden;
  border-y: 1px solid rgba(10, 24, 52, 0.2);
  height: 36px;
  display: flex;
  align-items: center;
}

.ticker-content {
  display: flex;
  white-space: nowrap;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  animation: ticker-anim 35s linear infinite;
  padding-left: 100%;
}

.ticker-content span {
  padding-right: 3rem;
  display: inline-block;
}

@keyframes ticker-anim {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }
}

/* ============ 1. PAGE HERO ============ */
.hero-world-bg {
  /* background:
    radial-gradient(ellipse 45% 55% at 25% 40%, rgba(74,144,226,0.22) 0%, transparent 55%),
    radial-gradient(ellipse 45% 55% at 75% 60%, rgba(200,52,90,0.18) 0%, transparent 55%),
    linear-gradient(180deg, #0A1834 0%, #060D24 100%); */
  padding-top: calc(clamp(60px, 5vw, 80px) + 36px + 4rem);
  padding-bottom: 6rem;
  position: relative;
  overflow: hidden;
}

.relative-container {
  position: relative;
  z-index: 2;
  max-width: 1660px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Hero Grid Layout */
.hero-grid-layout {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 4rem;
  align-items: center;
}

@media (max-width: 1024px) {
  .hero-grid-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

.hero-left-content {
  display: flex;
  flex-direction: column;
}

.hero-right-photos {
  position: relative;
  width: 100%;
}

.photo-grid-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  position: relative;
}

.photo-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  aspect-ratio: 3 / 5;
  cursor: pointer;
}

.photo-card.card-1 {
  transform: translateY(-20px);
}

.photo-card.card-2 {
  transform: translateY(20px);
}

@media (max-width: 1024px) {
  .photo-card.card-1,
  .photo-card.card-2 {
    transform: none;
  }
}

.photo-card.card-1:hover {
  border-color: var(--cyan);
  box-shadow: 0 25px 60px rgba(0, 200, 255, 0.25);
  transform: scale(1.03) translateY(0);
}
.photo-card.card-2:hover {
  border-color: var(--magenta);
  box-shadow: 0 25px 60px rgba(200, 52, 90, 0.25);
  transform: scale(1.03) translateY(0);
}

.hero-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.photo-card:hover .hero-photo {
  transform: scale(1.08);
}

.photo-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10, 24, 52, 0.9) 0%, rgba(10, 24, 52, 0) 60%);
  display: flex;
  align-items: flex-end;
  padding: 1.25rem;
  opacity: 0.85;
  transition: opacity 0.3s ease;
}

.photo-card:hover .photo-overlay {
  opacity: 1;
}

.photo-caption {
  font-size: 1.2rem;
  letter-spacing: 0.05em;
  color: var(--cream);
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

/* Lightbox Modal */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 24, 52, 0.96);
  backdrop-filter: blur(12px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.lightbox-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--cream);
  width: 46px;
  height: 46px;
  border-radius: 50%;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 1010;
}

.lightbox-close:hover {
  background: var(--coral);
  border-color: var(--coral);
  color: var(--midnight);
  transform: rotate(90deg);
}

.lightbox-content {
  position: relative;
  max-width: 95vw;
  max-height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: zoom-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.lightbox-img {
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.8);
}

.lightbox-caption {
  margin-top: 1.5rem;
  font-size: clamp(1.5rem, 3.5vw, 2.5rem);
  color: var(--cream);
  letter-spacing: 0.05em;
  text-shadow: 0 2px 8px rgba(0,0,0,0.5);
}

/* Vue Transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes zoom-in {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: rgba(255, 245, 229, 0.55);
  margin-bottom: 2rem;
}

.breadcrumb-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: var(--coral);
}

.breadcrumb .separator {
  opacity: 0.4;
}

.breadcrumb .current {
  color: var(--cream);
}

/* Tag */
.tag-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: var(--earth);
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.tag-line {
  display: inline-block;
  width: 40px;
  height: 1px;
  background: var(--earth);
}

/* Title */
.main-title {
  font-family: 'Anton', sans-serif;
  font-size: clamp(3rem, 7vw, 8rem);
  line-height: 0.82;
  margin-bottom: clamp(1rem, 2vw, 2rem);
  color: #fff;
  text-shadow: 0 10px 40px rgba(0,0,0,0.8);
  letter-spacing: -0.02em;
}

.main-description {
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  /* font-style: italic; */
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  color: rgba(255, 245, 229, 0.85);
  line-height: 1.6;
  max-width: 750px;
  margin-bottom: 3rem;
}

.highlight-span {
  font-family: 'Anton', sans-serif;
  font-style: normal;
  letter-spacing: 0.05em;
}

.block-subtitle {
  display: block;
  font-family: 'Anton', sans-serif;
  font-size: 1rem;
  letter-spacing: 0.05em;
  margin-top: 1rem;
}

/* Actions */
.actions-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.btn-outline {
  background: transparent;
  padding: 1rem 1.8rem;
  font-size: 0.85rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-decoration: none;
  border-width: 2px;
  border-style: solid;
  border-radius: 4px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
}

.btn-earth {
  border-color: var(--earth);
  color: var(--earth);
}

.btn-earth:hover {
  background: var(--earth);
  color: var(--midnight);
  box-shadow: 0 0 20px rgba(74, 144, 226, 0.4);
}

.btn-magenta {
  border-color: var(--magenta);
  color: var(--magenta);
}

.btn-magenta:hover {
  background: var(--magenta);
  color: var(--cream);
  box-shadow: 0 0 20px rgba(200, 52, 90, 0.4);
}

/* ============ SECTION HEADER DESIGN ============ */
.section-intro {
  margin-bottom: 3.5rem;
  max-width: 800px;
}

.section-line {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 0.7rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.section-line::before {
  content: "";
  width: 40px;
  height: 1px;
  background: currentColor;
  opacity: 0.7;
}

.section-title {
  color: #fff;
  font-size: clamp(3rem, 7vw, 8rem);
  line-height: 0.82;
  margin-bottom: 1.5rem;
  text-shadow: 0 10px 40px rgba(0,0,0,0.8);
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.section-desc {
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  font-size: clamp(1rem, 1.5vw, 1.5rem);
  color: rgba(255, 245, 229, 0.75);
  max-width: 600px;
  line-height: 1.6;
}

.asset-note {
  margin-top: 2.5rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: rgba(255, 245, 229, 0.4);
}

/* ============ 2. ECOPOLIS · HOME ============ */
.ecopolis-bg {
  /* background:
    radial-gradient(ellipse 50% 60% at 30% 40%, rgba(74,144,226,0.14) 0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at 80% 80%, rgba(34,211,238,0.1) 0%, transparent 60%),
    linear-gradient(180deg, #060D24 0%, #0A1834 100%); */
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
}

/* Map Slot Placeholder */
.map-slot {
  position: relative;
  background: #0A1834;
  border: 1px solid rgba(74,144,226,0.2);
  border-radius: 6px;
  aspect-ratio: 14/9;
  width: 100%;
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: border-color 0.3s ease;
  cursor: pointer;
}

.map-slot:hover {
  border-color: var(--earth);
}

.map-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.45;
  transition: opacity 0.4s ease, transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 0;
}

.map-slot:hover .map-img {
  opacity: 0.75;
  transform: scale(1.04);
}

.map-slot::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(circle at center, rgba(10, 24, 52, 0.35) 0%, rgba(10, 24, 52, 0.8) 100%);
  z-index: 1;
  transition: background 0.4s ease;
}

.map-slot:hover::after {
  background: radial-gradient(circle at center, rgba(10, 24, 52, 0.15) 0%, rgba(10, 24, 52, 0.7) 100%);
}

.map-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.map-title {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  color: var(--earth);
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.map-subtitle {
  font-size: clamp(0.55rem, 1.2vw, 0.7rem);
  letter-spacing: 0.3em;
  color: rgba(255, 245, 229, 0.45);
}

/* Destinations grid */
.destinations-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

@media (max-width: 1024px) {
  .destinations-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .destinations-grid {
    grid-template-columns: 1fr;
  }
}

.area-card {
  background: rgba(74, 144, 226, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 4px;
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.area-card:hover {
  background: rgba(74, 144, 226, 0.06);
  border-color: rgba(74, 144, 226, 0.45);
  transform: translateY(-3px);
}

.area-card.featured-card {
  background: rgba(255, 182, 39, 0.04);
  border-color: rgba(255, 182, 39, 0.25);
}

.area-card.featured-card:hover {
  background: rgba(255, 182, 39, 0.08);
  border-color: rgba(255, 182, 39, 0.55);
}

.area-card.arena-card {
  background: rgba(0, 102, 243, 0.02);
  border-color: rgba(0, 102, 243, 0.25);
}

.area-card.arena-card:hover {
  background: rgba(0, 102, 243, 0.06);
  border-color: rgba(0, 102, 243, 0.55);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-num {
  font-size: 1.5rem;
  /* color: var(--muted); */
}

.card-badge {
  font-size: 0.9rem;
  letter-spacing: 0.25em;
  /* color: rgba(255, 245, 229, 0.5); */
}

.card-title {
  font-size: 1rem;
  letter-spacing: 0.03em;
  margin-bottom: 0.75rem;
  color: var(--cream);
  line-height: 1.3;
}

.card-text {
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  font-size: 0.75rem;
  color: rgba(255, 245, 229, 0.65);
  line-height: 1.5;
}

/* ============ 3. ECO BALANCE VILLAGE — 10 ENERGY HOUSES ============ */
.village-section {
  background: #0A1834;
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
}

.energy-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

@media (max-width: 1200px) {
  .energy-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 992px) {
  .energy-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .energy-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .energy-grid {
    grid-template-columns: 1fr;
  }
}

.energy-card {
  --energy-color: var(--earth);
  position: relative;
  background: linear-gradient(180deg, rgba(255, 245, 229, 0.03), rgba(255, 245, 229, 0.01));
  border: 1px solid rgba(255, 245, 229, 0.12);
  border-radius: 4px;
  padding: 1.25rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
}

.energy-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--energy-color);
}

.energy-card:hover {
  transform: translateY(-4px);
  border-color: var(--energy-color);
  background: linear-gradient(180deg, rgba(255, 245, 229, 0.07), rgba(255, 245, 229, 0.02));
}

.energy-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.energy-name {
  font-size: 1.8rem;
  letter-spacing: 0.02em;
  color: var(--cream);
}

.energy-emoji {
  font-size: 1.5rem;
}

.energy-type {
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  margin-bottom: 0.5rem;
}

.energy-desc {
  font-size: 0.7rem;
  color: rgba(255, 245, 229, 0.65);
  line-height: 1.5;
}

/* ============ 4. GALACTIC NEXUS CONTROL CENTER ============ */
.gncc-section {
  background: #0A1834;
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
}

.gncc-grid {
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: 4rem;
  align-items: center;
}

@media (max-width: 992px) {
  .gncc-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

.gncc-info {
  display: flex;
  flex-direction: column;
}

.floors-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
}

.floor-item {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.floor-tag {
  font-size: 1.3rem;
  width: 50px;
  flex-shrink: 0;
  text-align: right;
  line-height: 1.2;
}

.floor-details {
  flex-grow: 1;
  padding-left: 1.25rem;
  border-left-width: 2px;
  border-left-style: solid;
}

.border-amber { border-color: rgba(255, 182, 39, 0.4); }
.border-cyan { border-color: rgba(34, 211, 238, 0.4); }
.border-earth { border-color: rgba(74, 144, 226, 0.4); }

.floor-title {
  font-size: 0.95rem;
  letter-spacing: 0.03em;
  color: var(--cream);
  margin-bottom: 0.25rem;
}

.floor-desc {
  font-size: 0.75rem;
  color: rgba(255, 245, 229, 0.65);
  line-height: 1.5;
}

/* GNCC Diagram */
.gncc-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 380px;
  width: 100%;
  margin: 0 auto;
}

.diagram-stack {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.diagram-floor {
  position: relative;
  aspect-ratio: 16/4.5;
  width: 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  transition: all 0.3s ease;
}

.floor-top {
  --energy-color: var(--amber);
  border-color: rgba(255, 182, 39, 0.25);
  background: linear-gradient(180deg, rgba(255, 182, 39, 0.14), rgba(255, 182, 39, 0.03));
}

.floor-top:hover {
  border-color: var(--amber);
  background: linear-gradient(180deg, rgba(255, 182, 39, 0.2), rgba(255, 182, 39, 0.05));
}

.floor-mid {
  border-color: rgba(34, 211, 238, 0.25);
  background: linear-gradient(180deg, rgba(34, 211, 238, 0.12), rgba(34, 211, 238, 0.03));
}

.floor-mid:hover {
  border-color: var(--cyan);
  background: linear-gradient(180deg, rgba(34, 211, 238, 0.18), rgba(34, 211, 238, 0.05));
}

.floor-bottom {
  border-color: rgba(74, 144, 226, 0.25);
  background: linear-gradient(180deg, rgba(74, 144, 226, 0.12), rgba(74, 144, 226, 0.03));
}

.floor-bottom:hover {
  border-color: var(--earth);
  background: linear-gradient(180deg, rgba(74, 144, 226, 0.18), rgba(74, 144, 226, 0.05));
}

.diagram-text {
  text-align: center;
}

.diagram-name {
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  color: var(--cream);
}

.diagram-sub {
  font-size: 0.55rem;
  letter-spacing: 0.3em;
  color: rgba(255, 245, 229, 0.45);
  margin-top: 0.25rem;
}

/* ============ 5. THE FIVE EARTH ENERGIES ============ */
.energies-section {
  background:
    radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255, 182, 39, 0.14) 0%, transparent 70%),
    linear-gradient(180deg, #0A1834 0%, #0F1F44 100%);
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
}

.energies-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

@media (max-width: 992px) {
  .energies-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 600px) {
  .energies-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.energy-stone-card {
  --energy-color: var(--earth);
  background: linear-gradient(180deg, rgba(255, 245, 229, 0.03), rgba(255, 245, 229, 0.01));
  border: 1px solid rgba(255, 245, 229, 0.1);
  border-radius: 4px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
}

.energy-stone-card:hover {
  transform: translateY(-4px);
  border-color: var(--energy-color);
  background: linear-gradient(180deg, rgba(255, 245, 229, 0.06), rgba(255, 245, 229, 0.02));
}

.stone-emoji {
  font-size: 2.2rem;
  margin-bottom: 0.75rem;
}

.stone-title {
  font-size: 1.25rem;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.stone-meta {
  font-size: 0.6rem;
  letter-spacing: 0.25em;
  color: rgba(255, 245, 229, 0.5);
  font-weight: 700;
}

.stone-desc {
  font-size: 0.7rem;
  color: rgba(255, 245, 229, 0.65);
  line-height: 1.5;
  margin-top: 1rem;
}

/* Cosmic Cube Card */
.cosmic-cube-card {
  margin-top: 3.5rem;
  border: 2px solid var(--amber);
  border-radius: 4px;
  padding: 2.5rem;
  background: linear-gradient(135deg, rgba(255,182,39,0.06), rgba(10,24,52,0.4));
  box-shadow: 10px 10px 0 var(--amber);
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.cube-inner {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

@media (max-width: 768px) {
  .cube-inner {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    text-align: center;
  }
}

.cube-icon {
  font-size: 3.5rem;
  line-height: 1;
}

.cube-info {
  flex-grow: 1;
}

.cube-meta {
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  color: var(--amber);
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.cube-title {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  letter-spacing: 0.02em;
  margin-bottom: 0.75rem;
}

.cube-desc {
  font-size: 0.85rem;
  color: rgba(255, 245, 229, 0.75);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.cube-quote {
  font-style: italic;
  font-size: 0.95rem;
  color: rgba(255, 245, 229, 0.6);
}

/* ============ 6. POLLUTOPIA · THE THREAT ============ */
.pollutopia-section {
  background:
    radial-gradient(ellipse 60% 70% at 50% 30%, rgba(200, 52, 90, 0.16) 0%, transparent 60%),
    radial-gradient(ellipse 50% 60% at 50% 80%, rgba(42, 14, 46, 0.4) 0%, transparent 70%),
    linear-gradient(180deg, #1A0824 0%, #0A0118 100%);
  padding: 6.5rem 0;
  position: relative;
  overflow: hidden;
}

.pollutopia-grid {
  display: grid;
  grid-template-columns: 6fr 6fr;
  gap: 4rem;
  align-items: center;
}

@media (max-width: 992px) {
  .pollutopia-grid {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }
}

.pollutopia-info {
  display: flex;
  flex-direction: column;
}

.pollutopia-text {
  font-size: 0.95rem;
  color: rgba(255, 245, 229, 0.65);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.pollutopia-quote {
  font-size: 1.15rem;
  font-style: italic;
  color: var(--magenta);
}

/* Tower 6 floors */
.pollutopia-tower {
  max-width: 380px;
  width: 100%;
  margin: 0 auto;
}

.tower-label {
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  color: var(--magenta);
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
}

.tower-stack {
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
}

.tower-floor {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.25rem;
  background: linear-gradient(135deg, rgba(200, 52, 90, 0.05), rgba(42, 14, 46, 0.1));
  border: 1px solid rgba(200, 52, 90, 0.2);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.tower-floor:hover {
  border-color: var(--magenta);
  background: linear-gradient(135deg, rgba(200, 52, 90, 0.12), rgba(42, 14, 46, 0.18));
}

.floor-f6 {
  background: linear-gradient(135deg, rgba(200, 52, 90, 0.22), rgba(42, 14, 46, 0.18));
}

.floor-num {
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  color: rgba(255, 245, 229, 0.7);
}

.floor-boss {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  font-weight: 700;
  color: rgba(255, 245, 229, 0.7);
}

/* ============ 7. MENTORS & GUIDES ============ */
.mentors-section {
  background:
    radial-gradient(ellipse 60% 60% at 50% 30%, rgba(255, 182, 39, 0.08) 0%, transparent 60%),
    linear-gradient(180deg, #0A1834 0%, #060D24 100%);
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
}

.mentors-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

@media (max-width: 992px) {
  .mentors-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .mentors-grid {
    grid-template-columns: 1fr;
  }
}

.mentor-card {
  background: rgba(255, 245, 229, 0.03);
  border: 1px solid rgba(255, 245, 229, 0.12);
  border-radius: 4px;
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.mentor-card:hover {
  background: rgba(255, 245, 229, 0.06);
  border-color: rgba(255, 182, 39, 0.45);
  transform: translateY(-3px);
}

/* Sprite slot */
.sprite-slot {
  position: relative;
  background-color: rgba(255, 245, 229, 0.04);
  background-image:
    linear-gradient(45deg, rgba(255, 245, 229, 0.04) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(255, 245, 229, 0.04) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(255, 245, 229, 0.04) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(255, 245, 229, 0.04) 75%);
  background-size: 12px 12px;
  background-position: 0 0, 0 6px, 6px -6px, -6px 0px;
  width: 80px;
  height: 80px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.sprite-placeholder {
  font-size: 0.55rem;
  color: rgba(255, 245, 229, 0.35);
  letter-spacing: 0.1em;
}

.pill {
  display: inline-flex;
  align-items: center;
  font-family: 'Anton', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  padding: 3px 10px;
  border: 1px solid currentColor;
  border-radius: 2px;
  margin-bottom: 1rem;
}

.mentor-name {
  font-size: 1.15rem;
  letter-spacing: 0.03em;
  color: var(--cream);
  margin-bottom: 0.25rem;
}

.mentor-location {
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  color: rgba(255, 245, 229, 0.45);
  font-weight: 700;
  margin-bottom: 1rem;
}

.mentor-desc {
  font-size: 0.75rem;
  color: rgba(255, 245, 229, 0.65);
  line-height: 1.5;
}

/* ============ 8. DUAL CTA ============ */
.cta-section {
  background: linear-gradient(135deg, var(--cobalt) 0%, var(--midnight) 50%, var(--deep-purple) 100%);
  padding: 7rem 0;
  position: relative;
  overflow: hidden;
}

.cta-header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.cta-subtitle {
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: var(--amber);
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  line-height: 0.85;
  margin-bottom: 1.25rem;
}

.cta-desc {
  font-style: italic;
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  color: rgba(255, 245, 229, 0.75);
  max-width: 600px;
  margin: 0 auto;
}

.cta-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 960px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .cta-cards-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.cta-card {
  border: 2px solid var(--cream);
  border-radius: 4px;
  padding: 3rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.game-card-theme {
  background: rgba(255, 182, 39, 0.05);
  box-shadow: 8px 8px 0 var(--amber);
}

.game-card-theme:hover {
  transform: translate(-3px, -3px);
  box-shadow: 11px 11px 0 var(--amber);
}

.comic-card-theme {
  background: rgba(255, 107, 53, 0.05);
  box-shadow: 8px 8px 0 var(--coral);
}

.comic-card-theme:hover {
  transform: translate(-3px, -3px);
  box-shadow: 11px 11px 0 var(--coral);
}

.cta-card-badge {
  font-size: 1.15rem;
  margin-bottom: 1rem;
}

.cta-card-title {
  font-size: clamp(1.4rem, 2.5vw, 1.8rem);
  line-height: 1.2;
  margin-bottom: 0.75rem;
  color: var(--cream);
}

.cta-card-desc {
  font-size: 0.8rem;
  color: rgba(255, 245, 229, 0.7);
  margin-bottom: 2rem;
}

.btn-cta {
  font-size: 0.85rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.85rem 1.75rem;
  text-decoration: none;
  font-weight: 700;
  border-radius: 3px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-steam {
  background: var(--cream);
  color: var(--midnight);
  border: 2px solid var(--cream);
}

.btn-steam:hover {
  background: var(--amber);
  border-color: var(--amber);
}

.btn-amazon {
  background: var(--coral);
  color: var(--midnight);
  border: 2px solid var(--midnight);
  box-shadow: 4px 4px 0 var(--cream);
}

.btn-amazon:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--cream);
}
</style>
