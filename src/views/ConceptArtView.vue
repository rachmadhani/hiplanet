<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
        }
      });
    },
    { threshold: 0.05 }
  )

  document.querySelectorAll('.reveal').forEach((el) => observer?.observe(el))
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <section class="concept-art-section grain">
    <div class="stars-overlay"></div>

    <!-- ============ 1. INTRO ============ -->
    <div class="intro-container">
      <div class="intro-content">
        <div class="section-line accent-cyan justify-center">Behind the Frames</div>

        <h1 class="reveal d-1 font-display main-headline">
          <span class="text-white">CONCEPT</span><br />
          <span class="accent-neon-blue">ART.</span>
        </h1>

        <p class="reveal d-2 font-space subtitle">
          Before the game. Before the comic. Just paper, ink, and a question:
          <span class="accent-amber font-display tracking-wide">WHAT DOES EARTH LOOK LIKE, DEFENDED</span>
        </p>
        <p class="reveal d-3 credits-line">
          Original designs by <span class="accent-coral">Sean Beck</span> · Refined &amp; illustrated by <span class="accent-coral">Andy Christian</span>
        </p>
      </div>

      <!-- Intro Videos Grid -->
      <div class="intro-videos-grid reveal d-4">
        <div class="intro-video-wrapper">
          <video 
            controls 
            playsinline 
            preload="metadata"
            poster="/reels-comic/SaveClip3.jpg" 
            class="intro-video"
          >
            <source src="/reels-comic/SaveClip3.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <div class="video-caption font-space">From Draft To a Real Sketch</div>
        </div>
        <div class="intro-video-wrapper">
          <video 
            controls 
            playsinline 
            preload="metadata"
            poster="/reels-comic/SaveClip6.jpg" 
            class="intro-video"
          >
            <source src="/reels-comic/SaveClip6.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          <div class="video-caption font-space">Meet Hi The Earth Guardian</div>
        </div>
      </div>
    </div>

    <!-- ============================================================
         3. CHARACTER DESIGN STUDIES
    ============================================================ -->
    <div class="container mb-24">
      <div class="section-header-row mb-10">
        <div>
          <div class="section-line accent-cyan">Chapter 01</div>
          <h3 class="font-display section-headline">
            <span class="text-white">CHARACTER</span> <span class="accent-neon-blue">STUDIES.</span>
          </h3>
        </div>
        <span class="num-badge">// 12 pieces</span>
      </div>

      <!-- Asymmetric magazine grid -->
      <div class="char-grid">
        <!-- Big HI face sheet (4 cols) -->
        <div class="col-span-6 col-md-4">
          <div class="art-slot aspect-4-3 mb-3">
            <div class="art-label">[ HI · FACE SHEET ]</div>
            <div class="art-meta">4:3 · ~1600×1200</div>
            <div class="art-meta">multiple angles + expressions</div>
          </div>
          <div class="art-caption" style="--accent: var(--cyan);">
            <div class="art-caption-title">HI · Expression Sheet</div>
            <div class="art-caption-meta">Pencil · 24 frames</div>
          </div>
        </div>

        <!-- Stacked column right (2 cols) -->
        <div class="col-span-6 col-md-2 space-y-5">
          <div>
            <div class="art-slot mb-3" style="aspect-ratio: auto; padding: 0;">
              <img src="/comic-image/hi-color-studies.png" alt="HI Color Studies" style="width: 100%; height: auto; display: block; z-index: 1;" />
              <!-- <div class="slot-overlay">
                <div class="art-label">[ HI · COLOR TEST ]</div>
                <div class="art-meta">~800×800</div>
              </div> -->
            </div>
            <div class="art-caption" style="--accent: var(--cyan);">
              <div class="art-caption-title">HI · Color Studies</div>
              <div class="art-caption-meta">3 palette explorations</div>
            </div>
          </div>
          <div>
            <div class="art-slot aspect-square mb-3">
              <div class="art-label">[ HI · ENERGY FX ]</div>
              <div class="art-meta">square · ~800×800</div>
            </div>
            <div class="art-caption" style="--accent: var(--cyan);">
              <div class="art-caption-title">HI · Lightning FX</div>
              <div class="art-caption-meta">Effect studies</div>
            </div>
          </div>
        </div>

        <!-- Row 2 — 3 portraits -->
        <div class="col-span-3 col-md-2">
          <div class="art-slot aspect-3-4 mb-3">
            <div class="art-label">[ RA · STUDY ]</div>
            <div class="art-meta">3:4 · ~900×1200</div>
          </div>
          <div class="art-caption" style="--accent: var(--amber);">
            <div class="art-caption-title">RA · Pose Study</div>
            <div class="art-caption-meta">Ink wash · 2024</div>
          </div>
        </div>

        <div class="col-span-3 col-md-2">
          <div class="art-slot aspect-3-4 mb-3">
            <div class="art-label">[ MOOLU · STUDY ]</div>
            <div class="art-meta">3:4 · ~900×1200</div>
          </div>
          <div class="art-caption" style="--accent: var(--green);">
            <div class="art-caption-title">MOOLU · Lab Coat Iterations</div>
            <div class="art-caption-meta">5 variants</div>
          </div>
        </div>

        <div class="col-span-6 col-md-2">
          <div class="art-slot aspect-3-4 mb-3">
            <div class="art-label">[ NEP · STUDY ]</div>
            <div class="art-meta">3:4 · ~900×1200</div>
          </div>
          <div class="art-caption" style="--accent: var(--earth);">
            <div class="art-caption-title">NEP · Trident Variations</div>
            <div class="art-caption-meta">Weapon design</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================
         4. WORLD PAINTINGS — Environments
    ============================================================ -->
    <div class="dark-section py-20 overflow-hidden">
      <div class="stars-overlay opacity-20"></div>
      <div class="container">
        <div class="section-header-row mb-10">
          <div>
            <div class="section-line accent-cyan">Chapter 02</div>
            <h3 class="font-display section-headline">
              <span class="text-white">WORLD</span> <span class="accent-neon-blue">PAINTINGS.</span>
            </h3>
            <p class="font-space section-desc max-w-2xl">
              Six environments. Two planets. From the green wilds of Earth
              to the lava-choked tower of Pollutopia.
            </p>
          </div>
          <span class="num-badge">// 6 paintings</span>
        </div>

        <!-- Full-width Ecopolis painting -->
        <div class="mb-8">
          <div class="art-slot aspect-16-7 mb-3">
            <div class="art-label">[ ECOPOLIS · OVERVIEW PAINTING ]</div>
            <div class="art-meta">16:7 cinematic · ~2400×1050</div>
            <div class="art-meta">eco-friendly city with 16 locations</div>
          </div>
          <div class="art-caption" style="--accent: var(--amber);">
            <div class="art-caption-title">Ecopolis · The Circle City</div>
            <div class="art-caption-meta">Digital painting · Master view</div>
          </div>
        </div>

        <!-- 5 Earth biomes grid -->
        <div class="world-grid">
          <div>
            <div class="art-slot aspect-video mb-3">
              <div class="art-label">[ FOREST · CH.1 ]</div>
              <div class="art-meta">16:9 · ~1600×900</div>
            </div>
            <div class="art-caption" style="--accent: var(--green);">
              <div class="art-caption-title">Mother Gaia Oak</div>
              <div class="art-caption-meta">Forest · Wood biome</div>
            </div>
          </div>

          <div>
            <div class="art-slot aspect-video mb-3">
              <div class="art-label">[ DESERT · CH.2 ]</div>
              <div class="art-meta">16:9 · ~1600×900</div>
            </div>
            <div class="art-caption" style="--accent: var(--cyan);">
              <div class="art-caption-title">Crystal Aqua Spring</div>
              <div class="art-caption-meta">Desert · Water biome</div>
            </div>
          </div>

          <div>
            <div class="art-slot aspect-video mb-3">
              <div class="art-label">[ WILDFIRE MT. · CH.3 ]</div>
              <div class="art-meta">16:9 · ~1600×900</div>
            </div>
            <div class="art-caption" style="--accent: var(--coral);">
              <div class="art-caption-title">Burning Mountain</div>
              <div class="art-caption-meta">Wildfire · Fire biome</div>
            </div>
          </div>

          <div>
            <div class="art-slot aspect-video mb-3">
              <div class="art-label">[ ARCTIC · CH.4 ]</div>
              <div class="art-meta">16:9 · ~1600×900</div>
            </div>
            <div class="art-caption" style="--accent: #9B8FB8;">
              <div class="art-caption-title">The Arcstone</div>
              <div class="art-caption-meta">Arctic · Stone biome</div>
            </div>
          </div>

          <div>
            <div class="art-slot aspect-video mb-3">
              <div class="art-label">[ WASTELAND · CH.5 ]</div>
              <div class="art-meta">16:9 · ~1600×900</div>
            </div>
            <div class="art-caption" style="--accent: var(--amber);">
              <div class="art-caption-title">Poison Tides</div>
              <div class="art-caption-meta">Wasteland · Metal biome</div>
            </div>
          </div>

          <div>
            <div class="art-slot aspect-video mb-3">
              <div class="art-label">[ POLLUTOPIA · CH.6 ]</div>
              <div class="art-meta">16:9 · ~1600×900</div>
            </div>
            <div class="art-caption" style="--accent: var(--magenta);">
              <div class="art-caption-title">Tower of Pollutopia</div>
              <div class="art-caption-meta">Finale · The CW's HQ</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================
         5. SKETCH TO FINAL — Process
    ============================================================ -->
    <div class="container py-20">
      <div class="mb-12 text-center">
        <div class="section-line accent-cyan justify-center">Chapter 03</div>
        <h3 class="font-display section-headline mb-3">
          <span class="text-white">SKETCH</span> <span class="accent-cyan">→</span> <span class="accent-neon-blue">FINAL.</span>
        </h3>
        <p class="font-space section-desc max-w-2xl mx-auto">
          Every page lives four lives before it ships.
        </p>
      </div>

      <!-- Process row — 4 stages -->
      <div class="process-grid mb-6">
        <div class="relative">
          <div class="step-label">01 · SKETCH</div>
          <div class="art-slot aspect-3-4">
            <div class="art-label">[ PENCIL SKETCH ]</div>
            <div class="art-meta">rough layout</div>
          </div>
        </div>

        <div class="relative">
          <div class="step-label">02 · INK</div>
          <div class="art-slot aspect-3-4">
            <div class="art-label">[ INK LAYER ]</div>
            <div class="art-meta">clean linework</div>
          </div>
        </div>

        <div class="relative">
          <div class="step-label">03 · FLAT</div>
          <div class="art-slot aspect-3-4">
            <div class="art-label">[ FLAT COLOR ]</div>
            <div class="art-meta">base palette</div>
          </div>
        </div>

        <div class="relative">
          <div class="step-label">04 · FINAL</div>
          <div class="art-slot aspect-3-4" style="border-color: var(--coral);">
            <div class="art-label accent-coral">[ FINAL ART ]</div>
            <div class="art-meta">shading + FX</div>
          </div>
        </div>
      </div>

      <div class="art-caption" style="--accent: var(--coral);">
        <div class="art-caption-title">"HI charges the barrier" · 4-step process</div>
        <div class="art-caption-meta">Volume 2 · Page 47</div>
      </div>
    </div>

    <!-- ============================================================
         6. PROPS · ITEMS · TECH
    ============================================================ -->
    <div class="dark-section py-20 overflow-hidden">
      <div class="stars-overlay opacity-20"></div>
      <div class="container">
        <div class="section-header-row mb-10">
          <div>
            <div class="section-line accent-cyan">Chapter 04</div>
            <h3 class="font-display section-headline">
              <span class="text-white">PROPS, TECH</span><br />
              <span class="accent-neon-blue">& EVERYTHING ELSE.</span>
            </h3>
          </div>
          <span class="num-badge">// 8 items</span>
        </div>

        <!-- 4-col grid of items -->
        <div class="props-grid">
          <div>
            <div class="art-slot aspect-square mb-3 prop-slot-green">
              <div class="art-label">[ ECO CUBES ]</div>
              <div class="art-meta">800×800</div>
              <div class="art-meta">4 tier variations</div>
            </div>
            <div class="art-caption" style="--accent: var(--green);">
              <div class="art-caption-title">Eco Cube Currency</div>
              <div class="art-caption-meta">Green · Blue · Neon variants</div>
            </div>
          </div>

          <div>
            <div class="art-slot aspect-square mb-3 prop-slot-coral">
              <div class="art-label">[ COSMIC CUBE ]</div>
              <div class="art-meta">800×800</div>
              <div class="art-meta">5 energy slots</div>
            </div>
            <div class="art-caption" style="--accent: var(--coral);">
              <div class="art-caption-title">Infinite Power Cube</div>
              <div class="art-caption-meta">CW's goal · 5 energies</div>
            </div>
          </div>

          <div>
            <div class="art-slot aspect-square mb-3 prop-slot-amber">
              <div class="art-label">[ SOLAR LANCE ]</div>
              <div class="art-meta">800×800</div>
              <div class="art-meta">Athen's weapon</div>
            </div>
            <div class="art-caption" style="--accent: var(--amber);">
              <div class="art-caption-title">Solar Lance</div>
              <div class="art-caption-meta">Athen · ranged + melee</div>
            </div>
          </div>

          <div>
            <div class="art-slot aspect-square mb-3 prop-slot-frost">
              <div class="art-label">[ LUNAR GUARD ]</div>
              <div class="art-meta">800×800</div>
              <div class="art-meta">Athen's shield</div>
            </div>
            <div class="art-caption" style="--accent: var(--blue);">
              <div class="art-caption-title">Lunar Guard Shield</div>
              <div class="art-caption-meta">Energy pulse defense</div>
            </div>
          </div>

          <div>
            <div class="art-slot aspect-square mb-3 prop-slot-violet">
              <div class="art-label">[ QUANTUM QUICKSILVER ]</div>
              <div class="art-meta">800×800</div>
              <div class="art-meta">portal device</div>
            </div>
            <div class="art-caption" style="--accent: var(--violet);">
              <div class="art-caption-title">QQ · Quantum Quicksilver</div>
              <div class="art-caption-meta">Gateway tech · Gig's invention</div>
            </div>
          </div>

          <div>
            <div class="art-slot aspect-square mb-3 prop-slot-cyan">
              <div class="art-label">[ MOOLU BARRIER ]</div>
              <div class="art-meta">800×800</div>
              <div class="art-meta">gate mechanic</div>
            </div>
            <div class="art-caption" style="--accent: var(--cyan);">
              <div class="art-caption-title">Moolu Barrier</div>
              <div class="art-caption-meta">Gate · Seal mechanic</div>
            </div>
          </div>

          <div>
            <div class="art-slot aspect-square mb-3 prop-slot-magenta">
              <div class="art-label">[ ROBOT GRUNT ]</div>
              <div class="art-meta">800×800</div>
              <div class="art-meta">enemy base unit</div>
            </div>
            <div class="art-caption" style="--accent: var(--magenta);">
              <div class="art-caption-title">Robot Swarm Unit</div>
              <div class="art-caption-meta">Pollutopia factory output</div>
            </div>
          </div>

          <div>
            <div class="art-slot aspect-square mb-3 prop-slot-earth">
              <div class="art-label">[ GNCC TOWER ]</div>
              <div class="art-meta">800×800</div>
              <div class="art-meta">Big Bang Theory's HQ</div>
            </div>
            <div class="art-caption" style="--accent: var(--earth);">
              <div class="art-caption-title">GNCC Spire</div>
              <div class="art-caption-meta">Ecopolis · Top floor sanctum</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================
         7. COMIC PAGES — Selected Spreads
    ============================================================ -->
    <div class="container py-20">
      <div class="section-header-row mb-10">
        <div>
          <div class="section-line accent-cyan">Chapter 05</div>
          <h3 class="font-display section-headline">
            <span class="text-white">FROM THE</span> <span class="accent-neon-blue">COMIC.</span>
          </h3>
          <p class="font-space section-desc max-w-2xl">
            Selected pages from the 200+ that started it all.
          </p>
        </div>
        <span class="num-badge">// 6 spreads</span>
      </div>

      <!-- Polaroid-style comic page samples -->
      <div class="comic-grid">
        <div class="polaroid">
          <div class="polaroid-art art-slot aspect-3-4" style="border: none;">
            <div class="art-label" style="color: #1a0a1f;">[ VOL.1 · PG.12 ]</div>
            <div class="art-meta" style="color: #1a0a1f;">comic page</div>
          </div>
          <div class="polaroid-caption">"HI meets RA"</div>
        </div>

        <div class="polaroid rotate-right">
          <div class="polaroid-art art-slot aspect-3-4" style="border: none;">
            <div class="art-label" style="color: #1a0a1f;">[ VOL.1 · PG.47 ]</div>
            <div class="art-meta" style="color: #1a0a1f;">comic page</div>
          </div>
          <div class="polaroid-caption">"The Council meets"</div>
        </div>

        <div class="polaroid rotate-left-slight">
          <div class="polaroid-art art-slot aspect-3-4" style="border: none;">
            <div class="art-label" style="color: #1a0a1f;">[ VOL.2 · PG.03 ]</div>
            <div class="art-meta" style="color: #1a0a1f;">comic page</div>
          </div>
          <div class="polaroid-caption">"Pollutopia reveal"</div>
        </div>

        <div class="polaroid rotate-right-slight">
          <div class="polaroid-art art-slot aspect-3-4" style="border: none;">
            <div class="art-label" style="color: #1a0a1f;">[ VOL.2 · PG.88 ]</div>
            <div class="art-meta" style="color: #1a0a1f;">comic page</div>
          </div>
          <div class="polaroid-caption">"MAC awakens"</div>
        </div>

        <div class="polaroid rotate-left">
          <div class="polaroid-art art-slot aspect-3-4" style="border: none;">
            <div class="art-label" style="color: #1a0a1f;">[ VOL.3 · PG.15 ]</div>
            <div class="art-meta" style="color: #1a0a1f;">comic page</div>
          </div>
          <div class="polaroid-caption">"The Wormhole opens"</div>
        </div>

        <div class="polaroid rotate-right">
          <div class="polaroid-art art-slot aspect-3-4" style="border: none;">
            <div class="art-label" style="color: #1a0a1f;">[ VOL.3 · PG.92 ]</div>
            <div class="art-meta" style="color: #1a0a1f;">comic page</div>
          </div>
          <div class="polaroid-caption">"Earth defended"</div>
        </div>
      </div>
    </div>

    <!-- ============================================================
         7.5 ART IN MOTION — Timelapses & Reels
    ============================================================ -->
    <div class="dark-section py-20 overflow-hidden">
      <div class="stars-overlay opacity-20"></div>
      <div class="instagram-glow"></div>

      <div class="container">
        <div class="section-header-row mb-10">
          <div>
            <div class="section-line accent-cyan">Chapter 06 · Instagram</div>
            <h3 class="font-display section-headline">
              <span class="text-white">ART</span> <span class="accent-neon-blue">IN MOTION.</span>
            </h3>
            <p class="font-space section-desc max-w-2xl">
              Process clips, character reveals, and timelapse drops from
              <a href="https://instagram.com/hiplanetofficial" target="_blank" class="accent-amber not-italic font-display hover-underline">@hiplanetofficial</a>
            </p>
          </div>
          <span class="num-badge">// 7 reels</span>
        </div>

        <!-- LAYOUT: Featured (1 large) + grid (6 thumbnails) -->
        <div class="reels-main-grid">
          <!-- FEATURED REEL -->
          <div class="lg-col-5">
            <div class="aspect-9-16 max-w-md mx-auto lg-max-w-none h-full">
              <div class="art-slot h-full" style="border-color: rgba(200,52,90,0.4);">
                <div class="art-label" style="color: #C8345A;">[ FEATURED REEL ]</div>
                <div class="art-meta">9:16 vertical · Instagram embed</div>
                <div class="art-meta">latest process video</div>

                <!-- Play icon overlay -->
                <div class="play-overlay">
                  <div class="play-ring" style="background: rgba(200, 52, 90, 0.3); border-color: rgba(200, 52, 90, 0.5);">
                    <span class="play-triangle">▶</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="art-caption mt-3" style="--accent: var(--magenta);">
              <div class="art-caption-title">★ FEATURED · Latest Process Reel</div>
              <div class="art-caption-meta">@hiplanetofficial · drops Mondays</div>
            </div>
          </div>

          <!-- GRID OF 6 OTHER THUMBNAILS -->
          <div class="lg-col-7 reels-thumb-grid">
            <!-- Reel 1 -->
            <a href="https://instagram.com/hiplanetofficial" target="_blank" class="block group">
              <div class="relative aspect-9-16 art-slot overflow-hidden">
                <div class="art-label">[ REEL 01 ]</div>
                <div class="art-meta">9:16</div>
                <div class="play-overlay-mini">
                  <div class="play-ring-mini">
                    <span class="play-triangle-mini">▶</span>
                  </div>
                </div>
                <div class="topic-chip bg-cyan">PROCESS</div>
              </div>
              <div class="mt-2 text-xs text-cream/70 leading-snug">
                <div class="font-semibold">"HI charges the barrier"</div>
                <div class="text-[10px] uppercase tracking-wider text-cream/40 mt-1">Sketch → Final</div>
              </div>
            </a>

            <!-- Reel 2 -->
            <a href="https://instagram.com/hiplanetofficial" target="_blank" class="block group">
              <div class="relative aspect-9-16 art-slot overflow-hidden">
                <div class="art-label">[ REEL 02 ]</div>
                <div class="art-meta">9:16</div>
                <div class="play-overlay-mini">
                  <div class="play-ring-mini">
                    <span class="play-triangle-mini">▶</span>
                  </div>
                </div>
                <div class="topic-chip bg-amber">REVEAL</div>
              </div>
              <div class="mt-2 text-xs text-cream/70 leading-snug">
                <div class="font-semibold">"Meet RA"</div>
                <div class="text-[10px] uppercase tracking-wider text-cream/40 mt-1">Character Reveal</div>
              </div>
            </a>

            <!-- Reel 3 -->
            <a href="https://instagram.com/hiplanetofficial" target="_blank" class="block group">
              <div class="relative aspect-9-16 art-slot overflow-hidden">
                <div class="art-label">[ REEL 03 ]</div>
                <div class="art-meta">9:16</div>
                <div class="play-overlay-mini">
                  <div class="play-ring-mini">
                    <span class="play-triangle-mini">▶</span>
                  </div>
                </div>
                <div class="topic-chip bg-coral">BTS</div>
              </div>
              <div class="mt-2 text-xs text-cream/70 leading-snug">
                <div class="font-semibold">"Inside the studio"</div>
                <div class="text-[10px] uppercase tracking-wider text-cream/40 mt-1">Behind the Scenes</div>
              </div>
            </a>

            <!-- Reel 4 -->
            <a href="https://instagram.com/hiplanetofficial" target="_blank" class="block group">
              <div class="relative aspect-9-16 art-slot overflow-hidden">
                <div class="art-label">[ REEL 04 ]</div>
                <div class="art-meta">9:16</div>
                <div class="play-overlay-mini">
                  <div class="play-ring-mini">
                    <span class="play-triangle-mini">▶</span>
                  </div>
                </div>
                <div class="topic-chip bg-green">WORLD</div>
              </div>
              <div class="mt-2 text-xs text-cream/70 leading-snug">
                <div class="font-semibold">"Ecopolis painting"</div>
                <div class="text-[10px] uppercase tracking-wider text-cream/40 mt-1">Timelapse</div>
              </div>
            </a>

            <!-- Reel 5 -->
            <a href="https://instagram.com/hiplanetofficial" target="_blank" class="block group">
              <div class="relative aspect-9-16 art-slot overflow-hidden">
                <div class="art-label">[ REEL 05 ]</div>
                <div class="art-meta">9:16</div>
                <div class="play-overlay-mini">
                  <div class="play-ring-mini">
                    <span class="play-triangle-mini">▶</span>
                  </div>
                </div>
                <div class="topic-chip bg-magenta text-white">VILLAIN</div>
              </div>
              <div class="mt-2 text-xs text-cream/70 leading-snug">
                <div class="font-semibold">"MAC awakens"</div>
                <div class="text-[10px] uppercase tracking-wider text-cream/40 mt-1">Boss Reveal</div>
              </div>
            </a>

            <!-- Reel 6 -->
            <a href="https://instagram.com/hiplanetofficial" target="_blank" class="block group">
              <div class="relative aspect-9-16 art-slot overflow-hidden">
                <div class="art-label">[ REEL 06 ]</div>
                <div class="art-meta">9:16</div>
                <div class="play-overlay-mini">
                  <div class="play-ring-mini">
                    <span class="play-triangle-mini">▶</span>
                  </div>
                </div>
                <div class="topic-chip bg-violet text-white">GAMEPLAY</div>
              </div>
              <div class="mt-2 text-xs text-cream/70 leading-snug">
                <div class="font-semibold">"First playable build"</div>
                <div class="text-[10px] uppercase tracking-wider text-cream/40 mt-1">Dev Diary</div>
              </div>
            </a>
          </div>
        </div>

        <!-- Mini follow CTA -->
        <div class="mt-10 text-center">
          <a href="https://instagram.com/hiplanetofficial" target="_blank" class="inline-flex items-center gap-3 font-display insta-cta-btn">
            ◉ See All Reels on @hiplanetofficial
            <span>→</span>
          </a>
        </div>
      </div>
    </div>

    <!-- ============================================================
         8. ARTIST CREDITS
    ============================================================ -->
    <div class="dark-section py-16 overflow-hidden">
      <div class="stars-overlay opacity-25"></div>
      <div class="container max-w-5xl">
        <div class="credits-grid">
          <div class="artist-card">
            <div class="artist-subtitle">// Creator · Writer · Original Designer</div>
            <h4 class="font-display artist-name">SEAN BECK</h4>
            <p class="artist-desc">
              Built the world of Hi Planet from the ground up. Designed every character
              at concept stage — from HI to the Cosmic Wormhole — then handed each one
              to Andy for polish. The mind behind every story beat across comics and game.
            </p>
            <div class="artist-meta">
              Ecosoft Interactive · Founder
            </div>
          </div>

          <div class="artist-card">
            <div class="artist-subtitle">// Lead Illustrator</div>
            <h4 class="font-display artist-name">ANDY CHRISTIAN</h4>
            <p class="artist-desc">
              Took Sean's original character concepts and brought them to life across
              200+ pages of comics. Refined every silhouette, every expression, every
              page layout. The visual voice of the published work.
            </p>
            <div class="artist-meta">
              Volumes · 1 · 2 · 3
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============ 9. CTA STRIP ============ -->
    <div class="cta-strip py-16 overflow-hidden">
      <div class="stars-overlay opacity-25"></div>
      <div class="cta-gradient-glow"></div>
      <div class="container max-w-4xl text-center">
        <h3 class="font-display cta-headline mb-4">
          <span class="text-white">MORE ART.</span><br />
          <span class="accent-neon-blue">MORE OFTEN.</span>
        </h3>
        <p class="font-space subtitle mb-8 max-w-xl mx-auto">
          New process pieces, sketch dumps, and color studies drop weekly on Instagram.
        </p>

        <div class="cta-buttons-row">
          <a href="https://instagram.com/hiplanetofficial" target="_blank" class="font-display cta-btn-primary">
            ◉ Follow @hiplanetofficial
          </a>
          <RouterLink to="/comic" class="font-display cta-btn-secondary">
            📖 Read the Comic
          </RouterLink>
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped>
.concept-art-section {
  position: relative;
  /* background: var(--midnight); */
  color: var(--cream);
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  font-family: 'Manrope', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* Container */
.container {
  max-width: 1660px;
  margin: 0 auto;
  padding: 0 1.5rem;
  width: 100%;
  position: relative;
  z-index: 10;
}

.max-w-5xl { max-width: 64rem; }
.max-w-4xl { max-width: 1200px; }
.max-w-2xl { max-width: 42rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.text-center { text-align: center; }

/* Margins */
.mb-3 { margin-bottom: 0.75rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mb-8 { margin-bottom: 2rem; }
.mb-10 { margin-bottom: 2.5rem; }
.mb-12 { margin-bottom: 3rem; }
.mb-24 { margin-bottom: 6rem; }
.mt-3 { margin-top: 0.75rem; }
.mt-10 { margin-top: 2.5rem; }

/* Paddings */
.py-16 { padding-top: 4rem; padding-bottom: 4rem; }
.py-20 { padding-top: 5rem; padding-bottom: 5rem; }
.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }
.p-8 { padding: 2rem; }

/* Grids */
.char-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 1rem;
}
@media (min-width: 768px) {
  .char-grid {
    gap: 1.25rem;
  }
}

.col-span-6 { grid-column: span 6 / span 6; }
.col-span-3 { grid-column: span 3 / span 3; }

@media (min-width: 768px) {
  .col-md-4 { grid-column: span 4 / span 4; }
  .col-md-2 { grid-column: span 2 / span 2; }
}

.space-y-5 > * + * {
  margin-top: 1.25rem;
}

.world-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}
@media (min-width: 640px) {
  .world-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (min-width: 1024px) {
  .world-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.process-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}
@media (min-width: 768px) {
  .process-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
  }
}

