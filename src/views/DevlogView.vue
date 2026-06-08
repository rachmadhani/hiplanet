<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { devlogBlogService, getImageUrl, type DevlogBlog } from '@/services/devlogBlogService'
import { devlogCategoryService } from '@/services/devlogCategoryService'

// Stats strip data
const stats = ref([
  { value: '47', label: 'Posts to date', colorClass: 'accent-coral' },
  { value: '5 MO', label: 'Until launch', colorClass: 'accent-amber' },
  { value: '100%', label: 'Sean writes', colorClass: 'accent-cyan' }
])

// Categories for filtering
const categories = ref<string[]>(['All'])

// Selected category
const activeCategory = ref('All')

// Email subscription state
const email = ref('')
const subscribed = ref(false)

// Post data
const posts = ref<DevlogBlog[]>([])
const isLoading = ref(true)

const router = useRouter()

// Fetch categories
const fetchCategories = async () => {
  try {
    const res = await devlogCategoryService.getAll()
    if (res.success && res.data) {
      categories.value = ['All', ...res.data.map(c => c.name)]
    }
  } catch (err) {
    console.error('Failed to fetch categories:', err)
  }
}

// Fetch posts
const fetchPosts = async () => {
  isLoading.value = true
  try {
    const res = await devlogBlogService.getAll({
      limit: 50,
      sortBy: 'date_created',
      sortOrder: 'desc'
    })
    if (res.success && res.data) {
      posts.value = res.data
    }
  } catch (err) {
    console.error('Failed to fetch posts:', err)
  } finally {
    isLoading.value = false
  }
}

// Latest post for Featured
const featuredPost = computed(() => {
  return posts.value[0] || null
})

// Filter posts by category
const filteredPosts = computed(() => {
  if (activeCategory.value === 'All') {
    // Exclude the featured post from recent posts to avoid duplication
    return posts.value.slice(1)
  }
  return posts.value.filter(
    (p) => p.category?.name.toLowerCase() === activeCategory.value.toLowerCase()
  )
})

// Slice for recent grid (limit to 9)
const displayedPosts = computed(() => {
  return filteredPosts.value.slice(0, 9)
})

// Older posts for the archive section
const archivePosts = computed(() => {
  if (activeCategory.value === 'All') {
    return posts.value.slice(10, 17)
  }
  return filteredPosts.value.slice(9, 16)
})

// Action: Filter category selection
const setCategory = (cat: string) => {
  activeCategory.value = cat
}

// Action: Newsletter subscription
const subscribeNewsletter = () => {
  if (email.value.trim()) {
    subscribed.value = true
    email.value = ''
    setTimeout(() => {
      subscribed.value = false
    }, 5000)
  }
}

