<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const emailTemplate = `To: hello@ecosoftgame.com
Subject: Hi Planet Closed Beta Application

Hi Sean,

I'd like to apply for Hi Planet's closed beta.

Name (for credits): 
Platform: [Windows / macOS / Both]
Country: 
Why I want to test: 

I agree to keep gameplay confidential until the November 10, 2026 launch.

Thanks!`

onMounted(() => {
  document.title = 'Become a Tester — Hi Planet · Closed Beta'
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', 'Help shape Hi Planet before its November 10, 2026 launch. Apply for closed beta access — limited slots, NDA required.')
  }

  // Handle scroll fade-up animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
})

onUnmounted(() => {
  // Restore defaults
  document.title = 'HiPlanet | Save The Earth'
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', "A horde-roguelite game told in six comic-book chapters. Battle robot swarms, defeat elemental bosses, and stop the Cosmic Wormhole from stealing Earth's energies.")
  }
})
</script>

<template>
  <div class="tester-page">

    <!-- ============ 1. HERO ============ -->
    <section class="hero-section">
      <div class="stars-overlay"></div>
      <div class="hero-inner">


        <!-- Tag -->
        <div class="reveal d-2 pre-launch-tag">
          <span class="tag-line"></span>
          Pre-Launch · Closed Beta
          <span class="tag-line"></span>
        </div>

        <!-- Headline -->
        <h1 class="reveal d-2 main-title">
          BECOME A <span class="accent-neon-blue">TESTER.</span>
        </h1>

        <p class="reveal d-3 italic-desc">
          Help shape Hi Planet before its launch on<br />
          <span class="date-highlight">NOVEMBER 10, 2026.</span>
        </p>

        <RouterLink to="/become-a-tester/apply" class="reveal d-4 btn-coral">
          ↓ Request Access
        </RouterLink>
      </div>
    </section>

    <!-- ============ 2. WHY TEST + REQUIREMENTS ============ -->
    <section class="info-section fade-up">
      <div class="stars-overlay opacity-25"></div>
      <div class="container">
        <div class="grid-two-cols">
          <!-- WHY TEST -->
          <div>
            <div class="section-line accent-neon-blue">What you get</div>
            <h2 class="section-title">
              FOUR REASONS<br />
              <span class="accent-neon-blue">TO TEST.</span>
            </h2>
            <ul class="reasons-list">
              <li class="reason-item">
                <span class="reason-num">01</span>
                <div>
                  <div class="reason-title">EARLY ACCESS</div>
                  <p class="reason-desc">Play Hi Planet before anyone else. Multiple build updates over months.</p>
                </div>
              </li>
              <li class="reason-item">
                <span class="reason-num">02</span>
                <div>
                  <div class="reason-title">SHAPE THE GAME</div>
                  <p class="reason-desc">Direct line to the developer. Your feedback drives real changes.</p>
                </div>
              </li>
              <li class="reason-item">
                <span class="reason-num">03</span>
                <div>
                  <div class="reason-title">CREDITS IN-GAME</div>
                  <p class="reason-desc">Your name (or handle) listed in the closed beta tester credits.</p>
                </div>
              </li>
              <li class="reason-item">
                <span class="reason-num">04</span>
                <div>
                  <div class="reason-title">FREE STEAM KEY</div>
                  <p class="reason-desc">Active testers get a free copy at launch — yours to keep.</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- REQUIREMENTS -->
          <div>
            <div class="section-line accent-cyan">What we need</div>
            <h2 class="section-title">
              BEFORE<br />
              <span class="accent-cyan">YOU APPLY.</span>
            </h2>
            <ul class="reqs-list">
              <li class="req-item">
                <span class="check-box">[ ✓ ]</span>
                <div>
                  <div class="req-name">Windows 10+ or macOS 12+</div>
                  <p class="req-desc">4 GB RAM minimum, 2 GB free disk space</p>
                </div>
              </li>
              <li class="req-item">
                <span class="check-box">[ ✓ ]</span>
                <div>
                  <div class="req-name">2-4 hours per build</div>
                  <p class="req-desc">Time to play through new content and report back</p>
                </div>
              </li>
              <li class="req-item">
                <span class="check-box">[ ✓ ]</span>
                <div>
                  <div class="req-name">NDA respect</div>
                  <p class="req-desc">No public gameplay videos, screenshots, or streams until launch</p>
                </div>
              </li>
              <li class="req-item">
                <span class="check-box">[ ✓ ]</span>
                <div>
                  <div class="req-name">Honest feedback</div>
                  <p class="req-desc">Brief bug report or feedback form after each build</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 3. APPLY VIA EMAIL ============ -->
    <section id="apply" class="apply-section fade-up">
      <div class="stars-overlay opacity-30"></div>
      <div class="narrow-container">
        <div class="apply-header">
         <div class="reveal d-2  apply-tag">
                <span class="apply-tag-line"></span>
                APPLY BY EMAIL
                <span class="apply-tag-line"></span>
          </div>
          <h2 class="apply-title">
            ONE EMAIL.<br />
            <span class="accent-neon-blue">THAT'S IT.</span>
          </h2>
          <p class="apply-desc">
            Click the button below. We'll review your application and reply within 7 days.
          </p>
        </div>

        <!-- HOW IT WORKS — 3 steps -->
        <div class="steps-grid">
          <div class="step-card">
            <div class="step-num">01</div>
            <div class="step-text">Click<br />Apply</div>
          </div>
          <div class="step-card">
            <div class="step-num amber">02</div>
            <div class="step-text">Fill in<br />the blanks</div>
          </div>
          <div class="step-card">
            <div class="step-num cyan">03</div>
            <div class="step-text">Reply<br />within 7 days</div>
          </div>
        </div>

        <!-- THE BIG MAILTO BUTTON -->
        <div class="email-box">
          <div class="send-label">// Send to</div>
          <div class="email-addr">hello@ecosoftgame.com</div>

          <a href="mailto:hello@ecosoftgame.com?subject=Hi%20Planet%20Closed%20Beta%20Application&body=Hi%20Sean%2C%0A%0AI%27d%20like%20to%20apply%20for%20Hi%20Planet%27s%20closed%20beta.%0A%0AName%20%28for%20credits%29%3A%20%0APlatform%3A%20%5BWindows%20%2F%20macOS%20%2F%20Both%5D%0ACountry%3A%20%0AWhy%20I%20want%20to%20test%3A%20%0A%0AI%20agree%20to%20keep%20gameplay%20confidential%20until%20the%20November%2010%2C%202026%20launch.%0A%0AThanks%21"
             class="btn-submit">
            ✉ Apply via Email
          </a>

          <p class="email-instruction">
            Your email client will open with everything pre-filled.<br />
            Just add your name and platform, then hit send.
          </p>

          <!-- Preview of the prefilled message -->
          <details class="email-details">
            <summary class="details-summary">
              ↓ Preview the email template
            </summary>
            <div class="email-preview-block">{{ emailTemplate }}</div>
          </details>

          <!-- Fallback for no email client -->
          <div class="email-fallback">
            No email client?<br />
            Copy <span>hello@ecosoftgame.com</span> and send from anywhere.
          </div>
        </div>

        <!-- Trust signals -->
        <div class="stats-row">
          <div>
            <div class="stat-val">~200</div>
            <div class="stat-lbl">Beta slots</div>
          </div>
          <div>
            <div class="stat-val amber">~7d</div>
            <div class="stat-lbl">Review time</div>
          </div>
          <div>
            <div class="stat-val cyan">FREE</div>
            <div class="stat-lbl">No payment</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 4. FAQ ============ -->
    <section class="faq-section fade-up">
      <div class="stars-overlay opacity-20"></div>
      <div class="narrow-container">
        <div class="faq-header">
          <div class="section-line accent-cyan justify-center">Common Questions</div>
          <h2 class="section-title">
            ANY<br />
            <span class="accent-neon-blue">QUESTIONS?</span>
          </h2>
        </div>

        <div class="faq-list">
          <details class="faq-item">
            <summary class="faq-question">
              When will I get the build?
              <span class="faq-toggle-icon">+</span>
            </summary>
            <p class="faq-answer">
              If approved, you'll receive a welcome email with the download link within 7 days of applying.
              New builds drop every 2-3 weeks. You'll be notified by email each time.
            </p>
          </details>

          <details class="faq-item">
            <summary class="faq-question">
              Can I share gameplay videos?
              <span class="faq-toggle-icon">+</span>
            </summary>
            <p class="faq-answer">
              Not until the November 10, 2026 launch. Closed beta is under NDA — please don't publish gameplay
              videos, screenshots, or streams. You're welcome to mention you're playtesting it privately, though.
            </p>
          </details>

          <details class="faq-item">
            <summary class="faq-question">
              Will my email be shared?
              <span class="faq-toggle-icon">+</span>
            </summary>
            <p class="faq-answer">
              Never. Your email is used only for build delivery and Hi Planet updates if you opt in.
              We don't share, sell, or trade your data.
            </p>
          </details>

          <details class="faq-item">
            <summary class="faq-question">
              Can I leave the program?
              <span class="faq-toggle-icon">+</span>
            </summary>
            <p class="faq-answer">
              Anytime. Just reply to any beta email and let us know. The NDA expires on the November 10 launch
              regardless of whether you're still active.
            </p>
          </details>

          <details class="faq-item">
            <summary class="faq-question">
              What if I don't get accepted?
              <span class="faq-toggle-icon">+</span>
            </summary>
            <p class="faq-answer">
              We have ~200 slots. If you don't make this round, you can opt to stay on the newsletter and we'll
              invite you to future test waves or send you Vol.2 comic news. No hard feelings.
            </p>
          </details>
        </div>

        <p class="faq-footer">
          Other questions? Email
          <a href="mailto:hello@ecosoftgame.com">hello@ecosoftgame.com</a>
        </p>
      </div>
    </section>

  </div>
