<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ecoNewsService, getImageUrl, type EcoNewsBlog } from '@/services/ecoNewsService'

const posts = ref<EcoNewsBlog[]>([])
const isLoading = ref(true)
const selectedAuthor = ref('All')
const selectedPost = ref<EcoNewsBlog | null>(null)

// Pagination State
const currentPage = ref(1)
const totalPages = ref(1)
const totalItems = ref(0)
const limitPerPage = 10

const route = useRoute()
const router = useRouter()

const fetchPosts = async () => {
  isLoading.value = true
  try {
    const response = await ecoNewsService.getAll({
      page: currentPage.value,
      limit: limitPerPage,
      sortBy: 'date_created',
      sortOrder: 'desc'
    })
    posts.value = response.data
    if (response.pagination) {
      totalPages.value = response.pagination.totalPages
      totalItems.value = response.pagination.totalItems
      currentPage.value = response.pagination.currentPage
    }
  } catch (error) {
    console.error('Failed to load EcoNews posts:', error)
  } finally {
    isLoading.value = false
  }
}

const changePage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  fetchPosts()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const filteredPosts = computed(() => {
  if (selectedAuthor.value === 'All') {
    return posts.value
  }
  return posts.value.filter(post => post.author === selectedAuthor.value)
})

const selectPost = (post: EcoNewsBlog) => {
  router.push(`/econews/${post.slug || post.id}`)
}

