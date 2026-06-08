<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { devlogBlogService, getImageUrl, type DevlogBlog } from '@/services/devlogBlogService'

const route = useRoute()
const router = useRouter()

const post = ref<DevlogBlog | null>(null)
const isLoading = ref(true)

const fetchPost = async () => {
  isLoading.value = true
  const slug = route.params.slug as string
  try {
    const res = await devlogBlogService.getBySlug(slug)
    if (res.success && res.data) {
      post.value = res.data
    } else {
      router.push('/devlog')
    }
  } catch (err) {
    console.error('Failed to fetch devlog detail', err)
    router.push('/devlog')
  } finally {
    isLoading.value = false
  }
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const getCategoryColor = (categoryName?: string) => {
  if (!categoryName) return '#FF6B35'
  const colors: Record<string, string> = {
    'process': '#FF6B35',
    'build notes': '#FFB627',
    'roadmap': '#4A90E2',
    'lore drops': '#C8345A',
    'community': '#4ADE80',
    'studio': '#9B8FB8'
  }
  return colors[categoryName.toLowerCase()] || '#FF6B35'
}

onMounted(() => {
  window.scrollTo(0, 0)
  fetchPost()
})
</script>

<template>
  <div class="devlog-page">
    <section class="devlog-section">
      <div class="stars-bg"></div>

      <div class="detail-container">
        <!-- Return button -->
        <button class="return-btn" @click="router.back()">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2.5" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            class="arrow-icon"
          >
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Return
        </button>

        <!-- Loading State -->
        <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
          <div class="loader-spinner"></div>
          <span class="mt-4 text-gray-400 font-pixel text-xs">Transmitting Article Data...</span>
        </div>

        <!-- Detail Article Content -->
        <article v-else-if="post" class="article-detail">
          <div class="article-header">
            <div class="article-tags">
              <span class="cat-chip" :style="'--cat-color: ' + getCategoryColor(post.category?.name)">
                {{ post.category?.name || 'DEVLOG' }}
              </span>
            </div>
            
            <h1 class="detail-title">
              <span v-if="post.title.includes(':')">
                {{ post.title.split(':')[0] }}: <span :style="'color: ' + getCategoryColor(post.category?.name)">{{ post.title.split(':')[1] || '' }}</span>
              </span>
              <span v-else>
                {{ post.title }}
              </span>
            </h1>

            <p class="detail-meta">
              By <span class="author-name">{{ post.author }}</span>
            </p>
            <p class="detail-date">{{ formatDate(post.date_created || post.createdAt).toUpperCase() }}</p>
          </div>

          <!-- Main Article Image -->
          <div class="detail-image-container">
            <img :src="getImageUrl(post.image)" :alt="post.title" class="detail-image" />
            <!-- Watermark Overlay -->
            <div class="detail-watermark">
              <div class="watermark-inner">
                <div class="watermark-logo"></div>
                <span>ECOSOFT INTERACTIVE</span>
              </div>
            </div>
          </div>

          <!-- Article Body -->
          <div class="article-content prose prose-invert max-w-none" v-html="post.description">
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.devlog-page {
  --midnight: #0A1834;
  --deep-blue: #06122A;
  --cobalt: #1B3A8C;
  --royal: #2E5BCC;
  --earth: #4A90E2;
  --cyan: #22D3EE;
  --coral: #FF6B35;
  --amber: #FFB627;
  --cream: #FFF5E5;
  --magenta: #C8345A;
  --neon-blue: #27cbfc;
  --blue-glow: rgba(39, 203, 252, 0.4);

  color: var(--cream);
  min-height: 100vh;
  font-family: 'Manrope', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.devlog-section {
  position: relative;
  padding-top: clamp(75px, 6vw, 90px);
}

.stars-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image:
    radial-gradient(1.5px 1.5px at 12% 24%, rgba(255,255,255,0.9), transparent),
    radial-gradient(1px 1px at 58% 71%, rgba(255,255,255,0.6), transparent),
    radial-gradient(2px 2px at 82% 18%, rgba(255,255,255,0.85), transparent),
    radial-gradient(1px 1px at 38% 82%, rgba(255,255,255,0.55), transparent),
    radial-gradient(1.5px 1.5px at 91% 44%, rgba(255,255,255,0.8), transparent);
  pointer-events: none;
  opacity: 0.25;
}

.detail-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  z-index: 10;
  position: relative;
}

.return-btn {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  margin-bottom: 2.5rem;
  transition: opacity 0.2s ease;
  font-family: 'Space Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.return-btn:hover {
  opacity: 0.7;
}

.article-detail {
  max-width: 800px;
  margin: 0 auto;
}

