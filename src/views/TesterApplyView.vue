<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { testerService } from '@/services/testerService'

const email = ref('')
const name = ref('')
const platform = ref('')
const why = ref('')
const country = ref('')
const nda = ref(false)
// const newsletter = ref(true)

const submitted = ref(false)
const error = ref('')
const isSubmitting = ref(false)

onMounted(() => {
  document.title = 'Become a Tester — Hi Planet · Closed Beta'
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', 'Join the Hi Planet closed beta test program. Apply now to shape the game before launch.')
  }
})

onUnmounted(() => {
  document.title = 'HiPlanet | Save The Earth'
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', "A horde-roguelite game told in six comic-book chapters. Battle robot swarms, defeat elemental bosses, and stop the Cosmic Wormhole from stealing Earth's energies.")
  }
})

const handleSubmit = async () => {
  error.value = ''
  
  if (!email.value || !email.value.includes('@')) {
    error.value = 'Please enter a valid email address.'
    return
  }
  if (!name.value.trim()) {
    error.value = 'Please enter your name or handle.'
    return
  }
  if (!platform.value) {
    error.value = 'Please choose a platform.'
    return
  }
  if (!why.value.trim()) {
    error.value = 'Please tell us why you want to test.'
    return
  }
  if (!nda.value) {
    error.value = 'You must agree to keep gameplay confidential.'
    return
  }

  isSubmitting.value = true
  try {
    await testerService.submit({
      email: email.value,
      name: name.value,
      platform: platform.value,
      why: why.value,
      country: country.value || undefined,
      nda: nda.value
    })
    submitted.value = true
  } catch (err: any) {
    const msg = err.response?.data?.message
    if (msg === 'user has been registered') {
      error.value = 'This email is already registered. We will email you when your status changes.'
    } else {
      error.value = msg || 'Failed to submit application. Please try again.'
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="tester-apply-page grain">
    <div class="stars-overlay"></div>
    
    <div class="container">
      <!-- ===== FORM STATE ===== -->
      <div v-if="!submitted">
        <div class="form-header">
          <div class="pre-launch-tag">
            <span class="tag-line"></span>
            Pre-Launch · Closed Beta
            <span class="tag-line"></span>
          </div>
          <h1 class="main-title">
            BECOME A<br />
            <span class="accent-neon-blue">TESTER.</span>
          </h1>
          <p class="sub-title">
            Help shape Hi Planet before its launch on
            <span class="date-highlight">NOVEMBER 10, 2026.</span>
          </p>
        </div>

        <div v-if="error" class="error-banner">
          {{ error }}
        </div>

        <form @submit.prevent="handleSubmit" class="form-box">
          <!-- Email Input -->
          <div class="input-group">
            <label class="input-label" for="email">Email <span class="req">*</span></label>
            <input 
              v-model="email"
              class="input-field" 
              type="email" 
              id="email" 
              placeholder="your@email.com" 
              required 
            />
          </div>

          <!-- Name Input -->
          <div class="input-group">
            <label class="input-label" for="name">Name or Handle <span class="req">*</span></label>
            <input 
              v-model="name"
              class="input-field" 
              type="text" 
              id="name" 
              placeholder="What we'll call you in credits" 
              required 
            />
          </div>

          <!-- Platform Input -->
          <div class="input-group">
            <label class="input-label">Platform <span class="req">*</span></label>
            <div class="platform-group">
              <input 
                v-model="platform"
                class="platform-radio" 
                type="radio" 
                id="pw" 
                value="Windows" 
                required 
              />
              <label for="pw">WINDOWS</label>
              
              <input 
                v-model="platform"
                class="platform-radio" 
                type="radio" 
                id="pm" 
                value="macOS" 
              />
              <label for="pm">MACOS</label>
              
            </div>
          </div>

          <!-- Why Input -->
          <div class="input-group">
            <label class="input-label" for="why">Why do you want to test? <span class="req">*</span></label>
            <textarea 
              v-model="why"
              class="input-field" 
              id="why" 
              rows="3" 
              placeholder="Favorite roguelite, what games you play, why you'd make a great tester..."
              required
            ></textarea>
          </div>

          <!-- Country Input -->
          <div class="input-group">
            <label class="input-label" for="country">Country / Region <span class="text-[var(--cream)]/40 normal-case tracking-normal">(optional)</span></label>
            <input 
              v-model="country"
              class="input-field" 
              type="text" 
              id="country" 
              placeholder="e.g. South Korea, USA, France" 
            />
          </div>

          <!-- NDA Checkbox -->
          <label class="check-row">
            <input v-model="nda" type="checkbox" required />
            <div class="check-text">
              <span class="check-title accent-coral">I agree to keep gameplay confidential <span class="req">*</span></span>
              <span class="check-desc">No public videos, screenshots, or streams until the November 10, 2026 launch.</span>
            </div>
          </label>

          <!-- Newsletter Checkbox -->
          <!-- <label class="check-row">
            <input v-model="newsletter" type="checkbox" />
            <div class="check-text">
              <span class="check-title accent-amber">Send me Hi Planet updates</span>
              <span class="check-desc">Vol.2 comic, launch day, devlogs. ~1-2 emails/month. Unsubscribe anytime.</span>
            </div>
          </label> -->

          <!-- Submit Button -->
          <button type="submit" class="btn-submit" :disabled="isSubmitting">
            {{ isSubmitting ? '▶ Submitting...' : '▶ Submit Application' }}
          </button>
          
          <p class="privacy-note">
            Your email stays private · Reviewed weekly
          </p>
        </form>
      </div>

      <!-- ===== SUCCESS STATE ===== -->
      <div v-else class="success-box animate-fade-in">
        <div class="success-icon">
          <svg class="mx-auto" width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 40L35 53L58 24" stroke="var(--neon-blue)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h1 class="success-title">
          APPLICATION<br />
          <span class="accent-coral">RECEIVED.</span>
        </h1>
        <p class="success-desc">
          Thanks for applying to the Hi Planet closed beta.
        </p>
        <p class="success-info">
          We review applications weekly. If you're approved, you'll get a download link
          by email within 7 days. Keep an eye on your inbox (and spam folder).
        </p>
        <RouterLink to="/become-a-tester" class="btn-back">
          ← BACK TO HI PLANET
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tester-apply-page {
  padding-top: clamp(80px, 8vw, 120px);
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
    radial-gradient(1.5px 1.5px at 91% 44%, rgba(255,255,255,0.8), transparent);
  pointer-events: none;
  z-index: 0;
  opacity: 0.4;
}

.container {
  max-width: 53rem;
  margin: 0 auto;
  padding: 0 1.5rem 5rem;
  position: relative;
  z-index: 5;
}

/* Header style */
.form-header {
  text-align: center;
  margin-bottom: 3rem;
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

.sub-title {
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  font-size: clamp(1.1rem, 1.8vw, 1.4rem);
  color: rgba(255, 245, 229, 0.85);
  line-height: 1.6;
}

.date-highlight {
  font-style: normal;
  font-family: 'Anton', sans-serif;
  color: var(--amber);
  letter-spacing: 0.05em;
}

/* Form inputs & box */
.form-box {
  background: rgba(10, 24, 52, 0.45);
  backdrop-filter: blur(12px);
  padding: clamp(1.5rem, 5vw, 3rem);
  border: 2px solid var(--cream);
  box-shadow: 10px 10px 0 var(--coral);
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-label {
  font-family: 'Space Mono', monospace;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--cream);
}

.req {
  color: var(--coral);
}

.input-field {
  background: rgba(255, 245, 229, 0.04);
  border: 2px solid rgba(255, 245, 229, 0.2);
  color: var(--cream);
  padding: 14px 16px;
  width: 100%;
  transition: all 0.2s ease;
  font-family: inherit;
  font-size: 0.9rem;
}

.input-field:focus {
  outline: none;
  border-color: var(--coral);
  background: rgba(255, 245, 229, 0.07);
}

.input-field::placeholder {
  color: rgba(255, 245, 229, 0.35);
}

textarea.input-field {
  resize: vertical;
}

/* Platform pills */
.platform-group {
  display: flex;
  gap: 0.5rem;
}

.platform-radio {
  display: none;
}

.platform-radio + label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border: 2px solid rgba(255, 245, 229, 0.25);
  background: rgba(255, 245, 229, 0.04);
  font-family: 'Anton', sans-serif;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  text-align: center;
  font-size: 0.85rem;
}

.platform-radio:checked + label {
  background: var(--coral);
  color: var(--midnight);
  border-color: var(--coral);
}

.platform-radio + label:hover {
  border-color: var(--coral);
}

/* Checkbox rows */
.check-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  padding: 14px;
  background: rgba(255, 245, 229, 0.03);
  border: 1px solid rgba(255, 245, 229, 0.12);
  transition: all 0.2s ease;
}

.check-row:hover {
  border-color: rgba(255, 245, 229, 0.3);
}

.check-row input[type="checkbox"] {
  width: 22px;
  height: 22px;
  accent-color: var(--coral);
  cursor: pointer;
  flex-shrink: 0;
  margin-top: 1px;
}

.check-text {
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  font-size: 0.85rem;
  line-height: 1.5;
}

.check-title {
  font-weight: 700;
  display: block;
  margin-bottom: 0.25rem;
}

.check-title.accent-coral {
  color: var(--coral);
}

.check-title.accent-amber {
  color: var(--amber);
}

.check-desc {
  font-size: 0.75rem;
  color: rgb(255, 245, 229);
  display: block;
}

/* Submit Button */
.btn-submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: var(--coral);
  color: var(--midnight);
  border: 3px solid var(--coral);
  box-shadow: 6px 6px 0 var(--cream);
  font-family: 'Anton', sans-serif;
  font-size: clamp(1rem, 2vw, 1.2rem);
  padding: 1.25rem 2rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  width: 100%;
}

.btn-submit:hover {
  transform: translate(-3px, -3px);
  box-shadow: 9px 9px 0 var(--cream);
}

.privacy-note {
  text-align: center;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: rgb(255, 245, 229);
}

/* Error message banner */
.error-banner {
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 2px solid var(--coral);
  background: rgba(255, 107, 53, 0.1);
  color: var(--cream);
  font-size: 0.85rem;
  text-align: center;
}

/* Success state styles */
.success-box {
  text-align: center;
  background: rgba(10, 24, 52, 0.45);
  backdrop-filter: blur(12px);
  padding: clamp(2rem, 6vw, 4rem);
  border: 2px solid var(--cream);
  box-shadow: 10px 10px 0 var(--coral);
}

.success-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  color: var(--neon-blue);
}

.success-title {
  font-family: 'Anton', sans-serif;
  font-size: clamp(3rem, 8vw, 6.2rem);
  line-height: 0.85;
  letter-spacing: 0.01em;
  margin-bottom: 2rem;
  color: #fff;
}

.success-title span {
  color: var(--neon-blue);
}

.success-desc {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  color: var(--cream);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.success-info {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(0.95rem, 1.5vw, 1.15rem);
  color: rgba(255, 245, 229, 0.8);
  line-height: 1.6;
  margin-bottom: 3.5rem;
  max-width: 38rem;
  margin-left: auto;
  margin-right: auto;
}

.btn-back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Anton', sans-serif;
  font-size: 1rem;
  padding: 0.85rem 2rem;
  border: 2px solid var(--cream);
  background: transparent;
  color: var(--cream);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-back:hover {
  background: var(--cream);
  color: var(--midnight);
}

/* Accent Colors */
.accent-coral { color: var(--coral); }
.accent-neon-blue { color: var(--neon-blue); }
.accent-cyan { color: var(--cyan); }
.accent-amber { color: var(--amber); }
</style>