const deselectPost = () => {
  router.push('/econews')
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

const fetchSinglePost = async (slug: string) => {
  isLoading.value = true
  try {
    const response = await ecoNewsService.getBySlug(slug)
    selectedPost.value = response.data
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (error) {
    console.error('Failed to load EcoNews post:', error)
    // fallback or redirect back to list
    router.push('/econews')
  } finally {
    isLoading.value = false
  }
}

watch(
  () => route.params.slug,
  (newSlug) => {
    if (newSlug) {
      fetchSinglePost(newSlug as string)
    } else {
      selectedPost.value = null
      if (posts.value.length === 0) {
        fetchPosts()
      }
    }
  }
)

onMounted(() => {
  window.scrollTo(0, 0)
  if (route.params.slug) {
    fetchSinglePost(route.params.slug as string)
  } else {
    fetchPosts()
  }
})
</script>

<template>
  <div class="econews-page">
    <!-- Main Banner (Only shown in list view) -->
    <div v-if="!selectedPost && !route.params.slug" class="blue-banner">
      <div class="banner-content">
        <h1>ECO NEWS CONTINUES TO PUBLISH ENVIRONMENTAL CAMPAIGN ARTICLES.</h1>
        <p>If you have your own writing or content you'd like to share, please feel free to send an inquiry to hello@ecosoftgame.com at any time.</p>
      </div>
    </div>

    <!-- Main Content Container -->
    <div class="main-container">
      <!-- List View -->
      <div v-if="!selectedPost && !route.params.slug" class="list-view">
        <h2 class="section-title">Latest Updates From Us</h2>

        <!-- Author Filter -->
        <div class="filter-bar">
          <span class="filter-label">Filter By Author's : </span>
          <div class="filter-buttons">
            <button 
              @click="selectedAuthor = 'All'" 
              :class="{ active: selectedAuthor === 'All' }"
              class="filter-btn"
            >
              All
            </button>
            <button 
              @click="selectedAuthor = 'Sean Beck'" 
              :class="{ active: selectedAuthor === 'Sean Beck' }"
              class="filter-btn"
            >
              Sean Beck
            </button>
            <button 
              @click="selectedAuthor = 'Erin Winslow'" 
              :class="{ active: selectedAuthor === 'Erin Winslow' }"
              class="filter-btn"
            >
              Erin Winslow
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
          <svg class="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="mt-2 text-gray-400 text-sm">Loading articles...</span>
        </div>

        <!-- Article Grid -->
        <div v-else-if="filteredPosts.length > 0" class="article-grid">
          <div 
            v-for="post in filteredPosts" 
            :key="post.id" 
            class="article-card"
            @click="selectPost(post)"
          >
            <div class="card-image-container">
              <img :src="getImageUrl(post.image)" :alt="post.title" class="card-image" />
              <!-- Watermark Overlay -->
              <div class="card-watermark">
                <div class="watermark-inner">
                  <div class="watermark-logo"></div>
                  <span>ECOSOFT INTERACTIVE</span>
                </div>
              </div>
            </div>
            <div class="card-body">
              <p class="card-date">{{ formatDate(post.date_created || post.createdAt) }}</p>
              <h3 class="card-title">{{ post.title }}</h3>
              <p class="card-author">Author : {{ post.author }}</p>
              <div class="card-tags">
                <span class="tag-pill">{{ post.category }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination Controls -->
        <div v-if="!isLoading && totalPages > 1" class="pagination-container">
          <button 
            @click="changePage(currentPage - 1)" 
            :disabled="currentPage === 1"
            class="pagination-arrow-btn"
            aria-label="Previous Page"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M15 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <div class="pagination-pages">
            <button 
              v-for="p in totalPages" 
              :key="p"
              @click="changePage(p)"
              :class="{ active: p === currentPage }"
              class="pagination-page-btn"
            >
              {{ p }}
            </button>
          </div>

          <button 
            @click="changePage(currentPage + 1)" 
            :disabled="currentPage === totalPages"
            class="pagination-arrow-btn"
            aria-label="Next Page"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>

        <div v-else class="text-center py-20 text-gray-400">
          No articles found.
        </div>
      </div>

      <!-- Detail View -->
      <div v-else-if="selectedPost" class="detail-view">
        <button class="return-btn" @click="deselectPost">
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

        <article class="article-detail">
          <div class="article-header">
            <div class="article-tags">
              <span class="tag-pill">{{ selectedPost.category }}</span>
            </div>
            <h1 class="detail-title">{{ selectedPost.title }}</h1>
            <p class="detail-meta">
              By <span class="author-name">{{ selectedPost.author }}</span>
            </p>
            <p class="detail-date">{{ formatDate(selectedPost.date_created || selectedPost.createdAt).toUpperCase() }}</p>
          </div>

          <!-- Main Article Image -->
          <div class="detail-image-container">
            <img :src="getImageUrl(selectedPost.image)" :alt="selectedPost.title" class="detail-image" />
            <!-- Watermark Overlay -->
            <div class="detail-watermark">
              <div class="watermark-inner">
                <div class="watermark-logo"></div>
                <span>ECOSOFT INTERACTIVE</span>
              </div>
            </div>
          </div>

          <!-- Article Body -->
          <div class="article-content prose prose-invert max-w-none" v-html="selectedPost.description">
          </div>
        </article>
      </div>

      <!-- Detail Loading State -->
      <div v-else class="flex flex-col items-center justify-center py-20">
        <svg class="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="mt-2 text-gray-400 text-sm">Loading article...</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.econews-page {
  background-color: #060a10;
  color: #fff;
  min-height: 100vh;
  font-family: 'Nunito', 'Manrope', system-ui, sans-serif;
  padding-top: clamp(75px, 6vw, 90px);
  -webkit-font-smoothing: antialiased;
}

/* 1. BLUE BANNER */
.blue-banner {
  background-color: #0066f3;
  color: #ffffff;
  width: 100%;
  padding: 5rem 1.5rem;
  text-align: center;
}

.banner-content {
  max-width: 800px;
  margin: 0 auto;
}

.banner-content h1 {
  font-family: 'Anton', sans-serif;
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.2;
  margin: 0 0 1.25rem 0;
  letter-spacing: -0.02em;
}

.banner-content p {
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  font-size: clamp(0.95rem, 1.8vw, 1.15rem);
  line-height: 1.6;
  opacity: 0.95;
  margin: 0;
  font-weight: 500;
}

/* 2. CONTAINERS */
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  background-color: #060a10;
}

/* 3. LIST VIEW & FILTERS */
.section-title {
  font-family: 'Anton', sans-serif;
  font-size: 2.25rem;
  font-weight: 800;
  color: #ffffff;
  margin-top: 0;
  margin-bottom: 2rem;
  letter-spacing: -0.01em;
}

.filter-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.filter-label {
  font-size: 0.9rem;
  font-weight: 700;
  color: #8a9bbf;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
}

.filter-btn {
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.68rem, 0.75vw, 0.8rem);
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #8a9bbf;
  padding: 0.6rem clamp(0.6rem, 1vw, 1.25rem);
  border-radius: 6px;
  transition: all 0.2s;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

.filter-btn:hover,
.filter-btn.active {
  color: #fff !important;
  background: #0066f3 !important;
  border-color: #0066f3 !important;
  box-shadow: 0 0 15px rgba(0, 102, 243, 0.5);
}

/* 4. ARTICLE GRID */
.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.article-card {
  background: #0c1220;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 102, 243, 0.15);
  border-color: rgba(0, 102, 243, 0.4);
}

.card-image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background-color: #060a10;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.article-card:hover .card-image {
  transform: scale(1.03);
}

