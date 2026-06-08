<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { devlogBlogService, getImageUrl, type DevlogBlog } from '@/services/devlogBlogService'
import { devlogCategoryService, type DevlogCategory } from '@/services/devlogCategoryService'

const posts = ref<DevlogBlog[]>([])
const categories = ref<DevlogCategory[]>([])
const isLoading = ref(true)

const currentPage = ref(1)
const totalPages = ref(1)
const totalItems = ref(0)
const limit = ref(9)

// Selected category ID (null/undefined for All)
const selectedCategoryName = ref('All')

const selectedCategoryId = computed(() => {
  if (selectedCategoryName.value === 'All') return undefined
  const cat = categories.value.find(c => c.name === selectedCategoryName.value)
  return cat ? cat.id : undefined
})

const fetchCategories = async () => {
  try {
    const res = await devlogCategoryService.getAll()
    if (res.success) {
      categories.value = res.data
    }
  } catch (err) {
    console.error('Failed to load categories', err)
  }
}

const fetchPosts = async () => {
  isLoading.value = true
  try {
    const res = await devlogBlogService.getAll({
      page: currentPage.value,
      limit: limit.value,
      category_id: selectedCategoryId.value,
      sortBy: 'date_created',
      sortOrder: 'desc'
    })
    
    if (res.success && res.data) {
      posts.value = res.data
      if (res.pagination) {
        totalPages.value = res.pagination.totalPages || 1
        totalItems.value = res.pagination.totalItems || 0
        currentPage.value = res.pagination.currentPage || 1
      }
    }
  } catch (err) {
    console.error('Failed to load posts', err)
  } finally {
    isLoading.value = false
  }
}

const setCategory = (catName: string) => {
  selectedCategoryName.value = catName
  currentPage.value = 1
  fetchPosts()
}

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  fetchPosts()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Helpers
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

const formatDate = (dateStr?: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const getExcerpt = (html?: string | null, length = 150) => {
  if (!html) return ''
  const text = html.replace(/<[^>]*>/g, '')
  return text.length > length ? text.substring(0, length) + '...' : text
}

const getReadTime = (html?: string | null) => {
  if (!html) return '1 min'
  const text = html.replace(/<[^>]*>/g, '')
  const words = text.split(/\s+/).length
  const time = Math.max(1, Math.ceil(words / 200))
  return `${time} min`
}

onMounted(() => {
  window.scrollTo(0, 0)
  fetchCategories()
  fetchPosts()
})
</script>

<template>
  <div class="devlog-page">
    <section id="devlog" class="devlog-section">
      <div class="stars-bg"></div>

      <!-- Back Link -->
      <div class="back-link-container">
        <RouterLink to="/devlog" class="return-btn">
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
          Back to Devlog
        </RouterLink>
      </div>

      <!-- Intro Title -->
      <div class="intro-container">
        <div class="intro-inner">
          <div class="section-line accent-cyan inline-flex-center">ARCHIVE JOURNAL</div>
          <h2 class="reveal d-1 font-display intro-title">
            <span class="text-white">ALL</span><span style="color: var(--neon-blue);">POSTS.</span>
          </h2>
          <p class="reveal d-2 intro-subtitle">
            Showing {{ totalItems }} entries in chronological order.
          </p>
        </div>
      </div>

      <!-- Category Filtering -->
      <div class="filter-container">
        <div class="filter-tabs-row">
          <button 
            @click="setCategory('All')"
            class="tab"
            :class="{ 'active': selectedCategoryName === 'All' }"
          >
            ★ All
          </button>
          <button 
            v-for="cat in categories" 
            :key="cat.id" 
            @click="setCategory(cat.name)"
            class="tab"
            :class="{ 'active': selectedCategoryName === cat.name }"
          >
            {{ cat.name }}
          </button>
        </div>
      </div>

      <!-- Main Posts Grid -->
      <div class="grid-container">
        <div v-if="isLoading" class="flex flex-col items-center justify-center py-20 text-center">
          <div class="loader-spinner"></div>
          <span class="mt-4 text-gray-400 font-pixel text-xs">Accessing Archives...</span>
        </div>
        
        <div v-else-if="posts.length > 0" class="posts-grid">
          <RouterLink 
            v-for="post in posts" 
            :key="post.id" 
            :to="'/devlog/' + post.slug"
            class="post-card"
            style="text-decoration: none;"
          >
            <div class="post-card-image-box">
              <img 
                :src="getImageUrl(post.image)" 
                :alt="post.title" 
                class="post-card-image" 
              />
            </div>
            <div class="post-card-body">
              <div class="post-card-meta-row">
                <span class="cat-chip" :style="'--cat-color: ' + getCategoryColor(post.category?.name)">{{ post.category?.name || 'DEVLOG' }}</span>
                <span class="post-card-date">{{ formatDate(post.date_created || post.createdAt) }}</span>
              </div>
              <h4 v-if="post.title.includes(':')" class="post-card-title">
                {{ post.title.split(':')[0] }}: <span :style="'color: ' + getCategoryColor(post.category?.name)">{{ post.title.split(':')[1] || '' }}</span>
              </h4>
              <h4 v-else class="post-card-title">
                {{ post.title }}
              </h4>
              <p class="post-card-excerpt">
                {{ getExcerpt(post.description, 120) }}
              </p>
              <div class="post-card-read-time">⏱ {{ getReadTime(post.description) }}</div>
            </div>
          </RouterLink>
        </div>

        <div v-else class="text-center py-20 text-gray-400">
          No devlog posts found in this category.
        </div>

        <!-- Pagination Controls -->
        <div v-if="totalPages > 1 && !isLoading" class="pagination-row">
          <div class="pagination-container">
            <button 
              :disabled="currentPage === 1" 
              @click="goToPage(currentPage - 1)" 
              class="pag-btn"
            >
              &lt; PREV
            </button>
            
            <div class="pag-numbers">
              <button 
                v-for="page in totalPages" 
                :key="page" 
                @click="goToPage(page)" 
                class="pag-num-btn"
                :class="{ 'active': page === currentPage }"
              >
                [ {{ page }} ]
              </button>
            </div>

            <button 
              :disabled="currentPage === totalPages" 
              @click="goToPage(currentPage + 1)" 
              class="pag-btn"
            >
              NEXT &gt;
            </button>
          </div>
        </div>
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

.back-link-container {
  max-width: 1660px;
  margin: 1.5rem auto 0;
  padding: 0 1.5rem;
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
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  transition: opacity 0.2s ease;
  font-family: 'Space Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.return-btn:hover {
  opacity: 0.7;
}

.intro-container, .filter-container, .grid-container {
  position: relative;
  max-width: 1660px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  z-index: 10;
}

.intro-container {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.intro-inner {
  text-align: center;
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
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
  content: ""; width: 40px; height: 1px;
  background: currentColor; opacity: 0.7;
}

.inline-flex-center {
  display: inline-flex;
  justify-content: center;
}

.font-display { 
  font-family: 'Anton', sans-serif;
  font-size: clamp(3.5rem, 13vw, 12rem);
  line-height: 0.85;
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 0 6px 30px rgba(0,0,0,0.7); 
}

.intro-title {
  font-size: clamp(3.5rem, 13vw, 10rem);
  line-height: 0.85;
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 0 6px 30px rgba(0,0,0,0.7);
}

.intro-subtitle {
  font-family: "Space Grotesk", sans-serif;
  font-size: 1rem;
  color: rgb(255, 245, 229);
  line-height: 1.625;
}
@media (min-width: 768px) {
  .intro-subtitle {
    font-size: 1.25rem;
  }
}

.accent-cyan { color: var(--cyan); }

/* Category chips */
.cat-chip {
  display: inline-block;
  font-size: 9px;
  font-weight: 700;
  padding: 3px 8px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-family: 'Anton', sans-serif;
  border: 1px solid var(--cat-color, var(--coral));
  color: var(--cat-color, var(--coral));
}

/* Tab buttons */
.tab {
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.68rem, 0.75vw, 0.8rem);
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--cream);
  padding: 0.6rem clamp(0.6rem, 1vw, 1.25rem);
  border-radius: 6px;
  transition: all 0.2s;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}