.props-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}
@media (min-width: 768px) {
  .props-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.25rem;
  }
}

.comic-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
}
@media (min-width: 768px) {
  .comic-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2rem;
  }
}

.reels-main-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}
@media (min-width: 1024px) {
  .reels-main-grid {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }
}

.lg-col-5 { grid-column: span 12 / span 12; }
.lg-col-7 { grid-column: span 12 / span 12; }

@media (min-width: 1024px) {
  .lg-col-5 { grid-column: span 5 / span 5; }
  .lg-col-7 { grid-column: span 7 / span 7; }
}

.reels-thumb-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}
@media (min-width: 768px) {
  .reels-thumb-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.credits-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}
@media (min-width: 768px) {
  .credits-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2.5rem;
  }
}

/* Typography & Display classes */
.font-display {
  font-family: 'Anton', sans-serif;
  letter-spacing: 0.02em;
}

.font-serif {
  font-family: 'Fraunces', serif;
}

.font-space {
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
}

.font-pixel {
  font-family: 'Press Start 2P', system-ui;
}

.section-line {
  display: flex;
  align-items: center;
  gap: 16px;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 20px;
}
.section-line::before {
  content: "";
  width: 40px;
  height: 1px;
  background: currentColor;
  opacity: 0.7;
}

.justify-center { justify-content: center; }

