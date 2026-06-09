<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

interface Hero {
  id: string
  name: string
  role: string
  desc: string
  img: string
  color: string
  accentClass: string
}

const heroes = ref<Hero[]>([
  { id: 'hi', name: 'HI', role: 'LEAD', desc: 'Balanced melee. Newcomer-friendly.', img: '/character/hi-animation.gif', color: 'var(--coral)', accentClass: 'accent-coral' },
  { id: 'ra', name: 'RA', role: 'AOE', desc: 'Solar fire. Burns whole swarms.', img: '/character/Ra-animation.gif', color: 'var(--amber)', accentClass: 'accent-amber' },
  { id: 'ma', name: 'MA', role: 'CRIT', desc: 'Reveals enemy weak spots.', img: '/character/Ma-animation.gif', color: 'var(--red)', accentClass: 'accent-red' },
  { id: 'satu', name: 'SATU', role: 'TANK', desc: 'Stone-skinned. Stuns in melee.', img: '/character/Satu-animation.gif', color: '#D4A574', accentClass: 'accent-satu' },
  { id: 'merc', name: 'MERC', role: 'FAST', desc: 'Hit-and-run specialist.', img: '/character/Merc-animation.gif', color: 'var(--cyan)', accentClass: 'accent-cyan' },
  { id: 'plu', name: 'PLU', role: 'SNIPE', desc: 'Long-range frost. Glass cannon.', img: '/character/Plu-animation.gif', color: 'var(--violet)', accentClass: 'accent-violet' },
  { id: 'v', name: 'V', role: 'CRIT', desc: 'Light blades. High crit chance.', img: '/character/V-animation.gif', color: '#E8C547', accentClass: 'accent-v' },
  { id: 'ura', name: 'URA', role: 'WILD', desc: 'Gravity shifts. Off-axis attacks.', img: '/character/Ura-animation.gif', color: 'var(--earth)', accentClass: 'accent-earth' },
  { id: 'jupi', name: 'JUPI', role: 'CHAIN', desc: 'Chain lightning + vines.', img: '/character/Jupi-animation.gif', color: '#D97706', accentClass: 'accent-jupi' },
  { id: 'nep', name: 'NEP', role: 'REACH', desc: 'Trident reach + water bursts.', img: '/character/Nep-animation.gif', color: 'var(--earth)', accentClass: 'accent-earth' },
])

interface Biome {
  num: string
  name: string
  spec: string
  desc: string
  color: string
  accentClass: string
}

const biomes = ref<Biome[]>([
  { num: '01', name: 'FOREST', spec: 'Wood · MAC', desc: 'Protecting the Mother Gaia Oak.', color: 'var(--green)', accentClass: 'accent-green' },
  { num: '02', name: 'DESERT', spec: 'Water · SKU', desc: 'Preserving the Crystal Aqua Spring.', color: 'var(--cyan)', accentClass: 'accent-cyan' },
  { num: '03', name: 'WILDFIRE MOUNTAIN', spec: 'Fire · ROC', desc: 'Wrath of the Burning Mountain.', color: 'var(--coral)', accentClass: 'accent-coral' },
  { num: '04', name: 'ICE LAND', spec: 'Stone · ZOM', desc: 'Awakening of the Arcstone.', color: '#D4A574', accentClass: 'accent-satu' },
  { num: '05', name: 'WASTED LAND', spec: 'Metal · KRA', desc: 'The Weight of Poison Tides.', color: 'var(--magenta)', accentClass: 'accent-magenta' },
])

interface Boss {
  chapter: string
  name: string
  energy: string
  desc: string
  img: string
  color: string
  accentClass: string
}

const bosses = ref<Boss[]>([
  { chapter: 'CH.01', name: 'MAC', energy: 'WOOD', desc: 'Root-grasp slam. Calls reinforcements at 50% HP.', img: '/stage/stage_1.jpg', color: 'var(--green)', accentClass: 'accent-green' },
  { chapter: 'CH.02', name: 'SKU', energy: 'WATER', desc: 'Siphon vortex. Drains player skill cooldowns.', img: '/stage/stage_2.jpg', color: 'var(--cyan)', accentClass: 'accent-cyan' },
  { chapter: 'CH.03', name: 'ROC', energy: 'FIRE', desc: 'Aerial dive. Fire columns mark the arena.', img: '/stage/stage_3.jpg', color: 'var(--coral)', accentClass: 'accent-coral' },
  { chapter: 'CH.04', name: 'ZOM', energy: 'STONE', desc: 'Frost Cerberus mount. Three-headed melee.', img: '/stage/stage_4.jpg', color: '#D4A574', accentClass: 'accent-satu' },
  { chapter: 'CH.05', name: 'KRA', energy: 'METAL', desc: 'Eight tentacles, six eyes, toxic vapor field.', img: '/stage/stage_5.jpg', color: 'var(--magenta)', accentClass: 'accent-magenta' },
])

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
  if (e.key === 'Escape') {
    closePopup()
  }
}

