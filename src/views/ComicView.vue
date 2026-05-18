<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const activePlayingReelId = ref<string | null>(null)
const carouselRef = ref<HTMLElement | null>(null)

const playInline = (id: string) => {
  activePlayingReelId.value = id
}

const scrollLeft = () => {
  if (carouselRef.value) {
    carouselRef.value.scrollBy({ left: -360, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  if (carouselRef.value) {
    carouselRef.value.scrollBy({ left: 360, behavior: 'smooth' })
  }
}

const handleParallax = () => {
  const scroll = window.scrollY;
  const stars = document.querySelector('.stars-overlay') as HTMLElement;
  if (stars) {
    stars.style.transform = `translateY(${scroll * 0.2}px)`;
  }
};

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  window.addEventListener('scroll', handleParallax);
  document.querySelectorAll('.fade-up-comic').forEach(el => observer.observe(el));
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleParallax);
})
</script>

<template>
  <div class="comic-page">
    
    <!-- ============ TICKER ============ -->
    <!-- <div class="comic-ticker">
      <div class="ticker-content font-display">
        <span>◆ THE COMIC · A 3-VOLUME SERIES · 600 PAGES</span>
        <span>◆ VOL.1 OUT NOW ON AMAZON</span>
        <span>◆ VOL.2 · SUMMER 2026</span>
        <span>◆ VOL.3 · SPRING 2027</span>
        <span>◆ EPISODE 1 · SAVE THE EARTH</span>
       
        <span>◆ THE COMIC · A 3-VOLUME SERIES · 600 PAGES</span>
        <span>◆ VOL.1 OUT NOW ON AMAZON</span>
        <span>◆ VOL.2 · SUMMER 2026</span>
        <span>◆ VOL.3 · SPRING 2027</span>
        <span>◆ EPISODE 1 · SAVE THE EARTH</span>
      </div>
    </div> -->

    <!-- ============ 1. COMIC HERO ============ -->
    <section id="hero" class="comic-hero">
      <div class="stars-overlay"></div>
      <div class="halftone-overlay"></div>

      <div class="hero-container">

        <div class="hero-grid">
          <!-- LEFT: Title -->
          <div class="hero-left-col">
            <div class="hero-volume-tag fade-up-comic d-2">
              <span class="tag-line"></span>
              A 3-Volume Series · Volume 01 Out Now
            </div>
            <h1 class="hero-title fade-up-comic d-2 font-display">
              READ THE<br />
              <span class="accent-neon-blue">WORLD.</span>
            </h1>
            <p class="hero-subtitle fade-up-comic d-3 font-serif">
              Hi Planet started as a comic in 2020.<br />
              Six years. Three volumes. 600 pages.<br />
              <span class="hero-accent-block font-display">The comic came first.</span>
            </p>
            <div class="hero-actions-row fade-up-comic d-4">
              <a href="#vol1" class="btn-action btn-amazon font-display">
                📖 Read Vol.1 on Amazon
              </a>
              <a href="#vol2" class="btn-action btn-outline font-display">
                Vol.2 Updates
              </a>
            </div>
          </div>

          <!-- RIGHT: Hero comic panel collage -->
          <div class="hero-right-col fade-up-comic d-3">
            <!-- Panel 1 (back) -->
            <div class="panel-slot-item panel-1 flex-center" style="z-index: 1;">
              <div class="panel-content">
                <div class="font-comic panel-title">PANEL</div>
                <div class="font-pixel panel-sub">// COMIC ART</div>
              </div>
            </div>
            <!-- Panel 2 (mid) -->
            <div class="panel-slot-item panel-2 flex-center" style="z-index: 2; background-color: rgba(34, 211, 238, 0.05);">
              <div class="panel-content">
                <div class="font-comic panel-title">PANEL</div>
                <div class="font-pixel panel-sub">// COMIC ART</div>
              </div>
            </div>
            <!-- Panel 3 (front) — small accent -->
            <div class="panel-slot-item panel-3 flex-center" style="z-index: 3; background-color: rgba(255, 107, 53, 0.08);">
              <div class="panel-content">
                <div class="font-comic panel-title-sm">PANEL</div>
                <div class="font-pixel panel-sub-sm">// ART</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 2. THE ORIGIN STORY ============ -->
    <!-- <section id="origin" class="origin-section origin-bg fade-up-comic">
      <div class="stars-overlay opacity-25"></div>
      
      <div class="origin-container">
        <div class="origin-header">
          <div class="section-line accent-earth">The Origin · Six-year journey</div>
          <h2 class="origin-title font-display">
            BEFORE THE GAME,<br />
            <span class="accent-earth">A COMIC.</span>
          </h2>
          <p class="origin-subtitle font-serif">
            Hi Planet didn't start as a pitch deck. It started as a quiet
            lockdown thought — and grew into 200+ pages of art.
          </p>
        </div>

        <div class="origin-grid">
        
          <div class="origin-left-col">
            <div class="timeline-node accent-coral">
              <div class="marker">2020</div>
              <div class="node-content">
                <h3>A QUIET BEGINNING</h3>
                <p>
                  Lockdown stillness. Sean Beck sketches a single character — HI — a small Earth holding a tiny sword.
                  "What if Earth had to fight for itself?" The first page is drawn that month.
                </p>
              </div>
            </div>
            <div class="timeline-node accent-cyan">
              <div class="marker">2021–22</div>
              <div class="node-content">
                <h3>THE TEAM ASSEMBLES</h3>
                <p>
                  Page by page, the Hi Planet Team emerges: RA, MOOLU, MERC, SATU, V, JUPI, URA, NEP, PLU.
                  The villain takes shape — the Cosmic Wormhole. Five Earth energies become the stakes.
                </p>
              </div>
            </div>
            <div class="timeline-node accent-amber">
              <div class="marker">2023</div>
              <div class="node-content">
                <h3>VOL.1 PUBLISHED</h3>
                <p>
                  <span class="accent-amber" style="font-weight: 700;">Hi Planet: Save the Earth, Vol.1</span> publishes on Amazon.
                  Six chapters. The first journey across Earth's five energies. A finished book.
                </p>
              </div>
            </div>
            <div class="timeline-node accent-magenta">
              <div class="marker">2025</div>
              <div class="node-content">
                <h3>FROM PAGE TO PIXEL</h3>
                <p>
                  Ecosoft Interactive incorporates. The comic begins its second life as a horde-roguelite.
                  Selected for Busan Indie Game Festival 2025.
                </p>
              </div>
            </div>
            <div class="timeline-node accent-coral">
              <div class="marker">2026</div>
              <div class="node-content">
                <h3>VOL.2 + GAME LAUNCH</h3>
                <p>
                  <span class="accent-coral" style="font-weight: 700;">Vol.2 (Chapters 3-4)</span> publishes in summer.
                  The game launches on Steam, November 10. Two media. One story.
                </p>
              </div>
            </div>
            <div class="timeline-node accent-amber">
              <div class="marker">2027</div>
              <div class="node-content">
                <h3>VOL.3 · SERIES COMPLETE</h3>
                <p>
                  <span class="accent-amber" style="font-weight: 700;">Vol.3 (Chapters 5-6)</span> drops in spring,
                  concluding Episode 1: Save the Earth. The 600-page, 3-volume series is whole.
                </p>
              </div>
            </div>
          </div>

  
          <div class="origin-right-col">
            <div class="speech-bubble">
              <p>
                "I wanted to create a better world<br />for every child to inherit.<br />
                <span class="italic accent-coral" style="font-style: italic;">Hi Planet is that wish, drawn out.</span>"
              </p>
              <div class="quote-author">— Sean Beck, Writer</div>
            </div>

       
            <div class="makers-block">
              <div class="makers-label">// The Makers</div>
              <div class="makers-list">
                <div class="maker-item" style="--border-color: var(--coral);">
                  <div class="maker-name">SEAN BECK</div>
                  <div class="maker-role">Writer</div>
                </div>
                <div class="maker-item" style="--border-color: var(--cyan);">
                  <div class="maker-name">ANDY CHRISTIAN</div>
                  <div class="maker-role">Illustrator</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- ============ 3. VOL.1 SHOWCASE ============ -->
    <!-- <section id="vol1" class="vol-showcase vol-light fade-up-comic">
      <div class="halftone-dark"></div>
      
      <div class="vol-container">
        <div class="vol-grid">
          <div class="vol-left-col">
            <div class="cover-slot">
              <div class="stars-overlay"></div>
              <div class="halftone-light"></div>
              <div>
                <div class="cover-volume">Volume 01 · 2023</div>
                <div class="cover-title font-comic">HI<br />PLANET</div>
                <div class="cover-subtitle">SAVE THE EARTH</div>
              </div>
              <div>
                <div class="cover-quote">
                  "To create a better world<br />for every child to inherit."
                </div>
                <div class="cover-credits">
                  Written by Sean Beck<br />
                  Illustrated by Andy Christian<br />
                  <span class="cover-studio">Ecosoft Interactive</span>
                </div>
              </div>
            </div>
            <p class="cover-placeholder-text">
              → Replace with actual Vol.1 cover
            </p>
          </div>

          <div class="vol-right-col">
            <div class="section-line" style="color: var(--coral);">Volume 01 of 3 · Save the Earth</div>
            <h2 class="promo-title font-display" style="font-size: clamp(2rem, 3.5vw, 3.5rem);">
              ACT ONE.<br />
              <span style="color: var(--coral);">TWO CHAPTERS.</span>
            </h2>

            <p class="vol-desc">
              The opening two chapters of Hi Planet. Across 200 pages, MAC drains the
              sacred forest while SKU siphons the world's seas. The hunt for Earth's
              five energies begins.
            </p>

            <div class="specs-grid">
              <div class="spec-item">
                <span class="spec-label">Pages</span>
                <span class="spec-value font-display">200</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Chapters</span>
                <span class="spec-value font-display">2 of 6</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Format</span>
                <span class="spec-value font-display" style="font-size: clamp(0.9rem, 1.2vw, 1.1rem);">Paperback · Kindle</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Published</span>
                <span class="spec-value font-display">2023</span>
              </div>
            </div>

            <div style="margin-bottom: 2rem;">
              <div class="chapters-section-title">// What's inside Vol.1</div>
              <div class="chapters-list">
                <div class="chapter-row-item">
                  <span class="ch-num font-display">CH.01</span>
                  <span class="ch-title">Mother Gaia Oak</span>
                  <span class="ch-meta">Wood · MAC</span>
                </div>
                <div class="chapter-row-item">
                  <span class="ch-num font-display">CH.02</span>
                  <span class="ch-title">Drowning Tide</span>
                  <span class="ch-meta">Water · SKU</span>
                </div>
              </div>
              
              <div class="chapters-teaser-title">// Coming in Vol.2 &amp; Vol.3</div>
              <div class="chapters-teaser-list">
                <div class="chapter-row-item">
                  <span class="ch-num font-display">CH.03</span>
                  <span>Scorched Earth</span>
                  <span class="ch-meta">Fire · ROC · Vol.2</span>
                </div>
                <div class="chapter-row-item">
                  <span class="ch-num font-display">CH.04</span>
                  <span>Frozen Marrow</span>
                  <span class="ch-meta">Stone · ZOM · Vol.2</span>
                </div>
                <div class="chapter-row-item">
                  <span class="ch-num font-display">CH.05</span>
                  <span>The Wasteland</span>
                  <span class="ch-meta">Metal · KRA · Vol.3</span>
                </div>
                <div class="chapter-row-item">
                  <span class="ch-num font-display">CH.06</span>
                  <span>Pollutopia</span>
                  <span class="ch-meta">Finale · Vol.3</span>
                </div>
              </div>
            </div>

            <div class="ctas-row">
              <a href="#" class="btn-action btn-amazon font-display">
                📖 Buy on Amazon
              </a>
              <a href="#sample" class="btn-action btn-ink font-display">
                ⬇ Free Chapter 1
              </a>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- ============ 4. PEEK INSIDE — SAMPLE PAGES ============ -->
    <!-- <section id="sample" class="sample-section fade-up-comic">
      <div class="stars-overlay opacity-25"></div>
      
      <div class="sample-container">
        <div class="sample-header">
          <div class="section-line accent-amber">Read Inside · Sample pages</div>
          <h2 class="sample-title font-display">
            PEEK<br />
            <span class="accent-amber">INSIDE.</span>
          </h2>
          <p class="sample-subtitle font-serif">
            Six pages from Chapter 1. Click to enlarge. Want the full chapter?
            Drop your email below — we'll send the PDF.
          </p>
        </div>

        
        <div class="sample-grid">
          <div class="panel-slot">
            <div class="slot-inner">
              <div class="pg-num font-comic">PG.04</div>
              <div class="pg-tag font-pixel">// COMIC PAGE</div>
            </div>
          </div>
          <div class="panel-slot" style="background-color: rgba(74, 144, 226, 0.06);">
            <div class="slot-inner">
              <div class="pg-num font-comic">PG.07</div>
              <div class="pg-tag font-pixel">// COMIC PAGE</div>
            </div>
          </div>
          <div class="panel-slot" style="background-color: rgba(255, 107, 53, 0.06);">
            <div class="slot-inner">
              <div class="pg-num font-comic">PG.12</div>
              <div class="pg-tag font-pixel">// COMIC PAGE</div>
            </div>
          </div>
          <div class="panel-slot" style="background-color: rgba(255, 182, 39, 0.06);">
            <div class="slot-inner">
              <div class="pg-num font-comic">PG.18</div>
              <div class="pg-tag font-pixel">// COMIC PAGE</div>
            </div>
          </div>
          <div class="panel-slot" style="background-color: rgba(34, 211, 238, 0.06);">
            <div class="slot-inner">
              <div class="pg-num font-comic">PG.23</div>
              <div class="pg-tag font-pixel">// COMIC PAGE</div>
            </div>
          </div>
          <div class="panel-slot" style="background-color: rgba(200, 52, 90, 0.06);">
            <div class="slot-inner">
              <div class="pg-num font-comic">PG.31</div>
              <div class="pg-tag font-pixel">// COMIC PAGE</div>
            </div>
          </div>
        </div>

    
        <div class="signup-card">
          <div class="signup-card-label">// Free Chapter 1 PDF</div>
          <h3 class="signup-card-title font-display">
            GET CHAPTER 1<br /><span class="accent-coral">FREE.</span>
          </h3>
          <p class="signup-card-subtitle">
            Drop your email. We'll send the full first chapter as a PDF —
            and let you know first when Vol.2 drops.
          </p>
          <form class="signup-form" @submit.prevent="alert('Lead magnet signup placeholder')">
            <input type="email" placeholder="your@email.com" required class="signup-input" />
            <button type="submit" class="signup-btn font-display">
              Send me Ch.1
            </button>
          </form>
          <p class="signup-disclaimer">
            No spam. Just Vol.2 news + Hi Planet drops.
          </p>
        </div>
      </div>
    </section> -->

    <!-- ============ 5. WATCH THE STORY · INSTAGRAM REELS ============ -->
    <section id="reels" class="reels-section fade-up-comic">
      <div class="stars-overlay opacity-25"></div>
      
      <div class="reels-container">
        <div class="reels-header-row">
          <div class="reels-header-text">
            <div class="section-line accent-coral">Live · @hiplanetofficial</div>
            <h2 class="reels-title font-display">
              INSIDE THE<br />
              <span class="accent-neon-blue">SKETCHBOOK.</span>
            </h2>
            <p class="reels-subtitle font-serif">
              Comic panels animated. Character spotlights. Behind-the-scenes from the studio.
              Fresh from Instagram.
            </p>
          </div>
          <a href="https://www.instagram.com/hiplanetofficial/" target="_blank" rel="noopener" class="btn-follow font-display">
            @hiplanetofficial →
          </a>
        </div>

        <div class="reels-carousel-container">
          <!-- Carousel Prev Arrow Button -->
          <button class="carousel-arrow prev" @click="scrollLeft" aria-label="Previous Slide">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>

          <!-- Carousel Scrollable Area -->
          <div class="reels-carousel-scroll" ref="carouselRef">
            <div class="reels-grid">
              <!-- Reel 1 -->
              <div class="reel-link cursor-pointer">
                <div class="reel-slot" :class="{ 'reel-player-active': activePlayingReelId === 'DYWmYgoSIub' }" style="background: linear-gradient(to top, rgba(6,10,16,0.95) 0%, rgba(6,10,16,0.2) 50%, rgba(6,10,16,0.5) 100%), url('/reels-comic/SaveClip1.jpg') center/cover no-repeat;">
                  <video 
                    v-if="activePlayingReelId === 'DYWmYgoSIub'"
                    src="/reels-comic/SaveClip1.mp4" 
                    autoplay 
                    controls 
                    playsinline 
                    class="reel-inline-video"
                  ></video>
                  <div v-else @click="playInline('DYWmYgoSIub')" class="reel-cover-trigger">
                    <div class="reel-play-btn">
                      <div class="play-circle"><span class="play-icon">▶</span></div>
                    </div>
                    <span class="reel-source-tag">IG</span>
                    <div class="reel-info">
                      <div class="reel-meta font-display">Reel · 0:32</div>
                      <div class="reel-heading font-display">Mother Gaia<br />Oak Falls</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Reel 2 -->
              <div class="reel-link cursor-pointer">
                <div class="reel-slot reel-slot-2" :class="{ 'reel-player-active': activePlayingReelId === 'DYEkZveyPmz' }" style="background: linear-gradient(to top, rgba(6,10,16,0.95) 0%, rgba(6,10,16,0.2) 50%, rgba(6,10,16,0.5) 100%), url('/reels-comic/SaveClip2.jpg') center/cover no-repeat;">
                  <video 
                    v-if="activePlayingReelId === 'DYEkZveyPmz'"
                    src="/reels-comic/SaveClip2.mp4" 
                    autoplay 
                    controls 
                    playsinline 
                    class="reel-inline-video"
                  ></video>
                  <div v-else @click="playInline('DYEkZveyPmz')" class="reel-cover-trigger">
                    <div class="reel-play-btn">
                      <div class="play-circle"><span class="play-icon">▶</span></div>
                    </div>
                    <span class="reel-source-tag">IG</span>
                    <div class="reel-info">
                      <div class="reel-meta font-display">Reel · 0:45</div>
                      <div class="reel-heading font-display">Meet the<br />Hi Planet Team</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Reel 3 -->
              <div class="reel-link cursor-pointer">
                <div class="reel-slot reel-slot-3" :class="{ 'reel-player-active': activePlayingReelId === 'DXyez8oS6eX' }" style="background: linear-gradient(to top, rgba(6,10,16,0.95) 0%, rgba(6,10,16,0.2) 50%, rgba(6,10,16,0.5) 100%), url('/reels-comic/SaveClip3.jpg') center/cover no-repeat;">
                  <video 
                    v-if="activePlayingReelId === 'DXyez8oS6eX'"
                    src="/reels-comic/SaveClip3.mp4" 
                    autoplay 
                    controls 
                    playsinline 
                    class="reel-inline-video"
                  ></video>
                  <div v-else @click="playInline('DXyez8oS6eX')" class="reel-cover-trigger">
                    <div class="reel-play-btn">
                      <div class="play-circle"><span class="play-icon">▶</span></div>
                    </div>
                    <span class="reel-source-tag">IG</span>
                    <div class="reel-info">
                      <div class="reel-meta font-display">Reel · 0:28</div>
                      <div class="reel-heading font-display">Page to Pixel<br />Transformation</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Reel 4 -->
              <div class="reel-link cursor-pointer">
                <div class="reel-slot reel-slot-4" :class="{ 'reel-player-active': activePlayingReelId === 'DXge0dWklgu' }" style="background: linear-gradient(to top, rgba(6,10,16,0.95) 0%, rgba(6,10,16,0.2) 50%, rgba(6,10,16,0.5) 100%), url('/reels-comic/SaveClip4.jpg') center/cover no-repeat;">
                  <video 
                    v-if="activePlayingReelId === 'DXge0dWklgu'"
                    src="/reels-comic/SaveClip4.mp4" 
                    autoplay 
                    controls 
                    playsinline 
                    class="reel-inline-video"
                  ></video>
                  <div v-else @click="playInline('DXge0dWklgu')" class="reel-cover-trigger">
                    <div class="reel-play-btn">
                      <div class="play-circle"><span class="play-icon">▶</span></div>
                    </div>
                    <span class="reel-source-tag">IG</span>
                    <div class="reel-info">
                      <div class="reel-meta font-display">Reel · 0:38</div>
                      <div class="reel-heading font-display">Cosmic Wormhole<br />Reveal</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Reel 5 -->
              <div class="reel-link cursor-pointer">
                <div class="reel-slot reel-slot-5" :class="{ 'reel-player-active': activePlayingReelId === 'DXyez8oS6eX' }" style="background: linear-gradient(to top, rgba(6,10,16,0.95) 0%, rgba(6,10,16,0.2) 50%, rgba(6,10,16,0.5) 100%), url('/reels-comic/SaveClip5.jpg') center/cover no-repeat;">
                  <video 
                    v-if="activePlayingReelId === 'DXyez8oS6eX'"
                    src="/reels-comic/SaveClip5.mp4" 
                    autoplay 
                    controls 
                    playsinline 
                    class="reel-inline-video"
                  ></video>
                  <div v-else @click="playInline('DXyez8oS6eX')" class="reel-cover-trigger">
                    <div class="reel-play-btn">
                      <div class="play-circle"><span class="play-icon">▶</span></div>
                    </div>
                    <span class="reel-source-tag">IG</span>
                    <div class="reel-info">
                      <div class="reel-meta font-display">Reel · 0:28</div>
                      <div class="reel-heading font-display">Page to Pixel<br />Transformation</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Carousel Next Arrow Button -->
          <button class="carousel-arrow next" @click="scrollRight" aria-label="Next Slide">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

        <div class="reels-footer">
          <p class="assets-note">
            → Assets: 4 reel thumbnails + actual Instagram URLs (rotate monthly)
          </p>
          <a href="https://www.instagram.com/hiplanetofficial/" target="_blank" rel="noopener" class="follow-link-bottom font-display">
            Follow @hiplanetofficial →
          </a>
        </div>
      </div>
    </section>

    <!-- ============ 6. VOL.2 + VOL.3 — THE SERIES CONTINUES ============ -->
    <!-- <section id="vol2" class="series-section vol2-bg grain fade-up-comic">
      <div class="stars-overlay opacity-30"></div>
      
      <div class="series-container">
        <div class="series-header">
          <div class="section-line accent-magenta">The Series Continues · Acts 2 + 3</div>
          <h2 class="series-title font-display">
            TWO MORE<br />
            <span class="accent-magenta">VOLUMES.</span>
          </h2>
          <p class="series-subtitle font-serif">
            Episode 1 unfolds across three books. Vol.2 brings fire and ice.
            Vol.3 brings the wasteland and the wormhole.
          </p>
        </div>

        <div class="series-grid">
          <div>
            <div class="volume-promo-card">
              <div class="promo-cover-slot" style="background: linear-gradient(180deg, #1A0524 0%, var(--midnight) 100%);">
                <div class="stars-overlay" style="opacity: 0.4;"></div>
                <div>
                  <div class="cover-volume" style="font-size: 8px; letter-spacing: 0.25em;">Vol.02 · Act 2</div>
                  <div class="cover-title font-comic" style="font-size: 1.25rem;">HI<br />PLANET</div>
                </div>
                <div>
                  <div class="promo-date" style="font-size: 7px; font-family: 'Press Start 2P', system-ui;">SUMMER<br />2026</div>
                </div>
              </div>
              
              <div class="volume-info">
                <div class="promo-meta-row">
                  <span class="pill accent-coral">VOL.02</span>
                  <span class="promo-date">Summer 2026</span>
                </div>
                <h3 class="promo-title font-display">FIRE &amp; ICE.</h3>
                <p class="promo-desc">
                  Wildfires consume a continent. The Arctic crumbles.
                  Two chapters. Two lieutenants. The middle of the journey.
                </p>
              </div>
            </div>

            <div class="ch-teaser-list border-coral">
              <div class="ch-teaser-row">
                <span class="ch-num font-display accent-coral">CH.03</span>
                <span class="ch-title">Scorched Earth</span>
                <span class="ch-meta">Fire · ROC</span>
              </div>
              <div class="ch-teaser-row">
                <span class="ch-num font-display">CH.04</span>
                <span class="ch-title">Frozen Marrow</span>
                <span class="ch-meta">Stone · ZOM</span>
              </div>
            </div>

            <div class="volume-stats">~200 pages · 2 chapters</div>
          </div>

          <div>
            <div class="volume-promo-card">
              <div class="promo-cover-slot cover-v3" style="background: linear-gradient(180deg, var(--deep-purple) 0%, #0A0118 100%);">
                <div class="stars-overlay" style="opacity: 0.4;"></div>
                <div>
                  <div class="cover-volume" style="font-size: 8px; letter-spacing: 0.25em;">Vol.03 · Act 3</div>
                  <div class="cover-title font-comic" style="font-size: 1.25rem;">HI<br />PLANET</div>
                </div>
                <div>
                  <div class="promo-date" style="font-size: 7px; font-family: 'Press Start 2P', system-ui;">SPRING<br />2027</div>
                </div>
              </div>
            
              <div class="volume-info">
                <div class="promo-meta-row">
                  <span class="pill accent-magenta">VOL.03</span>
                  <span class="promo-date">Spring 2027</span>
                </div>
                <h3 class="promo-title font-display">FINAL ACT.</h3>
                <p class="promo-desc">
                  KRA rises from a wasteland of our making.
                  The Cosmic Wormhole waits at Pollutopia.
                  Episode 1 closes here.
                </p>
              </div>
            </div>

            <div class="ch-teaser-list border-magenta">
              <div class="ch-teaser-row">
                <span class="ch-num font-display accent-magenta">CH.05</span>
                <span class="ch-title">The Wasteland</span>
                <span class="ch-meta">Metal · KRA</span>
              </div>
              <div class="ch-teaser-row">
                <span class="ch-num font-display accent-amber">CH.06</span>
                <span class="ch-title">Pollutopia</span>
                <span class="ch-meta">Finale · Cosmic Wormhole</span>
              </div>
            </div>

            <div class="volume-stats">~200 pages · 2 chapters · Series complete</div>
          </div>
        </div>

        <div class="release-signup-card">
          <div class="release-label">// Get release news first</div>
          <h3 class="release-title font-display">
            Be first to know when<br />Vol.2 &amp; Vol.3 drop.
          </h3>
          <p class="release-subtitle">
            Pre-order links, exclusive sneak peeks, signed-copy giveaways.
            Subscribers get everything first.
          </p>
          <form class="signup-form" @submit.prevent="alert('Vol.2/Vol.3 newsletter signup placeholder')">
            <input type="email" placeholder="your@email.com" required class="signup-input" />
            <button type="submit" class="btn-coral font-display">
              Notify Me
            </button>
          </form>
        </div>
      </div>
    </section> -->

    <!-- ============ 7. FROM PAGE TO PIXEL ============ -->
    <!-- <section id="bridge" class="bridge-section bridge-bg fade-up-comic">
      <div class="stars-overlay opacity-30"></div>
      
      <div class="bridge-container">
        <div class="bridge-header">
          <div class="section-line accent-cyan">From Page to Pixel · Bridge</div>
          <h2 class="bridge-title font-display">
            THE SAME TEAM.<br />
            <span class="accent-cyan">NOW PLAYABLE.</span>
          </h2>
          <p class="bridge-subtitle font-serif">
            Every character in the game comes straight from the comic.
            Same heart, new medium.
          </p>
        </div>

       
        <div class="bridge-grid">
          
          <div class="char-card">
            <div class="char-pair">
              <div class="char-display-slot" style="background-color: rgba(255, 107, 53, 0.06);">
                <div class="slot-inner">
                  <div class="art-type">COMIC</div>
                  <div class="art-tag font-pixel">// HI</div>
                </div>
              </div>
              <div class="char-display-slot" style="background-color: rgba(255, 107, 53, 0.06);">
                <div class="slot-inner">
                  <div class="art-type pixel-label" style="color: var(--coral);">PIXEL</div>
                  <div class="art-tag font-pixel">// HI</div>
                </div>
              </div>
            </div>
            <div class="char-name font-display">HI</div>
            <div class="char-role">The Leader</div>
          </div>

          <div class="char-card">
            <div class="char-pair">
              <div class="char-display-slot" style="background-color: rgba(255, 182, 39, 0.06);">
                <div class="slot-inner">
                  <div class="art-type">COMIC</div>
                  <div class="art-tag font-pixel">// RA</div>
                </div>
              </div>
              <div class="char-display-slot" style="background-color: rgba(255, 182, 39, 0.06);">
                <div class="slot-inner">
                  <div class="art-type pixel-label" style="color: var(--amber);">PIXEL</div>
                  <div class="art-tag font-pixel">// RA</div>
                </div>
              </div>
            </div>
            <div class="char-name font-display">RA</div>
            <div class="char-role">The Sun</div>
          </div>

          <div class="char-card">
            <div class="char-pair">
              <div class="char-display-slot">
                <div class="slot-inner">
                  <div class="art-type">COMIC</div>
                  <div class="art-tag font-pixel">// MOOLU</div>
                </div>
              </div>
              <div class="char-display-slot">
                <div class="slot-inner">
                  <div class="art-type pixel-label" style="color: var(--cream);">PIXEL</div>
                  <div class="art-tag font-pixel">// MOOLU</div>
                </div>
              </div>
            </div>
            <div class="char-name font-display">MOOLU</div>
            <div class="char-role">The Scout</div>
          </div>

          <div class="char-card">
            <div class="char-pair">
              <div class="char-display-slot" style="background-color: rgba(34, 211, 238, 0.06);">
                <div class="slot-inner">
                  <div class="art-type">COMIC</div>
                  <div class="art-tag font-pixel">// MERC</div>
                </div>
              </div>
              <div class="char-display-slot" style="background-color: rgba(34, 211, 238, 0.06);">
                <div class="slot-inner">
                  <div class="art-type pixel-label" style="color: var(--cyan);">PIXEL</div>
                  <div class="art-tag font-pixel">// MERC</div>
                </div>
              </div>
            </div>
            <div class="char-name font-display">MERC</div>
            <div class="char-role">The Water</div>
          </div>
        </div>

        <div class="bridge-footer">
          <RouterLink to="/#games" class="btn-action btn-outline font-display">
            See all 10 heroes in combat →
          </RouterLink>
          <p class="assets-note" style="margin-top: 1.5rem;">
            → Assets: 4-10 character pairs (comic art + pixel sprite, side by side)
          </p>
        </div>
      </div>
    </section> -->

    <!-- ============ 8. DUAL CTA ============ -->
    <!-- <section class="dual-cta-section grain fade-up-comic">
      <div class="stars-overlay opacity-50"></div>
      
      <div class="cta-container">
        <div class="cta-header">
          <div class="cta-label-top">— Two ways into the world —</div>
          <h2 class="cta-title font-display">
            READ IT.<br />
            <span class="accent-amber">OR PLAY IT.</span>
          </h2>
          <p class="cta-subtitle font-serif">
            The world of Hi Planet exists in two media now.
            Pick your entry point — or take both.
          </p>
        </div>

        <div class="cta-grid">
          <div class="cta-card card-comic-cta">
            <div class="card-icon-tag coral-text">📖 THE COMIC</div>
            <div class="card-title font-display">VOL.1 of 3<br />ON AMAZON</div>
            <p class="card-desc">200 pages. Two chapters. Paperback &amp; Kindle.</p>
            <a href="#" class="btn-action btn-amazon font-display">
              Buy on Amazon
            </a>
          </div>

          <div class="cta-card card-game-cta">
            <div class="card-icon-tag amber-text">🎮 THE GAME</div>
            <div class="card-title font-display">EPISODE 01<br />ON STEAM</div>
            <p class="card-desc">Horde-roguelite. Launches Nov 10, 2026.</p>
            <a href="#" class="btn-action btn-amazon font-display" style="background: var(--cream); color: var(--midnight); box-shadow: 5px 5px 0 var(--midnight);">
              ▶ Wishlist on Steam
            </a>
          </div>
        </div>

        <div class="social-links-row">
          <a href="#">Join Discord</a>
          <span class="social-divider">·</span>
          <a href="#">Newsletter</a>
          <span class="social-divider">·</span>
          <a href="#">YouTube</a>
          <span class="social-divider">·</span>
          <a href="#">Instagram</a>
        </div>
      </div>
    </section> -->

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bungee&family=Press+Start+2P&display=swap');