.accent-coral { color: var(--coral); }
.accent-neon-blue { color: var(--neon-blue); }
.accent-amber { color: var(--amber); }
.accent-cyan { color: var(--cyan); }
.accent-earth { color: var(--earth); }
.accent-green { color: var(--green); }
.accent-magenta { color: var(--magenta); }
.accent-violet { color: var(--violet); }

/* Stars Background Overlay */
.stars-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    radial-gradient(1.5px 1.5px at 12% 24%, rgba(255,255,255,0.9), transparent),
    radial-gradient(1px 1px at 58% 71%, rgba(255,255,255,0.6), transparent),
    radial-gradient(2px 2px at 82% 18%, rgba(255,255,255,0.85), transparent),
    radial-gradient(1px 1px at 38% 82%, rgba(255,255,255,0.55), transparent),
    radial-gradient(1.5px 1.5px at 91% 44%, rgba(255,255,255,0.8), transparent);
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
  opacity: 0.05;
  mix-blend-mode: overlay;
  z-index: 1;
}

/* ============ 1. INTRO ============ */
.intro-container {
  position: relative;
  max-width: 80rem;
  margin: 0 auto;
  padding: 10rem 1.5rem 3rem;
}
@media (min-width: 768px) {
  .intro-container {
    /* padding-top: 7rem; */
  }
}

