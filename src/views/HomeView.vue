<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  const handleParallax = () => {
    const scroll = window.scrollY;
    const stars = document.querySelector('.stars-overlay') as HTMLElement;
    const foreground = document.querySelector('.hero-foreground') as HTMLElement;
    
    if (stars) stars.style.transform = `translateY(${scroll * 0.3}px)`;
    if (foreground) foreground.style.transform = `translateY(${scroll * 0.2}px)`;
  };

  window.addEventListener('scroll', handleParallax);
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
})
</script>

<template>
  <div class="landing">
    <!-- HERO -->
    <section id="home" class="hero-wrap grain">
      <div class="stars-overlay"></div>
      <div class="hero-foreground"></div>
      
      <div class="hero-inner">
        <div class="hero-text-box reveal d-1">

          <!-- Episode tag -->
          <div class="mb-4 episode-tag">
            <span class="tag-line"></span>
            Episode 01
          </div>

          <!-- Title -->
          <h1 class="font-display main-title">
            SAVE THE<br />
            <span class="accent-earth-hero">EARTH.</span>
          </h1>

          <!-- <p class="lede">
            
          </p> -->
        </div>
      </div>

      <!-- Buttons: independent from hero-inner -->
      <div class="hero-bottom-bar reveal d-4">
        <div class="hero-actions">
          <a href="https://store.steampowered.com/app/4745340/Hi_Planet_Save_The_Earth/?beta=1" target="_blank" class="btn-new btn-primary-new">
            ▶ Wishlist on Steam
          </a>
          <a href="#loop" class="btn-new btn-outline-new">
            See how it plays
          </a>
        </div>
      </div>
    </section>

    <!-- SOCIAL BAR -->
    <!-- <div class="social-bar">
      <span class="social-bar-label">Follow the Journey:</span>
      <a href="#" class="social-pill pill-yt">▶ YouTube — Dev Diaries</a>
      <a href="#" class="social-pill pill-tt">♪ TikTok — @EcosoftGame</a>
      <a href="#" class="social-pill pill-dc">⬡ Discord — Join the Crew</a>
      <a href="#" class="social-pill pill-ig">◈ Instagram — @EcosoftGame</a>
    </div> -->

    <section id="concept" class="sneak-poster-section">
      <!-- Full cover artwork -->
      <img src="/comic-image/hiplanet_website_sneak_peek.jpg" alt="Sneak Peek Artwork" class="poster-bg-img" />
      <!-- Dark overlay -->
      <div class="poster-overlay"></div>
      <!-- Text content on top -->
      <div class="poster-content" style="justify-content: flex-start;">
        <!-- Character Assets -->
        <img src="/comic-image/macebot.png" alt="Macebot" class="reveal d-1 macebot-floating" />
        <div class="reveal d-1 techgoblin-floating">
          <img src="/comic-image/techgoblin.png" alt="TechGoblin" style="transform: scaleX(-1); width: 100%; height: auto;" />
        </div>
        <img src="/comic-image/mechatroll.png" alt="MechaTroll" class="reveal d-1 mechatroll-floating" />

        <!-- Episode Tag -->
        <div class="reveal d-1 mb-6 poster-episode-tag">
          <span class="poster-tag-line"></span>
          The Loop
        </div>

        <!-- Main poster headline -->
        <h1 class="reveal d-2 poster-main-title font-display">
          EVERY CHAPTER<br />
          IS A <span class="accent-coral">BATTLE.</span>
        </h1>

        <!-- Tagline -->
        <p class="reveal d-3 lede-poster">
          <!-- A horde-roguelite told in six comic-book chapters.<br />
          Smash through swarms. Save Earth's energies.<br />
          Stop the <span class="accent-magenta font-semibold font-display tracking-[0.1em]">COSMIC WORMHOLE.</span> -->
          A horde-roguelite told in six comic-book chapters. <br /> 
          Smash through robot swarms,battle a boss at every chapter's end, <br />
          and stop the Cosmic Wormhole from forging the Infinite Power Cosmic Cube.
        </p>

        <!-- CTAs -->
        <div class="reveal d-4 poster-cta-row">
          <a href="https://store.steampowered.com/app/4745340/Hi_Planet_Save_The_Earth/?beta=1" target="_blank" class="btn-poster btn-primary-poster">▶ Wishlist on Steam</a>
        </div>

        <!-- YouTube Embed -->
        <div class="reveal d-4 youtube-embed-container">
          <iframe 
            src="https://www.youtube.com/embed/hU1MV3ZnRSE" 
            title="Hi Planet - Official Trailer" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen
          ></iframe>
        </div>

        <!-- Why Different -->
        <div class="reveal d-5 why-different-section mb-20">
          <div class="different-label-row">
            <div class="different-line"></div>
            <span class="different-label">What makes Hi Planet different</span>
          </div>
          <h2 class="different-title font-display">
            NOT JUST ANOTHER<br />
            <span class="accent-coral-alt">HORDE GAME.</span>
          </h2>
        </div>

        <!-- Features Grid -->
        <div class="reveal d-6 poster-features-grid">
          <!-- 01 -->
          <div class="feature-item">
            <div class="font-display feature-num accent-earth-hero">01</div>
            <h3 class="feature-heading">COMIC-BOOK STORY</h3>
            <p class="feature-text">
              Every chapter opens, breaks, and closes with original comic panels —
              drawn from 200+ pages of finished IP. The game <em>is</em> the comic, in motion.
            </p>
          </div>
          <!-- 02 -->
          <div class="feature-item">
            <div class="font-display feature-num accent-coral-alt">02</div>
            <h3 class="feature-heading">BREAK · ADVANCE · BOSS</h3>
            <p class="feature-text">
              Break enemy gates. Advance through waves. Face a boss at every chapter's end.
              No endless drift — every run is a structured battle with a finish line.
            </p>
          </div>
          <!-- 03 -->
          <div class="feature-item">
            <div class="font-display feature-num accent-amber">03</div>
            <h3 class="feature-heading">TEN PLAYABLE HEROES</h3>
            <p class="feature-text">
              Choose your fighter from the Hi Planet Team — each with their own skills,
              traits, and combat style. Find the one that matches how you play.
            </p>
          </div>
        </div>
      </div>
    </section>

    <div class="section-divider"></div>

    <!-- COMIC INTRO -->
    <section class="intro-visual fade-up">
      <img src="/comic-image/HiPlanet_intro.jpg" alt="Hi Planet Intro" class="full-width-image" />
      
      <!-- Overlay Story Content -->
      <div class="intro-overlay-content">
        <div class="reveal d-1 intro-label-row">
          <div class="intro-label-line"></div>
          <span class="intro-label">Six chapters · <span style="color: var(--amber)">Five energies</span></span>
        </div>
        <h2 class="reveal d-2 intro-story-title font-display">
          ONE PLANET.<br />
          <span class="accent-amber-alt">FIVE ENERGIES TO SAVE.</span>
        </h2>
      </div>

      <p class="reveal d-3 intro-story-text">
        Wood, Water, Fire, Stone, and Metal — to forge the infinite power cosmic cube. <br />
        Each chapter, you face one of his lieutenants to recover what was taken.<br />
        The cosmic wormhole plans to steal all five elemental energies of Earth.
      </p>
    </section>

    <!-- CHAPTERS BREAKDOWN -->
    <section class="chapters-section section-wrap fade-up">
      <!-- <span class="section-tag">🎮 Campaign</span>
      <h2 class="section-title">Six Chapters. One Goal.</h2>
      <p class="section-sub">Journey through the elemental realms of Earth and reclaim the stolen energies before the Cosmic Cube is forged.</p> -->

      <div class="chapters-container">
        <!-- Ch1 -->
        <article class="chapter-row reveal">
          <div class="chapter-num accent-gaia">01</div>
          <div class="chapter-info">
            <div class="chapter-meta">Energy · Wood</div>
            <h3 class="chapter-name">MOTHER GAIA OAK</h3>
            <div class="chapter-boss accent-coral">Boss · MAC</div>
          </div>
          <div class="chapter-desc">
            <p>
              The first sacred tree falls. A swarm of MAC's robots feed on its roots,
              draining the wood energy into the Cosmic Cube. The hunt for Earth's
              energies begins — and the heroes meet their first lieutenant.
            </p>
          </div>
          <div class="chapter-visual">
            <img src="/stage/stage_1.jpg" alt="Mother Gaia Oak Gameplay" class="screenshot-img" />
          </div>
        </article>

        <!-- Ch2 -->
        <article class="chapter-row reveal">
          <div class="chapter-num accent-tide">02</div>
          <div class="chapter-info">
            <div class="chapter-meta">Energy · Water</div>
            <h3 class="chapter-name">CRYSTAL AQUA SPRING</h3>
            <div class="chapter-boss accent-coral">Boss · SKU</div>
          </div>
          <div class="chapter-desc">
            <p>
              At the heart of the desert lies Crystal Aqua Spring, the last sacred oasis holding the planet’s Water Energy. But SKU and his underwater siphon machines have arrived, draining its power and turning the oasis into dust.
            </p>
          </div>
          <div class="chapter-visual">
            <img src="/stage/stage_2.jpg" alt="Drowning Tide Gameplay" class="screenshot-img" />
          </div>
        </article>

        <!-- Ch3 -->
        <article class="chapter-row reveal">
          <div class="chapter-num accent-fire">03</div>
          <div class="chapter-info">
            <div class="chapter-meta">Energy · Fire</div>
            <h3 class="chapter-name">WILDFIRE MOUNTAIN</h3>
            <div class="chapter-boss accent-coral">Boss · ROC</div>
          </div>
          <div class="chapter-desc">
            <p>
              Wildfires sweep an entire mountain. ROC, lieutenant of the Wormhole, descends in a column of flame. Push through the smoke and bring the third energy home.
            </p>
          </div>
          <div class="chapter-visual">
            <img src="/stage/stage_3.jpg" alt="Scorched Earth Gameplay" class="screenshot-img" />
          </div>
        </article>

        <!-- Ch4 -->
        <article class="chapter-row reveal">
          <div class="chapter-num accent-frozen">04</div>
          <div class="chapter-info">
            <div class="chapter-meta">Energy · Stone</div>
            <h3 class="chapter-name">FROZEN ARCTIC</h3>
            <div class="chapter-boss accent-coral">Boss · ZOM</div>
          </div>
          <div class="chapter-desc">
            <p>
              The Arctic crumbles. ZOM and his Frost Cerberus prowl the breaking ice,
              guarding a stone-energy core buried beneath. Fight through the cold
              and reclaim what was taken.
            </p>
          </div>
          <div class="chapter-visual">
            <img src="/stage/stage_4.jpg" alt="Frozen Marrow Gameplay" class="screenshot-img" />
          </div>
        </article>

        <!-- Ch5 -->
        <article class="chapter-row reveal">
          <div class="chapter-num accent-wasteland">05</div>
          <div class="chapter-info">
            <div class="chapter-meta">Energy · Metal</div>
            <h3 class="chapter-name">THE WASTELAND</h3>
            <div class="chapter-boss accent-coral">Boss · KRA</div>
          </div>
          <div class="chapter-desc">
            <p>
              A creature made of our pollution rises from the toxic seafloor.
              KRA was once an octopus — mutated by nuclear waste, eight tentacles
              now serve no master but its own rage. Not allied with the Wormhole.
              Not your enemy by choice.
            </p>
          </div>
          <div class="chapter-visual">
            <img src="/stage/stage_5.jpg" alt="The Wasteland Gameplay" class="screenshot-img" />
          </div>
        </article>

        <!-- Ch6 -->
        <article class="chapter-row reveal finale-row">
          <div class="chapter-num accent-crimson">06</div>
          <div class="chapter-info">
            <div class="chapter-meta accent-amber">FINALE · ALL ENERGIES</div>
            <h3 class="chapter-name">POLLUTOPIA</h3>
            <div class="chapter-boss accent-magenta">Boss · COSMIC WORMHOLE</div>
          </div>
          <div class="chapter-desc">
            <p>
              Six floors. Six fights. The Cosmic Wormhole waits at the top of his
              own polluted citadel, the imperfect Cosmic Cube humming with all five
              stolen energies. Stop him here, or watch him forge a permanent rift
              to another galaxy.
            </p>
          </div>
          <div class="chapter-visual">
            <img src="/stage/stage_6.jpg" alt="Pollutopia Gameplay" class="screenshot-img" />
          </div>
        </article>
      </div>
    </section>

    <div class="section-divider"></div>
    
    <!-- HEROES SECTION -->
    <section id="characters" class="heroes-section fade-up">
      <div class="heroes-stars-overlay"></div>
      <div class="heroes-container">
        <div class="heroes-header">
          <div class="heroes-title-box">
            <div class="section-line accent-earth">The Hi Planet Team</div>
            <h2 class="font-display heroes-main-title">
              TEN HEROES.<br />
              <span class="accent-amber">ONE MISSION.</span>
            </h2>
            <p class="heroes-description">
              Ten heroes drawn from the planets of the solar system, each with a distinct combat style.<br />
              Find the one that matches how you play.
            </p>
          </div>
          <a href="#" class="heroes-view-all">
            Meet all 10 →
          </a>
        </div>

        <!-- Hero cards (grid) -->
        <div class="heroes-grid">
          <!-- Row 1 -->
          <div class="hero-card card-ra" style="background: linear-gradient(135deg, rgba(255,182,39,0.25), rgba(255,182,39,0.05));">
            <span class="hero-tag tag-amber">SUN</span>
            <img src="/character/ra.png" alt="RA" class="hero-img" />
            <div class="hero-card-bottom">
              <div class="hero-name font-display">RA</div>
              <div class="hero-role"></div>
            </div>
          </div>

          <div class="hero-card card-merc" style="background: linear-gradient(135deg, rgba(34,211,238,0.25), rgba(34,211,238,0.05));">
            <span class="hero-tag tag-cyan">MERCURY</span>
            <img src="/character/merc.png" alt="MERCURY" class="hero-img" />
            <div class="hero-card-bottom">
              <div class="hero-name font-display">MERC</div>
              <!-- <div class="hero-role">THE WATER</div> -->
            </div>
          </div>

          <div class="hero-card card-v" style="background: linear-gradient(135deg, rgba(232,197,71,0.3), rgba(139,120,32,0.05));">
            <span class="hero-tag tag-venus">VENUS</span>
            <img src="/character/v.png" alt="VENUS" class="hero-img" />
            <div class="hero-card-bottom">
              <div class="hero-name font-display">V</div>
              <!-- <div class="hero-role">THE METAL</div> -->
            </div>
          </div>

          <div class="hero-card card-hi" style="background: linear-gradient(135deg, rgba(255,107,53,0.25), rgba(255,107,53,0.05));">
            <span class="hero-tag tag-coral">EARTH</span>
            <img src="/character/hi.png" alt="HI" class="hero-img" />
            <div class="hero-card-bottom">
              <div class="hero-name font-display">HI</div>
              <div class="hero-role"></div>
            </div>
          </div>

          <div class="hero-card card-ma" style="background: linear-gradient(135deg, rgba(239,68,68,0.25), rgba(239,68,68,0.05));">
            <span class="hero-tag tag-mars">MARS</span>
            <img src="/character/ma.png" alt="MARS" class="hero-img" />
            <div class="hero-card-bottom">
              <div class="hero-name font-display">MA</div>
              <!-- <div class="hero-role">THE FIRE</div> -->
            </div>
          </div>

          <!-- Row 2 -->
          <div class="hero-card card-jupi" style="background: linear-gradient(135deg, rgba(217,119,6,0.3), rgba(124,45,18,0.05));">
            <span class="hero-tag tag-jupiter">JUPITER</span>
            <img src="/character/jupi.png" alt="JUPITER" class="hero-img" />
            <div class="hero-card-bottom">
              <div class="hero-name font-display">JUPI</div>
              <!-- <div class="hero-role">THE WOOD</div> -->
            </div>
          </div>

          <div class="hero-card card-satu" style="background: linear-gradient(135deg, rgba(139,111,71,0.3), rgba(74,56,32,0.05));">
            <span class="hero-tag tag-saturn">SATURN</span>
            <img src="/character/satu.png" alt="SATURN" class="hero-img" />
            <div class="hero-card-bottom">
              <div class="hero-name font-display">SATU</div>
              <!-- <div class="hero-role">THE STONE</div> -->
            </div>
          </div>

          <div class="hero-card card-ura" style="background: linear-gradient(135deg, rgba(74,144,226,0.3), rgba(74,144,226,0.05));">
            <span class="hero-tag tag-earth">URANUS</span>
            <img src="/character/ura.png" alt="URANUS" class="hero-img" />
            <div class="hero-card-bottom">
              <div class="hero-name font-display">URA</div>
              <!-- <div class="hero-role">THE TILT</div> -->
            </div>
          </div>

          <div class="hero-card card-nep" style="background: linear-gradient(135deg, rgba(30,64,175,0.4), rgba(12,30,92,0.05));">
            <span class="hero-tag tag-earth">NEPTUNE</span>
            <img src="/character/nep.png" alt="NEPTUNE" class="hero-img" />
            <div class="hero-card-bottom">
              <div class="hero-name font-display">NEP</div>
              <!-- <div class="hero-role">THE LANCE</div> -->
            </div>
          </div>

          <div class="hero-card card-plu" style="background: linear-gradient(135deg, rgba(155,143,184,0.3), rgba(58,47,92,0.05));">
            <span class="hero-tag tag-pluto">PLUTO</span>
            <img src="/character/plu.png" alt="PLUTO" class="hero-img" />
            <div class="hero-card-bottom">
              <div class="hero-name font-display">PLU</div>
              <!-- <div class="hero-role">THE OUTSIDER</div> -->
            </div>
          </div>
        </div>

        <!-- <p class="hero-placeholder-note italic">→ Placeholder cards — replace with actual character sprites</p> -->

      </div>
    </section>

    <div class="section-divider"></div>

    <!-- COMIC IP SECTION -->
    <section id="comic" class="comic-section">
      <!-- Sunset gradient overlay -->
      <div class="comic-gradient-overlay"></div>
      
      <div class="comic-container">
        <div class="comic-content-grid">
          <!-- Text Content -->
          <div class="comic-text-box">
            <div class="section-line accent-coral" style="color: var(--coral);">The unfair advantage</div>
            <h2 class="font-display comic-title">
              READ THE COMIC.<br />
              <span class="accent-coral">PLAY THE GAME.</span>
            </h2>
            <p class="comic-lede">
              Hi Planet started as a 200+ page comic — published in 2023,
              written and built over six years.<br />The game is the comic, in motion.
              Vol.2 lands in 2026.
            </p>
            
            <div class="comic-actions">
              <a href="#" class="btn-comic btn-primary-comic">
                📖 Buy Vol.1 on Amazon
              </a>
              <a href="#" class="btn-comic btn-outline-comic">
                ⬇ Comic Book
              </a>
            </div>

            <div class="comic-newsletter">
              <p class="newsletter-label font-display">
                Get Vol.2 news first.
              </p>
              <form class="comic-form" @submit.prevent="() => {}">
                <input type="email" placeholder="your@email.com" class="comic-input" required />
                <button type="submit" class="comic-submit-btn font-display">JOIN</button>
              </form>
            </div>
          </div>

          <!-- Comic cover mockup (cinema poster style) -->
          <div class="comic-visual-wrap">
            <div class="comic-cover-main">
              <img src="/comic-book/hiplanet_comic_1.jpg" alt="Hi Planet Comic Vol 1" class="cover-img" />
              <div class="cover-dark-overlay"></div>
              <div class="stars-overlay cover-stars"></div>
              <div class="cover-glow"></div>
              
              <div class="cover-header">
                <div class="volume-tag accent-amber-comic">Volume 01 · 2023</div>
                <!-- <div class="cover-title font-display">HI<br />PLANET</div>
                <div class="cover-subtitle font-display accent-coral">SAVE THE EARTH</div> -->
              </div>
              
              <div class="cover-footer">
                <div class="cover-quote italic">
                  "To create a better world<br />for every child to inherit."
                </div>
                <div class="cover-author">By Sean Beck · Ecosoft Interactive</div>
              </div>
            </div>
            
            <!-- Vol 2 teaser behind -->
            <div class="comic-cover-teaser">
              <img src="/comic-book/hiplanet_comic_2.png" alt="Hi Planet Comic Vol 2" class="cover-img" />
              <div class="cover-dark-overlay"></div>
              <div class="volume-tag accent-amber-comic">Volume 02 · 2026</div>
              <div class="teaser-bottom">
                <div class="font-display teaser-text">COMING</div>
                <div class="font-display teaser-sub accent-amber-comic">SOON</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="section-divider"></div>

    <!-- STUDIO SECTION -->
    <section id="studio" class="studio-section">
      <div class="studio-gradient-overlay"></div>
      <div class="studio-container">
        <div class="studio-grid">
          <!-- Studio Info -->
          <div class="studio-info">
            <div class="section-line" style="color: var(--blue);">The studio</div>
            <h2 class="font-display studio-title">
              ECOSOFT<br />
              <span class="accent-coral">INTERACTIVE.</span>
            </h2>
            <p class="studio-lede">
              A creative studio at the intersection of technology,
              storytelling, and environmental impact.
            </p>
            
          </div>

          <!-- Timeline -->
          <div class="studio-timeline">
            <div class="timeline-stack">
              <div class="timeline-item">
                <div class="timeline-year font-display">2020</div>
                <div class="timeline-content">
                  <div class="timeline-title font-display">The Beginning</div>
                  <div class="timeline-desc">Lockdown reflection becomes the seed of Hi Planet.</div>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-year font-display">2023</div>
                <div class="timeline-content">
                  <div class="timeline-title font-display">Comic Vol.1 Published</div>
                  <div class="timeline-desc">Hi Planet: Save the Earth Vol.1 launches on Amazon.</div>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-year font-display">2025</div>
                <div class="timeline-content">
                  <div class="timeline-title font-display">Studio Incorporated</div>
                  <div class="timeline-desc">Ecosoft Interactive, Inc. founded in California. Selected for Busan Indie Game Festival.</div>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-year font-display">2026</div>
                <div class="timeline-content no-border">
                  <div class="timeline-title font-display">Episode 1 Launches</div>
                  <div class="timeline-desc">Vol.2 manuscript completed. Hi Planet launches on Steam — November 10.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="section-divider"></div>

    <!-- WISHLIST SECTION -->
    <section id="community" class="wishlist-section">
      <div class="stars-overlay opacity-60"></div>
      <div class="wishlist-glow"></div>

      <div class="wishlist-container">
        <div class="wishlist-launch-tag">
          <div class="section-line" style="color: var(--blue); justify-content: center; margin-bottom: 0;">
            184 days to launch
          </div>
        </div>

        <h2 class="font-display wishlist-title">
          WISHLIST<br />
          <span class="accent-amber">HI PLANET.</span>
        </h2>
        
        <p class="wishlist-desc">
          Every wishlist makes Steam show Hi Planet to more players. <br />
          It's the single most useful thing you can do for a small indie studio. <br />
          Thank you for all game players!
        </p>

        <div class="wishlist-btn-wrap">
          <a href="https://store.steampowered.com/app/4745340/Hi_Planet_Save_The_Earth/?beta=1" target="_blank" class="wishlist-btn font-display">
            ▶ Wishlist on Steam — Free
          </a>
        </div>

        <div class="wishlist-socials">
          <a href="https://discord.gg/ZkpAZFrda" target="_blank" class="social-icon-link" title="Join Discord">
            <img src="/social-icon/discord.png" alt="Discord" />
          </a>
          <a href="#" class="social-icon-link" title="YouTube">
            <img src="/social-icon/youtube.png" alt="YouTube" />
          </a>
          <a href="#" class="social-icon-link" title="Instagram">
            <img src="/social-icon/instagram.png" alt="Instagram" />
          </a>
          <a href="#" class="social-icon-link" title="TikTok">
            <img src="/social-icon/tiktok.png" alt="TikTok" />
          </a>
          <a href="#" class="social-icon-link" title="LinkedIn">
            <img src="/social-icon/linkedin.png" alt="LinkedIn" />
          </a>
        </div>
      </div>
    </section>

    <div class="section-divider"></div>

    <!-- UNIVERSE -->
    <!-- <section id="universe" class="section-wrap fade-up">
      <span class="section-tag">📚 Universe</span>
      <h2 class="section-title">The World of Hi Planet</h2>
      <p class="section-sub">The game begins in the pages of our comic. Dive into the lore, meet the heroes, and discover the world before you play in it.</p>

      <div class="universe-grid">
        <a href="#" class="comic-panel comic-panel-large">
          <div class="panel-visual">
            <div class="panel-visual-art">COMIC</div>
            <div class="panel-badge">NOW READING</div>
          </div>
          <div class="panel-content">
            <div class="panel-tag">📖 Comic Book</div>
            <div class="panel-title">Hi Planet: Origin Arc</div>
            <p class="panel-desc">When a cosmic signal tears through Earth's atmosphere, five unlikely heroes are chosen to defend the planet. Read the story that inspired the game.</p>
            <div class="feature-tags">
              <span class="feature-tag">Chapter 1 — Free</span>
              <span class="feature-tag">Chapter 2 — Free</span>
              <span class="feature-tag">Chapter 3 — Discord Exclusive</span>
            </div>
            <span class="panel-link">Start Reading</span>
          </div>
        </a>

        <a href="#" class="comic-panel">
          <div class="panel-visual mini">
            <div class="panel-visual-art mini-art">ART</div>
            <div class="panel-badge gallery-badge">GALLERY</div>
          </div>
          <div class="panel-content">
            <div class="panel-tag">🎨 Concept Art</div>
            <div class="panel-title">Concept Art Archive</div>
            <p class="panel-desc">Behind every hero, every world, every boss — the art that brought them to life.</p>
            <span class="panel-link">View Gallery</span>
          </div>
        </a>

        <a href="#" class="comic-panel">
          <div class="panel-visual mini">
            <div class="panel-visual-art mini-art">WIKI</div>
            <div class="panel-badge lore-badge">LORE</div>
          </div>
          <div class="panel-content">
            <div class="panel-tag">🧬 World Wiki</div>
            <div class="panel-title">Planet Atlas & Lore</div>
            <p class="panel-desc">Locations, factions, abilities, and mythology — all in one place.</p>
            <span class="panel-link">Explore Wiki</span>
          </div>
        </a>
      </div>

      <div class="featured-chars">
        <div class="chars-header">
          <h3>Featured Characters</h3>
          <a href="#" class="view-all">View All →</a>
        </div>
        <div class="wiki-row">
          <div class="wiki-card">
            <div class="wiki-avatar">A</div>
            <div class="wiki-name">ARIA</div>
            <div class="wiki-role">Earth Guardian — Healer</div>
            <p class="wiki-desc">Born of the forest, Aria channels nature's power to restore her allies.</p>
          </div>
          <div class="wiki-card">
            <div class="wiki-avatar blue-avatar">ZR</div>
            <div class="wiki-name">ZERO</div>
            <div class="wiki-role">Cosmic Ranger — Scout</div>
            <p class="wiki-desc">A lone wanderer between galaxies, Zero's speed is his greatest weapon.</p>
          </div>
          <div class="wiki-card">
            <div class="wiki-avatar yellow-avatar">TN</div>
            <div class="wiki-name">TITAN</div>
            <div class="wiki-role">Planetary Core — Tank</div>
            <p class="wiki-desc">Forged from the planet's molten heart, Titan absorbs crushing damage.</p>
          </div>
        </div>
      </div>
    </section> -->

    <div class="section-divider"></div>

    <!-- GAMES -->
    <!-- <section id="games" class="section-wrap fade-up">
      <span class="section-tag">🎮 Games</span>
      <h2 class="section-title">Hi Planet: Save the Earth!</h2>
      <p class="section-sub">A 2D multiplayer online RPG where strategy and eco-awareness shape every battle.</p>

      <div class="games-hero">
        <div class="games-info">
          <div class="game-type">2D MORPG · In Development</div>
          <div class="game-title">Hi Planet:<br>Save the Earth!</div>
          <p class="game-desc">Join forces with players worldwide. Face down cosmic adversaries and restore harmony.</p>
          <div class="game-features">
            <span class="f-tag">Multiplayer Co-op</span>
            <span class="f-tag">Eco-based Abilities</span>
            <span class="f-tag">Hand-crafted Maps</span>
          </div>
          <div class="game-btns">
            <a href="#" class="btn btn-primary">Join Beta Waitlist</a>
            <a href="#" class="btn btn-outline">Watch Trailer</a>
          </div>
        </div>
        <div class="game-visual">
          <div class="game-visual-gfx">⊕</div>
          <div class="status-badge"><span class="status-dot"></span>In Active Development</div>
        </div>
      </div>

      <h3 class="roadmap-title">Development Roadmap</h3>
      <div class="roadmap">
        <div class="roadmap-item">
          <div class="roadmap-phase">Phase 01</div>
          <div class="roadmap-name">Story & Comic</div>
          <span class="roadmap-status status-done">✓ Done</span>
        </div>
        <div class="roadmap-item active">
          <div class="roadmap-phase">Phase 02</div>
          <div class="roadmap-name">Core Engine</div>
          <span class="roadmap-status status-wip">⟳ In Progress</span>
        </div>
        <div class="roadmap-item">
          <div class="roadmap-phase">Phase 03</div>
          <div class="roadmap-name">Closed Beta</div>
          <span class="roadmap-status status-next">▷ Next Up</span>
        </div>
        <div class="roadmap-item">
          <div class="roadmap-phase">Phase 04</div>
          <div class="roadmap-name">Public Launch</div>
          <span class="roadmap-status status-soon">◌ Coming Soon</span>
        </div>
      </div>
    </section> -->

    <div class="section-divider"></div>

    <!-- COMMUNITY -->
    <!-- <section id="community" class="section-wrap fade-up">
      <span class="section-tag">👥 Community</span>
      <h2 class="section-title">Join the Crew</h2>
      <p class="section-sub">This game is built with its players. Be part of the story — from fan art to beta testing.</p>

      <div class="community-grid">
        <div class="discord-card">
          <span class="discord-logo">⬡</span>
          <div class="discord-members">2,400+</div>
          <div class="discord-label">Members Online</div>
          <div class="discord-channels">
            <span class="dc-channel">general <span class="dc-badge">24</span></span>
            <span class="dc-channel">beta-testers</span>
            <span class="dc-channel">fan-art</span>
          </div>
          <a href="#" class="btn-discord">⬡ Join Our Discord</a>
        </div>

        <div class="fanart-card">
          <div class="fanart-header">
            <div>
              <div class="section-tag-mini">🎨 Fan Art Gallery</div>
              <div class="tag-sub">Tag #HiPlanetFanArt on Instagram</div>
            </div>
            <a href="#" class="submit-link">Submit Art →</a>
          </div>
          <div class="fanart-grid">
            <div class="fanart-item">🌍</div><div class="fanart-item">⚡</div><div class="fanart-item">🌿</div>
            <div class="fanart-item">🔥</div><div class="fanart-item">💧</div><div class="fanart-item">⭐</div>
          </div>
          <div class="fanart-btns">
            <a href="#" class="btn btn-outline small">View All</a>
            <a href="#" class="btn btn-primary small">Submit Yours</a>
          </div>
        </div>
      </div>

      <h3 class="socials-title">Find Us Everywhere</h3>
      <div class="socials-row">
        <a href="#" class="social-card yt">
          <span class="s-icon">▶</span>
          <div class="s-platform red">YouTube</div>
          <div class="s-handle">@EcosoftInteractive</div>
          <div class="s-count">1.2K</div>
          <div class="s-label">Subscribers</div>
        </a>
        <a href="#" class="social-card tt">
          <span class="s-icon">♪</span>
          <div class="s-platform">TikTok</div>
          <div class="s-handle">@EcosoftGame</div>
          <div class="s-count">8.4K</div>
          <div class="s-label">Followers</div>
        </a>
        <a href="#" class="social-card dc">
          <span class="s-icon">⬡</span>
          <div class="s-platform blue">Discord</div>
          <div class="s-handle">Hi Planet Community</div>
          <div class="s-count">2.4K</div>
          <div class="s-label">Members</div>
        </a>
        <a href="#" class="social-card ig">
          <span class="s-icon">◈</span>
          <div class="s-platform pink">Instagram</div>
          <div class="s-handle">@EcosoftGame</div>
          <div class="s-count">3.1K</div>
          <div class="s-label">Followers</div>
        </a>
      </div>

      <div class="events-section">
        <div class="events-header">
          <h3>Upcoming Events</h3>
          <a href="#" class="view-all">View All →</a>
        </div>
        <div class="event-list">
          <div class="event-item">
            <div class="event-date"><div class="e-month">MAY</div><div class="e-day">10</div></div>
            <div class="event-info">
              <div class="e-title">Fan Art Championship — Spring 2025</div>
              <div class="e-desc">Submit your best Hi Planet fan art for in-game items.</div>
            </div>
            <a href="#" class="event-cta">Enter Now</a>
          </div>
          <div class="event-item">
            <div class="event-date"><div class="e-month">JUN</div><div class="e-day">01</div></div>
            <div class="event-info">
              <div class="e-title">Closed Beta — Discord Members Only</div>
              <div class="e-desc">First playable build access for our community.</div>
            </div>
            <a href="#" class="event-cta">Join Discord</a>
          </div>
        </div>
      </div>
    </section> -->

    <div class="section-divider"></div>

    <!-- DEVLOG -->
    <!-- <section id="devlog" class="section-wrap fade-up">
      <span class="section-tag">📝 Devlog</span>
      <h2 class="section-title">From the Studio</h2>
      <p class="section-sub">Watch the game come to life. Weekly updates and behind-the-scenes stories.</p>

      <div class="devlog-featured">
        <div class="devlog-featured-info">
          <span class="devlog-tag">✦ Latest Update</span>
          <div class="devlog-title">Building the World Map: How We Designed 12 Distinct Biomes</div>
          <p class="devlog-excerpt">Every region in Hi Planet started as a sketch in the comic's margins. We walk through the translation to 2D environments.</p>
          <div class="devlog-meta">Apr 10, 2025 · Dev Team · 6 min read</div>
          <a href="#" class="btn btn-outline">Read Full Post →</a>
        </div>
        <div class="devlog-featured-visual"><div class="devlog-visual-art">⊕</div></div>
      </div>

      <div class="devlog-grid">
        <a href="#" class="devlog-card">
          <div class="devlog-card-visual">🎨</div>
          <div class="devlog-card-content">
            <div class="devlog-card-tag">Art Direction</div>
            <div class="devlog-card-title">From Comic Panel to Game Asset</div>
            <div class="devlog-card-date">Mar 28, 2025</div>
          </div>
        </a>
        <a href="#" class="devlog-card">
          <div class="devlog-card-visual">⚙️</div>
          <div class="devlog-card-content">
            <div class="devlog-card-tag">Game Design</div>
            <div class="devlog-card-title">Our Combat System From Scratch</div>
            <div class="devlog-card-date">Mar 14, 2025</div>
          </div>
        </a>
        <a href="#" class="devlog-card">
          <div class="devlog-card-visual">🎙️</div>
          <div class="devlog-card-content">
            <div class="devlog-card-tag">Team Spotlight</div>
            <div class="devlog-card-title">Meet the Team: The Story of Ecosoft</div>
            <div class="devlog-card-date">Feb 28, 2025</div>
          </div>
        </a>
      </div>

      <div class="newsletter-bar fade-up">
        <div class="newsletter-text">
          <h3>Never Miss a Devlog</h3>
          <p>Weekly studio updates, straight to your inbox.</p>
        </div>
        <div class="newsletter-form">
          <input type="email" class="newsletter-input" placeholder="your@email.com">
          <button class="btn btn-primary">Subscribe</button>
        </div>
      </div>
    </section> -->
  </div>