let observer: IntersectionObserver | null = null

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

  document.querySelectorAll('.fade-up-game').forEach((el) => observer?.observe(el))
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (observer) observer.disconnect()
  document.body.style.overflow = ''
})

// Prevent TS6133 unused variable errors when template sections 2-7 are commented out
void heroes
void biomes
void bosses
void openPopup
</script>

<template>
  <div class="game-page-container">
    
    <!-- ============ TICKER ============ -->
    <!-- <div class="game-ticker">
      <div class="ticker-content">
        <span>◆ EPISODE 01 · SAVE THE EARTH</span>
        <span>◆ LAUNCHES NOV 10 · 2026</span>
        <span>◆ HORDE-ROGUELITE · 6 COMIC CHAPTERS</span>
        <span>◆ WISHLIST NOW ON STEAM</span>
        <span>◆ EPISODE 01 · SAVE THE EARTH</span>
        <span>◆ LAUNCHES NOV 10 · 2026</span>
        <span>◆ HORDE-ROGUELITE · 6 COMIC CHAPTERS</span>
        <span>◆ WISHLIST NOW ON STEAM</span>
      </div>
    </div> -->

    <!-- ============ 1. CINEMA POSTER HERO ============ -->
    <section id="hero" class="game-section hero-cinema">
      <div class="stars-bg"></div>
      <div class="max-width-wrapper">

        <!-- Breadcrumb -->
        <!-- <div class="fade-up-game d-1 game-breadcrumb">
          <RouterLink to="/">Home</RouterLink>
          <span>/</span>
          <span>The Game</span>
        </div> -->

        <!-- Title Block -->
        <div class="title-block">
          <div class="fade-up-game d-2 main-tagline accent-blue">
            A Horde-Roguelite by Ecosoft Interactive
          </div>

          <h1 class="fade-up-game d-2 main-title font-display">
            EPISODE 01:<br />
            <span class="accent-neon-blue">SAVE THE EARTH.</span>
          </h1>

          <p class="fade-up-game d-3 section-subtitle font-serif">
            "Every chapter is a battle."
          </p>
        </div>

        <!-- CINEMA VIDEO slot -->
        <div class="fade-up-game d-3 cinema-video-frame">
          <div class="letterbox-bar"></div>
          
          <div class="cinema-video-content" style="cursor: default;">
            <iframe
              src="https://www.youtube.com/embed/u2q7YS4RuXs"
              width="100%"
              height="100%"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              style="border: none; display: block; position: relative; z-index: 10;"
            ></iframe>
          </div>
          
          <div class="letterbox-bar bottom"></div>
        </div>

        <!-- Meta Bar -->
        <div class="fade-up-game d-4 hero-meta-bar">
          <div>
            <div class="meta-label">// Release</div>
            <div class="meta-value accent-coral">NOV 10 · 2026</div>
          </div>

          <div class="meta-center">
            <a href="https://store.steampowered.com/app/4745340/Hi_Planet_Save_The_Earth/?beta=1" target="_blank" class="btn-hero-cta">
              ▶ Wishlist on Steam
            </a>
          </div>

          <div class="meta-right">
            <div class="meta-label">// Platform</div>
            <div class="meta-value accent-cyan">PC · STEAM</div>
          </div>
        </div>

        <!-- Scroll Hint -->
        <div class="scroll-hint">
          <a href="#loop" class="scroll-hint-link">
            ↓ See how it plays
          </a>
        </div>

      </div>
    </section>

    <!-- ============ 2. THE LOOP ============ -->
    <!-- <section id="loop" class="game-section loop-section">
      <div class="stars-bg"></div>
      <div class="max-width-wrapper">
        <div class="fade-up-game">
          <div class="section-line-header accent-cyan">The Loop · In Action</div>
          <h2 class="section-title">
            THREE BEATS.<br />
            <span class="accent-coral">ONE FINISH LINE.</span>
          </h2>
          <p class="section-subtitle font-serif">
            The loop you'll run every chapter. Six chapters, six loops, six bosses.
          </p>
        </div>

        <div class="loop-grid">
          <div class="fade-up-game d-1">
            <div class="pixel-slot">
              <div class="text-center">
                <div class="slot-inner-number accent-coral">01</div>
                <div class="slot-inner-placeholder">// GIF · BREAK</div>
              </div>
            </div>
            <div class="card-badge-row">
              <span class="badge-pill accent-coral">BREAK</span>
              <span class="badge-desc">Smash the gate</span>
            </div>
            <p class="loop-desc-text">
              Enemy gates block your path. Clear the wave, the gate falls, the path opens.
            </p>
          </div>

          <div class="fade-up-game d-2">
            <div class="pixel-slot">
              <div class="text-center">
                <div class="slot-inner-number accent-cyan">02</div>
                <div class="slot-inner-placeholder">// GIF · ADVANCE</div>
              </div>
            </div>
            <div class="card-badge-row">
              <span class="badge-pill accent-cyan">ADVANCE</span>
              <span class="badge-desc">Eco Cubes drop</span>
            </div>
            <p class="loop-desc-text">
              Push deeper. Enemies drop Eco Cubes — spend them between stages to upgrade.
            </p>
          </div>

          <div class="fade-up-game d-3">
            <div class="pixel-slot" style="background-color: rgba(200,52,90,0.05);">
              <div class="text-center">
                <div class="slot-inner-number accent-magenta">03</div>
                <div class="slot-inner-placeholder">// GIF · BOSS</div>
              </div>
            </div>
            <div class="card-badge-row">
              <span class="badge-pill accent-magenta">BOSS</span>
              <span class="badge-desc">Chapter finale</span>
            </div>
            <p class="loop-desc-text">
              One of the Cosmic Wormhole's lieutenants waits at every chapter's end.
            </p>
          </div>
        </div>
      </div>
    </section> -->

    <!-- ============ 3. THE HI PLANET TEAM ============ -->
    <section id="heroes" class="game-section heroes-section-game">
      <div class="stars-bg"></div>
      <div class="max-width-wrapper">
        <div class="fade-up-game">
          <div class="section-line-header accent-blue">The Hi Planet Team · 10 Playable</div>
          <h2 class="section-title">
            TEN HEROES.<br />
            <span class="accent-neon-blue">TEN PLAYSTYLES.</span>
          </h2>
          <p class="section-subtitle font-serif">
            Pick your fighter. Each hero is a different way to run the loop.
          </p>
        </div>

        <div class="heroes-grid-game">
          <div v-for="hero in heroes" :key="hero.id" class="hero-card-game fade-up-game d-1" :class="`hero-card-${hero.id}`">
            <div class="hero-card-slot" :style="{ backgroundColor: hero.img ? 'rgba(255,255,255,0.03)' : 'rgba(255,245,229,0.04)' }">
              <img v-if="hero.img" :src="hero.img" :alt="hero.name" />
              <div v-else class="slot-inner-placeholder font-pixel" style="font-size: 10px;" :style="{ color: hero.color }">
                {{ hero.name }}
              </div>
            </div>
            <div class="hero-meta-row">
              <span class="hero-name-label" :style="{ color: hero.color }">{{ hero.name }}</span>
              <span class="hero-role-pill" :style="{ color: hero.color, borderColor: hero.color }">{{ hero.role }}</span>
            </div>
            <p class="hero-desc-game">{{ hero.desc }}</p>
          </div>
        </div>

        <p class="bottom-note">
          → 10 playable in Ep1 · MA reserved for Ch.7 DLC (Mars chapter)
        </p>
      </div>
    </section>

    <!-- ============ 4. EARTH · 5 BATTLEFIELDS ============ -->
    <!-- <section id="earth" class="game-section earth-section">
      <div class="stars-bg"></div>
      <div class="max-width-wrapper">
        <div class="fade-up-game">
          <div class="section-line-header accent-amber">Earth · 5 Battlefields</div>
          <h2 class="section-title">
            FIVE BIOMES.<br />
            <span class="accent-amber">FIVE FIGHTS.</span>
          </h2>
          <p class="section-subtitle font-serif">
            Ride QQ from Ecopolis to Earth. Each chapter, a different battlefield. Forest. Desert. Wildfire. Ice. Wasteland.
          </p>
        </div>

        // Earth World Map Slot
        <div class="fade-up-game shot-slot map-slot-outer" @click="openPopup('/world-lore/hiplanet_map_ecopolis.png', 'EARTH WORLD MAP')">
          <div class="text-center">
            <div class="map-inner-title">EARTH · WORLD MAP</div>
            <div class="map-inner-sub">// 5 BIOMES · OFFICIAL COMIC MAP</div>
          </div>
        </div>

        // Biomes Cards
        <div class="biome-grid">
          <div v-for="biome in biomes" :key="biome.num" class="biome-card fade-up-game" :style="{ backgroundColor: biome.color + '0F', border: '1px solid ' + biome.color + '4D' }">
            <div class="biome-num" :style="{ color: biome.color }">{{ biome.num }}</div>
            <div class="biome-name">{{ biome.name }}</div>
            <div class="biome-spec">{{ biome.spec }}</div>
            <p class="biome-desc">{{ biome.desc }}</p>
          </div>
        </div>

        <p class="bottom-note">
          → Asset: official Earth World Map illustration (5 biomes labeled)
        </p>
      </div>
    </section> -->

    <!-- ============ 5. BOSS SHOWCASE ============ -->
    <!-- <section id="bosses" class="game-section bosses-section">
      <div class="stars-bg"></div>
      <div class="max-width-wrapper">
        <div class="fade-up-game">
          <div class="section-line-header accent-magenta">The Lieutenants · Boss Showcase</div>
          <h2 class="section-title">
            SIX BOSSES.<br />
            <span class="accent-magenta">SIX FINALES.</span>
          </h2>
          <p class="section-subtitle font-serif">
            Each chapter ends with a fight that has its own rules. In-game footage and attack patterns for every boss in Episode 1.
          </p>
        </div>

        // Boss cards grid
        <div class="bosses-grid-game">
          <div v-for="boss in bosses" :key="boss.name" class="boss-card fade-up-game d-1">
            <div class="boss-card-slot shot-slot" @click="openPopup(boss.img, boss.name + ' — Boss Arena')">
              <img :src="boss.img" :alt="boss.name" />
            </div>
            <div class="boss-row-header">
              <span class="boss-chapter" :style="{ color: boss.color }">{{ boss.chapter }}</span>
              <span class="badge-pill" :style="{ color: boss.color, borderColor: boss.color }">{{ boss.energy }}</span>
            </div>
            <div class="boss-name">{{ boss.name }}</div>
            <p class="boss-desc">{{ boss.desc }}</p>
          </div>
        </div>

        // Cosmic Wormhole Feature Row
        <div class="fade-up-game wormhole-feature-row">
          <div class="wormhole-slot shot-slot" @click="openPopup('/stage/stage_6.jpg', 'THE COSMIC WORMHOLE')">
            <img src="/stage/stage_6.jpg" alt="Cosmic Wormhole Stage" />
          </div>
          <div class="wormhole-text-col">
            <span class="badge-pill accent-magenta wormhole-badge">CH.06 · FINALE</span>
            <h3 class="wormhole-title-right">THE COSMIC WORMHOLE.</h3>
            <p class="wormhole-desc">
              Six floors. Six fights. He waits at the top of his own polluted citadel, the imperfect Cosmic Cube humming with all five stolen energies.
            </p>
            <p class="wormhole-quote">
              "Earth's energies… I will return for them."
            </p>
          </div>
        </div>
      </div>
    </section> -->

    <!-- ============ 6. SPECS ============ -->
    <!-- <section id="specs" class="game-section specs-section">
      <div class="max-width-wrapper">
        <div class="fade-up-game">
          <div class="section-line-header" style="color: var(--cobalt);">Specifications</div>
          <h2 class="section-title">THE FACTS.</h2>
          <br />
        </div>

        <div class="specs-grid">
          <div class="spec-item fade-up-game">
            <span class="spec-label">Genre</span>
            <span class="spec-value">Horde-Roguelite</span>
          </div>
          <div class="spec-item fade-up-game">
            <span class="spec-label">Platform</span>
            <span class="spec-value">Steam · PC</span>
          </div>
          <div class="spec-item fade-up-game">
            <span class="spec-label">Release</span>
            <span class="spec-value accent-coral">Nov 10 · 2026</span>
          </div>
          <div class="spec-item fade-up-game">
            <span class="spec-label">Mode</span>
            <span class="spec-value">Single-player</span>
          </div>
          <div class="spec-item fade-up-game">
            <span class="spec-label">Controller</span>
            <span class="spec-value">Full Support</span>
          </div>
          <div class="spec-item fade-up-game">
            <span class="spec-label">Languages</span>
            <span class="spec-value">EN · KO planned</span>
          </div>
          <div class="spec-item fade-up-game">
            <span class="spec-label">Chapters</span>
            <span class="spec-value">6 · 31 stages</span>
          </div>
          <div class="spec-item fade-up-game">
            <span class="spec-label">Heroes</span>
            <span class="spec-value">10 playable</span>
          </div>
          <div class="spec-item fade-up-game">
            <span class="spec-label">Run length</span>
            <span class="spec-value">~45-90 min</span>
          </div>
        </div>
      </div>
    </section> -->

    <!-- ============ 7. DUAL CTA ============ -->
    <!-- <section class="game-section cta-section">
      <div class="stars-bg"></div>
      <div class="cta-glow"></div>
      <div class="max-width-wrapper">
        <div class="fade-up-game cta-days">— Days to launch —</div>
        <h2 class="fade-up-game cta-title">
          WISHLIST<br />
          <span class="accent-amber">HI PLANET.</span>
        </h2>
        <p class="fade-up-game cta-desc">
          Every wishlist makes Steam show Hi Planet to more players. The single most useful thing you can do for a small indie studio.
        </p>
        <div class="fade-up-game">
          <a href="https://store.steampowered.com/app/4745340/Hi_Planet_Save_The_Earth/?beta=1" target="_blank" class="btn-large-wishlist">
            ▶ Wishlist on Steam — Free
          </a>
        </div>
      </div>
    </section> -->

    <!-- ============ LIGHTBOX POPUP MODAL ============ -->
    <div v-if="activePopupImage" class="lightbox-modal" @click.self="closePopup">
      <button class="lightbox-close-btn" @click="closePopup" aria-label="Close lightbox">✕</button>
      <div class="lightbox-modal-content">
        <img :src="activePopupImage" :alt="activePopupTitle" />
        <div class="lightbox-modal-caption">{{ activePopupTitle }}</div>
      </div>
    </div>



  </div>