// Style helpers
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

      <!-- ============ 1. INTRO ============ -->
      <div class="intro-container">
        <div class="intro-inner">
          <div class="section-line accent-cyan inline-flex-center">Studio Journal</div>

          <h2 class="reveal d-1 font-display intro-title">
            <span class="text-white">DEV</span><span style="color: var(--neon-blue);">LOG.</span>
          </h2>

          <p class="reveal d-2 intro-subtitle">
            Notes from the road to <span class="not-italic font-anton accent-amber tracking-wide">NOVEMBER 10, 2026.</span>
          </p>

          <p class="reveal d-3 intro-meta">
            Written by <span class="accent-coral">Sean Beck</span> · Updates every other week
          </p>

          <!-- Stats strip -->
          <div class="stats-grid">
            <div v-for="stat in stats" :key="stat.label">
              <div class="stat-value" :class="stat.colorClass">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ============================================================
           2. VISUAL ROADMAP
      ============================================================ -->
      <div class="roadmap-container">
        <div class="roadmap-header">
          <div class="section-line accent-cyan">The Road</div>
          <h3 class="roadmap-section-title">
            <span class="text-white">FROM HERE</span> <span class="accent-neon-blue">TO LAUNCH.</span>
          </h3>
        </div>

        <!-- Roadmap track -->
        <div class="roadmap-scroll">
          <div class="roadmap-track">
            <div class="roadmap-line"></div>

            <div class="roadmap-grid">
              <!-- Milestones -->
              <div class="roadmap-node">
                <div class="milestone-time text-green">2023</div>
                <div class="roadmap-dot past"></div>
                <div class="mt-3">
                  <div class="milestone-label label-past">VOL.1</div>
                  <div class="milestone-sublabel">Comic published</div>
                </div>
              </div>
              <div class="roadmap-node">
                <div class="milestone-time text-green">2024-25</div>
                <div class="roadmap-dot past"></div>
                <div class="mt-3">
                  <div class="milestone-label label-past">DEV</div>
                  <div class="milestone-sublabel">Game build</div>
                </div>
              </div>
              <div class="roadmap-node">
                <div class="milestone-time text-green">May 2026</div>
                <div class="roadmap-dot past"></div>
                <div class="mt-3">
                  <div class="milestone-label label-past">BUSAN</div>
                  <div class="milestone-sublabel">Connect Fest demo</div>
                </div>
              </div>
              <div class="roadmap-node">
                <div class="milestone-time accent-coral">◆ NOW</div>
                <div class="roadmap-dot present large"></div>
                <div class="mt-3">
                  <div class="milestone-label label-present">VOL.2 + ALPHA</div>
                  <div class="milestone-sublabel">Summer 2026</div>
                </div>
              </div>
              <div class="roadmap-node">
                <div class="milestone-time text-muted-time">Oct 2026</div>
                <div class="roadmap-dot future"></div>
                <div class="mt-3">
                  <div class="milestone-label label-future">NEXT FEST</div>
                  <div class="milestone-sublabel">Steam · Oct 19-26</div>
                </div>
              </div>
              <div class="roadmap-node">
                <div class="milestone-time accent-amber">★ LAUNCH</div>
                <div class="roadmap-dot future large" style="border-color: var(--amber); --node-color: var(--amber);"></div>
                <div class="mt-3">
                  <div class="milestone-label label-highlight">Nov 10 2026</div>
                  <div class="milestone-sublabel">Episode 1 ships</div>
                </div>
              </div>
              <div class="roadmap-node">
                <div class="milestone-time text-muted-time">2027+</div>
                <div class="roadmap-dot future"></div>
                <div class="mt-3">
                  <div class="milestone-label label-future">DLC × 6</div>
                  <div class="milestone-sublabel">Ch.7 → Ch.12</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p class="roadmap-footer">
          ← Past milestones · ◆ Active development · Future milestones →
        </p>
      </div>

      <!-- ============================================================
           3. FEATURED POST
      ============================================================ -->
      <div class="featured-container">
        <div class="featured-header-tag accent-coral">
          ◆ Latest · This Week
        </div>

        <div v-if="isLoading" class="flex flex-col items-center justify-center py-12">
          <span class="text-gray-400 font-pixel text-xs">Loading Devlogs...</span>
        </div>
        <article v-else-if="featuredPost" class="featured-bg">
          <div class="featured-grid">
            <!-- Featured image using actual stage screenshot -->
            <div class="featured-visual-col">
              <div class="featured-image-wrapper">
                <img 
                  :src="getImageUrl(featuredPost.image)" 
                  :alt="featuredPost.title" 
                  class="featured-image" 
                />
              </div>
            </div>

            <!-- Content info -->
            <div class="featured-content-col">
              <div class="post-meta-row">
                <span class="cat-chip" :style="'--cat-color: ' + getCategoryColor(featuredPost.category?.name)">{{ featuredPost.category?.name || 'DEVLOG' }}</span>
                <span class="post-date-label">{{ formatDate(featuredPost.date_created || featuredPost.createdAt) }}</span>
              </div>

              <h3 class="featured-title">
                <span v-if="featuredPost.title.includes(':')">
                  {{ featuredPost.title.split(':')[0] }}: <span class="accent-coral">{{ featuredPost.title.split(':')[1] || '' }}</span>
                </span>
                <span v-else>
                  {{ featuredPost.title }}
                </span>
              </h3>

              <p class="featured-excerpt">
                {{ getExcerpt(featuredPost.description, 200) }}
              </p>

              <div class="featured-meta-bottom">
                <span class="read-time-box">
                  <span class="font-pixel read-time-icon">⏱</span>
                  {{ getReadTime(featuredPost.description) }} read
                </span>
                <span class="meta-dot">·</span>
                <span>by {{ featuredPost.author }}</span>
              </div>

              <RouterLink :to="'/devlog/' + featuredPost.slug" class="featured-cta-button" style="box-shadow: 4px 4px 0 var(--cream); text-decoration: none;">
                Read Full Post →
              </RouterLink>
            </div>
          </div>
        </article>
      </div>

      <!-- ============================================================
           4. CATEGORY FILTER
      ============================================================ -->
      <div class="filter-container">
        <div class="filter-header">
          <h3 class="filter-title">
            <span class="text-white">RECENT</span> <span class="accent-neon-blue">POSTS.</span>
          </h3>
          <span class="filter-subtitle">// Filter by category</span>
        </div>

        <div class="filter-tabs-row">
          <button 
            v-for="cat in categories" 
            :key="cat" 
            @click="setCategory(cat)"
            class="tab"
            :class="{ 'active': activeCategory === cat }"
          >
            {{ cat === 'All' ? '★ All' : cat }}
          </button>
        </div>
      </div>

      <!-- ============================================================
           5. POSTS GRID
      ============================================================ -->
      <div class="grid-container">
        <div v-if="isLoading" class="flex flex-col items-center justify-center py-12">
          <span class="text-gray-400 font-pixel text-xs">Loading Recent Posts...</span>
        </div>
        <div v-else-if="displayedPosts.length > 0" class="posts-grid">
          <RouterLink 
            v-for="post in displayedPosts" 
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
                {{ getExcerpt(post.description, 100) }}
              </p>
              <div class="post-card-read-time">⏱ {{ getReadTime(post.description) }}</div>
            </div>
          </RouterLink>
        </div>
        <div v-else class="text-center py-12 text-gray-400">
          No recent posts found in this category.
        </div>

        <!-- Load more -->
        <div v-if="posts.length > 9" class="load-more-container">
          <RouterLink 
            to="/devlog/all"
            class="load-more-btn"
            style="text-decoration: none; display: inline-block;"
          >
            ↓ Load More Posts
          </RouterLink>
        </div>
      </div>

      <!-- ============================================================
           6. ARCHIVE LIST (compact)
      ============================================================ -->
      <div class="archive-section">
        <div class="archive-stars-bg"></div>
        <div class="archive-container">
          <div class="archive-header-box">
            <div class="section-line accent-cyan">Older Entries</div>
            <h3 class="archive-title">
              <span class="text-white">FROM THE</span> <span class="accent-neon-blue">ARCHIVES.</span>
            </h3>
          </div>

          <ul v-if="archivePosts.length > 0" class="archive-list">
            <li v-for="arc in archivePosts" :key="arc.id" class="archive-item">
              <RouterLink :to="'/devlog/' + arc.slug" class="archive-link">
                <span class="archive-date-col">{{ formatDate(arc.date_created || arc.createdAt) }}</span>
                <span class="archive-chip-col">
                  <span class="cat-chip" :style="'--cat-color: ' + getCategoryColor(arc.category?.name)">{{ arc.category?.name || 'DEVLOG' }}</span>
                </span>
                <span class="archive-title-col">{{ arc.title }}</span>
                <span class="archive-arrow-col">→</span>
              </RouterLink>
            </li>
          </ul>
          <div v-else class="text-center py-8 text-gray-400">
            No older archived posts.
          </div>

          <div class="archive-footer-box">
            <RouterLink to="/devlog/all" class="archive-more-link" style="text-decoration: none;">
              View Full Archive ({{ posts.length }} posts) →
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- ============================================================
           7. NEWSLETTER SIGNUP
      ============================================================ -->
      <div class="newsletter-section ">
        <div class="newsletter-stars-bg"></div>
        <div class="newsletter-container">
          <div class="newsletter-card">
            <div class="newsletter-tag">MONTHLY DIGEST</div>

            <h3 class="newsletter-title">
              <span class="text-white">DON'T MISS</span><br />
              <span class="accent-amber">A DROP.</span>
            </h3>

            <p class="newsletter-desc">
              Best devlog posts + comic drops + launch news, monthly in your inbox.
              No spam. Unsubscribe anytime.
            </p>

            <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
              <input 
                type="email" 
                v-model="email" 
                placeholder="your@email.com" 
                required
                class="newsletter-input" 
              />
              <button 
                type="submit" 
                class="newsletter-btn" 
                style="box-shadow: 4px 4px 0 var(--cream);"
              >
                Subscribe →
              </button>
            </form>

            <p v-if="subscribed" class="newsletter-success">
              ✓ Thank you for subscribing!
            </p>

            <p class="newsletter-subtext">
              ~1-2 emails/month · 1,247 subscribers
            </p>
          </div>
        </div>
      </div>

      <!-- ============ 8. CTA STRIP ============ -->
      <div class="cta-section">
        <div class="cta-stars-bg"></div>
        <div class="cta-glow"></div>
        <div class="cta-container">
          <h3 class="cta-title">
            <span class="text-white">FIVE MONTHS LEFT.</span><br />
            <span class="accent-neon-blue">PLENTY MORE TO SHARE.</span>
          </h3>
          <p class="cta-desc">
            Wishlist the game · join the closed beta · follow the daily art drops.
          </p>

          <div class="cta-buttons">
            <a 
              href="https://store.steampowered.com/app/4745340/Hi_Planet_Save_The_Earth/?beta=1" 
              target="_blank"
              class="cta-btn-steam" 
              style="box-shadow: 5px 5px 0 var(--cream);"
            >
              ▶ Wishlist on Steam
            </a>
            <RouterLink 
              to="/become-a-tester" 
              class="cta-btn-tester"
            >
              🧪 Become a Tester
            </RouterLink>
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
  --deep-purple: #2A0E2E;
  --violet: #9B8FB8;
  --green: #4ADE80;
  --frost: #BAE6FD;

  /* background: var(--midnight); */
  color: var(--cream);
  min-height: 100vh;
  font-family: 'Manrope', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* Custom layout container margins and paddings */