</template>

<style scoped>
.landing {
  padding-top: clamp(60px, 5vw, 80px); /* Match nav height */
  max-width: 100%;
  overflow-x: hidden;
}
section { position: relative; z-index: 1; 
  /* min-height: 100vh;  */
  padding: clamp(40px, 5vw, 80px) clamp(1rem, 3vw, 2rem); max-width: 2000px; margin: 0 auto; }

/* HERO */
.hero-wrap { 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  max-width: 100%;
  position: relative;
  overflow: hidden;
  /* Use aspect-ratio based approach for consistent proportions across resolutions */
  min-height: max(100vh, 56.25vw); /* 16:9 ratio as minimum, ensures consistent proportions */
  /* background: linear-gradient(rgba(10, 24, 52, 0.6), rgba(10, 24, 52, 0.6)), url('/hero-image/hiplanet_website_hero_background.jpg') no-repeat center center; */
  background: url('/hero-image/hiplanet_website_hero_background.jpg') no-repeat center center;
  background-size: cover;
}

.stars-overlay {
  position: absolute;
  inset: 0;
  opacity: 0.7;
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
  opacity: 0.1; mix-blend-mode: overlay; z-index: 1;
}

.hero-inner {
  position: absolute;
  z-index: 10;
  /* Percentage-based position scales identically across all viewports */
  top: 18%;
  left: clamp(1rem, 3vw, 2rem);
  max-width: clamp(900px, 62.5vw, 1200px);
  width: 100%;
  padding: 0 clamp(1rem, 3vw, 2rem);
}