</template>

<style scoped>
/* Main Container */
.game-page-container {
  min-height: 100vh;
  /* background-color: #0A1834; */
  color: #FFF5E5;
  font-family: 'Manrope', system-ui, sans-serif;
  overflow-x: hidden;
  padding-top: clamp(60px, 5vw, 80px); /* Navigation offset */
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

.accent-coral {
  color: var(--coral);
}

.accent-amber {
  color: var(--amber);
}

.accent-neon-blue {
  color: var(--neon-blue);
}

.accent-blue {
  color: var(--blue);
}

.accent-cyan {
  color: var(--cyan);
}

.accent-red {
  color: var(--red);
}


/* Animations */
.fade-up-game {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.fade-up-game.visible {
  opacity: 1;
  transform: translateY(0);
}

.d-1 { transition-delay: 0.1s; }
.d-2 { transition-delay: 0.25s; }
.d-3 { transition-delay: 0.4s; }
.d-4 { transition-delay: 0.55s; }

/* Ticker styles */
.game-ticker {
  background: var(--coral);
  color: var(--midnight);
  overflow: hidden;
  border-bottom: 1px solid rgba(10, 24, 52, 0.2);
  height: 36px;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 10;
}

.ticker-content {
  display: flex;
  white-space: nowrap;
  animation: ticker-scroll 35s linear infinite;
  font-family: 'Anton', sans-serif;
  font-size: clamp(0.7rem, 1.2vw, 0.85rem);
  letter-spacing: 0.15em;
  padding-left: 100%;
}

.ticker-content span {
  padding-right: 4rem;
  display: inline-block;
}

@keyframes ticker-scroll {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-100%, 0, 0); }
}