.devlog-section {
  position: relative;
  /* background-color: var(--midnight); */
  padding-top: clamp(75px, 6vw, 90px);
}

.stars-bg, .archive-stars-bg, .newsletter-stars-bg, .cta-stars-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image:
    radial-gradient(1.5px 1.5px at 12% 24%, rgba(255,255,255,0.9), transparent),
    radial-gradient(1px 1px at 58% 71%, rgba(255,255,255,0.6), transparent),
    radial-gradient(2px 2px at 82% 18%, rgba(255,255,255,0.85), transparent),
    radial-gradient(1px 1px at 38% 82%, rgba(255,255,255,0.55), transparent),
    radial-gradient(1.5px 1.5px at 91% 44%, rgba(255,255,255,0.8), transparent);
  pointer-events: none;
}

.stars-bg { opacity: 0.25; }
.archive-stars-bg { opacity: 0.20; }
.newsletter-stars-bg { opacity: 0.30; }
.cta-stars-bg { opacity: 0.25; }

.grain { position: relative; }
.grain::after {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E");
  opacity: 0.05; mix-blend-mode: overlay; z-index: 1;
}

/* Page Containers */
.intro-container, .roadmap-container, .featured-container, .filter-container, .grid-container {
  position: relative;
  max-width: 1660px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  z-index: 10;
}