.comic-page {
  padding-top: calc(clamp(60px, 5vw, 80px) + 32px); /* nav height + ticker height */
  background: var(--bg);
  color: var(--cream);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

/* ============ TICKER ============ */
.comic-ticker {
  position: fixed;
  top: clamp(60px, 5vw, 80px);
  left: 0;
  right: 0;
  z-index: 900; /* sits right below primary nav */
  background: var(--coral);
  color: var(--midnight);
  overflow: hidden;
  border-top: 1px solid rgba(10, 24, 52, 0.15);
  border-bottom: 1px solid rgba(10, 24, 52, 0.15);
  height: 32px;
  display: flex;
  align-items: center;
}

.ticker-content {
  display: flex;
  white-space: nowrap;
  font-size: clamp(10px, 1.2vw, 12px);
  letter-spacing: 0.15em;
  animation: ticker-anim 40s linear infinite;
}

.ticker-content span {
  margin: 0 2rem;
  flex-shrink: 0;
  font-weight: 700;
}

@keyframes ticker-anim {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}

/* ============ FONTS ============ */
.font-display { font-family: 'Anton', sans-serif; letter-spacing: 0.02em; }
.font-serif { font-family: 'Fraunces', serif; }
.font-pixel { font-family: 'Press Start 2P', system-ui; }
.font-comic { font-family: 'Bungee', cursive; }

/* ============ SECTION BASICS ============ */
section {
  position: relative;
  z-index: 1;
}

/* Stars background */
.stars-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  /* background-image:
    radial-gradient(1.5px 1.5px at 12% 24%, rgba(255,255,255,0.9), transparent),
    radial-gradient(1px 1px at 58% 71%, rgba(255,255,255,0.6), transparent),
    radial-gradient(2px 2px at 82% 18%, rgba(255,255,255,0.85), transparent),
    radial-gradient(1px 1px at 38% 82%, rgba(255,255,255,0.55), transparent),
    radial-gradient(1.5px 1.5px at 91% 44%, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 28% 58%, rgba(255,255,255,0.5), transparent); */
}