/* Sections */
.game-section {
  position: relative;
  padding: 5rem 1.5rem;
  z-index: 2;
}

.max-width-wrapper {
  max-width: 1660px;
  margin: 0 auto;
  width: 100%;
  padding: 0 1.5rem;
}

/* Section Line Header */
.section-line-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.section-line-header::before {
  content: "";
  width: 40px;
  height: 1px;
  background: currentColor;
  opacity: 0.7;
}

.section-title {
  font-family: 'Anton', sans-serif;
  font-size: clamp(3rem, 7vw, 8rem);
  line-height: 0.82;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  color: #fff;
  text-transform: uppercase;
  max-width: 800px;
  text-shadow: 0 10px 40px rgba(0,0,0,0.8);
}

.section-subtitle {
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  /* font-style: italic; */
  font-size: clamp(1.1rem, 1.8vw, 1.4rem);
  color: rgb(255, 245, 229);
  max-width: 600px;
  margin-bottom: 3rem;
  line-height: 1.5;
}

/* Hero Cinema Section styling */
.hero-cinema {
  /* background: 
    radial-gradient(ellipse 60% 50% at 30% 30%, rgba(74, 144, 226, 0.25) 0%, transparent 60%),
    radial-gradient(ellipse 60% 50% at 70% 70%, rgba(255, 107, 53, 0.18) 0%, transparent 60%),
    linear-gradient(180deg, #050817 0%, #0A1834 100%); */
  position: relative;
  overflow: hidden;
  padding-top: 4rem;
  padding-bottom: 6rem;
}

