<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Post {
  id: number
  title: string
  author: string
  date: string
  image: string
  tags: string[]
  content: string[]
}

const posts = ref<Post[]>([
  {
    id: 1,
    title: 'Ocean Conservation Debt-for-Nature Bonds Unlocks $1.4B for Marine Protection',
    author: 'Sean Beck',
    date: 'Feb 24, 2026',
    image: '/econews/ocean_conservation.png',
    tags: ['World', 'News', 'Updates'],
    content: [
      'The global community took a monumental step forward in ocean preservation today with the signing of a debt-for-nature swap. Under this historic agreement, a significant portion of international debt will be restructured in exchange for binding commitments to protect over 200,000 square kilometers of marine habitats.',
      'Conservationists have hailed the deal as a game-changer, providing stable, long-term funding for patrol vessels, scientific research, and community-led conservation projects in some of the world\'s most biodiverse waters.',
      'By linking economic relief directly to environmental stewardship, this initiative sets a powerful precedent for future conservation finance efforts globally.'
    ]
  },
  {
    id: 2,
    title: 'US-Latin America Climate Pact Expands as California Builds New Partnerships at COP30',
    author: 'Sean Beck',
    date: 'Feb 24, 2026',
    image: '/econews/climate_pact.png',
    tags: ['Updates', 'World'],
    content: [
      'The US-Latin America climate pact took a major step forward at COP30 as California signed new agreements with Brazil, Colombia, and Chile, strengthening cross-border cooperation.',
      'The US-Latin America climate agreement expansion during California\'s participation at COP30, where Governor Gavin Newsom led a state delegation focused on framing climate commitments into action. The agreement is a result of California\'s long-standing approach of reaching directly to other regions to address environmental risks, regardless of national politics.',
      'As subnational funding, the effort will focus highly on how subnational governments are assuming leadership roles to enhance resilience, biodiversity loss, and climate risk areas in vulnerable regions, demanding cooperation that moves faster than traditional diplomacy. California\'s agreements aim to do just that, by sharing technology, policy experience, and data-driven solutions.',
      'Collectively, the group of partners will focus on forest conservation and methane reduction. Each partner has already taken steps to address these issues. California Natural Resources Secretary Wade Crowfoot signed the agreements with Colombia\'s Environment Minister, and the agreement is designed to target emissions from agriculture, waste, and energy sectors while supporting sustainable economic development linked to biodiversity protection.',
      'Chile joined the climate pact through a separate agreement focused on wildfire management. Both and Chile face forest fires that have grown more severe in recent years, making wildfire reduction one of the most reflection ways to slow near-term warming. California Air Resources Board Chair Liane Randolph signed the memorandum, which establishes information-sharing systems to compare policy, technologies, and enforcement strategies on forest borders.',
      'The extension of the US-Latin America pact also includes a focus on methane emissions. An agreement with Brazil\'s federal government focuses on innovation and the responsible use of artificial intelligence in public management, recognizing the growing role of digital tools in climate governance. A second agreement with the state of Pará addresses wildfire prevention and response, crucial as California\'s experience managing fire technology will frame the cooperation.',
      'Both partnerships strengthen forest monitoring systems designed to identify high-risk fire zones. This includes satellite data research, early warning fire detection systems, and sharing practices on detector and wildfire response, while forest information sharing insights into tropical forest dynamics.',
      'Advocates welcomed the signing as a step in the right direction. The US-Latin America climate pact, introduced at COP26, aims to reach a global goal to triple duplicate energy capacity by 2030, representing high-profile commitments to address the impacts of climate change. California\'s partnerships reflect that the focus, connecting policy and action with strategies that help regions absorb heat, drought, and wildfires.',
      'Subnational leadership also played a prominent role in California Tribal Affairs Secretary Christina Snider-Ashton\'s meetings with leaders of Indigenous Peoples, Santa Catilina\'s Ministry of Indigenous Affairs, focused on ways to respect stewardship and biodiversity protection. These exchanges addressed the how tribal communities are arranged when plans include communities with deep connections to the land.',
      '__IMAGE_PLACEHOLDER__',
      'The US-Latin America climate pact highlights Indigenous leadership, sharing non-tribal knowledge between communities in our hemisphere to foster environmental protection. Photo courtesy of the Office of Governor Gavin Newsom.',
      'The new agreements build on California\'s expanding international climate network. The state maintains partnerships with China, Japan, Canada, and North America, addressing issues from clean energy transition to zero-emission vehicles. California co-chairs the Under2 Coalition, representing over 270 subnational governments committed to keeping global temperature rise well below 2°C, representing more than 1.7 billion people.',
      'For the US-Latin America coalition to succeed, implementation will be key. Each agreement establishes working groups responsible for developing concrete action plans, tracking progress, and reporting on success. Metrics will include tons of greenhouse gas emissions reduced, acres of forest protected, and clean energy deployments.',
      'Clean energy deployment is already accelerating across Latin America, driver by the region\'s abundant solar, wind, and hydropower resources. California\'s experience integrating renewable energy into the grid can serve as a valuable reference point for partner nations working to build reliable, low-carbon energy systems.',
      'Transportation decarbonization is another growing focus. Zero-emission vehicles reduce air pollution, a major health concern in many Latin American cities. Sharing standards for charging infrastructure and fleet electrification can help accelerate the transition to cleaner mobility.',
      'The US-Latin America climate pact positions California as a stable partner for long-term climate cooperation. These agreements operate independently of federal election cycles, providing consistency for steering and investment in climate resilience.',
      'Looking ahead, officials suggest the network will expand to include additional Latin American countries. Reciprocal cooperation creates economies of scale, making new technologies more accessible and affordable for all coalition members.',
      'Ultimately, the US-Latin America agreements signed at COP30 demonstrate that subnational progress does not need to wait for national governments to lead. By connecting regions across continents, these partnerships provide a path forward for preserving ecosystems, strengthening economies, and building a more resilient future for the planet.'
    ]
  },
  {
    id: 3,
    title: 'How to Choose the Right Off-Road Wheels for Any Truck or SUV, for Looks, Efficiency and Safety',
    author: 'Sean Beck',
    date: 'Feb 24, 2026',
    image: '/econews/offroad_wheels.png',
    tags: ['World', 'News'],
    content: [
      'When preparing your vehicle for off-road adventures, selecting the right wheels and tires is one of the most critical decisions you will make. The right combination can dramatically improve traction, clearance, and durability on rugged trails, while the wrong choice can lead to mechanical failure or unsafe handling.',
      'Key factors to consider include wheel size, offset, backspacing, and material. Cast aluminum wheels offer a good balance of strength and weight, while forged or steel wheels are preferred for extreme rock crawling where impact resistance is paramount.',
      'Additionally, understanding how wheel changes affect your vehicle\'s suspension geometry and odometer calibration is essential. Consulting with professionals and selecting high-quality, load-rated wheels ensures that your truck or SUV remains both capable on the trails and safe on the highway.'
    ]
  }
])