.grain::after {
  content: "";
  position: absolute; inset: 0; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E");
  opacity: 0.08; mix-blend-mode: overlay; z-index: 1;
}

/* Halftone overlays */
.halftone-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  /* background-image: radial-gradient(circle, rgba(255,245,229,0.12) 1px, transparent 1px); */
  background-size: 8px 8px;
}

.halftone-dark {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, rgba(26,20,16,0.15) 1px, transparent 1px);
  background-size: 8px 8px;
}

.halftone-light {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, rgba(255,245,229,0.12) 1px, transparent 1px);
  background-size: 8px 8px;
}

/* ============ 1. COMIC HERO ============ */
.comic-hero {
  padding: clamp(60px, 8vw, 100px) clamp(1rem, 3vw, 2rem) clamp(80px, 10vw, 120px);
  overflow: hidden;
  /* background:
    radial-gradient(ellipse 50% 50% at 30% 40%, rgba(255,107,53,0.22) 0%, transparent 60%),
    radial-gradient(ellipse 60% 60% at 80% 70%, rgba(74,144,226,0.2) 0%, transparent 60%),
    linear-gradient(180deg, #0A1834 0%, #060D24 100%); */
}

.hero-container {
  max-width: 1600px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

.comic-breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: rgba(255, 245, 229, 0.55);
}