/* Star Overlay */
.stars-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    radial-gradient(1.5px 1.5px at 12% 24%, rgba(255,255,255,0.9), transparent),
    radial-gradient(1px 1px at 58% 71%, rgba(255,255,255,0.6), transparent),
    radial-gradient(2px 2px at 82% 18%, rgba(255,255,255,0.85), transparent),
    radial-gradient(1px 1px at 38% 82%, rgba(255,255,255,0.55), transparent),
    radial-gradient(1.5px 1.5px at 91% 44%, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 28% 58%, rgba(255,255,255,0.5), transparent);
  opacity: 0.5;
  z-index: 1;
}

/* Grain Overlay */
.grain-overlay {
  position: relative;
}
.grain-overlay::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E");
  opacity: 0.08;
  mix-blend-mode: overlay;
  z-index: 1;
}

/* Breadcrumb */
.game-breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: rgba(255, 245, 229, 0.55);
  margin-bottom: 2.5rem;
}
.game-breadcrumb a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}
.game-breadcrumb a:hover {
  color: var(--coral);
}

.title-block {
  text-align: center;
  margin-bottom: 2.5rem;
}

.main-tagline {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  font-weight: 600;
  margin-bottom: 1rem;
}

.main-tagline::before,
.main-tagline::after {
  content: "";
  width: 32px;
  height: 1px;
  background-color: var(--blue);
  opacity: 0.7;
}

.main-title {
  font-family: 'Anton', sans-serif;
  font-size: clamp(3.5rem,13vw,12rem);
  line-height: 0.85;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  color: #fff;
  text-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
  letter-spacing: -0.01em;
}

.title-block .section-subtitle {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1.5rem;
}

/* Cinema video slot */
.cinema-video-frame {
  margin-bottom: 3rem;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 245, 229, 0.15);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.cinema-video-frame:hover {
  border-color: var(--cyan);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 25px rgba(34, 211, 238, 0.3);
}