.intro-container {
  padding-top: 5rem;
  padding-bottom: 3rem;
}
@media (min-width: 768px) {
  .intro-container {
    padding-top: 7rem;
  }
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

/* Typography styles matching user specifications and ConceptArt style */
.font-display { 
  font-family: 'Anton', sans-serif;
  font-size: clamp(3.5rem, 13vw, 12rem);
  line-height: 0.85;
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 0 6px 30px rgba(0,0,0,0.7); 
}

.font-anton {
   font-family: 'Anton', sans-serif;
}

.font-serif { font-family: 'Fraunces', serif; }
.font-pixel { font-family: 'Press Start 2P', system-ui; }
.font-space {
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
}

.intro-title {
  font-size: clamp(3.5rem, 13vw, 12rem);
  line-height: 0.85;
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 0 6px 30px rgba(0,0,0,0.7);
}

.intro-subtitle {
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  font-size: 1rem;
  color: rgb(255, 245, 229);
  line-height: 1.625;
  margin-bottom: 0.75rem;
}
@media (min-width: 768px) {
  .intro-subtitle {
    font-size: 1.25rem;
  }
}

.intro-meta {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: rgb(255, 245, 229);
  font-weight: 600;
  margin-top: 1.5rem;
}

.stats-grid {
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  max-width: 36rem;
  margin-left: auto;
  margin-right: auto;
}

.stat-value {
  font-family: 'Anton', sans-serif;
  font-size: 1.875rem;
}
@media (min-width: 768px) {
  .stat-value {
    font-size: 2.25rem;
  }
}

.stat-label {
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: rgb(255, 245, 229);
  font-weight: 600;
  margin-top: 0.25rem;
}

.accent-coral { color: var(--coral); }
.accent-neon-blue { color: var(--neon-blue); }
.accent-amber { color: var(--amber); }
.accent-cyan { color: var(--cyan); }
.accent-earth { color: var(--earth); }
.accent-green { color: var(--green); }
.accent-magenta { color: var(--magenta); }
.accent-violet { color: var(--violet); }
.accent-frost { color: var(--frost); }

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
  color: var(--muted);
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

/* Roadmap styles */
.roadmap-container {
  margin-bottom: 5rem;
}
@media (min-width: 768px) {
  .roadmap-container {
    margin-bottom: 6rem;
  }
}

.roadmap-header {
  margin-bottom: 2rem;
}

.roadmap-section-title {
  font-family: 'Anton', sans-serif;
  font-size: clamp(3rem, 10vw, 8rem);
  line-height: 0.82;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 2rem;
  text-shadow: 0 10px 40px rgba(0,0,0,0.8);
}
@media (min-width: 768px) {
  .roadmap-section-title {
    /* font-size: 3rem; */
  }
}

.roadmap-scroll {
  overflow-x: auto;
  margin-left: -1.5rem;
  margin-right: -1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 1rem;
}

.roadmap-track {
  position: relative;
  padding: 30px 0 50px;
  min-width: 900px;
}

.roadmap-line {
  position: absolute;
  top: 50%;
  left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg,
    rgba(74,222,128,0.4) 0%,
    rgba(255,182,39,0.6) 40%,
    rgba(255,107,53,0.8) 70%,
    rgba(255,107,53,1) 100%);
  transform: translateY(-50%);
}