.hero-text-box {
  padding: clamp(1.5rem, 3vw, 3.75rem);
  padding-top: 1rem;
  max-width: clamp(480px, 37.5vw, 720px);
}

.hero-bottom-bar {
  position: absolute;
  bottom: 5%; /* Sits just below the HI PLANET logo area */
  left: 37%;
  transform: translateX(-50%);
  z-index: 20;
  display: flex;
  justify-content: center;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 1vw, 1rem);
  /* background: rgba(10, 24, 52, 0.95); */
  padding: clamp(0.5rem, 1vw, 0.8rem) clamp(0.75rem, 1.5vw, 1.5rem);
  /* border: 2px solid var(--royal); */
  /* backdrop-filter: blur(12px); */
  /* border-radius: 4px; */
}

.font-display { font-family: 'Anton', sans-serif; letter-spacing: 0.02em; }
.font-serif { font-family: 'Fraunces', serif; }

.episode-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: var(--blue);
  font-weight: 600;
  margin-bottom: 20px;
}
.tag-line { width: 48px; height: 1px; background: var(--blue); }

.main-title {
  font-family: 'Anton', sans-serif;
  font-size: clamp(3.5rem, 6vw, 9rem);
  line-height: 0.82;
  margin-bottom: clamp(1rem, 2vw, 2rem);
  color: #fff;
  text-shadow: 0 10px 40px rgba(0,0,0,0.8);
  letter-spacing: -0.02em;
}
.accent-earth-hero { color: var(--neon-blue); }

