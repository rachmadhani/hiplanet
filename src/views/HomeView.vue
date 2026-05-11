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

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
})
</script>

<template>
  <div class="landing">
    <!-- HERO -->
    <section id="home" class="hero-wrap">
      <div class="hero-content">
        <div class="hero-eyebrow">A 2D MORPG — Now in Development</div>
        <h1 class="hero-title">
          Hi Planet:
          <span>Save the</span>
          <em>Earth!</em>
        </h1>
        <p class="hero-sub">
          A team of planetary heroes battles a cosmic threat. Explore vibrant worlds, forge alliances, and write your own chapter in the story that began in the comics.
        </p>
        <div class="hero-btns">
          <a href="#games" class="btn btn-primary">▶ Explore the Game</a>
          <a href="#universe" class="btn btn-outline">📖 Read the Comic</a>
        </div>
        <div class="hero-stats">
          <div>
            <div class="hero-stat-num">2D</div>
            <div class="hero-stat-label">MORPG</div>
          </div>
          <div>
            <div class="hero-stat-num">∞</div>
            <div class="hero-stat-label">Characters</div>
          </div>
          <div>
            <div class="hero-stat-num">2025</div>
            <div class="hero-stat-label">Beta Target</div>
          </div>
        </div>
      </div>
      <div class="hero-planet"></div>
    </section>

    <!-- SOCIAL BAR -->
    <div class="social-bar">
      <span class="social-bar-label">Follow the Journey:</span>
      <a href="#" class="social-pill pill-yt">▶ YouTube — Dev Diaries</a>
      <a href="#" class="social-pill pill-tt">♪ TikTok — @EcosoftGame</a>
      <a href="#" class="social-pill pill-dc">⬡ Discord — Join the Crew</a>
      <a href="#" class="social-pill pill-ig">◈ Instagram — @EcosoftGame</a>
    </div>

    <div class="section-divider"></div>

    <!-- UNIVERSE -->
    <section id="universe" class="section-wrap fade-up">
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
    </section>

    <div class="section-divider"></div>

    <!-- GAMES -->
    <section id="games" class="section-wrap fade-up">
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
    </section>

    <div class="section-divider"></div>

    <!-- COMMUNITY -->
    <section id="community" class="section-wrap fade-up">
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
    </section>

    <div class="section-divider"></div>

    <!-- DEVLOG -->
    <section id="devlog" class="section-wrap fade-up">
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

      <!-- NEWSLETTER -->
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
    </section>
  </div>
</template>

<style scoped>
.landing { padding-top: 64px; }
section { position: relative; z-index: 1; min-height: 100vh; padding: 80px 2rem; max-width: 1200px; margin: 0 auto; }

/* HERO */
.hero-wrap { display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-top: 80px;
  max-width: 100%;
  padding-left: 0;
  padding-right: 0; }
.hero-content { position: relative; z-index: 2; max-width: 680px; padding: 0 2rem; }
.hero-eyebrow { font-family: 'Space Mono', monospace; font-size: 0.72rem; letter-spacing: 4px; text-transform: uppercase; color: var(--green); margin-bottom: 1.2rem; display: flex; align-items: center; gap: 10px; }
.hero-eyebrow::before { content: ''; display: inline-block; width: 32px; height: 1px; background: var(--green); }
.hero-title { font-family: 'Bangers', cursive; font-size: clamp(3.5rem, 8vw, 6rem); line-height: 0.95; letter-spacing: 3px; color: #fff; margin-bottom: 1.5rem; }
.hero-title span { color: var(--green); display: block; }
.hero-title em { font-style: normal; color: var(--yellow); }
.hero-sub { font-size: 1.1rem; color: var(--muted); line-height: 1.7; margin-bottom: 2.5rem; }
.hero-btns { display: flex; gap: 1rem; }
.btn { display: inline-flex; align-items: center; gap: 8px; padding: 0.85rem 2rem; border-radius: 8px; font-family: 'Space Mono', monospace; font-size: 0.8rem; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; text-decoration: none; cursor: pointer; transition: all 0.2s; border: 2px solid transparent; }
.btn-primary { background: var(--green); color: var(--bg); }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 20px var(--primary-glow); }
.btn-outline { background: transparent; color: var(--blue); border-color: var(--blue); }
.btn-outline:hover { background: rgba(0,200,255,0.1); transform: translateY(-2px); }
.hero-stats { display: flex; gap: 2.5rem; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--border); }
.hero-stat-num { font-family: 'Bangers', cursive; font-size: 2rem; color: var(--green); }
.hero-stat-label { font-size: 0.72rem; font-family: 'Space Mono', monospace; color: var(--muted); }
.hero-planet { position: absolute; right: -80px; top: 50%; transform: translateY(-50%); width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #1a4a2e, #0a2018, #000); border: 2px solid rgba(15,255,108,0.3); box-shadow: 0 0 80px rgba(15,255,108,0.15); animation: float 8s ease-in-out infinite; }
@keyframes float { 0%,100% { transform: translateY(-50%) translateX(0); } 50% { transform: translateY(-52%) translateX(-10px); } }

/* SOCIAL BAR */
.social-bar { background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 1rem 2rem; display: flex; align-items: center; gap: 2rem; overflow-x: auto; }
.social-bar-label { font-family: 'Space Mono', monospace; font-size: 0.65rem; color: var(--muted); text-transform: uppercase; white-space: nowrap; }
.social-pill { display: flex; align-items: center; gap: 8px; padding: 0.5rem 1.2rem; border-radius: 100px; border: 1px solid; text-decoration: none; font-family: 'Space Mono', monospace; font-size: 0.72rem; font-weight: 700; white-space: nowrap; transition: all 0.2s; }
.pill-yt { color: #FF0000; border-color: rgba(255,0,0,0.4); }
.pill-tt { color: #fff; border-color: rgba(255,255,255,0.3); }
.pill-dc { color: #5865F2; border-color: rgba(88,101,242,0.4); }
.pill-ig { color: #E1306C; border-color: rgba(225,48,108,0.4); }

.section-divider { width: 100%; height: 1px; background: linear-gradient(90deg, var(--green), transparent); opacity: 0.3; }

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
</style>
