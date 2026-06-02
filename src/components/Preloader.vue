<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  duration: {
    type: Number,
    default: 1800 // default preloading duration in ms
  }
})

const emit = defineEmits(['loaded'])

const progress = ref(0)
const activeLogIndex = ref(0)

const logs = [
  'INITIALIZING SYSTEM CORES...',
  'CONNECTING ECOPOLIS ATLAS...',
  'ATTUNING SOLAR ENERGY CORE...',
  'LOADING HARMONIC CONSTANTS...',
  'ESTABLISHING SATELLIZEN LINK...',
  'PREVENTING COSMIC RIFT...',
  'SYSTEM SECURED. READY.'
]

let progressInterval: number | null = null
let logInterval: number | null = null

onMounted(() => {
  const steps = 100
  const stepTime = props.duration / steps
  
  progressInterval = window.setInterval(() => {
    if (progress.value < 100) {
      progress.value += 1
    } else {
      if (progressInterval) clearInterval(progressInterval)
      setTimeout(() => {
        emit('loaded')
      }, 200) // slight delay at 100% for visual satisfaction
    }
  }, stepTime)

  // Cycle logs slightly faster than the total duration
  const logCycleTime = props.duration / (logs.length - 1)
  logInterval = window.setInterval(() => {
    if (activeLogIndex.value < logs.length - 1) {
      activeLogIndex.value += 1
    } else {
      if (logInterval) clearInterval(logInterval)
    }
  }, logCycleTime)
})

onUnmounted(() => {
  if (progressInterval) clearInterval(progressInterval)
  if (logInterval) clearInterval(logInterval)
})
</script>

<template>
  <div class="preloader-overlay">
    <!-- Starfield overlay -->
    <div class="loader-stars"></div>
    <div class="loader-glow-orb"></div>

    <div class="loader-content">
      <!-- Animated Pulsing Logo -->
      <div class="logo-container">
        <img src="/logo/ecosoft_logo_mobile.png" alt="ECOSOFT" class="loader-logo" />
        <div class="logo-pulse-ring"></div>
      </div>

      <!-- Brand name -->
      <div class="brand-title font-display">ECOSOFT INTERACTIVE</div>

      <!-- Progress Section -->
      <div class="progress-box">
        <!-- Progress bar container -->
        <div class="progress-bar-container">
          <div class="progress-bar-fill" :style="{ width: `${progress}%` }"></div>
        </div>
        
        <!-- Status numbers and logs -->
        <div class="status-row">
          <div class="status-log font-pixel">{{ logs[activeLogIndex] }}</div>
          <div class="status-percent font-pixel">{{ progress }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.preloader-overlay {
  position: fixed;
  inset: 0;
  background-color: #060a10;
  z-index: 999999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Background Cosmic particles */
.loader-stars {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    radial-gradient(1px 1px at 12% 24%, rgba(255, 255, 255, 0.9), transparent),
    radial-gradient(1px 1px at 58% 71%, rgba(255, 255, 255, 0.6), transparent),
    radial-gradient(2px 2px at 82% 18%, rgba(0, 200, 255, 0.7), transparent),
    radial-gradient(1.5px 1.5px at 38% 82%, rgba(255, 255, 255, 0.8), transparent),
    radial-gradient(1px 1px at 91% 44%, rgba(0, 200, 255, 0.5), transparent),
    radial-gradient(2px 2px at 28% 58%, rgba(255, 107, 53, 0.6), transparent);
  animation: backgroundMove 40s linear infinite;
  opacity: 0.6;
}

@keyframes backgroundMove {
  from { transform: translateY(0); }
  to { transform: translateY(-100px); }
}

.loader-glow-orb {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(0, 102, 243, 0.15) 0%, transparent 70%);
  filter: blur(40px);
  pointer-events: none;
}

/* Loader Content Container */
.loader-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 420px;
  padding: 2rem;
  z-index: 10;
}

/* Logo and Pulsing Ring */
.logo-container {
  position: relative;
  width: 90px;
  height: 90px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 5;
  filter: drop-shadow(0 0 10px rgba(0, 102, 243, 0.8));
  animation: logoPulse 2s infinite ease-in-out;
}

@keyframes logoPulse {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(0, 102, 243, 0.8)); }
  50% { transform: scale(1.06); filter: drop-shadow(0 0 20px rgba(0, 102, 243, 0.95)) drop-shadow(0 0 30px rgba(0, 200, 255, 0.4)); }
}

.logo-pulse-ring {
  position: absolute;
  inset: -10px;
  border: 1px solid rgba(0, 102, 243, 0.2);
  border-radius: 50%;
  animation: ringExpand 2s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
  z-index: 1;
}

@keyframes ringExpand {
  0% { transform: scale(0.6); opacity: 0; }
  50% { opacity: 0.8; }
  100% { transform: scale(1.3); opacity: 0; border-color: rgba(0, 200, 255, 0); }
}

/* Brand styling */
.brand-title {
  font-family: 'Anton', sans-serif;
  font-size: 1.25rem;
  letter-spacing: 0.2em;
  color: #ffffff;
  margin-bottom: 3rem;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
  animation: trackingIn 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
}

@keyframes trackingIn {
  from { letter-spacing: -0.2em; opacity: 0; }
  to { letter-spacing: 0.2em; opacity: 1; }
}

/* Fonts */
.font-display {
  font-family: 'Anton', sans-serif;
}

.font-pixel {
  font-family: 'Press Start 2P', monospace, system-ui;
}

/* Progress Box styling */
.progress-box {
  width: 100%;
}

.progress-bar-container {
  width: 100%;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 0.75rem;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.5);
  position: relative;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--neon-blue), var(--blue));
  box-shadow: 0 0 8px var(--blue-glow), 0 0 15px rgba(0, 200, 255, 0.8);
  border-radius: 2px;
  transition: width 0.1s ease-out;
}

.status-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.status-log {
  font-size: 8px;
  letter-spacing: 0.05em;
  color: var(--muted);
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.status-percent {
  font-size: 8px;
  color: var(--blue);
  letter-spacing: 0.05em;
  flex-shrink: 0;
  text-shadow: 0 0 4px var(--blue-glow);
}
</style>