.lede {
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  font-weight: 400;
  font-size: clamp(1rem, 1.8vw, 1.25rem);
  line-height: 1.6;
  color: rgba(255,245,229,0.8);
  margin: 0;
  max-width: 600px;
}

.btn-new {
  font-family: 'Anton', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: clamp(0.5rem, 0.8vw, 0.75rem) clamp(1rem, 1.5vw, 1.5rem);
  font-size: clamp(0.8rem, 1vw, 0.95rem);
  text-decoration: none;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.btn-primary-new {
  background: var(--cream);
  color: var(--midnight);
  border-color: var(--cream);
}
.btn-primary-new:hover {
  background: var(--amber);
  border-color: var(--amber);
}

.btn-outline-new {
  background: transparent;
  color: var(--cream);
  border-color: var(--cream);
}
.btn-outline-new:hover {
  background: var(--cream);
  color: var(--midnight);
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
.reveal { animation: fadeUp 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }
.d-1 { animation-delay: 0.1s; } 
.d-2 { animation-delay: 0.25s; } 
.d-3 { animation-delay: 0.4s; } 
.d-4 { animation-delay: 0.55s; }

.hero-foreground {
  position: absolute;
  bottom: 0;
  left: 0;
  /* Use consistent percentage-based positioning */
  top: 57%;
  width: 100%;
  height: 78%; /* Explicit height instead of 100% to prevent overflow */
  background: url('/hero-image/hiplanet_website_hero_foreground.png') no-repeat bottom center;
  background-size: cover;
  z-index: 3;
  pointer-events: none;
  will-change: transform;
}
/* SOCIAL BAR */
.social-bar { background: var(--bg2); border-top: 1px solid var(--blue); border-bottom: 1px solid var(--blue); padding: 1rem 2rem; display: flex; align-items: center; gap: 2rem; overflow-x: auto; }
.social-bar-label { font-family: 'Space Mono', monospace; font-size: 0.65rem; color: var(--muted); text-transform: uppercase; white-space: nowrap; }
.social-pill { display: flex; align-items: center; gap: 8px; padding: 0.5rem 1.2rem; border-radius: 100px; border: 1px solid; text-decoration: none; font-family: 'Space Mono', monospace; font-size: 0.72rem; font-weight: 700; white-space: nowrap; transition: all 0.2s; }
.pill-yt { color: #FF0000; border-color: rgba(255,0,0,0.4); }
.pill-tt { color: #fff; border-color: rgba(255,255,255,0.3); }
.pill-dc { color: #5865F2; border-color: rgba(88,101,242,0.4); }
.pill-ig { color: #E1306C; border-color: rgba(225,48,108,0.4); }

/* SNEAK PEEK POSTER SECTION */
section.sneak-poster-section {
  position: relative;
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden;
  border-top: 1px solid var(--blue);
  /* Removed min-height to let image dictate height */
}

/* Background image - relative to define section height */
.sneak-poster-section .poster-bg-img {
  position: relative;
  display: block;
  width: 100%;
  height: auto;
  z-index: 1;
}

/* Subtle dark overlay */
.poster-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: rgba(10, 24, 52, 0.5); /* Slightly darker for better contrast */
}

/* Text content on top */
.poster-content {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Moved to top */
  align-items: center;
  text-align: center;
  padding: clamp(4rem, 8vw, 8rem) clamp(1rem, 3vw, 2rem); /* Responsive padding */
}

.poster-credits {
  margin-bottom: 2.5rem;
}

.poster-credit-line {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  color: rgba(255, 245, 229, 0.8);
  font-weight: 600;
  text-shadow: 0 2px 8px rgba(0,0,0,0.6);
}

.poster-credit-sub {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: rgba(255, 245, 229, 0.55);
  margin-top: 0.5rem;
  text-shadow: 0 2px 8px rgba(0,0,0,0.6);
}

.poster-main-title {
  font-size: clamp(3.5rem, 13vw, 12rem);
  line-height: 0.85;
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 0 6px 30px rgba(0,0,0,0.7);
}

.lede-poster {
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  /* font-style: italic; */
  font-weight: 300;
  font-size: clamp(1rem, 2.2vw, 1.4rem);
  line-height: 1.5;
  letter-spacing: 0.01em;
  color: rgb(255, 245, 229);
  max-width: 900px;
  text-align: center;
  margin-bottom: 2.5rem;
  text-shadow: 0 2px 10px rgba(0,0,0,0.6);
}

.poster-cta-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  align-items: center;
}

.macebot-floating {
  position: absolute;
  right: 10%;
  top: 55%;
  width: clamp(150px, 30vw, 400px);
  height: auto;
  filter: drop-shadow(0 20px 50px rgba(0,0,0,0.9));
  pointer-events: none;
  z-index: 100;
  animation: 
    fadeUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards,
    floatBot 6s ease-in-out infinite;
  opacity: 0;
}

.techgoblin-floating {
  position: absolute;
  left: 5%;
  top: 78%;
  width: clamp(150px, 17vw, 450px);
  height: auto;
  filter: drop-shadow(0 20px 50px rgba(0,0,0,0.9));
  pointer-events: none;
  z-index: 100;
  animation: 
    fadeUp 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards,
    floatBot 8s ease-in-out infinite;
  opacity: 0;
}

.mechatroll-floating {
  position: absolute;
  left: 30%;
  top: 72%;
  width: clamp(300px, 45vw, 650px);
  height: auto;
  filter: drop-shadow(0 30px 80px rgba(0,0,0,0.9));
  pointer-events: none;
  z-index: 100;
  animation: 
    fadeUp 1.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards,
    floatBot 7s ease-in-out infinite;
  opacity: 0;
}

@keyframes floatBot {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

.poster-episode-tag {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  margin-left: clamp(5rem, 16vw, 21rem); /* Responsive left push */
  margin-bottom: clamp(12px, 1.5vw, 20px);
  gap: clamp(0.5rem, 1vw, 1rem);
  font-family: 'Anton', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: var(--blue);
  font-size: clamp(0.7rem, 0.9vw, 0.9rem);
}

.poster-tag-line {
  width: 40px;
  height: 1px;
  background: var(--blue);
  opacity: 0.6;
}

.accent-coral { color: var(--neon-blue); }
.accent-coral-alt { color: var(--neon-blue); }
.accent-magenta { color: var(--magenta); }

.why-different-section {
  width: 100%;
  text-align: left;
  padding-left: clamp(2rem, 5vw, 6rem);
  padding-top: clamp(3rem, 5vw, 6rem);
}

.youtube-embed-container {
  width: 100%;
  max-width: clamp(800px, 62.5vw, 1200px);
  margin: clamp(2.5rem, 4vw, 5rem) auto;
  aspect-ratio: 16 / 9;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 30px 60px rgba(0,0,0,0.8);
  border-radius: 12px;
  overflow: hidden;
}

.youtube-embed-container iframe {
  width: 100%;
  height: 100%;
}

.different-label-row {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.different-line {
  width: 80px;
  height: 2px;
  background: var(--blue);
}

.different-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.35em;
  color: var(--blue);
  font-weight: 700;
}

.different-title {
  font-size: clamp(3rem, 10vw, 8rem);
  line-height: 0.82;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 4rem;
  text-shadow: 0 10px 40px rgba(0,0,0,0.8);
  letter-spacing: -0.02em;
}

.poster-features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.5rem, 3vw, 3rem);
  width: 100%;
  max-width: clamp(1200px, 83vw, 1600px);
  margin: auto auto clamp(-4rem, -3vw, -6rem) auto; /* Responsive bottom push */
  text-align: left;
}



.feature-item {
  position: relative;
}

.feature-num {
  font-size: clamp(3rem, 5.7vw, 11rem);
  line-height: 1;
  margin-bottom: 0.5rem;
  opacity: 0.9;
}

.feature-heading {
  /* font-family: 'Anton', sans-serif; */
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  font-size: clamp(0.9rem, 1.2vw, 1.5rem);
  margin-bottom: clamp(0.5rem, 0.8vw, 1rem);
  letter-spacing: 0.05em;
  color: #fff;
  text-transform: uppercase;
}

.feature-text {
  font-size: clamp(1rem, 1.8vw, 1.25rem);
  line-height: 1.6;
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  color: rgb(255, 245, 229);
}

.accent-earth { color: var(--blue); }
.accent-amber { color: var(--neon-blue); }
.accent-amber-comic { color: var(--blue); }


.btn-poster {
  font-family: 'Anton', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 0.9rem 2.2rem;
  border-radius: 4px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  font-size: 1rem;
}

.btn-primary-poster {
  background: var(--cream);
  color: var(--midnight);
  border: 2px solid var(--cream);
}

.btn-primary-poster:hover {
  background: #fff;
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.4);
}

.btn-outline-poster {
  background: transparent;
  color: #fff;
  border: 2px solid rgba(255,255,255,0.6);
  backdrop-filter: blur(5px);
}

.btn-outline-poster:hover {
  background: rgba(255,255,255,0.1);
  border-color: #fff;
  transform: translateY(-3px);
}

.btn-poster {
  font-family: 'Anton', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 1rem 2rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  text-decoration: none;
  font-size: 1.1rem;
}

.btn-primary-poster {
  background: var(--cream);
  color: var(--midnight);
  border: 2px solid var(--cream);
}

.btn-primary-poster:hover {
  background: #fff;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.4);
}

.btn-outline-poster {
  background: transparent;
  color: #fff;
  border: 2px solid rgba(255,255,255,0.5);
  backdrop-filter: blur(5px);
}

.btn-outline-poster:hover {
  background: rgba(255,255,255,0.1);
  border-color: #fff;
  transform: translateY(-3px);
}

/* COMIC INTRO */
.intro-visual {
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden;
  position: relative;
}
.intro-overlay-content {
  position: absolute;
  top: 0;
  left: 5%;
  z-index: 10;
  /* background: rgba(6, 10, 16, 0.85); */
  padding: clamp(1.5rem, 4vw, 3.5rem);
  max-width: 1400px;
  /* backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 245, 229, 0.1); */
  text-align: left;
}

.intro-label-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.intro-label-line {
  width: 40px;
  height: 2px;
  background: var(--blue);
}

.intro-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--blue);
  font-weight: 700;
}