.roadmap-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
}

.roadmap-node {
  position: relative;
  z-index: 2;
  text-align: center;
}

.milestone-time {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.milestone-time.text-green { color: var(--green); }
.milestone-time.text-muted-time { color: rgb(255, 245, 229); }

.roadmap-dot {
  width: 14px; height: 14px;
  border-radius: 50%;
  background: var(--node-color, var(--cream));
  border: 3px solid var(--midnight);
  box-shadow: 0 0 0 2px var(--node-color, var(--cream));
  margin: 0 auto;
}
.roadmap-dot.large {
  width: 22px; height: 22px;
  box-shadow: 0 0 0 3px var(--node-color, var(--cream)), 0 0 20px var(--node-color, var(--cream));
}
.roadmap-dot.past { background: rgba(74,222,128,0.7); --node-color: #4ADE80; }
.roadmap-dot.present { background: var(--coral); --node-color: var(--coral); animation: pulse 2s infinite; }
.roadmap-dot.future { background: var(--midnight); border-color: var(--cream); --node-color: rgba(255,245,229,0.4); }

.milestone-label {
  font-family: 'Anton', sans-serif;
  letter-spacing: 0.02em;
}

.milestone-label.label-present { font-size: 0.875rem; color: var(--coral); }
.milestone-label.label-highlight { font-size: 0.875rem; color: var(--amber); }
.milestone-label.label-past { font-size: 0.75rem; color: rgb(255, 245, 229); }
.milestone-label.label-future { font-size: 0.75rem; color: rgb(255, 245, 229); }

.milestone-sublabel {
  font-size: 9px;
  color: rgb(255, 245, 229);
  margin-top: 0.25rem;
}

.roadmap-footer {
  text-align: center;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: rgb(255, 245, 229);
  font-weight: 600;
  margin-top: 1rem;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}

/* Featured Post styles */
.featured-container {
  margin-bottom: 5rem;
}
@media (min-width: 768px) {
  .featured-container {
    margin-bottom: 6rem;
  }
}

.featured-header-tag {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-weight: 700;
  margin-bottom: 1rem;
}

.featured-bg {
  /* background:
    radial-gradient(ellipse 60% 70% at 30% 50%, rgba(255,107,53,0.1) 0%, transparent 60%),
    radial-gradient(ellipse 50% 70% at 80% 50%, rgba(34,211,238,0.08) 0%, transparent 60%),
    linear-gradient(180deg, var(--deep-blue) 0%, var(--midnight) 100%); */
  border: 2px solid rgb(255, 245, 229);
  padding: 0;
  overflow: hidden;
}

.featured-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
}
@media (min-width: 1024px) {
  .featured-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

.featured-visual-col {
  grid-column: span 1 / span 1;
}
@media (min-width: 1024px) {
  .featured-visual-col {
    grid-column: span 3 / span 3;
  }
}

.featured-image-wrapper {
  height: 100%;
  min-height: 300px;
}

.featured-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.featured-content-col {
  grid-column: span 1 / span 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
@media (min-width: 768px) {
  .featured-content-col {
    padding: 2.5rem;
  }
}
@media (min-width: 1024px) {
  .featured-content-col {
    grid-column: span 2 / span 2;
  }
}

.post-meta-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.post-date-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: rgb(255, 245, 229);
  font-weight: 600;
}

.featured-title {
  font-family: 'Anton', sans-serif;
  font-size: 1.875rem;
  line-height: 0.95;
  margin-bottom: 1rem;
  color: #fff;
}
@media (min-width: 768px) {
  .featured-title {
    font-size: 3rem;
  }
}

.featured-excerpt {
  font-size: 0.875rem;
  color: rgb(255, 245, 229);
  line-height: 1.625;
  margin-bottom: 1.5rem;
}
@media (min-width: 768px) {
  .featured-excerpt {
    font-size: 1rem;
  }
}

.featured-meta-bottom {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  font-size: 0.75rem;
  color: rgb(255, 245, 229);
}

.read-time-box {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.read-time-icon {
  font-size: 10px;
}

.meta-dot {
  color: rgba(255, 245, 229, 0.3);
}

.featured-cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Anton', sans-serif;
  font-size: 0.875rem;
  padding: 0.75rem 1.5rem;
  background: var(--coral);
  color: var(--midnight);
  border: 2px solid var(--coral);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  width: fit-content;
  text-decoration: none;
  transition: all 0.3s ease;
}
.featured-cta-button:hover {
  background: transparent;
  color: var(--coral);
}

/* Category Filter styles */
.filter-container {
  margin-bottom: 2.5rem;
}

.filter-header {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.filter-title {
  font-family: 'Anton', sans-serif;
  /* font-size: 1.5rem; */
  font-size: clamp(3rem, 10vw, 8rem);
  line-height: 0.82;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 2rem;
  text-shadow: 0 10px 40px rgba(0,0,0,0.8);
}
@media (min-width: 768px) {
  .filter-title {
    /* font-size: 2.25rem; */
  }
}

.filter-subtitle {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: rgb(255, 245, 229);
  font-weight: 600;
}

.filter-tabs-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgb(255, 245, 229);
}

/* Posts Grid styles */
.grid-container {
  margin-bottom: 5rem;
}
@media (min-width: 768px) {
  .grid-container {
    margin-bottom: 6rem;
  }
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

.load-more-container {
  text-align: center;
  margin-top: 2.5rem;
}

.load-more-btn {
  font-family: 'Anton', sans-serif;
  font-size: 0.875rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid rgba(255, 245, 229, 0.3);
  background: transparent;
  color: var(--cream);
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}
.load-more-btn:hover {
  border-color: var(--cream);
  background: var(--cream);
  color: var(--midnight);
}

/* Archive List styles */
.archive-section {
  position: relative;
  /* background-color: var(--deep-blue); */
  padding-top: 5rem;
  padding-bottom: 5rem;
  overflow: hidden;
  z-index: 10;
}
@media (min-width: 768px) {
  .archive-section {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
}

.archive-container {
  position: relative;
  max-width: 1660px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.archive-header-box {
  margin-bottom: 2.5rem;
}

.archive-title {
  font-family: 'Anton', sans-serif;
  font-size: 1.5rem;
  font-size: clamp(3rem, 10vw, 8rem);
  line-height: 0.82;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 2rem;
  text-shadow: 0 10px 40px rgba(0,0,0,0.8);
}
@media (min-width: 768px) {
  .archive-title {
    /* font-size: 3rem; */
  }
}

.archive-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.archive-item {
  border-bottom: 1px solid rgb(255, 245, 229);
  margin-bottom: 0.25rem;
}

.archive-link {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  margin-left: -0.75rem;
  margin-right: -0.75rem;
  transition: background-color 0.2s ease;
  align-items: center;
  text-decoration: none;
  color: inherit;
}
.archive-link:hover {
  background-color: rgba(255, 255, 255, 0.03);
}

.archive-date-col {
  grid-column: span 12 / span 12;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgb(255, 245, 229);
  font-weight: 600;
}
@media (min-width: 768px) {
  .archive-date-col {
    grid-column: span 2 / span 2;
  }
}

.archive-chip-col {
  grid-column: span 6 / span 6;
}
@media (min-width: 768px) {
  .archive-chip-col {
    grid-column: span 2 / span 2;
  }
}

.archive-title-col {
  grid-column: span 12 / span 12;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 245, 229, 0.85);
  margin-top: 0.5rem;
}
@media (min-width: 768px) {
  .archive-title-col {
    grid-column: span 7 / span 7;
    margin-top: 0;
  }
}

.archive-arrow-col {
  display: none;
  text-align: right;
  font-size: 10px;
  color: rgb(255, 245, 229);
}
@media (min-width: 768px) {
  .archive-arrow-col {
    display: inline-block;
    grid-column: span 1 / span 1;
  }
}

.archive-footer-box {
  text-align: center;
  margin-top: 2rem;
}

.archive-more-link {
  font-size: 0.875rem;
  color: rgb(255, 245, 229);
  text-decoration: underline;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
}
.archive-more-link:hover {
  color: var(--coral);
}

/* Newsletter Signup styles */
.newsletter-section {
  position: relative;
  /* background-color: var(--midnight); */
  padding-top: 5rem;
  padding-bottom: 5rem;
  overflow: hidden;
}
@media (min-width: 768px) {
  .newsletter-section {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
}

.newsletter-container {
  position: relative;
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.newsletter-card {
  /* background:
    radial-gradient(ellipse at center, rgba(255,182,39,0.08) 0%, transparent 70%),
    linear-gradient(180deg, var(--midnight) 0%, var(--deep-blue) 100%); */
  border: 2px solid var(--amber);
  box-shadow: 0 0 40px rgba(255,182,39,0.1);
  padding: 2rem;
  text-align: center;
}
@media (min-width: 768px) {
  .newsletter-card {
    padding: 3rem;
  }
}

.newsletter-tag {
  font-family: 'Press Start 2P', system-ui;
  font-size: 10px;
  letter-spacing: 0.3em;
  color: var(--amber);
  margin-bottom: 1rem;
}

.newsletter-title {
  font-family: 'Anton', sans-serif;
  font-size: clamp(3.5rem, 13vw, 12rem);
  line-height: 0.85;
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 0 6px 30px rgba(0,0,0,0.7);
}
@media (min-width: 768px) {
  .newsletter-title {
    /* font-size: 3rem; */
  }
}

.newsletter-desc {
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  /* font-style: italic; */
  font-size: 1.4rem;
  color: rgb(255, 245, 229);
  margin-bottom: 2rem;
  max-width: 28rem;
  margin-left: auto;
  margin-right: auto;
}
@media (min-width: 768px) {
  .newsletter-desc {
    /* font-size: 1.125rem; */
  }
}

.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 28rem;
  margin-left: auto;
  margin-right: auto;
}
@media (min-width: 640px) {
  .newsletter-form {
    flex-direction: row;
  }
}

.newsletter-input {
  flex: 1;
  padding: 0.75rem 1rem;
  background: rgba(0, 0, 0, 0.4);
  border: 2px solid rgba(255, 245, 229, 0.2);
  color: var(--cream);
  outline: none;
  font-family: inherit;
}
.newsletter-input:focus {
  border-color: var(--amber);
}
.newsletter-input::placeholder {
  color: rgba(255, 245, 229, 0.35);
}

.newsletter-btn {
  font-family: 'Anton', sans-serif;
  font-size: 0.875rem;
  padding: 0.75rem 1.5rem;
  background: var(--amber);
  color: var(--midnight);
  border: 2px solid var(--amber);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: opacity 0.2s ease;
}
.newsletter-btn:hover {
  opacity: 0.9;
}

.newsletter-success {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: var(--green);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.newsletter-subtext {
  margin-top: 1.5rem;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: rgb(255, 245, 229);
  font-weight: 600;
}

/* CTA Section styles */
.cta-section {
  position: relative;
  /* background-color: var(--midnight); */
  padding-top: 4rem;
  padding-bottom: 4rem;
  overflow: hidden;
  border-top: 1px solid rgba(227, 156, 41, 0.473);
  z-index: 10;
}
@media (min-width: 768px) {
  .cta-section {
    padding-top: 5rem;
    padding-bottom: 5rem;
  }
}

.cta-glow {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(ellipse 50% 60% at 50% 50%, rgba(255, 107, 53, 0.12) 0%, transparent 70%);
  pointer-events: none;
}

.cta-container {
  position: relative;
  max-width: 56rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  text-align: center;
}

.cta-title {
  font-family: 'Anton', sans-serif;
  font-size: clamp(3.5rem, 7vw, 12rem);
  line-height: 0.85;
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 0 6px 30px rgba(0,0,0,0.7);
}
@media (min-width: 768px) {
  .cta-title {
    /* font-size: 3rem; */
  }
}

.cta-desc {
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
  /* font-style: italic; */
  font-size: 1.4rem;
  color: rgb(255, 245, 229);
  margin-bottom: 2rem;
  max-width: 36rem;
  margin-left: auto;
  margin-right: auto;
}
@media (min-width: 768px) {
  .cta-desc {
    /* font-size: 1.125rem; */
  }
}

.cta-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}
@media (min-width: 640px) {
  .cta-buttons {
    flex-direction: row;
  }
}

.cta-btn-steam {
  font-family: 'Anton', sans-serif;
  font-size: 1rem;
  padding: 1rem 2rem;
  background: var(--coral);
  color: var(--midnight);
  border: 2px solid var(--coral);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  text-decoration: none;
  transition: all 0.3s ease;
}
.cta-btn-steam:hover {
  background: transparent;
  color: var(--coral);
}

.cta-btn-tester {
  font-family: 'Anton', sans-serif;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid rgba(255, 245, 229, 0.4);
  color: var(--cream);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  text-decoration: none;
  transition: all 0.3s ease;
}
.cta-btn-tester:hover {
  border-color: var(--cream);
  background: var(--cream);
  color: var(--midnight);
}
</style>