/* Watermark Overlay */
.card-watermark, .detail-watermark {
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
  background-color: #0066f3;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  box-shadow: 0 0 8px #0066f3;
}

.card-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-date {
  font-size: 0.85rem;
  color: #8a9bbf;
  margin: 0 0 0.5rem 0;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.4;
  margin: 0 0 0.75rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-author {
  font-size: 0.85rem;
  font-weight: 600;
  color: #8a9bbf;
  margin: auto 0 1rem 0;
}

.card-tags, .article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-pill {
  background-color: rgba(255, 255, 255, 0.06);
  color: #e8f0fe;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  text-transform: capitalize;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* 5. DETAIL VIEW & ARTICLE */
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
  margin-bottom: 2rem;
  transition: opacity 0.2s ease;
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
  justify-content: center;
  margin-bottom: 1rem;
}

.detail-title {
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  font-weight: 800;
  line-height: 1.25;
  color: #ffffff;
  margin: 0 0 1rem 0;
  letter-spacing: -0.02em;
}

.detail-meta {
  font-size: 0.95rem;
  color: #8a9bbf;
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
  color: #8a9bbf;
  letter-spacing: 1.5px;
  margin: 0;
}

.detail-image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 12px;
  overflow: hidden;
  background-color: #060a10;
  margin-bottom: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.detail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 6. ARTICLE BODY TEXT */
.article-content {
  line-height: 1.8;
  color: #e8f0fe;
  font-size: 1.1rem;
}

/* Rich text content styles for TipTap-generated HTML */
.article-content :deep(h1) {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 800;
  line-height: 1.3;
  color: #ffffff;
  margin: 2rem 0 1rem 0;
  letter-spacing: -0.02em;
}

.article-content :deep(h2) {
  font-size: clamp(1.35rem, 2.5vw, 1.75rem);
  font-weight: 700;
  line-height: 1.35;
  color: #ffffff;
  margin: 1.75rem 0 0.75rem 0;
  letter-spacing: -0.01em;
}

.article-content :deep(h3) {
  font-size: clamp(1.15rem, 2vw, 1.4rem);
  font-weight: 700;
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
  color: #3b82f6;
  text-decoration: underline;
  transition: color 0.2s ease;
}

.article-content :deep(a:hover) {
  color: #60a5fa;
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
  border-left: 4px solid #3b82f6;
  padding-left: 1.25rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: #8a9bbf;
}

.article-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  margin: 1.5rem 0;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.article-content :deep(hr) {
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 2rem 0;
}

.article-content :deep(code) {
  background-color: rgba(255, 255, 255, 0.08);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
  font-family: 'Space Mono', monospace;
  color: #e8f0fe;
}

.article-content :deep(pre) {
  background-color: rgba(255, 255, 255, 0.05);
  padding: 1rem 1.25rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5rem 0;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.lead-text {
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.6;
  color: #ffffff;
  margin-bottom: 2rem;
}

.body-text {
  margin-bottom: 1.75rem;
  opacity: 0.85;
}

/* Inline images inside detail view */
.inline-image-section {
  margin: 2.5rem 0;
  text-align: center;
}

.inline-image {
  max-width: 100%;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.inline-image-caption {
  font-size: 0.88rem;
  color: #8a9bbf;
  line-height: 1.5;
  margin-top: 0.75rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Pagination Styling */
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.pagination-pages {
  display: flex;
  gap: 0.5rem;
}

.pagination-page-btn {
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  font-weight: 700;
  color: #8a9bbf;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #0c1220;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.pagination-page-btn:hover,
.pagination-page-btn.active {
  color: #fff;
  background: #0066f3;
  border-color: #0066f3;
  box-shadow: 0 0 15px rgba(0, 102, 243, 0.5);
}

.pagination-arrow-btn {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #0c1220;
  color: #8a9bbf;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-arrow-btn svg {
  width: 18px;
  height: 18px;
}

.pagination-arrow-btn:hover:not(:disabled) {
  color: #fff;
  background: #0066f3;
  border-color: #0066f3;
  box-shadow: 0 0 15px rgba(0, 102, 243, 0.5);
}

.pagination-arrow-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
</style>