.intro-story-title {
  font-size: clamp(3rem, 10vw, 8rem);
  line-height: 0.82;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 2rem;
  text-shadow: 0 10px 40px rgba(0,0,0,0.8);
  letter-spacing: -0.02em;
}

.intro-story-text {
  position: absolute;
  bottom: 14%;
  left: 22%;
  transform: translateX(-50%);
  z-index: 10;
  font-family: "Space Grotesk", sans-serif;
  font-size: clamp(0.9rem, 1.2vw, 2rem);
  line-height: 1.6;
  color: rgb(255, 245, 229);
  max-width: clamp(800px, 62.5vw, 1200px);
  text-align: center;
  text-shadow: 0 4px 12px rgba(0,0,0,0.9);
}

.accent-amber-alt {
  color: var(--neon-blue);
}

.full-width-image {
  width: 100%;
  height: auto;
  display: block;
}

/* CHAPTERS SECTION */
.chapters-section {
  /* padding-top: 8rem; */
  padding-bottom: 5rem;
}

.chapters-container {
  margin-top: 0;
}

.chapter-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: clamp(4rem, 6vw, 7rem) 0;
  border-bottom: 1px solid var(--blue);
  align-items: center;
}



.chapter-num {
  grid-area: num;
  font-family: 'Anton', sans-serif;
  font-size: clamp(3rem, 6vw, 7.5rem);
  line-height: 1;
  opacity: 0.9;
}

.accent-gaia {
  color: #339c5e;
}

.accent-tide {
  color: #37e7d3;
}

.accent-fire {
  color: #d82e16;
}

.accent-frozen {
  color: #fffd01;
}

.accent-wasteland{
  color: #949494;
}

.accent-crimson{
  color: #ff7034;
}

.chapter-info {
  grid-area: info;
}

.chapter-meta {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: rgb(255, 245, 229);
  margin-bottom: 0.5rem;
}

.chapter-name {
  font-family: 'Anton', sans-serif;
  font-size: clamp(1.5rem, 2vw, 2.5rem);
  letter-spacing: 0.03em;
  color: #fff;
}

.chapter-boss {
  font-family: 'Space Mono', monospace;
  font-size: clamp(1rem, 1.3vw, 1.7rem);
  text-transform: uppercase;
  letter-spacing: 0.25em;
  margin-top: 0.75rem;
}

.chapter-desc {
  grid-area: desc;
}

.chapter-desc p {
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  font-size: clamp(1rem, 1.2vw, 1.5rem);
  line-height: 1.7;
  color: rgb(255, 245, 229);
}

.chapter-visual {
  grid-area: visual;
  align-self: stretch;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.chapter-visual:hover {
  transform: scale(1.02);
  border-color: rgba(255, 255, 255, 0.3);
}

.screenshot-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  min-height: 350px; /* Increased to match your larger text sizes */
  transition: filter 0.4s ease;
}

.chapter-visual:hover .screenshot-img {
  filter: brightness(1.1);
}

.finale-row {
  background: linear-gradient(90deg, rgba(200, 52, 90, 0.06), transparent);
  border-bottom: none;
  padding: 4rem 1rem;
  border-radius: 12px;
}

.finale-placeholder {
  background: rgba(200, 52, 90, 0.1);
  border-color: rgba(200, 52, 90, 0.3);
  color: var(--magenta);
}