const selectedAuthor = ref('All')
const selectedPost = ref<Post | null>(null)

const filteredPosts = computed(() => {
  if (selectedAuthor.value === 'All') {
    return posts.value
  }
  return posts.value.filter(post => post.author === selectedAuthor.value)
})

const selectPost = (post: Post) => {
  selectedPost.value = post
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const deselectPost = () => {
  selectedPost.value = null
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="econews-page">
    <!-- Main Banner (Only shown in list view) -->
    <div v-if="!selectedPost" class="blue-banner">
      <div class="banner-content">
        <h1>Eco News continues to publish environmental campaign articles.</h1>
        <p>If you have your own writing or content you'd like to share, please feel free to send an inquiry to hello@ecosoftgame.com at any time.</p>
      </div>
    </div>

    <!-- Main Content Container -->
    <div class="main-container">
      <!-- List View -->
      <div v-if="!selectedPost" class="list-view">
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

        <!-- Article Grid -->
        <div class="article-grid">
          <div 
            v-for="post in filteredPosts" 
            :key="post.id" 
            class="article-card"
            @click="selectPost(post)"
          >
            <div class="card-image-container">
              <img :src="post.image" :alt="post.title" class="card-image" />
              <!-- Watermark Overlay -->
              <div class="card-watermark">
                <div class="watermark-inner">
                  <div class="watermark-logo"></div>
                  <span>ECOSOFT INTERACTIVE</span>
                </div>
              </div>
            </div>
            <div class="card-body">
              <p class="card-date">{{ post.date }}</p>
              <h3 class="card-title">{{ post.title }}</h3>
              <p class="card-author">Author : {{ post.author }}</p>
              <div class="card-tags">
                <span v-for="tag in post.tags" :key="tag" class="tag-pill">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detail View -->
      <div v-else class="detail-view">
        <button class="return-btn" @click="deselectPost">
          <span class="arrow">&lt;</span> Return
        </button>

        <article class="article-detail">
          <div class="article-header">
            <div class="article-tags">
              <span v-for="tag in selectedPost.tags" :key="tag" class="tag-pill">{{ tag }}</span>
            </div>
            <h1 class="detail-title">{{ selectedPost.title }}</h1>
            <p class="detail-meta">
              By <span class="author-name">{{ selectedPost.author }}</span>
            </p>
            <p class="detail-date">{{ selectedPost.date.toUpperCase() }}</p>
          </div>

          <!-- Main Article Image -->
          <div class="detail-image-container">
            <img :src="selectedPost.image" :alt="selectedPost.title" class="detail-image" />
            <!-- Watermark Overlay -->
            <div class="detail-watermark">
              <div class="watermark-inner">
                <div class="watermark-logo"></div>
                <span>ECOSOFT INTERACTIVE</span>
              </div>
            </div>
          </div>

          <!-- Article Body -->
          <div class="article-content">
            <template v-for="(paragraph, index) in selectedPost.content" :key="index">
              <!-- Lead Paragraph (First Paragraph is larger/bolder) -->
              <p v-if="index === 0" class="lead-text">
                {{ paragraph }}
              </p>
              
              <!-- Check for image placeholder in second article -->
              <div v-else-if="paragraph === '__IMAGE_PLACEHOLDER__'" class="inline-image-section">
                <img src="/econews/climate_pact_delegates.png" alt="Delegates at COP30" class="inline-image" />
                <p class="inline-image-caption">
                  The US-Latin America climate pact highlights Indigenous leadership, sharing non-tribal knowledge between communities in our hemisphere to foster environmental protection. Photo courtesy of the Office of Governor Gavin Newsom.
                </p>
              </div>

              <!-- General Paragraphs -->
              <p v-else class="body-text">
                {{ paragraph }}
              </p>
            </template>
          </div>
        </article>
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
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.2;
  margin: 0 0 1.25rem 0;
  letter-spacing: -0.02em;
}

.banner-content p {
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
</style>