.tab:hover,
.tab.active {
  color: #fff !important;
  background: var(--neon-blue) !important;
  border-color: var(--neon-blue) !important;
  box-shadow: 0 0 15px var(--blue-glow);
}

.filter-container {
  margin-bottom: 2.5rem;
}

.filter-tabs-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgb(255, 245, 229);
}

/* Posts Grid */
.grid-container {
  margin-bottom: 6rem;
}

.posts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}
@media (min-width: 768px) {
  .posts-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}
@media (min-width: 1024px) {
  .posts-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Post card */
.post-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: rgba(255,245,229,0.025);
  border: 1px solid rgb(255, 245, 229);
  transition: all 0.3s ease;
  overflow: hidden;
}
.post-card:hover {
  border-color: rgba(39, 203, 252, 0.4);
  transform: translateY(-4px);
  background: rgba(255,245,229,0.04);
}

.post-card-image-box {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
  padding: 0;
}

.post-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  display: block;
}
.post-card:hover .post-card-image {
  transform: scale(1.05);
}

.post-card-body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.post-card-meta-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.post-card-date {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgb(255, 245, 229);
  font-weight: 600;
}

.post-card-title {
  font-family: 'Anton', sans-serif;
  font-size: 1.25rem;
  letter-spacing: 0.02em;
  margin-bottom: 0.5rem;
  line-height: 1.25;
  color: #fff;
}

.post-card-excerpt {
  font-size: 0.875rem;
  color: rgb(255, 245, 229);
  line-height: 1.625;
  margin-bottom: 1rem;
  flex: 1;
}

.post-card-read-time {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgb(255, 245, 229);
  font-weight: 600;
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

.font-pixel {
  font-family: 'Press Start 2P', system-ui;
}

/* Pagination Styles */
.pagination-row {
  margin-top: 3.5rem;
  display: flex;
  justify-content: center;
}

.pagination-container {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: rgba(255,245,229,0.02);
  border: 1px solid rgba(255, 245, 229, 0.2);
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
}

.pag-btn {
  font-family: 'Space Mono', monospace;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--cream);
  background: transparent;
  border: 1px solid rgba(255, 245, 229, 0.2);
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 4px;
}

.pag-btn:hover:not(:disabled) {
  border-color: var(--neon-blue);
  color: var(--neon-blue);
  box-shadow: 0 0 10px var(--blue-glow);
}

.pag-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.pag-numbers {
  display: flex;
  gap: 0.5rem;
}

.pag-num-btn {
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  color: rgba(255, 245, 229, 0.5);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0.25rem 0.5rem;
}

.pag-num-btn:hover {
  color: var(--neon-blue);
}

.pag-num-btn.active {
  color: var(--neon-blue);
  font-weight: 700;
  text-shadow: 0 0 8px var(--neon-blue);
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
</style>