.intro-content {
  text-align: center;
  max-width: 48rem;
  margin: 0 auto;
}

.main-headline {
  font-size: clamp(3.5rem, 13vw, 12rem);
  line-height: 0.85;
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 0 6px 30px rgba(0,0,0,0.7);
}

.color-royal {
  color: var(--royal);
}

.subtitle {
  font-size: 1.4rem;
  line-height: 1.625;
  color: rgb(255, 245, 229);
  margin-bottom: 0.75rem;
}

.credits-line {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: rgb(255, 245, 229);
  font-weight: 600;
  margin-top: 1.5rem;
}

/* ============ 2. FEATURED HERO PIECE ============ */
.tag-featured {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: var(--amber);
  font-weight: 700;
  margin-bottom: 1rem;
}

/* ===== ART SLOT ===== */
.art-slot {
  position: relative;
  background:
    repeating-linear-gradient(45deg, rgba(255,245,229,0.03) 0 10px, transparent 10px 20px),
    linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  color: rgba(255,245,229,0.4);
  text-align: center;
  padding: 16px;
  overflow: hidden;
  border: 1px solid rgba(255,245,229,0.08);
  transition: all 0.4s ease;
}

.art-slot:hover {
  border-color: var(--cyan);
  transform: translateY(-2px);
}