.letterbox-bar {
  height: 24px;
  background: linear-gradient(180deg, #050817, #0A1834);
}
.letterbox-bar.bottom {
  background: linear-gradient(0deg, #050817, #0A1834);
}

.cinema-video-content {
  aspect-ratio: 16 / 9;
  background: radial-gradient(ellipse 80% 80% at 50% 50%, rgba(74, 144, 226, 0.18) 0%, transparent 70%), #0A1834;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition: all 0.4s ease;
}

.cinema-video-content::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(1.5px 1.5px at 22% 34%, rgba(255,255,255,0.7), transparent),
    radial-gradient(1px 1px at 68% 51%, rgba(255,255,255,0.5), transparent),
    radial-gradient(2px 2px at 82% 18%, rgba(255,255,255,0.6), transparent),
    radial-gradient(1.5px 1.5px at 91% 64%, rgba(255,255,255,0.7), transparent);
  opacity: 0.4;
}

.cinema-video-content::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(10,24,52,0.4) 0%, transparent 30%, transparent 70%, rgba(10,24,52,0.4) 100%);
  pointer-events: none;
}

.video-center-info {
  text-align: center;
  z-index: 2;
}

.play-button-outer {
  background: rgba(255, 107, 53, 0.15);
  border: 4px solid var(--coral);
  width: clamp(80px, 10vw, 120px);
  height: clamp(80px, 10vw, 120px);
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: var(--coral);
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  animation: pulse-button 2.4s ease-in-out infinite;
  padding-left: clamp(4px, 0.5vw, 10px);
}

@keyframes pulse-button {
  0%, 100% { transform: scale(1); opacity: 0.95; }
  50% { transform: scale(1.08); opacity: 1; }
}

.video-label-main {
  font-family: 'Anton', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  letter-spacing: 0.05em;
  color: #FFF5E5;
  margin-bottom: 0.5rem;
}

.video-label-sub {
  font-family: 'Press Start 2P', monospace;
  font-size: clamp(0.55rem, 1vw, 0.75rem);
  color: rgba(255, 245, 229, 0.45);
  letter-spacing: 0.1em;
}

/* Meta Bar styling */
.hero-meta-bar {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;
  text-align: center;
}

@media (min-width: 768px) {
  .hero-meta-bar {
    grid-template-columns: 1fr 1.2fr 1fr;
    text-align: left;
  }
  .meta-right {
    text-align: right;
  }
  .meta-center {
    text-align: center;
  }
}

.meta-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: rgba(255, 245, 229, 0.5);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.meta-value {
  font-family: 'Anton', sans-serif;
  font-size: clamp(1.5rem, 2.5vw, 2.2rem);
  letter-spacing: 0.05em;
}

/* Buttons */
.btn-hero-cta {
  background: var(--coral);
  color: var(--midnight);
  font-family: 'Anton', sans-serif;
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  padding: 1.1rem 2.5rem;
  border: 3px solid var(--coral);
  box-shadow: 8px 8px 0 #FFF5E5;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn-hero-cta:hover {
  transform: translate(-3px, -3px);
  box-shadow: 11px 11px 0 #FFF5E5;
  background: var(--amber);
  border-color: var(--amber);
}

.scroll-hint {
  text-align: center;
  margin-top: 4rem;
}
.scroll-hint-link {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  color: rgb(255, 245, 229);
  text-decoration: none;
  transition: color 0.2s ease;
}
.scroll-hint-link:hover {
  color: var(--coral);
}