</template>

<style scoped>
.tester-page {
  padding-top: calc(clamp(60px, 5vw, 80px) + 32px); /* nav height + ticker height */
  /* background: var(--midnight); */
  color: var(--cream);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

/* ============ Film Grain & Stars Background ============ */
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

.stars-overlay {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(1.5px 1.5px at 12% 24%, rgba(255,255,255,0.9), transparent),
    radial-gradient(1px 1px at 58% 71%, rgba(255,255,255,0.6), transparent),
    radial-gradient(2px 2px at 82% 18%, rgba(255,255,255,0.85), transparent),
    radial-gradient(1px 1px at 38% 82%, rgba(255,255,255,0.55), transparent),
    radial-gradient(1.5px 1.5px at 91% 44%, rgba(255,255,255,0.8), transparent),
    radial-gradient(1px 1px at 28% 58%, rgba(255,255,255,0.5), transparent);
  pointer-events: none;
  z-index: 0;
}

/* ============ 1. HERO ============ */
.hero-section {
  position: relative;
  /* background:
    radial-gradient(ellipse 50% 60% at 50% 50%, rgba(255,107,53,0.3) 0%, transparent 60%),
    radial-gradient(ellipse 60% 70% at 20% 30%, rgba(74,144,226,0.18) 0%, transparent 60%),
    radial-gradient(ellipse 60% 70% at 80% 70%, rgba(255,182,39,0.12) 0%, transparent 60%),
    linear-gradient(180deg, #0A1834 0%, #060D24 100%); */
  padding: clamp(3rem, 6vw, 6rem) 1.5rem clamp(4rem, 8vw, 8rem);
  text-align: center;
  overflow: hidden;
  z-index: 2;
}

.hero-inner {
  position: relative;
  z-index: 5;
  max-width: 60rem;
  margin: 0 auto;
}

.pre-launch-tag {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  color: var(--blue);
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.tag-line {
  width: 2rem;
  height: 1px;
  background: var(--blue);
}

.main-title {
font-size: clamp(3.5rem, 13vw, 12rem);
  line-height: 0.85;
  color: #fff;
  text-align: center;
  text-shadow: 0 6px 30px rgba(0,0,0,0.7);
  font-family: 'Anton', sans-serif;
  margin-bottom: 1.5rem;
  letter-spacing: 0.02em;
}

.italic-desc {
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  color: rgb(255, 245, 229);
  line-height: 1.6;
  margin-bottom: 3rem;
  max-width: 40rem;
  margin-left: auto;
  margin-right: auto;
}

.date-highlight {
  font-style: normal;
  font-family: 'Anton', sans-serif;
  color: var(--amber);
  letter-spacing: 0.05em;
}

.btn-coral {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--coral);
  color: var(--midnight);
  border: 3px solid var(--coral);
  box-shadow: 5px 5px 0 var(--cream);
  font-family: 'Anton', sans-serif;
  font-size: clamp(0.95rem, 1.5vw, 1.2rem);
  padding: 1rem 2rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-coral:hover {
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0 var(--cream);
}

/* ============ Reveal Animations ============ */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.reveal {
  animation: fadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  opacity: 0;
}

.d-1 { animation-delay: 0.1s; }
.d-2 { animation-delay: 0.25s; }
.d-3 { animation-delay: 0.4s; }
.d-4 { animation-delay: 0.55s; }

/* ============ 2. INFO SECTION ============ */
.info-section {
  position: relative;
  padding: clamp(3.5rem, 7vw, 6rem) 1.5rem;
  z-index: 2;
}

.container {
  max-width: 91rem;
  margin: 0 auto;
  position: relative;
  z-index: 5;
}

.grid-two-cols {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .grid-two-cols {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
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
    
  font-family: 'Anton', sans-serif;
  font-size: clamp(3.5rem, 13vw, 12rem);
  line-height: 0.82;
  margin-bottom: 2rem;
  color: #fff;
  text-transform: uppercase;
  text-shadow: 0 10px 40px rgba(0,0,0,0.8);
  letter-spacing: -0.02em;
}

.reasons-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.reason-item {
  display: flex;
  gap: 1.25rem;
}

.reason-num {
  font-family: 'Anton', sans-serif;
  font-size: 2rem;
  color: var(--neon-blue);
  width: 2rem;
  flex-shrink: 0;
  line-height: 1;
}

.reason-title {
  font-family: 'Anton', sans-serif;
  font-size: 1.4rem;
  letter-spacing: 0.03em;
  margin-bottom: 0.4rem;
}

.reason-desc {
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  font-size: 0.9rem;
  line-height: 1.6;
}

.reqs-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.req-item {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid rgb(255, 255, 255);
}

.req-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.check-box {
  font-family: 'Press Start 2P', system-ui;
  font-size: 12px;
  color: var(--cyan);
  margin-top: 0.25rem;
  flex-shrink: 0;
  letter-spacing: 0;
}

.req-name {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
}

.req-desc {
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* ============ 3. APPLY SECTION ============ */
.apply-section {
  position: relative;
  /* background:
    radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,107,53,0.12) 0%, transparent 60%),
    linear-gradient(180deg, #060D24 0%, #0A1834 50%, #0F1F44 100%); */
  padding: clamp(4rem, 8vw, 7rem) 1.5rem;
  z-index: 2;
}

.narrow-container {
  max-width: 59rem;
  margin: 0 auto;
  position: relative;
  z-index: 5;
}

.apply-header {
  text-align: center;
  margin-bottom: 3rem;
}

.apply-tag {
  font-family: 'Space Mono', monospace;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  color: var(--blue);
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.apply-tag-line {
  width: 2rem;
  height: 1px;
  background: var(--blue);
}

.apply-title {
  font-family: 'Anton', sans-serif;
  font-size: clamp(3.5rem, 13vw, 12rem);
  line-height: 0.85;
  color: #fff;
  text-align: center;
  text-shadow: 0 6px 30px rgba(0,0,0,0.7);
  margin-bottom: 1.25rem;
}

.apply-desc {
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  font-size: 1.6rem;
  color: rgb(255, 245, 229);
  line-height: 1.6;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 3rem;
}

.step-card {
  text-align: center;
}

.step-num {
  font-family: 'Anton', sans-serif;
  font-size: 4.2rem;
  color: var(--coral);
  margin-bottom: 0.5rem;
  line-height: 1;
}

.step-num.amber {
  color: var(--amber);
}

.step-num.cyan {
  color: var(--cyan);
}

.step-text {
  font-family: 'Manrope', sans-serif;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgb(255, 245, 229);
  font-weight: 700;
  line-height: 1.4;
}

.email-box {
  background: rgba(10, 24, 52, 0.45);
  backdrop-filter: blur(12px);
  padding: clamp(1.75rem, 5vw, 3rem);
  border: 2px solid var(--cream);
  text-align: center;
  box-shadow: 10px 10px 0 var(--coral);
  margin-bottom: 3.5rem;
}

.send-label {
  font-family: 'Press Start 2P', system-ui;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  /* color: rgba(255, 245, 229, 0.45); */
  margin-bottom: 0.5rem;
}

.email-addr {
  font-family: 'Anton', sans-serif;
  font-size: clamp(1.2rem, 3.5vw, 1.6rem);
  letter-spacing: 0.05em;
  margin-bottom: 2rem;
  color: var(--amber);
}

.btn-submit {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: var(--coral);
  color: var(--midnight);
  border: 3px solid var(--coral);
  box-shadow: 6px 6px 0 var(--cream);
  font-family: 'Anton', sans-serif;
  font-size: clamp(1rem, 2vw, 1.25rem);
  padding: 1.25rem 2.25rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-submit:hover {
  transform: translate(-3px, -3px);
  box-shadow: 9px 9px 0 var(--cream);
}

.email-instruction {
  margin-top: 1.75rem;
  font-size: 0.88rem;
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  line-height: 1.6;
}

.email-details {
  margin-top: 2rem;
  text-align: left;
}

.details-summary {
  cursor: pointer;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  /* color: rgba(255, 245, 229, 0.45); */
  font-weight: 700;
  transition: color 0.2s;
  display: inline-block;
  outline: none;
}

.details-summary:hover {
  color: var(--coral);
}

.email-preview-block {
  margin-top: 1rem;
  padding: 1.25rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgb(255, 245, 229);
  font-family: monospace;
  font-size: 0.72rem;
  color: rgba(255, 245, 229, 0.75);
  line-height: 1.6;
  white-space: pre-wrap;
}

.email-fallback {
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  margin-top: 1.75rem;
  padding-top: 1.75rem;
  border-top: 1px solid rgb(255, 245, 229);
  font-size: 0.72rem;
  color: rgb(255, 245, 229);
  line-height: 1.6;
}

.email-fallback span {
  color: var(--coral);
  font-family: monospace;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  text-align: center;
}

.stat-val {
  font-family: 'Anton', sans-serif;
  font-size: 4.2rem;
  color: var(--coral);
  margin-bottom: 0.25rem;
  line-height: 1;
}

.stat-val.amber {
  color: var(--amber);
}

.stat-val.cyan {
  color: var(--cyan);
}

.stat-lbl {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: rgb(255, 245, 229);
  font-weight: 700;
  line-height: 1.3;
}

/* ============ 4. FAQ SECTION ============ */
.faq-section {
  position: relative;
  /* background: var(--midnight); */
  padding: clamp(3.5rem, 7vw, 6rem) 1.5rem clamp(5rem, 8vw, 8rem);
  z-index: 2;
}

.faq-header {
  text-align: center;
  margin-bottom: 3rem;
}

.faq-header .section-line {
  justify-content: center;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.faq-item {
  border: 1px solid rgb(255, 245, 229);
  padding: 1.25rem;
  background: rgba(255, 245, 229, 0.02);
  transition: border-color 0.2s, background-color 0.2s;
}

.faq-item:hover {
  border-color: rgb(255, 107, 53);
  background: rgba(255, 245, 229, 0.04);
}

.faq-question {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Anton', sans-serif;
  font-size: 1.3rem;
  letter-spacing: 0.06em;
  list-style: none;
}

.faq-question::-webkit-details-marker {
  display: none;
}

.faq-toggle-icon {
  color: var(--coral);
  font-size: 1.25rem;
  font-family: 'Manrope', sans-serif;
  transition: transform 0.2s ease;
  line-height: 1;
}

.faq-item[open] .faq-toggle-icon {
  transform: rotate(45deg);
}

.faq-answer {
  font-size: 0.9rem;
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  color: rgb(255, 245, 229);
  line-height: 1.6;
  margin-top: 0.75rem;
}

.faq-footer {
  margin-top: 3.5rem;
  text-align: center;
  font-size: 0.9rem;
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  color: rgb(255, 245, 229);
}

.faq-footer a {
  color: var(--coral);
  text-decoration: underline;
  margin-left: 0.25rem;
  transition: color 0.2s;
}

.faq-footer a:hover {
  color: var(--amber);
}

/* ============ Accent Colors ============ */
.accent-coral { color: var(--coral); }
.accent-neon-blue { color: var(--neon-blue); }
.accent-cyan { color: var(--cyan); }
.accent-amber { color: var(--amber); }

/* Global variables and fonts are inherited from style.css */
</style>