.art-slot::before, .art-slot::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1.5px dashed rgba(255,245,229,0.2);
  z-index: 5;
  pointer-events: none;
}
.art-slot::before { top: 12px; left: 12px; }
.art-slot::after { bottom: 12px; right: 12px; }

.art-label {
  font-family: 'Press Start 2P', system-ui;
  font-size: 9px;
  letter-spacing: 0.1em;
  position: relative;
  z-index: 10;
}

.art-meta {
  font-family: 'Press Start 2P', system-ui;
  font-size: 7px;
  letter-spacing: 0.1em;
  opacity: 0.55;
  position: relative;
  z-index: 10;
}

/* Aspect ratios */
.aspect-21-9 { aspect-ratio: 21 / 9; }
.aspect-4-3 { aspect-ratio: 4 / 3; }
.aspect-3-4 { aspect-ratio: 3 / 4; }
.aspect-square { aspect-ratio: 1 / 1; }
.aspect-16-7 { aspect-ratio: 16 / 7; }
.aspect-video { aspect-ratio: 16 / 9; }
.aspect-9-16 { aspect-ratio: 9 / 16; }

/* Caption Box */
.art-caption {
  padding: 12px 16px;
  background: rgba(0,0,0,0.5);
  border-left: 2px solid var(--accent, var(--coral));
}