/* Loop Section styling */
.loop-section {
  background: linear-gradient(180deg, #060D24 0%, #0A1834 60%, #0F1F44 100%);
}

.loop-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
@media (min-width: 768px) {
  .loop-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.pixel-slot {
  aspect-ratio: 16 / 9;
  background-color: rgba(255, 245, 229, 0.04);
  background-image:
    linear-gradient(45deg, rgba(255, 245, 229, 0.04) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(255, 245, 229, 0.04) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(255, 245, 229, 0.04) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(255, 245, 229, 0.04) 75%);
  background-size: 14px 14px;
  background-position: 0 0, 0 7px, 7px -7px, -7px 0px;
  border: 1px solid rgba(255, 245, 229, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
  overflow: hidden;
  position: relative;
}

.pixel-slot:hover {
  border-color: rgba(255, 245, 229, 0.35);
  background-color: rgba(255, 245, 229, 0.07);
}

.slot-inner-number {
  font-family: 'Anton', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 0.25rem;
}

.slot-inner-placeholder {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.55rem;
  color: rgba(255, 245, 229, 0.4);
  letter-spacing: 0.1em;
}

.card-badge-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 1rem 0 0.5rem;
}

.badge-pill {
  font-family: 'Anton', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  padding: 3px 10px;
  border: 1px solid currentColor;
  display: inline-flex;
}

.badge-desc {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(255, 245, 229, 0.5);
  font-weight: 600;
}

.loop-desc-text {
  font-size: 0.85rem;
  color: rgba(255, 245, 229, 0.75);
  line-height: 1.6;
}

/* Heroes Section */
.heroes-section-game {
  /* background-color: #0A1834; */
}

.heroes-grid-game {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .heroes-grid-game {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 1024px) {
  .heroes-grid-game {
    grid-template-columns: repeat(5, 1fr);
  }
}

.hero-card-game {
  display: flex;
  flex-direction: column;
}

.hero-card-slot {
  aspect-ratio: 1 / 1;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
}

.hero-card-slot img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* width: 140%;
  height: 140%; */
  object-fit: cover;
  transition: transform 0.3s ease;
}

/* Adjust size for HI character (default is 140%) */
.hero-card-hi .hero-card-slot img {
  width: 100%;
  height: 100%;
  top: 48%;
}

/* Adjust Ra image size because its source file has less transparent padding and appears much larger */
.hero-card-ra .hero-card-slot img {
  width: 80%;
  height: 80%;
  top: 38%;
}

.hero-card-ma .hero-card-slot img {
  width: 80%;
  height: 80%;
  top: 38%;
}

.hero-card-satu .hero-card-slot img {
  width: 100%;
  height: 100%;
  top: 44%;
}

.hero-card-merc .hero-card-slot img {
  width: 80%;
  height: 80%;
  top: 44%;
}

.hero-card-plu .hero-card-slot img {
  width: 80%;
  height: 80%;
}

.hero-card-v .hero-card-slot img {
 width: 100%;
  height: 100%;
  top: 38%;
}

.hero-card-ura .hero-card-slot img {
width: 100%;
  height: 100%;
  top: 42%;
}

.hero-card-jupi .hero-card-slot img {
  width: 60%;
  height: 60%;
  top: 53%;
}

.hero-card-nep .hero-card-slot img {
  width: 100%;
  height: 100%;
  top: 44%;
}

.hero-card-game:hover .hero-card-slot img {
  transform: translate(-50%, -50%) scale(1.1);
}

.hero-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.hero-name-label {
  font-family: 'Anton', sans-serif;
  font-size: 1.7rem;
  letter-spacing: 0.02em;
}

.hero-role-pill {
  font-family: 'Anton', sans-serif;
  font-size: 1rem;
  letter-spacing: 0.15em;
  padding: 2px 6px;
  border: 1px solid currentColor;
}

.hero-desc-game {
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  font-size: .8rem;
  color: rgb(255, 245, 229);
  line-height: 1.4;
}

.bottom-note {
  margin-top: 2rem;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: rgb(255, 245, 229);
}

/* Earth Section */
.earth-section {
  background:
    radial-gradient(ellipse 60% 60% at 50% 30%, rgba(255,182,39,0.18) 0%, transparent 60%),
    linear-gradient(180deg, #0A1834 0%, #060D24 100%);
}

.shot-slot {
  position: relative;
  background: repeating-linear-gradient(135deg, rgba(255,245,229,0.025) 0 14px, rgba(255,245,229,0.05) 14px 28px);
  border: 1px solid rgba(255,245,229,0.15);
  transition: border-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.shot-slot:hover {
  border-color: rgba(255,245,229,0.4);
}

.map-slot-outer {
  aspect-ratio: 16 / 10;
  margin-bottom: 2.5rem;
  background: 
    repeating-linear-gradient(0deg, rgba(255,182,39,0.04) 0 24px, rgba(255,182,39,0.08) 24px 25px, transparent 25px 49px), 
    repeating-linear-gradient(90deg, rgba(255,182,39,0.04) 0 24px, rgba(255,182,39,0.08) 24px 25px, transparent 25px 49px), 
    #0A1834;
  border-color: rgba(255,182,39,0.3);
  cursor: pointer;
  transition: all 0.4s ease;
}
.map-slot-outer:hover {
  box-shadow: 0 0 50px rgba(255, 182, 39, 0.15);
}

.map-inner-title {
  font-family: 'Anton', sans-serif;
  font-size: clamp(1.8rem, 4vw, 3.2rem);
  letter-spacing: 0.05em;
  color: var(--amber);
  margin-bottom: 0.5rem;
}

.map-inner-sub {
  font-family: 'Press Start 2P', monospace;
  font-size: clamp(0.55rem, 1vw, 0.7rem);
  color: rgba(255, 245, 229, 0.45);
  letter-spacing: 0.1em;
}

.biome-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
@media (min-width: 480px) {
  .biome-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .biome-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

.biome-card {
  padding: 1.5rem;
  text-align: center;
  border-radius: 4px;
}

.biome-num {
  font-family: 'Anton', sans-serif;
  font-size: 1.8rem;
  margin-bottom: 0.25rem;
}

.biome-name {
  font-family: 'Anton', sans-serif;
  font-size: 1rem;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}

.biome-spec {
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(255, 245, 229, 0.55);
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.biome-desc {
  font-size: 0.75rem;
  color: rgba(255, 245, 229, 0.65);
  line-height: 1.4;
}

/* Bosses Section */
.bosses-section {
  background:
    radial-gradient(ellipse 70% 80% at 50% 50%, rgba(200,52,90,0.2) 0%, transparent 70%),
    linear-gradient(180deg, #060D24 0%, #1A0824 100%);
}

.bosses-grid-game {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

@media (min-width: 480px) {
  .bosses-grid-game {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .bosses-grid-game {
    grid-template-columns: repeat(5, 1fr);
  }
}

.boss-card {
  display: flex;
  flex-direction: column;
}

.boss-card-slot {
  aspect-ratio: 4 / 5;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.75rem;
  cursor: pointer;
}

.boss-card-slot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.boss-card:hover .boss-card-slot img {
  transform: scale(1.08);
}

.boss-row-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.boss-chapter {
  font-family: 'Anton', sans-serif;
  font-size: 0.8rem;
}

.boss-name {
  font-family: 'Anton', sans-serif;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
  margin-bottom: 0.25rem;
}

.boss-desc {
  font-size: 0.75rem;
  color: rgba(255, 245, 229, 0.6);
  line-height: 1.4;
}

/* Feature Wormhole Row */
.wormhole-feature-row {
  border: 1px solid rgba(200, 52, 90, 0.3);
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(200,52,90,0.06), rgba(42,14,46,0.1));
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .wormhole-feature-row {
    grid-template-columns: 1.4fr 1fr;
    padding: 2rem;
    gap: 2rem;
  }
}

.wormhole-slot {
  aspect-ratio: 16 / 9;
  background: repeating-linear-gradient(135deg, rgba(200,52,90,0.06) 0 14px, rgba(200,52,90,0.12) 14px 28px);
  cursor: pointer;
}

.wormhole-slot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.wormhole-slot:hover img {
  transform: scale(1.05);
}

.wormhole-text-col {
  display: flex;
  flex-direction: column;
}

.wormhole-badge {
  align-self: flex-start;
  margin-bottom: 0.75rem;
}

.wormhole-title-right {
  font-family: 'Anton', sans-serif;
  font-size: clamp(1.5rem, 3.5vw, 2.5rem);
  line-height: 0.9;
  margin-bottom: 1rem;
  letter-spacing: 0.02em;
  color: var(--magenta);
}

.wormhole-desc {
  font-size: 0.85rem;
  color: rgba(255, 245, 229, 0.75);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.wormhole-quote {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: 1rem;
  color: rgba(255, 245, 229, 0.65);
}

/* Specs Section */
.specs-section {
  background: var(--cream);
  color: var(--midnight);
  overflow: hidden;
}

.specs-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem 2rem;
}

@media (min-width: 480px) {
  .specs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 768px) {
  .specs-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.spec-item {
  display: flex;
  flex-direction: column;
}

.spec-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: rgba(10, 24, 52, 0.5);
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.spec-value {
  font-family: 'Anton', sans-serif;
  font-size: 1.25rem;
  letter-spacing: 0.03em;
}

/* Dual CTA Section */
.cta-section {
  background: linear-gradient(135deg, var(--cobalt) 0%, var(--midnight) 50%, var(--deep-purple) 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
  padding: 6rem 1.5rem;
}

.cta-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 70% at 50% 50%, rgba(255,182,39,0.2) 0%, transparent 60%);
  pointer-events: none;
}

.cta-days {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: var(--amber);
  font-weight: 600;
  margin-bottom: 1.2rem;
}

.cta-title {
  font-family: 'Anton', sans-serif;
  font-size: clamp(3rem, 7vw, 5rem);
  line-height: 0.85;
  margin-bottom: 1.5rem;
}

.cta-desc {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: rgba(255, 245, 229, 0.85);
  max-w: 600px;
  margin: 0 auto 2.5rem;
  line-height: 1.6;
}

.btn-large-wishlist {
  background: var(--coral);
  color: var(--midnight);
  font-family: 'Anton', sans-serif;
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  padding: 1.3rem 3rem;
  border: 3px solid var(--coral);
  box-shadow: 8px 8px 0 #FFF5E5;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn-large-wishlist:hover {
  transform: translate(-3px, -3px);
  box-shadow: 11px 11px 0 #FFF5E5;
  background: var(--amber);
  border-color: var(--amber);
}

/* Lightbox overlay styling */
.lightbox-modal {
  position: fixed;
  inset: 0;
  background: rgba(10, 24, 52, 0.95);
  backdrop-filter: blur(10px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.lightbox-close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #FFF5E5;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.lightbox-close-btn:hover {
  background: var(--coral);
  color: var(--midnight);
  transform: rotate(90deg);
}

.lightbox-modal-content {
  max-width: 90vw;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lightbox-modal-content img {
  max-width: 100%;
  max-height: 75vh;
  object-fit: contain;
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
}

.lightbox-modal-caption {
  font-family: 'Anton', sans-serif;
  font-size: clamp(1.2rem, 3vw, 2.2rem);
  color: #FFF5E5;
  margin-top: 1.5rem;
  letter-spacing: 0.05em;
}

/* Video Modal container */
.video-modal-content {
  width: 100%;
  max-width: 960px;
  aspect-ratio: 16 / 9;
  background: #000;
  border: 2px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 30px 60px rgba(0,0,0,0.8);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.video-modal-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #FFF5E5;
  background: radial-gradient(circle, #1B3A8C 0%, #0A1834 100%);
  text-align: center;
  padding: 2rem;
}

.video-modal-icon {
  font-size: 4rem;
  color: var(--coral);
  margin-bottom: 1rem;
}

.video-modal-text {
  font-family: 'Anton', sans-serif;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.video-modal-subtext {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
}
</style>