.breadcrumb-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: var(--coral);
}

.divider {
  opacity: 0.4;
}

.active-crumb {
  color: var(--cream);
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
}

@media (max-width: 991px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }
}

.hero-left-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hero-volume-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: var(--coral);
  font-weight: 700;
  margin-bottom: 1.25rem;
}

.hero-volume-tag .tag-line {
  width: 40px;
  height: 1px;
  background: var(--coral);
}

.hero-title {
  font-size: clamp(3rem, 7vw, 8rem);
  line-height: 0.82;
  margin-bottom: 1.5rem;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  text-shadow: 0 10px 40px rgba(0,0,0,0.8);
}

.accent-neon-blue {
  color: var(--neon-blue);
}

.hero-subtitle {
  font-size: clamp(1.1rem, 1.4vw, 1.35rem);
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  color: rgba(255, 245, 229, 0.85);
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 500px;
}

.hero-accent-block {
  display: block;
  margin-top: 0.75rem;
  font-style: normal;
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  color: var(--amber);
  letter-spacing: 0.05em;
}

.hero-actions-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

/* BUTTONS */
.btn-action {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 0.85rem 1.5rem;
  font-size: clamp(0.8rem, 1vw, 0.92rem);
  text-decoration: none;
  transition: all 0.2s ease;
  border-radius: 4px;
}