.art-caption-title {
  font-family: 'Anton', sans-serif;
  font-size: 14px;
  letter-spacing: 0.05em;
  color: var(--cream);
}

.art-caption-meta {
  font-size: 9px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: rgb(255, 245, 229);
  font-weight: 600;
  margin-top: 4px;
}

/* Section Header Layout */
.section-header-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.section-headline {
  /* font-size: 1.875rem; */
  font-size: clamp(3rem, 10vw, 8rem);
  line-height: 0.9;
}
@media (min-width: 768px) {
  .section-headline {
    /* font-size: 3rem; */
  }
}

.num-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Press Start 2P', system-ui;
  font-size: 9px;
  letter-spacing: 0.1em;
  color: rgb(255, 245, 229);
  padding: 4px 8px;
  border: 1px solid rgb(255, 245, 229);
}

/* Dark section background */
.dark-section {
  position: relative;
  /* background: #06122A; */
  z-index: 10;
}

.section-desc {
  font-size: 1.5rem;
  color: rgb(255, 245, 229);
  margin-top: 0.75rem;
}

/* Step Label */
.step-label {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 15;
  font-family: 'Press Start 2P', system-ui;
  font-size: 8px;
  letter-spacing: 0.15em;
  padding: 4px 8px;
  background: var(--midnight);
  color: var(--coral);
  border: 1px solid var(--coral);
}