/* UNIVERSE */
.section-tag { display: inline-flex; align-items: center; gap: 8px; font-family: 'Space Mono', monospace; font-size: 0.68rem; letter-spacing: 3px; text-transform: uppercase; color: var(--green); margin-bottom: 1rem; padding: 0.35rem 0.9rem; border: 1px solid rgba(15,255,108,0.3); border-radius: 100px; }
.section-title { font-family: 'Bangers', cursive; font-size: clamp(2.5rem, 5vw, 4rem); color: #fff; margin-bottom: 1rem; }
.section-sub { font-size: 1rem; color: var(--muted); line-height: 1.7; max-width: 560px; margin-bottom: 3rem; }
.universe-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.comic-panel { background: var(--bg2); border: 2px solid rgba(15,255,108,0.25); border-radius: 12px; overflow: hidden; transition: all 0.3s; text-decoration: none; color: inherit; display: block; }
.comic-panel:hover { border-color: var(--green); transform: translateY(-4px); }
.comic-panel-large { grid-column: span 2; display: grid; grid-template-columns: 1fr 1fr; }
.panel-visual { background: #0a1a10; min-height: 200px; display: flex; align-items: center; justify-content: center; position: relative; }
.panel-visual.mini { min-height: 160px; }
.panel-visual-art { font-family: 'Bangers', cursive; font-size: 5rem; color: rgba(15,255,108,0.15); }
.panel-visual-art.mini-art { font-size: 3rem; }
.panel-badge { position: absolute; top: 1rem; left: 1rem; background: var(--yellow); color: #000; font-family: 'Bangers', cursive; font-size: 0.75rem; padding: 3px 10px; border-radius: 4px; }
.gallery-badge { background: var(--blue); }
.lore-badge { background: var(--red); color: #fff; }
.panel-content { padding: 1.5rem; }
.panel-tag { font-family: 'Space Mono', monospace; font-size: 0.62rem; color: var(--green); margin-bottom: 0.6rem; }
.panel-title { font-family: 'Bangers', cursive; font-size: 1.8rem; color: #fff; margin-bottom: 0.6rem; }
.panel-desc { font-size: 0.88rem; color: var(--muted); line-height: 1.6; margin-bottom: 1.2rem; }
.panel-link { font-family: 'Space Mono', monospace; font-size: 0.72rem; color: var(--green); display: flex; align-items: center; gap: 6px; }
.panel-link::after { content: '→'; }
.feature-tags { display: flex; gap: 0.6rem; flex-wrap: wrap; margin-bottom: 1.2rem; }
.feature-tag { font-size: 0.75rem; padding: 5px 12px; border-radius: 6px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: var(--text); font-family: 'Space Mono', monospace; }
.chars-header { display: flex; align-items: center; justify-content: space-between; margin-top: 3rem; margin-bottom: 1rem; }
.chars-header h3 { font-family: 'Bangers', cursive; font-size: 1.5rem; color: #fff; }
.view-all { font-family: 'Space Mono', monospace; font-size: 0.68rem; color: var(--green); text-decoration: none; }
.wiki-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.wiki-card { background: var(--bg3); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 1.2rem; }
.wiki-avatar { width: 52px; height: 52px; border-radius: 50%; background: linear-gradient(135deg, #0a3a1e, #001a40); border: 2px solid rgba(15,255,108,0.4); display: flex; align-items: center; justify-content: center; font-family: 'Bangers', cursive; font-size: 1.3rem; color: var(--green); margin-bottom: 0.8rem; }
.blue-avatar { border-color: rgba(0,200,255,0.5); color: var(--blue); }
.yellow-avatar { border-color: rgba(255,230,0,0.5); color: var(--yellow); }
.wiki-name { font-family: 'Bangers', cursive; font-size: 1.1rem; color: #fff; }
.wiki-role { font-size: 0.72rem; font-family: 'Space Mono', monospace; color: var(--blue); margin-bottom: 0.5rem; }
.wiki-desc { font-size: 0.8rem; color: var(--muted); }

/* GAMES */
.games-hero { background: var(--bg2); border: 2px solid rgba(15,255,108,0.3); border-radius: 16px; overflow: hidden; display: grid; grid-template-columns: 1fr 380px; margin-bottom: 3rem; }
.games-info { padding: 3rem; }
.game-type { font-family: 'Space Mono', monospace; font-size: 0.65rem; background: rgba(15,255,108,0.15); color: var(--green); padding: 4px 12px; border-radius: 100px; margin-bottom: 1.2rem; display: inline-block; }
.game-title { font-family: 'Bangers', cursive; font-size: 2.8rem; color: #fff; margin-bottom: 0.5rem; line-height: 1; }
.game-desc { font-size: 0.95rem; color: var(--muted); margin-bottom: 2rem; line-height: 1.7; }
.game-features { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 2rem; }
.f-tag { font-size: 0.75rem; padding: 5px 12px; border-radius: 6px; background: rgba(255,255,255,0.05); color: var(--text); font-family: 'Space Mono', monospace; border: 1px solid rgba(255,255,255,0.1); }
.game-btns { display: flex; gap: 0.8rem; }
.game-visual { background: #040c06; display: flex; align-items: center; justify-content: center; position: relative; }
.game-visual-gfx { font-family: 'Bangers', cursive; font-size: 8rem; color: rgba(15,255,108,0.08); transform: rotate(-15deg); }
.status-badge { position: absolute; top: 1.5rem; right: 1.5rem; background: rgba(255,230,0,0.15); border: 1px solid rgba(255,230,0,0.4); color: var(--yellow); font-family: 'Space Mono', monospace; font-size: 0.65rem; padding: 6px 14px; border-radius: 100px; display: flex; align-items: center; gap: 6px; }
.status-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--yellow); animation: pulse 1.5s ease-in-out infinite; }
.roadmap-title { font-family: 'Bangers', cursive; font-size: 1.5rem; color: #fff; margin-bottom: 1rem; }
.roadmap { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
.roadmap-item { background: var(--bg2); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 1.2rem; }
.roadmap-item.active { border-color: rgba(15,255,108,0.4); }
.roadmap-phase { font-family: 'Space Mono', monospace; font-size: 0.6rem; color: var(--muted); margin-bottom: 0.4rem; }
.roadmap-name { font-family: 'Bangers', cursive; font-size: 1.1rem; color: #fff; }
.roadmap-desc { font-size: 0.78rem; color: var(--muted); line-height: 1.5; }
.roadmap-status { display: inline-block; margin-top: 0.8rem; font-size: 0.65rem; font-family: 'Space Mono', monospace; padding: 3px 8px; border-radius: 4px; }
.status-done { background: rgba(15,255,108,0.15); color: var(--green); }
.status-wip { background: rgba(255,230,0,0.15); color: var(--yellow); }
.status-next { background: rgba(0,200,255,0.1); color: var(--blue); }
.status-soon { background: rgba(255,255,255,0.05); color: var(--muted); }

/* COMMUNITY */
.community-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 3rem; }
.discord-card { background: linear-gradient(135deg, #1c1e3a, #12142a); border: 2px solid rgba(88,101,242,0.4); border-radius: 16px; padding: 2rem; position: relative; overflow: hidden; }
.discord-logo { font-size: 2.5rem; margin-bottom: 1rem; display: block; }
.discord-members { font-family: 'Bangers', cursive; font-size: 3rem; color: #5865F2; letter-spacing: 2px; margin-bottom: 0.3rem; }
.discord-label { font-size: 0.8rem; color: rgba(255,255,255,0.5); font-family: 'Space Mono', monospace; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1rem; }
.discord-channels { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1.5rem; }
.dc-channel { font-family: 'Space Mono', monospace; font-size: 0.72rem; color: rgba(255,255,255,0.5); display: flex; align-items: center; gap: 6px; }
.dc-channel::before { content: '#'; color: rgba(88,101,242,0.8); }
.dc-badge { background: #ff4646; color: #fff; font-size: 0.55rem; padding: 1px 5px; border-radius: 100px; }
.btn-discord { background: #5865F2; color: #fff; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; font-family: 'Space Mono', monospace; font-size: 0.75rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-block; width: 100%; text-align: center; }
.btn-discord:hover { background: #4752c4; transform: translateY(-2px); }

.fanart-card { background: var(--bg2); border: 1px solid rgba(225,48,108,0.3); border-radius: 16px; padding: 1.5rem; overflow: hidden; }
.fanart-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.2rem; }
.section-tag-mini { font-family: 'Space Mono', monospace; font-size: 0.68rem; color: var(--green); text-transform: uppercase; letter-spacing: 2px; }
.tag-sub { font-family: 'Space Mono', monospace; font-size: 0.6rem; color: var(--muted); }
.submit-link { font-family: 'Space Mono', monospace; font-size: 0.65rem; color: var(--green); text-decoration: none; }
.fanart-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem; margin-bottom: 1.2rem; }
.fanart-item { aspect-ratio: 1; border-radius: 8px; background: var(--bg3); border: 1px solid rgba(255,255,255,0.06); overflow: hidden; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; transition: all 0.2s; cursor: pointer; }
.fanart-item:hover { border-color: rgba(225,48,108,0.5); transform: scale(1.05); }
.fanart-btns { display: flex; gap: 0.8rem; }
.btn.small { font-size: 0.7rem; padding: 0.6rem 1.2rem; flex: 1; text-align: center; }

.socials-title { font-family: 'Bangers', cursive; font-size: 1.5rem; color: #fff; margin-bottom: 1rem; }
.socials-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 3rem; }
.social-card { background: var(--bg2); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1.5rem; text-align: center; transition: all 0.3s; text-decoration: none; color: inherit; display: block; }
.social-card:hover { transform: translateY(-4px); }
.social-card.yt:hover { border-color: rgba(255,0,0,0.5); }
.social-card.tt:hover { border-color: rgba(255,255,255,0.3); }
.social-card.dc:hover { border-color: rgba(88,101,242,0.5); }
.social-card.ig:hover { border-color: rgba(225,48,108,0.5); }
.s-icon { font-size: 2.2rem; margin-bottom: 0.6rem; display: block; }
.s-platform { font-family: 'Bangers', cursive; font-size: 1.2rem; margin-bottom: 0.3rem; }
.s-platform.red { color: #FF0000; }
.s-platform.blue { color: #5865F2; }
.s-platform.pink { color: #E1306C; }
.s-handle { font-family: 'Space Mono', monospace; font-size: 0.65rem; color: var(--muted); margin-bottom: 0.8rem; }
.s-count { font-family: 'Bangers', cursive; font-size: 1.4rem; color: var(--green); }
.s-label { font-size: 0.65rem; font-family: 'Space Mono', monospace; color: var(--muted); text-transform: uppercase; }

.events-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; margin-top: 2rem; }
.event-list { display: flex; flex-direction: column; gap: 0.8rem; }
.event-item { background: var(--bg2); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 1.2rem 1.5rem; display: grid; grid-template-columns: 80px 1fr auto; align-items: center; gap: 1.5rem; transition: all 0.2s; }
.event-item:hover { border-color: rgba(15,255,108,0.3); }
.event-date { text-align: center; }
.e-month { font-family: 'Space Mono', monospace; font-size: 0.6rem; color: var(--green); }
.e-day { font-family: 'Bangers', cursive; font-size: 2rem; color: #fff; line-height: 1; }
.e-title { font-family: 'Bangers', cursive; font-size: 1.2rem; color: #fff; margin-bottom: 0.2rem; }
.e-desc { font-size: 0.8rem; color: var(--muted); }
.event-cta { font-family: 'Space Mono', monospace; font-size: 0.68rem; color: var(--green); border: 1px solid rgba(15,255,108,0.4); padding: 6px 14px; border-radius: 6px; text-decoration: none; transition: all 0.2s; }
.event-cta:hover { background: rgba(15,255,108,0.1); }

/* DEVLOG */
.devlog-featured { background: var(--bg2); border: 2px solid rgba(0,200,255,0.3); border-radius: 16px; overflow: hidden; display: grid; grid-template-columns: 1fr 360px; margin-bottom: 1.5rem; min-height: 300px; }
.devlog-featured-info { padding: 2.5rem; }
.devlog-tag { display: inline-block; font-family: 'Space Mono', monospace; font-size: 0.62rem; background: rgba(0,200,255,0.1); color: var(--blue); padding: 4px 10px; border-radius: 4px; border: 1px solid rgba(0,200,255,0.3); margin-bottom: 0.8rem; }
.devlog-title { font-family: 'Bangers', cursive; font-size: 2rem; color: #fff; margin-bottom: 0.8rem; line-height: 1.1; }
.devlog-excerpt { font-size: 0.9rem; color: var(--muted); line-height: 1.7; margin-bottom: 1.5rem; }
.devlog-meta { font-family: 'Space Mono', monospace; font-size: 0.65rem; color: var(--muted); text-transform: uppercase; }
.devlog-featured-visual { background: #040c12; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
.devlog-visual-art { font-family: 'Bangers', cursive; font-size: 6rem; color: rgba(0,200,255,0.08); transform: rotate(-10deg); }
.devlog-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 3rem; }
.devlog-card { background: var(--bg2); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; overflow: hidden; transition: all 0.3s; text-decoration: none; color: inherit; display: block; }
.devlog-card:hover { border-color: rgba(0,200,255,0.4); transform: translateY(-4px); }
.devlog-card-visual { height: 120px; background: #040c12; display: flex; align-items: center; justify-content: center; font-family: 'Bangers', cursive; font-size: 3.5rem; color: rgba(0,200,255,0.1); overflow: hidden; }
.devlog-card-content { padding: 1.2rem; }
.devlog-card-tag { font-family: 'Space Mono', monospace; font-size: 0.6rem; color: var(--blue); margin-bottom: 0.5rem; }
.devlog-card-title { font-family: 'Bangers', cursive; font-size: 1.2rem; color: #fff; margin-bottom: 0.4rem; line-height: 1.2; }
.devlog-card-date { font-family: 'Space Mono', monospace; font-size: 0.6rem; color: var(--muted); text-transform: uppercase; }

/* NEWSLETTER */
.newsletter-bar { background: linear-gradient(135deg, #0a2018, #001a30); border: 1px solid rgba(15,255,108,0.2); border-radius: 16px; padding: 2.5rem 3rem; display: flex; align-items: center; justify-content: space-between; gap: 2rem; margin-top: 4rem; }
.newsletter-text h3 { font-family: 'Bangers', cursive; font-size: 1.8rem; color: #fff; }
.newsletter-text p { font-size: 0.88rem; color: var(--muted); }
.newsletter-form { display: flex; gap: 0.8rem; }
.newsletter-input { background: rgba(255,255,255,0.05); border: 1px solid rgba(15,255,108,0.3); border-radius: 8px; padding: 0.75rem 1.2rem; font-family: 'Space Mono', monospace; font-size: 0.8rem; color: var(--text); outline: none; width: 240px; }

@media (min-width: 768px) {
  .poster-features-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 8.5rem;
  }
  .chapter-row {
    grid-template-areas: 
      "num info visual"
      "desc desc visual";
    grid-template-columns: 0.7fr 2.3fr 7fr;
    grid-template-rows: auto auto;
    gap: 2rem 4rem;
    align-items: start;
  }
}

@media (max-width: 900px) {
  .hero-planet { display: none; }
  .universe-grid { grid-template-columns: 1fr; }
  .comic-panel-large { grid-template-columns: 1fr; }
  .wiki-row { grid-template-columns: 1fr 1fr; }
  .games-hero { grid-template-columns: 1fr; }
  .game-visual { display: none; }
  .roadmap { grid-template-columns: 1fr 1fr; }
  .community-grid { grid-template-columns: 1fr; }
  .socials-row { grid-template-columns: 1fr 1fr; }
  .devlog-featured { grid-template-columns: 1fr; }
  .devlog-featured-visual { display: none; }
  .devlog-grid { grid-template-columns: 1fr 1fr; }
  .newsletter-bar { flex-direction: column; text-align: center; }
  .newsletter-form { flex-direction: column; width: 100%; }
  .newsletter-input { width: 100%; }
}

@media (max-width: 480px) {
  section {
    min-height: 29vh;
  }
  .section-line {
      justify-content: flex-start !important;
  }
  .hero-wrap {
    min-height: 100vh;
    padding-top: 15vh;
    align-items: center;
    text-align: center;
  }
  .hero-inner {
    position: relative;
    top: auto;
    left: auto;
  }
  .hero-text-box {
    padding: 1.5rem;
    max-width: 100%;
  }
  .main-title {
    font-size: 3.5rem;
    line-height: 1;
    margin-bottom: 1rem;
  }
  .lede {
    font-size: 1.1rem;
    margin: 0 auto;
  }
  .hero-bottom-bar {
    left: 0;
    bottom: 8%;
    width: 100%;
    transform: none;
    display: flex;
    justify-content: center;
    padding: 0 1.5rem;
  }
  .hero-actions {
    flex-direction: column;
    gap: 1rem;
  }
  .btn-new {
    width: 100%;
    max-width: 280px;
    margin: 0 auto;
    text-align: center;
  }
  .intro-story-title {
    font-size: 2.2rem;
    margin-bottom: 1rem;
  }
  .intro-overlay-content {
    left: 0;
    top: 0;
    width: 100%;
    text-align: left;
    padding: 1.5rem;
  }
  .intro-label-row {
    margin-bottom: 0.5rem;
  }
  .intro-label {
    font-size: 0.6rem;
  }
  .intro-label-line {
    width: 20px;
  }
  .intro-story-text {
    left: 0;
    bottom: 5%;
    width: 100%;
    transform: none;
    text-align: center;
    font-size: 0.5rem;
    padding: 0 1.5rem;
    max-width: 100%;
  }

  .poster-content{
    padding: 3rem 2rem;
  }

  /* Poster Section Mobile */
  .sneak-poster-section {
    padding: 2rem 1.5rem !important;
  }
  .poster-main-title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  .lede-poster {
    font-size: 0.55rem;
    max-width: 100%;
    margin: 0 auto 1.5rem auto;
  }
  .poster-cta-row {
    justify-content: center;
    position: relative;
    z-index: 200;
  }
  .btn-poster {
    padding: 0.6rem 1.2rem;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
  }
  .why-different-section {
    padding-left: 0;
    text-align: center;
    margin-top: -2rem;
  }

  .different-line {
    width: 20px;
  }

  .different-label {
    font-size: 0.5rem;
  }
  
  .different-title {
    font-size: 1.5rem;
    line-height: 1.2rem;
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 200;
    text-align: left;
  }
  .youtube-embed-container {
    display: none;
    margin: 1.5rem 0;
    width: 100%;
    min-height: 200px;
    aspect-ratio: 16 / 9;
  }
  .poster-features-grid {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 0.5rem !important;
    margin: 5rem 0 0 0 !important;
    text-align: center !important;
    position: relative !important;
    z-index: 200 !important;
  }
  .feature-num {
    font-size: 1.8rem !important;
  }
  .feature-heading {
    font-size: 0.5rem !important;
    margin-bottom: 0.3rem !important;
  }
  .feature-text {
    font-size: 0.4rem !important;
    line-height: 1.3 !important;
  }
  .macebot-floating, 
  .techgoblin-floating, 
  .mechatroll-floating {
    display: block !important;
    opacity: 0.6;
    pointer-events: none;
  }
  .macebot-floating {
    top: 56% !important;
    right: 18% !important;
    width: 95px !important;
  }
  .techgoblin-floating {
   top: 80% !important;
    left: 7% !important;
    width: 50px !important;
  }
  .mechatroll-floating {
    top: 74% !important;
    left: 27% !important;
    width: 120px !important;
    z-index: 1 !important;
  }
  .poster-episode-tag {
    margin-left: -60px;
    align-self: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 1rem;
  }

  /* Chapters Mobile */
  .chapter-row {
    grid-template-areas: 
      "num info"
      "desc desc"
      "visual visual";
    grid-template-columns: 60px 1fr !important;
    gap: 1.5rem;
    padding: 3rem 0;
  }
  .chapter-num {
    font-size: 2.5rem;
  }
  .chapter-name {
    font-size: 1.4rem;
  }
  .chapter-boss {
    font-size: 0.8rem;
  }
  .chapter-desc p {
    font-size: 0.9rem;
  }
  .screenshot-img {
    min-height: 200px;;
  }

  /* Extreme Mobile Fix (360x760) */
  @media (max-width: 360px) {
    .hero-text-box{
      padding: 1.5rem;
      max-width: 100%;
    }

    .section-line {
      justify-content: flex-start !important;
    }
    
    .lede {
      font-size: 1rem;
    }

    .hero-main-title {
      font-size: 3.5rem !important;
    }
    .intro-story-title {
      font-size: 1.8rem !important;
    }
    .intro-story-text {
      font-size: 0.5rem !important;
      bottom: 5% !important;
    }

    .lede-poster {
      font-size: 0.55rem;
    }
  
    .poster-main-title {
      font-size: 1.6rem !important;
    }

    .why-different-section {
      margin-top: -4rem;
    }

    .different-title {
      font-size: 1.3rem !important;
    }
    .feature-num {
      font-size: 1.5rem !important;
    }
    .feature-heading {
      font-size: 0.4rem !important;
    }
    .feature-text {
      font-size: 0.35rem !important;
    }
    .sneak-poster-section {
      padding: 1.5rem 1rem !important;
    }
    .btn-poster {
      padding: 0.5rem 1rem !important;
      font-size: 0.75rem !important;
    }
    .macebot-floating {
      width: 70px !important;
    }
    .mechatroll-floating {
      width: 100px !important;
    }
  }
}

/* HEROES SECTION CUSTOM STYLES */
.heroes-section {
  position: relative;
  padding: 2rem 0;
  overflow: hidden;
  /* background: var(--midnight); */
}

.heroes-stars-overlay {
  position: absolute;
  inset: 0;
  opacity: 0.3;
  background-image: 
    radial-gradient(1.5px 1.5px at 15% 15%, #fff, transparent),
    radial-gradient(1px 1px at 40% 70%, rgba(255,255,255,0.8), transparent),
    radial-gradient(2px 2px at 70% 30%, #fff, transparent),
    radial-gradient(1px 1px at 85% 85%, rgba(255,255,255,0.6), transparent);
}

.heroes-container {
  position: relative;
  max-width: clamp(1200px, 86vw, 1660px);
  margin: 0 auto;
  padding: 0 clamp(1rem, 2vw, 1.5rem);
  z-index: 2;
}

.heroes-header {
  margin-bottom: 4rem;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
}

.heroes-description {
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  font-size: clamp(1.1rem, 1.8vw, 1.4rem);
  line-height: 1.6;
  color: rgb(255, 245, 229);
  max-width: 1200px;
  margin-top: 2rem;
}

.heroes-title-box {
  max-width: 1200px;
}

.section-line {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 1.5rem;
  /* margin-left: 50px; */
}

.section-line::before {
  content: "";
  width: 40px;
  height: 1px;
  background: currentColor;
}

.heroes-main-title {
  font-size: clamp(3rem, 7vw, 8rem);
  line-height: 0.82;
  color: #fff;
  text-transform: uppercase;
  max-width: 800px;
  text-shadow: 0 10px 40px rgba(0,0,0,0.8);
  letter-spacing: -0.02em;
}

.heroes-view-all {
  font-family: 'Anton', sans-serif;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: var(--cyan);
  text-decoration: none;
  border-bottom: 2px solid var(--cyan);
  padding-bottom: 4px;
  transition: all 0.3s ease;
}

.heroes-view-all:hover {
  color: var(--amber);
  border-color: var(--amber);
}

.heroes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.hero-card {
  aspect-ratio: 3/4;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.hero-card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}

.hero-tag {
  display: inline-block;
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  padding: 4px 10px;
  border: 1px solid;
  border-radius: 4px;
  align-self: flex-start;
  letter-spacing: 0.05em;
  position: relative;
  z-index: 10;
}

.hero-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%);
  width: 140%;
  height: 140%;
  object-fit: contain;
  pointer-events: none;
  z-index: 1;
  transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  filter: drop-shadow(0 15px 30px rgba(0,0,0,0.6));
}

.hero-card:hover .hero-img {
  transform: translate(-50%, -50%) scale(1.1);
}

.hero-card-bottom {
  margin-top: auto;
  position: relative;
  z-index: 10;
}

.hero-name {
  font-size: 2rem;
  color: #fff;
  margin-bottom: 2px;
}

.hero-role {
  font-size: 10px;
  letter-spacing: 0.2em;
  color: rgba(255, 245, 229, 0.6);
}

.hero-placeholder-note {
  margin-top: 3rem;
  font-size: 12px;
  color: rgba(255, 245, 229, 0.4);
  text-align: center;
}

/* Hero Tag Color Variants */
.tag-coral { color: var(--coral); border-color: rgba(255, 107, 53, 0.4); }
.tag-amber { color: var(--amber); border-color: rgba(255, 182, 39, 0.4); }
.tag-cream { color: var(--cream); border-color: rgba(255, 245, 229, 0.3); }
.tag-saturn { color: #D4A574; border-color: rgba(212, 165, 116, 0.4); }
.tag-cyan { color: var(--cyan); border-color: rgba(34, 211, 238, 0.4); }
.tag-pluto { color: #9B8FB8; border-color: rgba(155, 143, 184, 0.4); }
.tag-venus { color: #E8C547; border-color: rgba(232, 197, 71, 0.4); }
.tag-earth { color: var(--earth); border-color: rgba(74, 144, 226, 0.4); }
.tag-jupiter { color: #D97706; border-color: rgba(217, 119, 6, 0.4); }
.tag-mars { color: #EF4444; border-color: rgba(239, 68, 68, 0.4); }

@media (min-width: 640px) {
  .heroes-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 768px) {
  .heroes-section { padding: 2rem 0; }
  .heroes-grid { grid-template-columns: repeat(5, 1fr); }
}

@media (max-width: 640px) {
  .heroes-header { text-align: center; justify-content: center; flex-direction: column; }
  .heroes-title-box { margin-bottom: 1rem; }
  .section-line { justify-content: center; }
  .hero-name { font-size: 1.5rem; }
}

/* COMIC SECTION CUSTOM STYLES */
.comic-section {
  position: relative;
  padding: 3rem 0;
  /* background: var(--cream); */
  /* color: var(--midnight); */
  overflow: hidden;
}

.comic-gradient-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  /* background: radial-gradient(ellipse 60% 80% at 80% 20%, rgba(255,107,53,0.25) 0%, transparent 60%); */
}

.comic-container {
  position: relative;
  z-index: 10;
  max-width: clamp(1200px, 86vw, 1660px);
  margin: 0 auto;
  padding: 0 clamp(1rem, 2vw, 1.5rem);
}

.comic-content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}

.comic-title {
  font-size: clamp(3rem, 7vw, 8rem);
  line-height: 0.82;
  margin-bottom: 2rem;
  color: #fff;
  text-shadow: 0 10px 40px rgba(0,0,0,0.8);
  letter-spacing: -0.02em;
}

.comic-lede {
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  /* font-style: italic; */
  font-weight: 300;
  font-size: clamp(1.1rem, 1.8vw, 1.4rem);
  line-height: 1.5;
  color: rgb(255, 245, 229);
  margin-bottom: 2.5rem;
  max-width: 600px;
}

.comic-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
}

.btn-comic {
  font-family: 'Anton', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 0.9rem 1.5rem;
  font-size: 0.875rem;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid #fff;
  display: inline-flex;
  align-items: center;
}

.btn-primary-comic {
  background: var(--cream);
  color: var(--midnight);
  border-color: var(--cream);
}

.btn-primary-comic:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
}

.btn-outline-comic {
  background: transparent;
  color: #fff;
}

.btn-outline-comic:hover {
  background: var(--cream);
  color: var(--midnight);
}

.comic-newsletter {
  max-width: 450px;
}

.newsletter-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: 0.75rem;
  color: #fff;
}

.comic-form {
  display: flex;
  gap: 0.5rem;
}

.comic-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #fff;
  background: transparent;
  font-family: 'Manrope', sans-serif;
  font-size: 0.9rem;
  color: #fff;
  outline: none;
  transition: background 0.3s ease;
}

.comic-input:focus {
  background: rgba(255, 255, 255, 0.4);
}

.comic-submit-btn {
  padding: 0 1.25rem;
  background: var(--cream);
  color: var(--midnight);
  border: 2px solid var(--cream);
  font-size: 0.875rem;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.comic-submit-btn:hover {
  opacity: 0.9;
}

/* COMIC VISUAL */
.comic-visual-wrap {
  position: relative;
  max-width: 400px;
  margin: 0 auto;
}

.comic-cover-main {
  position: relative;
  background: var(--midnight);
  aspect-ratio: 2 / 3;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--cream);
  overflow: hidden;
  box-shadow: 16px 16px 0 var(--neon-blue);
  z-index: 2;
}

.cover-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.9;
}

.cover-dark-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(10, 24, 52, 0.4) 0%, rgba(10, 24, 52, 0.7) 100%);
  z-index: 1;
}

.cover-stars {
  opacity: 0.5;
  z-index: 1;
}

.cover-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 70% 80% at 50% 50%, rgba(74,144,226,0.25) 0%, transparent 70%);
  z-index: 1;
}

.volume-tag {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  margin-bottom: 0.75rem;
  position: relative;
  z-index: 2;
}

.cover-title {
  font-size: 3.5rem;
  line-height: 0.85;
  letter-spacing: 0.02em;
  position: relative;
  z-index: 2;
}

.cover-subtitle {
  font-size: 1.25rem;
  margin-top: 0.75rem;
  letter-spacing: 0.05em;
  position: relative;
  z-index: 2;
}

.cover-quote {
  font-size: 0.875rem;
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  /* color: rgba(255, 245, 229, 0.7); */
  line-height: 1.6;
  margin-bottom: 0.75rem;
  position: relative;
  z-index: 2;
}

.cover-author {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  /* color: rgba(255, 245, 229, 0.4); */
  position: relative;
  z-index: 2;
}

.comic-cover-teaser {
  position: absolute;
  bottom: -1.5rem;
  right: -1.5rem;
  background: var(--magenta);
  aspect-ratio: 2 / 3;
  width: 170px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--cream);
  transform: rotate(-6deg);
  box-shadow: 8px 8px 0 var(--blue);
  z-index: 3;
  overflow: hidden;
}

.teaser-bottom {
  position: relative;
  z-index: 4;
}

.teaser-text {
  font-size: 1.5rem;
  line-height: 1;
  letter-spacing: 0.03em;
}

.teaser-sub {
  font-size: 0.75rem;
  margin-top: 0.25rem;
  letter-spacing: 0.15em;
}

@media (min-width: 768px) {
  .comic-section {
    padding: 3rem 0;
  }
  .comic-content-grid {
    grid-template-columns: 1.2fr 0.8fr;
    gap: 5rem;
  }
  .comic-visual-wrap {
    margin: 0;
  }
}
/* STUDIO SECTION */
.studio-section {
  position: relative;
  padding: 6rem 0;
  /* background: var(--cream); */
  color: var(--midnight);
  overflow: hidden;
}

.studio-gradient-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  /* background: radial-gradient(ellipse 50% 60% at 20% 80%, rgba(46,91,204,0.15) 0%, transparent 60%); */
}

.studio-container {
  position: relative;
  z-index: 10;
  max-width: clamp(1200px, 86vw, 1660px);
  margin: 0 auto;
  padding: 0 clamp(1rem, 2vw, 1.5rem);
}

.studio-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 9rem;
}

.studio-title {
  font-size: clamp(3rem, 7vw, 8rem);
  line-height: 0.82;
  margin-bottom: 1.5rem;
  color: #fff;
  text-shadow: 0 10px 40px rgba(0,0,0,0.8);
  letter-spacing: -0.02em;
}

.studio-lede {
  font-family: "Space Grotesk", sans-serif;
  font-size: clamp(1.2rem, 2vw, 1.6rem);
  line-height: 1.5;
  color: rgb(255, 245, 229);
  margin-bottom: 2rem;
  max-width: 500px;
}

.studio-desc {
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(10, 24, 52, 0.65);
  margin-bottom: 2.5rem;
  max-width: 450px;
}

.studio-letter-link {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: var(--midnight);
  text-decoration: none;
  border-bottom: 2px solid var(--coral);
  padding-bottom: 0.25rem;
  transition: opacity 0.3s ease;
}

.studio-letter-link:hover {
  opacity: 0.7;
}

.timeline-stack {
  display: flex;
  flex-direction: column;
}

.timeline-item {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.timeline-year {
  font-size: clamp(2rem, 2.7vw, 3.5rem);
  width: clamp(4rem, 5vw, 6rem);
  flex-shrink: 0;
  color: var(--coral);
  line-height: 1;
}

.timeline-content {
  flex: 1;
  border-left: 2px solid rgba(10, 24, 52, 0.15);
  padding-left: 2rem;
  padding-bottom: 3rem;
}

.timeline-content.no-border {
  border-left-color: transparent;
  padding-bottom: 0;
}

.timeline-title {
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
  color: #fff;
}

.timeline-desc {
  font-family: "Space Grotesk", sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #fff;
}

@media (min-width: 768px) {
  .studio-section {
    padding: 9rem 0;
  }
  .studio-grid {
    grid-template-columns: repeat(12, 1fr);
  }
  .studio-info {
    grid-column: span 5;
  }
  .studio-timeline {
    grid-column: span 7;
  }
}
/* WISHLIST SECTION */
.wishlist-section {
  position: relative;
  padding: clamp(6rem, 10vw, 12rem) 0;
  /* background: linear-gradient(135deg, #1B3A8C 0%, #0A1834 50%, #2A0E2E 100%); */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
}

.wishlist-glow {
  position: absolute;
  inset: 0;
  /* background: radial-gradient(ellipse 60% 70% at 50% 50%, rgba(255, 182, 39, 0.15) 0%, transparent 60%); */
  pointer-events: none;
}

.wishlist-container {
  position: relative;
  z-index: 10;
  max-width: clamp(700px, 47vw, 900px);
  margin: 0 auto;
  padding: 0 clamp(1rem, 2vw, 1.5rem);
  text-align: center;
}

.wishlist-launch-tag {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2.5rem;
}

.wishlist-title {
  font-size: clamp(3.5rem, 6.3vw, 12rem);
  line-height: 0.82;
  margin-bottom: clamp(1.5rem, 2vw, 2.5rem);
  color: #fff;
  text-transform: uppercase;
  text-shadow: 0 10px 40px rgba(0,0,0,0.8);
  letter-spacing: -0.02em;
}

.wishlist-desc {
  font-family: "Space Grotesk", sans-serif;
  font-size: clamp(1.1rem, 1.8vw, 1.4rem);
  line-height: 1.6;
  color: rgb(255, 245, 229);
  margin-bottom: 3.5rem;
  max-width: 950px;
  margin-left: auto;
  margin-right: auto;
}

.wishlist-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--coral);
  color: var(--midnight);
  padding: clamp(1rem, 1.3vw, 1.5rem) clamp(2rem, 2.5vw, 3rem);
  font-size: clamp(1rem, 1.3vw, 1.8rem);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  box-shadow: 12px 12px 0 var(--cream);
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.wishlist-btn:hover {
  transform: translate(-4px, -4px);
  box-shadow: 18px 18px 0 var(--cream);
}

.wishlist-btn-wrap {
  margin-bottom: clamp(3rem, 5vw, 6rem);
}

.wishlist-socials {
  margin-top: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.5rem;
  align-items: center;
}

.social-icon-link {
  display: block;
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.social-icon-link img {
  height: clamp(35px, 3.5vw, 50px);
  width: auto;
  /* opacity: 0.5; */
  transition: all 0.3s ease;
}

.social-icon-link:hover {
  transform: translateY(-5px);
}

.social-icon-link:hover img {
  opacity: 1;
}

@media (max-width: 768px) {
  .wishlist-section {
    padding: 6rem 0;
  }
  .wishlist-btn-wrap {
    margin-bottom: clamp(2rem, 4vw, 3rem);
  }
  .wishlist-btn {
    padding: 1.25rem 2rem;
    box-shadow: 8px 8px 0 var(--cream);
  }
}
</style>