.btn-amazon {
  background: var(--coral);
  color: var(--midnight);
  border: 2px solid var(--bg);
  box-shadow: 5px 5px 0 var(--bg);
  font-weight: bold;
}

.btn-amazon:hover {
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0 var(--bg);
  background: #ff8559;
}

.btn-outline {
  background: transparent;
  color: var(--cream);
  border: 2px solid var(--cream);
}

.btn-outline:hover {
  background: var(--cream);
  color: var(--midnight);
}

/* HERO RIGHT PANEL COLLAGE */
.hero-right-col {
  position: relative;
  height: clamp(380px, 40vw, 480px);
  width: 100%;
}

@media (max-width: 991px) {
  .hero-right-col {
    height: 380px;
    max-width: 480px;
    margin: 0 auto;
  }
}

.panel-slot-item {
  position: absolute;
  border: 3px solid var(--cream);
  box-shadow: 8px 8px 0 var(--bg);
  transition: all 0.3s ease;
  background: repeating-linear-gradient(135deg, rgba(255,245,229,0.025) 0 14px, rgba(255,245,229,0.05) 14px 28px);
}

.panel-slot-item:hover {
  transform: translate(-4px, -4px) scale(1.02);
  box-shadow: 12px 12px 0 var(--bg);
}

.panel-1 {
  top: 0;
  right: 12%;
  width: 55%;
  aspect-ratio: 3/4;
  transform: rotate(1.5deg);
}

.panel-1:hover {
  transform: rotate(1.5deg) translate(-4px, -4px) scale(1.02);
}

.panel-2 {
  bottom: 8%;
  left: 0;
  width: 60%;
  aspect-ratio: 4/3;
  transform: rotate(-1.5deg);
}

.panel-2:hover {
  transform: rotate(-1.5deg) translate(-4px, -4px) scale(1.02);
}

.panel-3 {
  bottom: 0;
  right: 0;
  width: 35%;
  aspect-ratio: 1/1;
  transform: rotate(3deg);
}