.article-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.article-header .article-tags {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.cat-chip {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  padding: 4px 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-family: 'Anton', sans-serif;
  border: 1px solid var(--cat-color, var(--coral));
  color: var(--cat-color, var(--coral));
}

.detail-title {
  font-family: 'Anton', sans-serif;
  font-size: clamp(1.8rem, 3.5vw, 2.75rem);
  font-weight: 800;
  line-height: 1.25;
  color: #ffffff;
  margin: 0 0 1rem 0;
  letter-spacing: -0.02em;
}

.detail-meta {
  font-size: 0.95rem;
  color: rgba(255, 245, 229, 0.7);
  margin: 0 0 0.5rem 0;
  font-weight: 500;
}

.author-name {
  font-weight: 700;
  color: #ffffff;
}

.detail-date {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  color: rgba(255, 245, 229, 0.6);
  letter-spacing: 1.5px;
  margin: 0;
}

.detail-image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  margin-bottom: 3.5rem;
  border: 1px solid rgb(255, 245, 229);
}

.detail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Watermark Overlay */
.detail-watermark {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  pointer-events: none;
}

.watermark-inner {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: rgba(6, 10, 16, 0.7);
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  padding: 6px 14px;
  border-radius: 6px;
  color: #ffffff;
  font-family: 'Space Mono', monospace;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 2px;
}

.watermark-logo {
  width: 12px;
  height: 12px;
  background-color: var(--neon-blue);
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  box-shadow: 0 0 8px var(--neon-blue);
}

/* Article Body Text */
.article-content {
  line-height: 1.8;
  color: rgb(255, 245, 229);
  font-size: 1.1rem;
}

/* Rich text content styling matching EcoNews prose-invert styles */
.article-content :deep(h1) {
  font-family: 'Anton', sans-serif;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 800;
  line-height: 1.3;
  color: #ffffff;
  margin: 2rem 0 1rem 0;
  letter-spacing: -0.02em;
}

.article-content :deep(h2) {
  font-family: 'Anton', sans-serif;
  font-size: clamp(1.35rem, 2.5vw, 1.75rem);
  font-weight: 700;
  line-height: 1.35;
  color: #ffffff;
  margin: 1.75rem 0 0.75rem 0;
  letter-spacing: -0.01em;
}

.article-content :deep(h3) {
  font-weight: 700;
  font-size: clamp(1.15rem, 2vw, 1.4rem);
  line-height: 1.4;
  color: #ffffff;
  margin: 1.5rem 0 0.5rem 0;
}

.article-content :deep(p) {
  margin-bottom: 1.25rem;
  opacity: 0.9;
}

.article-content :deep(strong) {
  font-weight: 700;
  color: #ffffff;
}

.article-content :deep(em) {
  font-style: italic;
}

.article-content :deep(a) {
  color: var(--neon-blue);
  text-decoration: underline;
  transition: color 0.2s ease;
}

.article-content :deep(a:hover) {
  color: #fff;
}

.article-content :deep(ul) {
  list-style-type: disc;
  padding-left: 1.75rem;
  margin-bottom: 1.25rem;
}

.article-content :deep(ol) {
  list-style-type: decimal;
  padding-left: 1.75rem;
  margin-bottom: 1.25rem;
}

.article-content :deep(li) {
  margin-bottom: 0.4rem;
  opacity: 0.9;
}

.article-content :deep(blockquote) {
  border-left: 4px solid var(--neon-blue);
  padding-left: 1.25rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: rgba(255, 245, 229, 0.7);
}

.article-content :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 1.5rem 0;
  border: 1px solid rgb(255, 245, 229);
}

.article-content :deep(hr) {
  border: none;
  border-top: 1px solid rgba(255, 245, 229, 0.2);
  margin: 2rem 0;
}

.article-content :deep(code) {
  background-color: rgba(255, 255, 255, 0.08);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
  font-family: 'Space Mono', monospace;
  color: #ffffff;
}

.article-content :deep(pre) {
  background-color: rgba(255, 255, 255, 0.05);
  padding: 1rem 1.25rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5rem 0;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Spinner Loader */
.loader-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: var(--neon-blue);
  animation: spin 1s ease-in-out infinite;
  margin: 0 auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.py-20 {
  padding-top: 5rem;
  padding-bottom: 5rem;
}
.mt-4 {
  margin-top: 1rem;
}
.text-gray-400 {
  color: rgba(255, 245, 229, 0.6);
}
.text-xs {
  font-size: 0.75rem;
}
.font-pixel {
  font-family: 'Press Start 2P', system-ui;
}
</style>