/* Props Slots Custom Overlays */
.prop-slot-green { background: linear-gradient(135deg, rgba(74,222,128,0.08), rgba(74,222,128,0.02)); }
.prop-slot-coral { background: linear-gradient(135deg, rgba(255,107,53,0.08), rgba(255,107,53,0.02)); }
.prop-slot-amber { background: linear-gradient(135deg, rgba(255,182,39,0.08), rgba(255,182,39,0.02)); }
.prop-slot-frost { background: linear-gradient(135deg, rgba(186,230,253,0.08), rgba(186,230,253,0.02)); }
.prop-slot-violet { background: linear-gradient(135deg, rgba(155,143,184,0.08), rgba(155,143,184,0.02)); }
.prop-slot-cyan { background: linear-gradient(135deg, rgba(34,211,238,0.08), rgba(34,211,238,0.02)); }
.prop-slot-magenta { background: linear-gradient(135deg, rgba(200,52,90,0.08), rgba(200,52,90,0.02)); }
.prop-slot-earth { background: linear-gradient(135deg, rgba(74,144,226,0.08), rgba(74,144,226,0.02)); }

/* ============ 7. COMIC PAGES — Polaroid ============ */
.polaroid {
  padding: 12px 12px 32px;
  background: var(--cream);
  box-shadow: 0 8px 20px rgba(0,0,0,0.5);
  transform: rotate(-1deg);
  transition: transform 0.3s ease;
}