.panel-3:hover {
  transform: rotate(3deg) translate(-4px, -4px) scale(1.02);
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.panel-content {
  text-align: center;
  color: rgba(255, 245, 229, 0.4);
}

.panel-title {
  font-family: 'Bungee', cursive;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.panel-sub {
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  font-weight: 700;
}

.panel-title-sm {
  font-family: 'Bungee', cursive;
  font-size: 0.75rem;
  margin-bottom: 0.25rem;
}

.panel-sub-sm {
  font-family: 'Space Mono', monospace;
  font-size: 8px;
  font-weight: 700;
}

/* ============ 2. THE ORIGIN STORY ============ */
.origin-section {
  padding: clamp(60px, 6vw, 100px) clamp(1rem, 3vw, 2rem);
  background:
    radial-gradient(ellipse 50% 60% at 20% 50%, rgba(74,144,226,0.18) 0%, transparent 60%),
    linear-gradient(180deg, #060D24 0%, #0A1834 100%);
}

.origin-container {
  max-width: 1200px;
  margin: 0 auto;
}

.origin-header {
  margin-bottom: 3.5rem;
  max-width: 720px;
}

.section-line {
  display: flex;
  align-items: center;
  gap: 16px;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 24px;
}

.section-line::before {
  content: "";
  width: 40px;
  height: 1px;
  background: currentColor;
  opacity: 0.7;
}

.section-line.accent-earth { color: var(--earth); }
.section-line.accent-coral { color: var(--coral); }
.section-line.accent-amber { color: var(--amber); }
.section-line.accent-cyan { color: var(--cyan); }
.section-line.accent-magenta { color: var(--magenta); }

.origin-title {
  font-size: clamp(2rem, 4vw, 4rem);
  line-height: 0.9;
  margin-bottom: 1.5rem;
}

.accent-earth {
  color: var(--earth);
}

.origin-subtitle {
  font-style: italic;
  font-size: clamp(1rem, 1.2vw, 1.25rem);
  color: rgba(255, 245, 229, 0.75);
  line-height: 1.6;
}

.origin-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: clamp(2rem, 5vw, 4rem);
}

@media (max-width: 768px) {
  .origin-grid {
    grid-template-columns: 1fr;
  }
}

.origin-left-col {
  /* Timeline */
}

.timeline-node {
  position: relative;
  padding-left: 80px;
  padding-bottom: 40px;
}

.timeline-node::before {
  content: "";
  position: absolute;
  left: 24px;
  top: 8px;
  bottom: 0;
  width: 2px;
  background: rgba(255, 245, 229, 0.15);
}

.timeline-node:last-child::before {
  bottom: 40px;
}

.timeline-node .marker {
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Anton', sans-serif;
  font-size: 14px;
  letter-spacing: 0.1em;
  background: var(--midnight);
  border: 2px solid currentColor;
  z-index: 1;
}

.timeline-node.accent-coral { color: var(--coral); }
.timeline-node.accent-cyan { color: var(--cyan); }
.timeline-node.accent-amber { color: var(--amber); }
.timeline-node.accent-magenta { color: var(--magenta); }

.node-content h3 {
  font-family: 'Anton', sans-serif;
  font-size: clamp(1.2rem, 1.5vw, 1.5rem);
  letter-spacing: 0.03em;
  margin-bottom: 0.5rem;
}

.node-content p {
  font-size: 0.88rem;
  color: rgba(255, 245, 229, 0.7);
  line-height: 1.6;
  max-width: 500px;
}

.origin-right-col {
  display: flex;
  flex-direction: column;
}

.speech-bubble {
  position: relative;
  background: var(--cream);
  color: var(--ink);
  padding: 24px 30px;
  border: 2px solid var(--ink);
  border-radius: 22px;
  box-shadow: 6px 6px 0 var(--ink);
  max-width: 420px;
}

.speech-bubble p {
  font-family: 'Fraunces', serif;
  font-size: clamp(1rem, 1.2vw, 1.15rem);
  line-height: 1.6;
}

.speech-bubble .quote-author {
  margin-top: 1rem;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: rgba(26, 20, 16, 0.6);
  font-weight: 700;
}

.speech-bubble::after {
  content: "";
  position: absolute;
  bottom: -14px;
  left: 40px;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-top: 14px solid var(--cream);
  border-bottom: 0;
  filter: drop-shadow(0 3px 0 var(--ink));
}

.makers-block {
  margin-top: 2.5rem;
  max-width: 420px;
}

.makers-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: var(--amber);
  font-weight: 700;
  margin-bottom: 1.25rem;
}

.makers-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.maker-item {
  border-left: 2px solid var(--border-color, var(--coral));
  padding-left: 1.25rem;
}

.maker-name {
  font-family: 'Anton', sans-serif;
  font-size: 1.5rem;
  letter-spacing: 0.03em;
  margin-bottom: 0.25rem;
}

.maker-role {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(255, 245, 229, 0.55);
  font-weight: 700;
}

/* ============ 3. VOL.1 SHOWCASE ============ */
.vol-showcase {
  padding: clamp(60px, 6vw, 100px) clamp(1rem, 3vw, 2rem);
}

.vol-light {
  background: var(--paper);
  color: var(--ink);
}

.vol-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

.vol-grid {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
}

@media (max-width: 991px) {
  .vol-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

.vol-left-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cover-slot {
  position: relative;
  background:
    radial-gradient(ellipse 80% 90% at 50% 50%, rgba(74,144,226,0.18) 0%, transparent 70%),
    linear-gradient(180deg, var(--midnight) 0%, #060D24 100%);
  border: 2px solid var(--cream);
  box-shadow:
    -3px 0 0 var(--cream),
    -6px 0 0 var(--ink),
    12px 12px 0 var(--coral);
  transition: all 0.3s ease;
  width: 100%;
  max-width: 380px;
  aspect-ratio: 2/3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: clamp(1.5rem, 3vw, 2.5rem);
}

.cover-slot:hover {
  transform: translate(-3px, -3px);
  box-shadow:
    -3px 0 0 var(--cream),
    -6px 0 0 var(--ink),
    15px 15px 0 var(--coral);
}

.cover-volume {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: var(--amber);
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.cover-title {
  font-family: 'Bungee', cursive;
  font-size: clamp(2rem, 3.5vw, 3rem);
  line-height: 0.85;
}

.cover-subtitle {
  font-family: 'Anton', sans-serif;
  font-size: clamp(1.1rem, 1.8vw, 1.4rem);
  color: var(--coral);
  margin-top: 0.5rem;
  letter-spacing: 0.05em;
}

.cover-quote {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: 0.88rem;
  color: rgba(255,245,229,0.7);
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.cover-credits {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: rgba(255,245,229,0.55);
  font-weight: 700;
  line-height: 1.5;
}

.cover-studio {
  color: rgba(255,245,229,0.35);
  display: block;
}

.cover-placeholder-text {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: rgba(26,20,16,0.45);
}

.vol-right-col {
  display: flex;
  flex-direction: column;
}

.vol-right-col .vol-desc {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-size: clamp(1.1rem, 1.5vw, 1.3rem);
  line-height: 1.6;
  color: rgba(26,20,16,0.8);
  margin-bottom: 2rem;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(26,20,16,0.15);
}

@media (max-width: 576px) {
  .specs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.spec-item {
  display: flex;
  flex-direction: column;
}

.spec-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: rgba(26,20,16,0.5);
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.spec-value {
  font-family: 'Anton', sans-serif;
  font-size: clamp(1.2rem, 1.8vw, 1.5rem);
  letter-spacing: 0.03em;
}

.chapters-section-title {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: rgba(26,20,16,0.6);
  font-weight: 700;
  margin-bottom: 1rem;
}

.chapters-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.chapter-row-item {
  display: flex;
  gap: 1rem;
  font-size: 0.88rem;
  line-height: 1.6;
  color: rgba(26,20,16,0.8);
}

.chapter-row-item .ch-num {
  font-family: 'Anton', sans-serif;
  font-size: 1rem;
  width: 3rem;
  color: var(--coral);
}

.chapter-row-item .ch-title {
  font-weight: 700;
}

.chapter-row-item .ch-meta {
  font-size: 0.75rem;
  margin-left: auto;
  align-self: center;
  color: rgba(26,20,16,0.5);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.chapters-teaser-title {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: rgba(26,20,16,0.4);
  font-weight: 700;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.chapters-teaser-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: rgba(26,20,16,0.5);
  font-size: 0.88rem;
}

.chapters-teaser-list .ch-num {
  font-family: 'Anton', sans-serif;
  font-size: 1rem;
  width: 3rem;
  color: inherit;
}

.chapters-teaser-list .ch-meta {
  font-size: 0.75rem;
  margin-left: auto;
  align-self: center;
  color: inherit;
}

.ctas-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.btn-ink {
  background: var(--ink);
  color: var(--cream);
  border: 2px solid var(--ink);
  box-shadow: 5px 5px 0 var(--coral);
}

.btn-ink:hover {
  transform: translate(-2px,-2px);
  box-shadow: 7px 7px 0 var(--coral);
}

/* ============ 4. PEEK INSIDE — SAMPLE PAGES ============ */
.sample-section {
  padding: clamp(60px, 6vw, 100px) clamp(1rem, 3vw, 2rem);
}

.sample-container {
  max-width: 1200px;
  margin: 0 auto;
}

.sample-header {
  margin-bottom: 3.5rem;
  max-width: 720px;
}

.accent-amber {
  color: var(--amber);
}

.sample-title {
  font-size: clamp(2rem, 4vw, 4rem);
  line-height: 0.9;
  margin-bottom: 1.5rem;
}

.sample-subtitle {
  font-style: italic;
  font-size: clamp(1rem, 1.2vw, 1.25rem);
  color: rgba(255, 245, 229, 0.7);
  line-height: 1.6;
}

.sample-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 4rem;
}

@media (max-width: 768px) {
  .sample-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.panel-slot {
  position: relative;
  aspect-ratio: 3/4;
  background: repeating-linear-gradient(135deg, rgba(255,245,229,0.025) 0 14px, rgba(255,245,229,0.05) 14px 28px);
  border: 3px solid var(--cream);
  box-shadow: 8px 8px 0 var(--ink);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.panel-slot:hover {
  transform: translate(-3px, -3px) scale(1.02);
  box-shadow: 12px 12px 0 var(--ink);
  border-color: var(--amber);
}

.panel-slot .slot-inner {
  text-align: center;
  color: rgba(255, 245, 229, 0.35);
}

.panel-slot .slot-inner .pg-num {
  font-family: 'Bungee', cursive;
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
}

.panel-slot .slot-inner .pg-tag {
  font-family: 'Space Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.15em;
  font-weight: 700;
}

.signup-card {
  border: 2px solid var(--cream);
  padding: clamp(2rem, 4vw, 3.5rem);
  max-width: 768px;
  margin: 0 auto;
  text-align: center;
  background: linear-gradient(135deg, rgba(255,107,53,0.08), rgba(255,245,229,0.03));
  box-shadow: 10px 10px 0 var(--coral);
}

.signup-card-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: var(--amber);
  font-weight: 700;
  margin-bottom: 1rem;
}

.signup-card-title {
  font-family: 'Anton', sans-serif;
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  line-height: 0.9;
  margin-bottom: 1rem;
}

.signup-card-subtitle {
  font-size: clamp(0.9rem, 1.2vw, 1.05rem);
  color: rgba(255, 245, 229, 0.75);
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto 1.5rem;
}

.signup-form {
  display: flex;
  gap: 0.5rem;
  max-width: 440px;
  margin: 0 auto;
}

@media (max-width: 576px) {
  .signup-form {
    flex-direction: column;
  }
}

.signup-input {
  flex: 1;
  padding: 0.85rem 1.25rem;
  background: transparent;
  border: 2px solid var(--cream);
  color: var(--cream);
  font-size: 0.88rem;
  border-radius: 4px;
}

.signup-input::placeholder {
  color: rgba(255, 245, 229, 0.4);
}

.signup-input:focus {
  outline: none;
  border-color: var(--amber);
}

.signup-btn {
  padding: 0.85rem 1.75rem;
  background: var(--cream);
  color: var(--midnight);
  font-family: 'Anton', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: 0.88rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.signup-btn:hover {
  background: var(--amber);
}

.signup-disclaimer {
  margin-top: 1rem;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: rgba(255, 245, 229, 0.4);
}

/* ============ 5. WATCH THE STORY · INSTAGRAM REELS ============ */
.reels-section {
  padding: clamp(60px, 6vw, 100px) clamp(1rem, 3vw, 2rem);
}

.reels-container {
  max-width: 1640px;
  margin: 0 auto;
}

.reels-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 3.5rem;
}

.reels-header-text {
  max-width: 1200px;
}

.reels-title {
  font-size: clamp(3rem, 7vw, 8rem);
  line-height: 0.82;
  margin-bottom: 1.5rem;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  text-shadow: 0 10px 40px rgba(0,0,0,0.8);
}

.reels-subtitle {
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  font-size: clamp(1rem, 1.2vw, 1.25rem);
  color: rgba(255, 245, 229, 0.7);
  line-height: 1.6;
}

.btn-follow {
  padding: 0.75rem 1.25rem;
  background: transparent;
  color: var(--cream);
  border: 2px solid var(--cream);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-family: 'Anton', sans-serif;
  font-size: 0.8rem;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-follow:hover {
  background: var(--cream);
  color: var(--midnight);
}

.reels-carousel-scroll {
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  scroll-behavior: smooth;
  width: 100%;
}

.reels-carousel-scroll::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.reels-grid {
  display: flex;
  gap: 1.5rem;
  padding: 0.75rem 0;
  width: max-content;
}

.reel-link {
  text-decoration: none;
  display: block;
  flex: 0 0 280px;
  transition: transform 0.3s ease;
}

@media (min-width: 768px) {
  .reel-link {
    flex: 0 0 350px;
  }
}

.reel-slot {
  position: relative;
  aspect-ratio: 9/16;
  background:
    repeating-linear-gradient(45deg, rgba(255,245,229,0.04) 0 12px, rgba(255,245,229,0.07) 12px 24px),
    linear-gradient(135deg, rgba(255,107,53,0.10), rgba(46,91,204,0.12));
  border: 2px solid rgba(255,245,229,0.18);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.25rem;
  transition: all 0.3s ease;
}

.reel-slot::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(ellipse 60% 40% at 50% 30%, rgba(255,255,255,0.08), transparent 60%);
  pointer-events: none;
}

.reel-link:hover .reel-slot {
  border-color: var(--coral);
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(255,107,53,0.2);
}

.reel-play-btn {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.play-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid var(--cream);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.play-icon {
  margin-left: 4px;
  font-size: 1.1rem;
  color: var(--cream);
}

.reel-link:hover .play-circle {
  background: var(--coral);
  border-color: var(--coral);
}

.reel-link:hover .play-icon {
  color: var(--midnight);
}

.reel-link:hover .reel-slot-2 .play-circle { background: var(--cyan); border-color: var(--cyan); }
.reel-link:hover .reel-slot-3 .play-circle { background: var(--amber); border-color: var(--amber); }
.reel-link:hover .reel-slot-4 .play-circle { background: var(--magenta); border-color: var(--magenta); }
.reel-link:hover .reel-slot-5 .play-circle { background: var(--yellow); border-color: var(--yellow); }

.reel-source-tag {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  font-size: 9px;
  font-family: 'Space Mono', monospace;
  color: rgba(255, 245, 229, 0.55);
}

.reel-info {
  position: relative;
  z-index: 10;
}

.reel-meta {
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(255, 245, 229, 0.55);
  font-family: 'Anton', sans-serif;
  margin-bottom: 0.25rem;
}

.reel-heading {
  font-family: 'Anton', sans-serif;
  font-size: clamp(0.9rem, 1.2vw, 1.1rem);
  letter-spacing: 0.02em;
  color: var(--cream);
  line-height: 1.2;
}

.reels-footer {
  margin-top: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.assets-note {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: rgba(255,245,229,0.4);
}

.follow-link-bottom {
  font-family: 'Anton', sans-serif;
  font-size: 0.88rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  border-bottom: 2px solid var(--coral);
  padding-bottom: 4px;
  color: var(--coral);
  text-decoration: none;
  transition: all 0.2s;
}

.follow-link-bottom:hover {
  color: var(--amber);
  border-color: var(--amber);
}

/* ============ 6. VOL.2 + VOL.3 — THE SERIES CONTINUES ============ */
.series-section {
  padding: clamp(60px, 6vw, 100px) clamp(1rem, 3vw, 2rem);
}

.vol2-bg {
  background:
    radial-gradient(ellipse 60% 60% at 70% 40%, rgba(200,52,90,0.22) 0%, transparent 65%),
    radial-gradient(ellipse 50% 50% at 30% 70%, rgba(46,91,204,0.18) 0%, transparent 60%),
    linear-gradient(180deg, #0F1F44 0%, #1A0824 100%);
}

.series-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

.series-header {
  margin-bottom: 4rem;
  max-width: 720px;
}

.accent-magenta {
  color: var(--magenta);
}

.series-title {
  font-size: clamp(2rem, 4vw, 4rem);
  line-height: 0.9;
  margin-bottom: 1.5rem;
}

.series-subtitle {
  font-style: italic;
  font-size: clamp(1rem, 1.2vw, 1.25rem);
  color: rgba(255, 245, 229, 0.75);
  line-height: 1.6;
}

.series-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(2rem, 4vw, 3.5rem);
}

@media (max-width: 768px) {
  .series-grid {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }
}

.volume-promo-card {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 576px) {
  .volume-promo-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

.promo-cover-slot {
  position: relative;
  aspect-ratio: 2/3;
  width: 160px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem;
  border: 2px solid var(--cream);
  box-shadow: -3px 0 0 var(--cream), -6px 0 0 var(--ink), 8px 8px 0 var(--coral);
  flex-shrink: 0;
  transition: all 0.3s;
}

.promo-cover-slot:hover {
  transform: translate(-3px,-3px);
  box-shadow: -3px 0 0 var(--cream), -6px 0 0 var(--ink), 12px 12px 0 var(--coral);
}

.promo-cover-slot.cover-v3 {
  box-shadow: -3px 0 0 var(--cream), -6px 0 0 var(--ink), 8px 8px 0 var(--magenta);
}

.promo-cover-slot.cover-v3:hover {
  box-shadow: -3px 0 0 var(--cream), -6px 0 0 var(--ink), 12px 12px 0 var(--magenta);
}

.volume-info {
  flex-grow: 1;
}

.promo-meta-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

@media (max-width: 576px) {
  .promo-meta-row {
    justify-content: center;
  }
}

.pill {
  display: inline-flex;
  align-items: center;
  font-family: 'Anton', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  padding: 3px 10px;
  border: 1px solid currentColor;
}

.pill.accent-coral { border-color: var(--coral); color: var(--coral); }
.pill.accent-magenta { border-color: var(--magenta); color: var(--magenta); }

.promo-date {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: var(--amber);
  font-weight: 700;
}

.promo-title {
  font-family: 'Anton', sans-serif;
  font-size: clamp(1.5rem, 2vw, 2rem);
  letter-spacing: 0.02em;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.promo-desc {
  font-size: 0.88rem;
  color: rgba(255, 245, 229, 0.7);
  line-height: 1.6;
}

.ch-teaser-list {
  border-left: 1px solid rgba(255, 255, 255, 0.15);
  padding-left: 1.25rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: left;
}

.ch-teaser-list.border-coral { border-color: rgba(255, 107, 53, 0.4); }
.ch-teaser-list.border-magenta { border-color: rgba(200, 52, 90, 0.4); }

.ch-teaser-row {
  display: flex;
  gap: 1rem;
  font-size: 0.88rem;
  color: rgba(255, 245, 229, 0.75);
}

.ch-teaser-row .ch-num {
  font-family: 'Anton', sans-serif;
  font-size: 1rem;
  width: 3rem;
}

.ch-teaser-row .ch-title {
  font-weight: 700;
}

.ch-teaser-row .ch-meta {
  font-size: 0.75rem;
  margin-left: auto;
  align-self: center;
  color: rgba(255, 245, 229, 0.5);
}

.volume-stats {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: rgba(255, 245, 229, 0.5);
  font-weight: 700;
}

@media (max-width: 576px) {
  .volume-stats {
    text-align: center;
  }
}

.release-signup-card {
  margin-top: clamp(3rem, 5vw, 4.5rem);
  border: 1px solid rgba(255, 245, 229, 0.2);
  padding: clamp(2rem, 3vw, 3rem);
  max-width: 768px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  background: rgba(255, 245, 229, 0.03);
}

.release-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: var(--amber);
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.release-title {
  font-family: 'Anton', sans-serif;
  font-size: clamp(1.5rem, 2.2vw, 2rem);
  line-height: 1.2;
  margin-bottom: 1rem;
}

.release-subtitle {
  font-size: 0.88rem;
  color: rgba(255, 245, 229, 0.65);
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto 1.5rem;
}

.btn-coral {
  background: var(--coral);
  color: var(--midnight);
  border: none;
  font-family: 'Anton', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: 0.8rem;
  padding: 0.85rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-coral:hover {
  background: #ff8559;
}

/* ============ 7. FROM PAGE TO PIXEL ============ */
.bridge-section {
  padding: clamp(60px, 6vw, 100px) clamp(1rem, 3vw, 2rem);
}

.bridge-bg {
  background:
    radial-gradient(ellipse 50% 60% at 50% 50%, rgba(34,211,238,0.15) 0%, transparent 70%),
    linear-gradient(180deg, #0A1834 0%, #060D24 100%);
}

.bridge-container {
  max-width: 1200px;
  margin: 0 auto;
}

.bridge-header {
  margin-bottom: 3.5rem;
  max-width: 720px;
}

.accent-cyan {
  color: var(--cyan);
}

.bridge-title {
  font-size: clamp(2rem, 4vw, 4rem);
  line-height: 0.9;
  margin-bottom: 1.5rem;
}

.bridge-subtitle {
  font-style: italic;
  font-size: clamp(1rem, 1.2vw, 1.25rem);
  color: rgba(255, 245, 229, 0.7);
  line-height: 1.6;
}

.bridge-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

@media (max-width: 991px) {
  .bridge-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .bridge-grid {
    grid-template-columns: 1fr;
  }
}

.char-card {
  text-align: center;
}

.char-pair {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.char-display-slot {
  flex: 1;
  aspect-ratio: 1/1;
  background: repeating-linear-gradient(135deg, rgba(255,245,229,0.025) 0 14px, rgba(255,245,229,0.05) 14px 28px);
  border: 3px solid var(--cream);
  box-shadow: 6px 6px 0 var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.char-display-slot:hover {
  transform: translate(-2px, -2px);
  box-shadow: 8px 8px 0 var(--bg);
}

.char-display-slot .slot-inner {
  text-align: center;
  color: rgba(255, 245, 229, 0.4);
}

.char-display-slot .slot-inner .art-type {
  font-family: 'Bungee', cursive;
  font-size: 0.75rem;
}

.char-display-slot .slot-inner .art-type.pixel-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  font-weight: 700;
}

.char-display-slot .slot-inner .art-tag {
  font-family: 'Space Mono', monospace;
  font-size: 7px;
  font-weight: 700;
  margin-top: 0.25rem;
}

.char-name {
  font-family: 'Anton', sans-serif;
  font-size: 1.25rem;
  letter-spacing: 0.02em;
}

.char-role {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(255, 245, 229, 0.55);
  margin-top: 0.25rem;
  font-weight: 700;
}

.bridge-footer {
  margin-top: 3.5rem;
  text-align: center;
}

/* ============ 8. DUAL CTA ============ */
.dual-cta-section {
  padding: clamp(80px, 8vw, 120px) clamp(1rem, 3vw, 2rem);
  background: linear-gradient(135deg, var(--cobalt) 0%, var(--midnight) 50%, var(--deep-purple) 100%);
}

.cta-container {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
}

.cta-header {
  text-align: center;
  margin-bottom: 3.5rem;
}

.cta-label-top {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: var(--amber);
  font-weight: 700;
  margin-bottom: 1.25rem;
}

.cta-title {
  font-size: clamp(2.5rem, 5vw, 5rem);
  line-height: 0.85;
  margin-bottom: 1.5rem;
}

.cta-subtitle {
  font-style: italic;
  font-size: clamp(1.1rem, 1.5vw, 1.35rem);
  color: rgba(255, 245, 229, 0.8);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.cta-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .cta-grid {
    grid-template-columns: 1fr;
  }
}

.cta-card {
  border: 2px solid var(--cream);
  padding: clamp(2rem, 3vw, 3rem);
  text-align: center;
  transition: all 0.3s;
}

.cta-card.card-comic-cta {
  background: rgba(255, 107, 53, 0.06);
  box-shadow: 8px 8px 0 var(--coral);
}

.cta-card.card-comic-cta:hover {
  transform: translate(-3px, -3px);
  box-shadow: 12px 12px 0 var(--coral);
}

.cta-card.card-game-cta {
  background: rgba(255, 182, 39, 0.06);
  box-shadow: 8px 8px 0 var(--amber);
}

.cta-card.card-game-cta:hover {
  transform: translate(-3px, -3px);
  box-shadow: 12px 12px 0 var(--amber);
}

.card-icon-tag {
  font-family: 'Bungee', cursive;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.card-icon-tag.coral-text { color: var(--coral); }
.card-icon-tag.amber-text { color: var(--amber); }

.card-title {
  font-family: 'Anton', sans-serif;
  font-size: clamp(1.5rem, 2vw, 2.2rem);
  line-height: 1.1;
  margin-bottom: 1rem;
}

.card-desc {
  font-size: 0.88rem;
  color: rgba(255, 245, 229, 0.75);
  margin-bottom: 2rem;
}

.social-links-row {
  margin-top: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  font-weight: 700;
}

.social-links-row a {
  color: var(--cream);
  text-decoration: none;
  transition: color 0.2s;
}

.social-links-row a:hover {
  color: var(--amber);
}

.social-divider {
  opacity: 0.3;
}

/* ============ INTERSECTION OBSERVER ANIMATION ============ */
.fade-up-comic {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.fade-up-comic.visible {
  opacity: 1;
  transform: translateY(0);
}

.d-1 { transition-delay: 0.1s; }
.d-2 { transition-delay: 0.25s; }
.d-3 { transition-delay: 0.4s; }
.d-4 { transition-delay: 0.55s; }

/* Interactive Cursor */
.cursor-pointer {
  cursor: pointer;
}

/* Inline Reels Video Player CSS */
.reel-slot.reel-player-active {
  padding: 0 !important;
  border-color: var(--neon-blue);
  box-shadow: 0 10px 30px rgba(0, 102, 243, 0.35);
  background: #000 !important;
}

.reel-inline-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
  background: #000;
  display: block;
  object-fit: cover;
  z-index: 5;
}

.reel-cover-trigger {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

/* ============ CAROUSEL STRUCTURE & GLOWING ARROWS ============ */
.reels-carousel-container {
  position: relative;
  width: 100%;
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(6, 10, 16, 0.75);
  border: 1.5px solid rgba(255, 245, 229, 0.2);
  color: var(--cream);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 15;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
}

.carousel-arrow svg {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-arrow:hover {
  border-color: var(--neon-blue);
  color: var(--neon-blue);
  box-shadow: 
    0 0 25px rgba(0, 102, 243, 0.55),
    inset 0 0 12px rgba(0, 102, 243, 0.2);
  background: rgba(0, 102, 243, 0.08);
  transform: translateY(-50%) scale(1.08);
}

.carousel-arrow:active {
  transform: translateY(-50%) scale(0.95);
}

.carousel-arrow.prev:hover svg {
  transform: translateX(-4px);
}

.carousel-arrow.next:hover svg {
  transform: translateX(4px);
}

.carousel-arrow.prev {
  left: -28px;
}

.carousel-arrow.next {
  right: -28px;
}

/* Responsive Adaptive Styles */
@media (max-width: 1200px) {
  .carousel-arrow.prev {
    left: -15px;
  }
  .carousel-arrow.next {
    right: -15px;
  }
}

@media (max-width: 768px) {
  .carousel-arrow {
    width: 48px;
    height: 48px;
  }
  
  .carousel-arrow.prev {
    left: -10px;
  }
  
  .carousel-arrow.next {
    right: -10px;
  }
}

@media (max-width: 500px) {
  /* Under 500px, native touch swipe takes priority. Hide arrows to save screen space */
  .carousel-arrow {
    display: none;
  }
}
</style>