.polaroid:hover {
  transform: rotate(0deg) scale(1.02);
}

.rotate-right { transform: rotate(1deg); }
.rotate-left-slight { transform: rotate(-0.5deg); }
.rotate-right-slight { transform: rotate(0.5deg); }
.rotate-left { transform: rotate(-1deg); }

.polaroid-art {
  position: relative;
  background:
    repeating-linear-gradient(45deg, rgba(10,24,52,0.06) 0 10px, transparent 10px 20px),
    rgba(10,24,52,0.08);
  color: var(--midnight);
  overflow: hidden;
}

.polaroid-caption {
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  color: var(--midnight);
  text-align: center;
  margin-top: 12px;
  font-size: 1.15rem;
}

/* ============ Reels / Instagram ============ */
.instagram-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 50% 60% at 80% 30%, rgba(200,52,90,0.10) 0%, transparent 60%);
  pointer-events: none;
}

.hover-underline:hover {
  text-decoration: underline;
}

.play-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
  z-index: 10;
}

.play-ring {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(200, 52, 90, 0.3);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(200, 52, 90, 0.5);
  transition: all 0.3s ease;
}

.play-triangle {
  color: white;
  font-size: 30px;
  margin-left: 6px;
}

.play-overlay-mini {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.play-ring-mini {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.group:hover .play-ring-mini {
  background: rgba(200, 52, 90, 0.6);
  transform: scale(1.1);
}

.play-triangle-mini {
  color: white;
  font-size: 16px;
  margin-left: 3px;
}

.topic-chip {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 15;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 2px 8px;
  color: var(--midnight);
  text-transform: uppercase;
}

.bg-amber { background-color: var(--amber); }
.bg-coral { background-color: var(--coral); }
.bg-green { background-color: var(--green); }
.bg-magenta { background-color: var(--magenta); }

.insta-cta-btn {
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 12px 24px;
  border: 2px solid var(--magenta);
  color: var(--magenta);
  transition: all 0.3s ease;
  background: transparent;
  text-decoration: none;
}

.insta-cta-btn:hover {
  background: var(--magenta);
  color: white;
}

/* ============ Artist Credits ============ */
.artist-card {
  padding: 2rem;
  border: 2px solid rgb(255, 245, 229);
  background-color: rgba(10, 24, 52, 0.5);
  backdrop-filter: blur(8px);
}

.artist-subtitle {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: var(--cyan);
  font-weight: 700;
  margin-bottom: 1rem;
}

.artist-card:nth-child(2) .artist-subtitle {
  color: var(--coral);
}

.artist-name {
  font-size: 2.25rem;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.artist-desc {
  font-size: 0.875rem;
  color: rgb(255, 245, 229);
  line-height: 1.625;
  margin-bottom: 1rem;
}

.artist-meta {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: rgba(255, 245, 229, 0.828);
  font-weight: 600;
}

/* ============ CTA Strip ============ */
.cta-strip {
  position: relative;
  /* background: var(--midnight); */
  border-top: 1px solid rgb(255, 245, 229);
  z-index: 10;
}

.cta-gradient-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 50% 60% at 50% 50%, rgba(255,107,53,0.12) 0%, transparent 70%);
  pointer-events: none;
}

.cta-headline {
  font-size: clamp(3.5rem, 13vw, 12rem);
  line-height: 0.85;
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 0 6px 30px rgba(0,0,0,0.7);
}
@media (min-width: 768px) {
  .cta-headline {
    /* font-size: 3rem; */
  }
}

.cta-buttons-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
@media (min-width: 640px) {
  .cta-buttons-row {
    flex-direction: row;
  }
}

.cta-btn-primary {
  font-size: 16px;
  padding: 16px 32px;
  background: var(--coral);
  color: var(--midnight);
  border: 2px solid var(--coral);
  box-shadow: 5px 5px 0 var(--cream);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  transition: transform 0.2s, box-shadow 0.2s;
}

.cta-btn-primary:hover {
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0 var(--cream);
}

.cta-btn-secondary {
  font-size: 16px;
  padding: 12px 24px;
  border: 2px solid rgba(255, 245, 229, 0.4);
  color: var(--cream);
  background: transparent;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  transition: all 0.3s ease;
}

.cta-btn-secondary:hover {
  border-color: var(--cream);
  background-color: var(--cream);
  color: var(--midnight);
}

/* Reveal scroll animations */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.d-1 { transition-delay: 0.1s; }
.d-2 { transition-delay: 0.25s; }
.d-3 { transition-delay: 0.4s; }

/* Intro Videos Grid */
.intro-videos-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 700px;
  margin: 3rem auto 0;
  position: relative;
  z-index: 20;
}
@media (min-width: 640px) {
  .intro-videos-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.intro-video-wrapper {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 245, 229, 0.1);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.3s ease;
}

.intro-video-wrapper:hover {
  border-color: var(--cyan);
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0, 200, 255, 0.15);
}

.intro-video {
  width: 100%;
  aspect-ratio: 9 / 16;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.video-caption {
  font-size: 0.9rem;
  color: rgb(255, 245, 229);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* Image cover & overlay inside blueprint slots */
.slot-image-cover {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.slot-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  opacity: 1;
  transition: opacity 0.3s ease;
  z-index: 2;
}

.art-slot:hover .slot-overlay {
  opacity: 0.8;
  background: rgba(0, 0, 0, 0.3);
}
</style>
