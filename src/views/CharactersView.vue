<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Character {
  id: string
  name: string
  title: string
  category: 'main' | 'villain' | 'npc'
  isCosmic?: boolean
  element: string
  style: string
  faction: string
  status: 'ATTUNED' | 'WANTED' | 'UNKNOWN'
  statusTag: string
  quote: string
  desc: string
  elementEmoji: string
  energyPill: string
  cardAccent: string
  cardBg: string
  image?: string
}

const charactersData: Character[] = [
  // --- MAIN CHARACTERS ---
  {
    id: 'hi',
    name: 'HI',
    title: 'The Lightning Heart',
    category: 'main',
    element: 'ELECTRIC',
    style: 'MELEE',
    faction: 'ECOPOLIS',
    status: 'ATTUNED',
    statusTag: '★ Lead',
    quote: 'Light\'s not just energy. It\'s a promise.',
    desc: 'The blue planet at the heart of the Hi Planet Team. Channels electrical energy through every swing. First one to charge a barrier, last one to leave a stage. Newcomer-friendly fighter. Protagonist of the comic.',
    elementEmoji: '⚡',
    energyPill: 'Electrical',
    cardAccent: '#22D3EE',
    cardBg: 'rgba(34,211,238,0.18)',
    image: '/character/hi.png'
  },
  {
    id: 'ra',
    name: 'RA',
    title: 'The Solar Flare',
    category: 'main',
    element: 'SOLAR',
    style: 'AOE',
    faction: 'ECOPOLIS',
    status: 'ATTUNED',
    statusTag: 'AOE',
    quote: '"The sun shines on all of us. But some of us can throw it."',
    desc: 'A cheerful warrior who channels raw solar energy. Her energy-blasts can clear entire screens of enemy bots, making her the perfect crowd control fighter.',
    elementEmoji: '☀️',
    energyPill: 'Solar',
    cardAccent: '#FFB627',
    cardBg: 'rgba(255,182,39,0.18)',
    image: '/character/ra.png'
  },
  {
    id: 'moolu',
    name: 'MOOLU',
    title: 'The Eco Architect',
    category: 'main',
    element: 'ECO',
    style: 'LAB',
    faction: 'ECOPOLIS',
    status: 'ATTUNED',
    statusTag: 'LAB',
    quote: '"Nature doesn\'t make garbage. We shouldn\'t either."',
    desc: 'The brain of the team\'s scientific endeavors. Moolu designs clean-energy shields and organic structures to defend Ecopolis against corporate polluters.',
    elementEmoji: '🌱',
    energyPill: 'Eco',
    cardAccent: '#4ADE80',
    cardBg: 'rgba(74,222,128,0.15)',
    image: '/character/moolu.png'
  },
  {
    id: 'satu',
    name: 'SATU',
    title: 'The Stone Bearer',
    category: 'main',
    element: 'GEOTHERMAL',
    style: 'TANK',
    faction: 'ECOPOLIS',
    status: 'ATTUNED',
    statusTag: 'TANK',
    quote: '"Let them hit me. Stone doesn\'t break."',
    desc: 'A defensive giant representing Saturn. Satu channels deep geothermal heat to create rocky barriers and absorb heavy enemy hits for the team.',
    elementEmoji: '🔥',
    energyPill: 'Geothermal',
    cardAccent: '#FF6B35',
    cardBg: 'rgba(255,107,53,0.15)',
    image: '/character/satu.png'
  },
  {
    id: 'merc',
    name: 'MERC',
    title: 'The Wind Walker',
    category: 'main',
    element: 'WIND',
    style: 'FAST',
    faction: 'ECOPOLIS',
    status: 'ATTUNED',
    statusTag: 'FAST',
    quote: '"Catch me if you can."',
    desc: 'An agile speedster who turns wind turbulence and atmospheric drafts into kinetic combat force. Can outrun and outmaneuver any robot unit.',
    elementEmoji: '💨',
    energyPill: 'Wind',
    cardAccent: '#22D3EE',
    cardBg: 'rgba(34,211,238,0.12)',
    image: '/character/merc.png'
  },
  {
    id: 'plu',
    name: 'PLU',
    title: 'The Frost Sentinel',
    category: 'main',
    element: 'ENERGY SAVING',
    style: 'SNIPE',
    faction: 'ECOPOLIS',
    status: 'ATTUNED',
    statusTag: 'SNIPE',
    quote: '"The cold preserves. Everything else fades."',
    desc: 'A quiet sniper from the outer cold edge. Uses perpetual snow to slow down enemies and snipe them from afar with high precision, representing energy conservation.',
    elementEmoji: '🏔️',
    energyPill: 'Energy Saving',
    cardAccent: '#BAE6FD',
    cardBg: 'rgba(186,230,253,0.12)',
    image: '/character/plu.png'
  },
  {
    id: 'v',
    name: 'V',
    title: 'The Light Edge',
    category: 'main',
    element: 'OPTICAL',
    style: 'CRIT',
    faction: 'ECOPOLIS',
    status: 'ATTUNED',
    statusTag: 'CRIT',
    quote: '"Focus the light, and it cuts anything."',
    desc: 'An elegant fencer representing Venus. Refracts and amplifies solar rays into a laser-sharp optical blade capable of critical, high-impact slashes.',
    elementEmoji: '✨',
    energyPill: 'Optical',
    cardAccent: '#FFB627',
    cardBg: 'rgba(255,182,39,0.12)',
    image: '/character/v.png'
  },
  {
    id: 'ura',
    name: 'URA',
    title: 'The Gravity Rider',
    category: 'main',
    element: 'KINETIC',
    style: 'WILD',
    faction: 'ECOPOLIS',
    status: 'ATTUNED',
    statusTag: 'WILD',
    quote: '"What goes up must come down. Hard."',
    desc: 'A reckless skirmisher who manipulates gravity vectors using kinetic energy reserves. Crushes robot ranks with heavy, tilting impacts.',
    elementEmoji: '⚙️',
    energyPill: 'Kinetic',
    cardAccent: '#C8345A',
    cardBg: 'rgba(200,52,90,0.15)',
    image: '/character/ura.png'
  },
  {
    id: 'jupi',
    name: 'JUPI',
    title: 'The Atomic Storm',
    category: 'main',
    element: 'NUCLEAR',
    style: 'CHAIN',
    faction: 'ECOPOLIS',
    status: 'ATTUNED',
    statusTag: 'CHAIN',
    quote: '"One spark is all it takes to trigger a reaction."',
    desc: 'A powerful mage who channels nuclear fusion. Attacks chain between multiple enemies, causing massive collateral damage to robot swarms.',
    elementEmoji: '☢️',
    energyPill: 'Nuclear',
    cardAccent: '#FF6B35',
    cardBg: 'rgba(255,107,53,0.18)',
    image: '/character/jupi.png'
  },
  {
    id: 'nep',
    name: 'NEP',
    title: 'The Tide Lord',
    category: 'main',
    element: 'HYDRO',
    style: 'REACH',
    faction: 'ECOPOLIS',
    status: 'ATTUNED',
    statusTag: 'REACH',
    quote: '"The tides obey only one master."',
    desc: 'A formidable lancer representing Neptune. Spins hydro-turbines on his lance to attack from distance and push back encroaching enemies.',
    elementEmoji: '💧',
    energyPill: 'Hydro',
    cardAccent: '#4A90E2',
    cardBg: 'rgba(74,144,226,0.18)',
    image: '/character/nep.png'
  },
  {
    id: 'ma',
    name: 'MA',
    title: 'The Crimson Memory',
    category: 'main',
    element: 'BIOMASS',
    style: 'SILHOUETTE',
    faction: 'ECOPOLIS',
    status: 'UNKNOWN',
    statusTag: '🔒 Ch.7',
    quote: '"A crimson shadow from the past."',
    desc: 'A mysterious character whose records remain locked in the galactic archives. Requires Episode 1 Chapter 7 DLC to unlock and reveal.',
    elementEmoji: '🌱',
    energyPill: 'Biomass',
    cardAccent: '#9B8FB8',
    cardBg: 'rgba(155,143,184,0.1)',
    image: '/character/ma.png'
  },

  // --- VILLAINS ---
  {
    id: 'cosmic-wormhole',
    name: 'COSMIC WORMHOLE',
    title: 'The Architect',
    category: 'villain',
    isCosmic: true,
    element: 'COSMIC',
    style: 'RIFT',
    faction: 'POLLUTOPIA',
    status: 'WANTED',
    statusTag: '⚠ Source',
    quote: '"This galaxy is mine to clean... by erasing it."',
    desc: 'A massive celestial anomaly and mastermind. Seeks to absorb Earth\'s five core energies to forge the Infinite Power Cosmic Cube.',
    elementEmoji: '🌀',
    energyPill: 'Cosmic Rift',
    cardAccent: '#C8345A',
    cardBg: 'radial-gradient(circle, rgba(200,52,90,0.25) 0%, rgba(42,14,46,0.6) 70%)'
  },
  {
    id: 'mac',
    name: 'MAC',
    title: 'Wood Lieutenant · Ch.1',
    category: 'villain',
    element: 'WOOD',
    style: 'ROBOT',
    faction: 'POLLUTOPIA',
    status: 'WANTED',
    statusTag: '⚠ Wood',
    quote: '"Cut down the trees, build more factories."',
    desc: 'The lieutenant tasked with destroying Mother Gaia Oak in Chapter 1. Drains the sacred tree\'s wood energy to power his industrial machinery.',
    elementEmoji: '🪵',
    energyPill: 'Industrial',
    cardAccent: '#4ADE80',
    cardBg: 'rgba(74,222,128,0.12)'
  },
  {
    id: 'sku',
    name: 'SKU',
    title: 'Water Lieutenant · Ch.2',
    category: 'villain',
    element: 'WATER',
    style: 'SIPHON',
    faction: 'POLLUTOPIA',
    status: 'WANTED',
    statusTag: '⚠ Water',
    quote: '"Every drop will belong to our empire."',
    desc: 'The commander in charge of Chapter 2\'s desert assault. Uses massive siphon pumps to steal Crystal Aqua Spring\'s water energy.',
    elementEmoji: '🌊',
    energyPill: 'Siphon Gfx',
    cardAccent: '#22D3EE',
    cardBg: 'rgba(34,211,238,0.12)'
  },
  {
    id: 'roc',
    name: 'ROC',
    title: 'Fire Lieutenant · Ch.3',
    category: 'villain',
    element: 'FIRE',
    style: 'LAVA',
    faction: 'POLLUTOPIA',
    status: 'WANTED',
    statusTag: '⚠ Fire',
    quote: '"Let the world burn so we can rebuild."',
    desc: 'A ruthless fire lieutenant overseeing the lava mines of Chapter 3. Unleashes volcanic wild fires to scorch the lands and extract fire energy.',
    elementEmoji: '🔥',
    energyPill: 'Volcanic',
    cardAccent: '#FF6B35',
    cardBg: 'rgba(255,107,53,0.12)'
  },
  {
    id: 'zom',
    name: 'ZOM',
    title: 'Stone Lieutenant · Ch.4',
    category: 'villain',
    element: 'STONE',
    style: 'FROST',
    faction: 'POLLUTOPIA',
    status: 'WANTED',
    statusTag: '⚠ Stone',
    quote: '"Frozen solid. Perfect for crushing."',
    desc: 'The commander of Chapter 4\'s arctic base. Prowls the breaking ice sheets with his Frost Cerberus, guarding a stolen stone energy core.',
    elementEmoji: '🪨',
    energyPill: 'Permafrost',
    cardAccent: '#9B8FB8',
    cardBg: 'rgba(155,143,184,0.12)'
  },
  {
    id: 'kra',
    name: 'KRA',
    title: 'Metal Lieutenant · Ch.5',
    category: 'villain',
    element: 'METAL',
    style: 'MUTANT',
    faction: 'SEABED',
    status: 'WANTED',
    statusTag: '⚠ Metal',
    quote: '"Your trash made me. Now I will make your doom."',
    desc: 'A massive mutated sea creature. Once an ordinary octopus, radioactive waste mutated him into a metal-plated titan of rage. Not allied with the Wormhole.',
    elementEmoji: '🔩',
    energyPill: 'Toxic Metal',
    cardAccent: '#FFB627',
    cardBg: 'rgba(255,182,39,0.12)'
  },

  // --- NPCs ---
  {
    id: 'big-bang-theory',
    name: 'BIG BANG THEORY',
    title: 'The Galactic Artisan',
    category: 'npc',
    isCosmic: true,
    element: 'CREATIVE',
    style: 'DEITY',
    faction: 'ECOPOLIS',
    status: 'ATTUNED',
    statusTag: 'CREATOR',
    quote: '"The cosmos is a canvas, and I am the brush."',
    desc: 'A primordial cosmic deity who helped build the universe, Ecopolis, and the stages. Watches over the planets with silent care.',
    elementEmoji: '🌌',
    energyPill: 'Primordial',
    cardAccent: '#2E5BCC',
    cardBg: 'rgba(46,91,204,0.18)'
  },
  {
    id: 'professor-oracle',
    name: 'PROFESSOR ORACLE',
    title: 'The Cosmic Sage',
    category: 'npc',
    element: 'KNOWLEDGE',
    style: 'MENTOR',
    faction: 'ECOPOLIS',
    status: 'ATTUNED',
    statusTag: 'MENTOR',
    quote: '"Knowledge is the ultimate energy."',
    desc: 'A wise scholar who operates the Stellar Burst Academy. Handles quest assignments, provides daily missions, and archives galaxy history.',
    elementEmoji: '🎓',
    energyPill: 'Virtual VR',
    cardAccent: '#22D3EE',
    cardBg: 'rgba(34,211,238,0.12)'
  },
  {
    id: 'athen',
    name: 'ATHEN',
    title: 'The Celestial Warrior',
    category: 'npc',
    element: 'COMBAT',
    style: 'TRAINER',
    faction: 'ECOPOLIS',
    status: 'ATTUNED',
    statusTag: 'TRAINER',
    quote: '"Pain is the best teacher, but I am a close second."',
    desc: 'Commander of the Galactic Combat Arena. Trains the Hi Planet Team in tactical melee combat, projectile defense, and team battle formations.',
    elementEmoji: '⚔️',
    energyPill: 'Martial',
    cardAccent: '#22D3EE',
    cardBg: 'rgba(34,211,238,0.15)'
  },
  {
    id: 'gig',
    name: 'GIG',
    title: 'Planetary Systems Engineer',
    category: 'npc',
    element: 'TECH',
    style: 'ENGINEER',
    faction: 'ECOPOLIS',
    status: 'ATTUNED',
    statusTag: 'ENGINEER',
    quote: '"If it\'s broken, I can fix it. If it works, I can make it better."',
    desc: 'A genius systems engineer in charge of Ecopolis\' power grid and clean energy maintenance. Often seen tweaking solar panels and core gear.',
    elementEmoji: '🔧',
    energyPill: 'Goggles/Tools',
    cardAccent: '#FFB627',
    cardBg: 'rgba(255,182,39,0.18)'
  },
  {
    id: 'savi',
    name: 'SAVI',
    title: 'The Cosmic Recycler',
    category: 'npc',
    element: 'ECO',
    style: 'RECYCLE',
    faction: 'ECOPOLIS',
    status: 'ATTUNED',
    statusTag: 'RECYCLER',
    quote: '"One planet\'s trash is a galaxy\'s treasure."',
    desc: 'Runs the Cosmic Recycling Center. Converts scrap metal, plastics, and industrial waste into useful items, skins, and upgrades for the heroes.',
    elementEmoji: '♻️',
    energyPill: 'Eco Salvage',
    cardAccent: '#C7E83F',
    cardBg: 'rgba(199,232,63,0.15)'
  },
  {
    id: 'qq',
    name: 'QQ',
    title: 'Quantum Quicksilver',
    category: 'npc',
    element: 'SPACE',
    style: 'GATEWAY',
    faction: 'ECOPOLIS',
    status: 'ATTUNED',
    statusTag: 'GATEWAY',
    quote: '"Space is only as big as you make it."',
    desc: 'A master of spatial displacement. Opens quantum wormholes and teleports to ferry characters between Ecopolis and remote missions in a flash.',
    elementEmoji: '🌌',
    energyPill: 'Teleport',
    cardAccent: '#9B8FB8',
    cardBg: 'rgba(155,143,184,0.15)'
  },
  {
    id: 'pua',
    name: 'PUA',
    title: 'The Cube Merchant',
    category: 'npc',
    element: 'TRADE',
    style: 'MERCHANT',
    faction: 'ECOPOLIS',
    status: 'ATTUNED',
    statusTag: 'MERCHANT',
    quote: '"Cubes, shards, crystals... what are you buying?"',
    desc: 'The mysterious merchant at the Cosmic Forum Hub. Trades rare Eco Cubes for upgrades, gear, cosmetic items, and secret blueprints.',
    elementEmoji: '💎',
    energyPill: 'Merchant',
    cardAccent: '#4ADE80',
    cardBg: 'rgba(74,222,128,0.12)'
  },
  {
    id: 'satellizens',
    name: 'SATELLIZENS',
    title: 'The Cosmic Watchers',
    category: 'npc',
    isCosmic: true,
    element: 'SATELLITE',
    style: 'GUARDIAN',
    faction: 'ORBIT',
    status: 'ATTUNED',
    statusTag: 'GUARDIANS',
    quote: '"We watch, we wait, we warn."',
    desc: 'A group of floating robotic guardians that orbit the planets, detecting incoming wormholes and warning the heroes of danger.',
    elementEmoji: '🛰️',
    energyPill: 'Guardians',
    cardAccent: '#BAE6FD',
    cardBg: 'rgba(186,230,253,0.1)'
  }
]

const activeTab = ref<'all' | 'main' | 'villain' | 'npc' | 'cosmic'>('all')
const featuredCharacterId = ref<string>('hi')

const featuredCharacter = computed<Character>(() => {
  return charactersData.find(c => c.id === featuredCharacterId.value) || charactersData[0]
})

const filteredMainCharacters = computed(() => {
  if (activeTab.value === 'all' || activeTab.value === 'main') {
    return charactersData.filter(c => c.category === 'main')
  }
  return []
})

const filteredVillains = computed(() => {
  if (activeTab.value === 'all' || activeTab.value === 'villain') {
    return charactersData.filter(c => c.category === 'villain')
  }
  return []
})

const filteredNPCs = computed(() => {
  if (activeTab.value === 'all' || activeTab.value === 'npc') {
    return charactersData.filter(c => c.category === 'npc' && !c.isCosmic)
  }
  return []
})

const filteredCosmic = computed(() => {
  if (activeTab.value === 'all' || activeTab.value === 'cosmic') {
    return charactersData.filter(c => c.isCosmic)
  }
  return []
})

const selectCharacter = (character: Character) => {
  featuredCharacterId.value = character.id
  
  // Smooth scroll up to the spotlight area
  const spotlightEl = document.getElementById('spotlight')
  if (spotlightEl) {
    spotlightEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

// Lightbox modal logic
const activePopupImage = ref<string | null>(null)
const activePopupTitle = ref<string>('')

const openPopup = (character: Character) => {
  if (character.image) {
    activePopupImage.value = character.image
    activePopupTitle.value = character.name
    document.body.style.overflow = 'hidden'
  }
}

const closePopup = () => {
  activePopupImage.value = null
  activePopupTitle.value = ''
  document.body.style.overflow = ''
}

// Scroll animation trigger (similar to HomeView intersection observer)
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('visible')
      }
    })
  }, { threshold: 0.05 })

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
})
</script>

<template>
  <section id="characters-page" class="characters-section">
    <div class="stars-overlay"></div>

    <!-- ============ INTRO ============ -->
    <div class="intro-container">
      <div class="section-tag-line">The Roster</div>

      <h1 class="reveal page-headline font-display">
        <span class="white-text">MEET</span><br />
        <span class="blue-text">THE CAST.</span>
      </h1>

      <p class="reveal page-intro-desc font-space">
        Heroes from across the cosmos. Villains who want what isn't theirs.
        And the quiet ones who hold Ecopolis together.
      </p>
    </div>

    <!-- ============ TAB BAR ============ -->
    <div class="tabs-container">
      <div class="tabs-wrapper">
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'all' }" 
          @click="activeTab = 'all'"
        >
          ★ All
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'main' }" 
          @click="activeTab = 'main'"
        >
          Main Characters
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'villain' }" 
          @click="activeTab = 'villain'"
        >
          Villains
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'npc' }" 
          @click="activeTab = 'npc'"
        >
          NPCs
        </button>
        <button 
          class="tab-btn" 
          :class="{ active: activeTab === 'cosmic' }" 
          @click="activeTab = 'cosmic'"
        >
          Cosmic Forces
        </button>
      </div>
    </div>

    <!-- ============ FEATURED SPOTLIGHT ============ -->
    <div id="spotlight" class="spotlight-container reveal">
      <div class="featured-wrapper" :style="{ '--card-accent': featuredCharacter.cardAccent }">
        <div class="orbit-deco"></div>

        <div class="spotlight-grid">
          <!-- Card Column -->
          <div class="spotlight-card-col">
            <div 
              class="tc" 
              :class="{
                'status-attuned': featuredCharacter.status === 'ATTUNED',
                'status-wanted': featuredCharacter.status === 'WANTED',
                'status-unknown': featuredCharacter.status === 'UNKNOWN'
              }"
              :style="{ 
                '--card-accent': featuredCharacter.cardAccent,
                '--card-bg': featuredCharacter.cardBg 
              }"
              @click="openPopup(featuredCharacter)"
            >
              <div class="tc-banner">
                <div class="tc-banner-text">
                  <div class="tc-name">{{ featuredCharacter.name }}</div>
                  <div class="tc-title">{{ featuredCharacter.title }}</div>
                </div>
              </div>
              
              <div class="tc-art">
                <img 
                  v-if="featuredCharacter.image" 
                  :src="featuredCharacter.image" 
                  :alt="featuredCharacter.name" 
                  class="tc-art-img" 
                />
                <div v-else class="tc-art-placeholder">
                  <div class="initials font-display">{{ featuredCharacter.name.slice(0, 2) }}</div>
                  <div class="sub-placeholder opacity-60">NO SPRITE</div>
                </div>
              </div>

              <div class="tc-status">
                <div class="tc-status-label">{{ featuredCharacter.status }}</div>
                <div class="tc-status-mini">{{ featuredCharacter.statusTag }}</div>
              </div>
            </div>
          </div>

          <!-- Info/Bio Column -->
          <div class="spotlight-info-col">
            <div class="spotlight-pill-row">
              <span class="spotlight-tag">Now Featured</span>
              <span class="energy-pill">
                <span class="energy-pill-dot"></span>
                {{ featuredCharacter.energyPill }}
              </span>
            </div>

            <h3 class="spotlight-name font-display">{{ featuredCharacter.name }}</h3>
            
            <p class="spotlight-quote font-space">
              "{{ featuredCharacter.quote }}"
            </p>

            <p class="spotlight-desc font-space">
              {{ featuredCharacter.desc }}
            </p>

            <!-- Stats Block -->
            <div class="stats-grid">
              <div class="stat-box">
                <div class="stat-label">Element</div>
                <div class="stat-value font-display">{{ featuredCharacter.element }} {{ featuredCharacter.elementEmoji }}</div>
              </div>
              <div class="stat-box">
                <div class="stat-label">Style</div>
                <div class="stat-value font-display">{{ featuredCharacter.style }}</div>
              </div>
              <div class="stat-box">
                <div class="stat-label">Faction</div>
                <div class="stat-value font-display">{{ featuredCharacter.faction }}</div>
              </div>
            </div>

            <p class="spotlight-tip">
              ↓ Click any card below to feature
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================
         MAIN CHARACTERS SECTION
    ============================================================ -->
    <div v-if="filteredMainCharacters.length > 0" class="section-container">
      <div class="section-header">
        <div>
          <div class="section-subline accent-cyan">Main Characters</div>
          <h3 class="section-title font-display">
            THE <span class="accent-neon-blue">HI PLANET TEAM.</span>
          </h3>
        </div>
        <div class="section-count">
          11 cards · 10 attuned · 1 locked
        </div>
      </div>

      <div class="card-grid">
        <div 
          v-for="char in filteredMainCharacters" 
          :key="char.id"
          class="tc"
          :class="{
            'status-attuned': char.status === 'ATTUNED',
            'status-wanted': char.status === 'WANTED',
            'status-unknown': char.status === 'UNKNOWN'
          }"
          :style="{ 
            '--card-accent': char.cardAccent,
            '--card-bg': char.cardBg 
          }"
          @click="selectCharacter(char)"
        >
          <div class="tc-banner">
            <div class="tc-banner-text">
              <div class="tc-name">{{ char.name }}</div>
              <div class="tc-title">{{ char.title }}</div>
            </div>
          </div>
          <div class="tc-art">
            <img v-if="char.image" :src="char.image" :alt="char.name" class="tc-art-img" />
            <div v-else class="tc-art-placeholder">
              <div class="initials font-display">{{ char.name.slice(0, 2) }}</div>
            </div>
          </div>
          <div class="tc-status">
            <div class="tc-status-label">{{ char.status }}</div>
            <div class="tc-status-mini">{{ char.statusTag }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================
         VILLAINS SECTION
    ============================================================ -->
    <div v-if="filteredVillains.length > 0" class="section-container">
      <div class="section-header">
        <div>
          <div class="section-subline accent-cyan">Villains</div>
          <h3 class="section-title font-display">
            THE <span class="accent-neon-blue">OPPOSING FORCE.</span>
          </h3>
        </div>
        <div class="section-count warning-color">
          ⚠ Approach with caution
        </div>
      </div>

      <div class="card-grid">
        <div 
          v-for="char in filteredVillains" 
          :key="char.id"
          class="tc"
          :class="{
            'status-attuned': char.status === 'ATTUNED',
            'status-wanted': char.status === 'WANTED',
            'status-unknown': char.status === 'UNKNOWN'
          }"
          :style="{ 
            '--card-accent': char.cardAccent,
            '--card-bg': char.cardBg 
          }"
          @click="selectCharacter(char)"
        >
          <div class="tc-banner">
            <div class="tc-banner-text">
              <div class="tc-name">{{ char.name }}</div>
              <div class="tc-title">{{ char.title }}</div>
            </div>
          </div>
          <div class="tc-art">
            <img v-if="char.image" :src="char.image" :alt="char.name" class="tc-art-img" />
            <div v-else class="tc-art-placeholder">
              <div class="initials font-display">{{ char.name.slice(0, 2) }}</div>
            </div>
          </div>
          <div class="tc-status">
            <div class="tc-status-label">{{ char.status }}</div>
            <div class="tc-status-mini">{{ char.statusTag }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================
         NPCs SECTION
    ============================================================ -->
    <div v-if="filteredNPCs.length > 0" class="section-container">
      <div class="section-header">
        <div>
          <div class="section-subline accent-cyan">NPCs · Ecopolis & Beyond</div>
          <h3 class="section-title font-display">
            THE <span class="accent-neon-blue">QUIET POWER.</span>
          </h3>
          <p class="section-caption font-space">
            They don't fight on the field. They built the city, the team, and the universe itself.
          </p>
        </div>
      </div>

      <div class="card-grid">
        <div 
          v-for="char in filteredNPCs" 
          :key="char.id"
          class="tc"
          :class="{
            'status-attuned': char.status === 'ATTUNED',
            'status-wanted': char.status === 'WANTED',
            'status-unknown': char.status === 'UNKNOWN'
          }"
          :style="{ 
            '--card-accent': char.cardAccent,
            '--card-bg': char.cardBg 
          }"
          @click="selectCharacter(char)"
        >
          <div class="tc-banner">
            <div class="tc-banner-text">
              <div class="tc-name">{{ char.name }}</div>
              <div class="tc-title">{{ char.title }}</div>
            </div>
          </div>
          <div class="tc-art">
            <img v-if="char.image" :src="char.image" :alt="char.name" class="tc-art-img" />
            <div v-else class="tc-art-placeholder">
              <div class="initials font-display">{{ char.name.slice(0, 2) }}</div>
            </div>
          </div>
          <div class="tc-status">
            <div class="tc-status-label">{{ char.status }}</div>
            <div class="tc-status-mini">{{ char.statusTag }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================
         COSMIC FORCES SECTION (Active only when Cosmic tab selected)
    ============================================================ -->
    <div v-if="filteredCosmic.length > 0" class="section-container">
      <div class="section-header">
        <div>
          <div class="section-subline accent-cyan">Cosmic Forces</div>
          <h3 class="section-title font-display">
            THE <span class="accent-neon-blue">COSMIC ORDER.</span>
          </h3>
          <p class="section-caption font-space">
            Primordial forces, space watchers, and dimensional gateways.
          </p>
        </div>
      </div>

      <div class="card-grid">
        <div 
          v-for="char in filteredCosmic" 
          :key="char.id"
          class="tc"
          :class="{
            'status-attuned': char.status === 'ATTUNED',
            'status-wanted': char.status === 'WANTED',
            'status-unknown': char.status === 'UNKNOWN'
          }"
          :style="{ 
            '--card-accent': char.cardAccent,
            '--card-bg': char.cardBg 
          }"
          @click="selectCharacter(char)"
        >
          <div class="tc-banner">
            <div class="tc-banner-text">
              <div class="tc-name">{{ char.name }}</div>
              <div class="tc-title">{{ char.title }}</div>
            </div>
          </div>
          <div class="tc-art">
            <img v-if="char.image" :src="char.image" :alt="char.name" class="tc-art-img" />
            <div v-else class="tc-art-placeholder">
              <div class="initials font-display">{{ char.name.slice(0, 2) }}</div>
            </div>
          </div>
          <div class="tc-status">
            <div class="tc-status-label">{{ char.status }}</div>
            <div class="tc-status-mini">{{ char.statusTag }}</div>
          </div>
        </div>
      </div>
    </div>

    <p class="footer-hint">
      + More NPCs to be revealed across the comic & game
    </p>

    <!-- ============ CTA STRIP ============ -->
    <div class="cta-section">
      <div class="stars-overlay opacity-25"></div>
      <div class="cta-glow"></div>
      
      <div class="cta-content">
        <h3 class="cta-title font-display">
          <span class="white-text">EVERY CARD HAS</span><br />
          <span class="accent-neon-blue">A STORY.</span>
        </h3>
        <p class="cta-desc font-space">
          Each character started on the page. 200+ pages of art, story, and origins
          waiting to be opened.
        </p>

        <div class="cta-buttons">
          <RouterLink to="/comic" class="btn-comic-book font-display">
            📖 Read the Comic
          </RouterLink>
          <a href="https://store.steampowered.com/app/4745340/Hi_Planet_Save_The_Earth/?beta=1" target="_blank" class="btn-steam font-display">
            ▶ Wishlist on Steam
          </a>
        </div>
      </div>
    </div>

    <!-- ============ POPUP MODAL LIGHTBOX ============ -->
    <Transition name="fade">
      <div v-if="activePopupImage" class="lightbox-overlay" @click.self="closePopup">
        <button class="lightbox-close" @click="closePopup" aria-label="Close lightbox">✕</button>
        <div class="lightbox-content">
          <img :src="activePopupImage" :alt="activePopupTitle" class="lightbox-img" />
          <div class="lightbox-caption font-display">{{ activePopupTitle }}</div>
        </div>
      </div>
    </Transition>

  </section>
</template>

<style scoped>
/* Page Layout */
.characters-section {
  position: relative;
  color: var(--cream);
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  padding-top: calc(clamp(75px, 6vw, 90px) + 2rem);
}

/* Background overlay details */
.stars-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    radial-gradient(1.5px 1.5px at 12% 24%, rgba(255, 255, 255, 0.9), transparent),
    radial-gradient(1px 1px at 58% 71%, rgba(255, 255, 255, 0.6), transparent),
    radial-gradient(2px 2px at 82% 18%, rgba(255, 255, 255, 0.85), transparent),
    radial-gradient(1px 1px at 38% 82%, rgba(255, 255, 255, 0.55), transparent),
    radial-gradient(1.5px 1.5px at 91% 44%, rgba(255, 255, 255, 0.8), transparent),
    radial-gradient(1px 1px at 28% 58%, rgba(255, 255, 255, 0.5), transparent);
  z-index: 0;
  opacity: 0.25;
}

/* Typography & Fonts */
.font-display {
  font-family: 'Anton', sans-serif;
  letter-spacing: 0.02em;
}

.font-serif {
  font-family: 'Fraunces', serif;
}

.font-space {
  font-family: "Space Grotesk", "Space Grotesk Placeholder", sans-serif;
}

.font-pixel {
  font-family: 'Press Start 2P', system-ui;
}

/* Accent Colors */
.accent-cyan { color: var(--cyan); }
.accent-neon-blue { color: var(--neon-blue); }
.accent-amber { color: var(--amber); }
.accent-magenta { color: var(--magenta); }
.accent-blue { color: var(--earth); }
.accent-coral { color: var(--coral); }

/* Intro container styling */
.intro-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(4rem, 4vw, 8rem) 1.5rem clamp(2rem, 4vw, 4rem) 1.5rem;
  text-align: center;
  z-index: 2;
}

.section-tag-line {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--blue);
}

.section-tag-line::before {
  content: "";
  width: 40px;
  height: 1px;
  background: currentColor;
  opacity: 0.7;
}

.page-headline {
  font-size: clamp(3.5rem, 13vw, 12rem);
  line-height: 0.85;
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 0 6px 30px rgba(0,0,0,0.7);
}

.white-text {
  color: #ffffff;
}

.blue-text {
  color: var(--neon-blue);
}

.page-intro-desc {
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: rgb(255, 245, 229);
  line-height: 1.6;
  max-width: 42rem;
  margin: 0 auto;
}

/* Animations */
.reveal {
  opacity: 0;
  transform: translateY(25px);
  transition: opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Tabs styles */
.tabs-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto clamp(3rem, 5vw, 5rem) auto;
  padding: 0 1.5rem;
  z-index: 2;
}

.tabs-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.5rem, 1vw, 1.25rem);
  justify-content: center;
  border-bottom: 1px solid rgb(255, 245, 229);
  padding-bottom: clamp(1.5rem, 3vw, 2.5rem);
}

.tab-btn {
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.68rem, 0.75vw, 0.8rem);
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--muted);
  text-decoration: none;
  padding: 0.6rem clamp(0.6rem, 1vw, 1.25rem);
  border-radius: 6px;
  transition: all 0.2s;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
}

.tab-btn:hover,
.tab-btn.active {
  color: #fff;
  background: var(--neon-blue);
  border-color: var(--neon-blue);
  box-shadow: 0 0 15px var(--blue-glow);
}

/* Featured spotlight container */
.spotlight-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto clamp(4rem, 7vw, 7rem) auto;
  padding: 0 1.5rem;
  z-index: 2;
}

.featured-wrapper {
  background: 
    radial-gradient(ellipse 60% 70% at 30% 50%, rgba(34, 211, 238, 0.1) 0%, transparent 60%),
    radial-gradient(ellipse 50% 70% at 80% 50%, rgba(255, 107, 53, 0.08) 0%, transparent 60%),
    linear-gradient(180deg, var(--deep-blue) 0%, var(--midnight) 100%);
  border: 2px solid rgb(255, 245, 229);
  padding: clamp(2.5rem, 4vw, 4rem);
  position: relative;
  overflow: hidden;
}

.orbit-deco {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.orbit-deco::before,
.orbit-deco::after {
  content: "✦";
  position: absolute;
  color: rgba(255, 245, 229, 0.15);
  font-size: 12px;
}

.orbit-deco::before { top: 15%; left: 8%; }
.orbit-deco::after { bottom: 20%; right: 12%; }

.spotlight-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  align-items: center;
  position: relative;
}

@media (min-width: 768px) {
  .spotlight-grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  .spotlight-card-col {
    grid-column: span 2 / span 2;
  }
  .spotlight-info-col {
    grid-column: span 3 / span 3;
    padding-left: 1rem;
  }
}

/* Spotlight elements */
.spotlight-pill-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.spotlight-tag {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: var(--card-accent, var(--cyan));
  font-weight: 700;
}

.energy-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border: 1px solid var(--card-accent, var(--coral));
  color: var(--card-accent, var(--coral));
  font-family: 'Press Start 2P', system-ui;
  font-size: 8px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.energy-pill-dot {
  width: 6px;
  height: 6px;
  background: var(--card-accent, var(--coral));
  border-radius: 50%;
}

.spotlight-name {
  font-size: clamp(2.5rem, 11vw, 11.5rem);
  line-height: 0.9;
  color: var(--card-accent, var(--cyan));
  margin-bottom: 1rem;
}

.spotlight-quote {
  font-size: 1.15rem;
  color: rgb(255, 245, 229);
  margin-bottom: 1.25rem;
  line-height: 1.5;
}

.spotlight-desc {
  font-size: 0.95rem;
  color: rgb(255, 245, 229);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.stat-box {
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 245, 229, 0.1);
  text-align: center;
}

.featured-wrapper .stat-box {
  border-color: rgb(255, 255, 255);
}

.stat-label {
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: rgb(255, 245, 229);
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 13px;
  color: var(--card-accent, var(--cyan));
  letter-spacing: 0.05em;
}

.spotlight-tip {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: rgb(255, 245, 229);
  font-weight: 600;
}

/* Sections */
.section-container {
  position: relative;
  max-width: 1660px;
  margin: 0 auto clamp(5rem, 8vw, 8rem) auto;
  padding: 0 1.5rem;
  z-index: 2;
}

.dark-purple-bg {
  max-width: 100%;
  margin: 0 0 clamp(5rem, 8vw, 8rem) 0;
  padding: clamp(5rem, 8vw, 8rem) 0;
  background-color: var(--deep-purple);
  overflow: hidden;
}

.dark-purple-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 50% at 50% 40%, rgba(200, 52, 90, 0.15) 0%, transparent 60%);
  pointer-events: none;
}

.inner-section-wrapper {
  max-width: 1660px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 2;
}

.section-header {
  margin-bottom: 4rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.section-subline {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-weight: 600;
  margin-bottom: 20px;
  position: relative;
  padding-left: 20px;
}

.section-subline::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 1px;
  background: currentColor;
  opacity: 0.7;
}

.section-title {
  font-size: clamp(3rem, 10vw, 8rem);
  line-height: 0.82;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 2rem;
  text-shadow: 0 10px 40px rgba(0,0,0,0.8);
}

.section-count {
  font-size: 12px;
  color: rgb(255, 245, 229);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 600;
}

.warning-color {
  /* color: var(--magenta); */
}

.section-caption {
  font-size: clamp(1rem, 2vw, 1.5rem);
  /* font-style: italic; */
  color: rgb(255, 245, 229);
  margin-top: 0.75rem;
  max-width: 40rem;
}

/* Card Grid layout */
.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }
}

@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.max-w-5xl {
  max-width: 64rem;
  margin-left: auto;
  margin-right: auto;
}

/* TRADING CARD STYLING */
.tc {
  position: relative;
  aspect-ratio: 3 / 4;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%);
  border: 2px solid rgba(255, 245, 229, 0.15);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
}

.tc:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5), 0 0 0 2px var(--card-accent, var(--cream));
}

/* Banner (top) */
.tc-banner {
  position: relative;
  padding: 10px 14px;
  background: var(--card-accent, var(--coral));
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  z-index: 2;
}

.tc-banner::before,
.tc-banner::after {
  content: "✦";
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  flex-shrink: 0;
}

.tc-banner-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.1;
  text-align: center;
}

.tc-name {
  font-family: 'Anton', sans-serif;
  font-size: clamp(14px, 1.5vw, 17px);
  letter-spacing: 0.08em;
  color: var(--midnight);
}

.tc-title {
  font-size: 7.5px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(10, 24, 52, 0.7);
  margin-top: 1px;
}

/* Art area */
.tc-art {
  position: relative;
  flex: 1;
  background:
    repeating-linear-gradient(45deg, rgba(255, 245, 229, 0.04) 0 8px, transparent 8px 16px),
    var(--card-bg, rgba(74, 144, 226, 0.15));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.tc-art::before,
.tc-art::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  border: 1.5px dashed rgba(255, 245, 229, 0.2);
  z-index: 1;
}

.tc-art::before { top: 8px; left: 8px; }
.tc-art::after { bottom: 8px; right: 8px; }

.tc-art-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 2;
  transition: transform 0.5s ease;
}

.tc:hover .tc-art-img {
  transform: scale(1.05);
}

.tc-art-placeholder {
  color: rgba(255, 245, 229, 0.4);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.tc-art-placeholder .initials {
  font-size: 2.5rem;
  letter-spacing: 0.05em;
  color: rgba(255, 245, 229, 0.15);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.tc-art-placeholder .sub-placeholder {
  font-family: 'Press Start 2P', system-ui;
  font-size: 8px;
  letter-spacing: 0.1em;
}

/* Bottom status tag */
.tc-status {
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px 12px;
  background: var(--midnight);
  border-top: 1px solid rgba(255, 245, 229, 0.12);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
}

.tc-status-label {
  font-family: 'Anton', sans-serif;
  font-size: 12px;
  letter-spacing: 0.15em;
  color: var(--cream);
}

.tc-status-mini {
  font-size: 7px;
  letter-spacing: 0.15em;
  color: rgba(255, 245, 229, 0.45);
  font-family: 'Press Start 2P', system-ui;
}

/* Status variants */
.status-attuned .tc-status-label {
  color: var(--card-accent);
}

.status-unknown .tc-status {
  background: #1a0a1f;
}

.status-unknown .tc-status-label {
  color: rgba(255, 245, 229, 0.55);
}

.status-wanted .tc-status {
  background: rgba(200, 52, 90, 0.2);
}

.status-wanted .tc-status-label {
  color: var(--magenta);
}

.footer-hint {
  margin: 3rem 0 5rem 0;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: rgb(255, 245, 229);
  font-weight: 600;
  text-align: center;
}

/* CTA STRIP */
.cta-section {
  position: relative;
  padding: clamp(6rem, 10vw, 12rem) 0;
  overflow: hidden;
  border-top: 1px solid rgb(255, 245, 229);
  text-align: center;
}

.cta-section::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 50% 60% at 50% 50%, rgba(255, 107, 53, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

.cta-content {
  position: relative;
  max-width: 60rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  z-index: 2;
}

.cta-title {
  font-size: clamp(3.5rem, 13vw, 12rem);
  line-height: 0.9;
  margin-bottom: 1rem;
}

.cta-desc {
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: rgb(255, 245, 229);
  margin-bottom: 2rem;
  max-width: 36rem;
  margin-left: auto;
  margin-right: auto;
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

.btn-comic-book {
  font-size: 1rem;
  padding: 1rem 2rem;
  background: var(--coral);
  color: var(--midnight);
  border: 2px solid var(--coral);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  box-shadow: 5px 5px 0 var(--cream);
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-comic-book:hover {
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0 var(--cream);
}

.btn-steam {
  font-size: 1rem;
  padding: 1rem 1.5rem;
  background: transparent;
  color: var(--cream);
  border: 2px solid rgba(255, 245, 229, 0.4);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  transition: all 0.2s ease;
}

.btn-steam:hover {
  border-color: var(--cream);
  background-color: var(--cream);
  color: var(--midnight);
}

/* Lightbox Modal */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 24, 52, 0.96);
  backdrop-filter: blur(12px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.lightbox-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--cream);
  width: 46px;
  height: 46px;
  border-radius: 50%;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 1010;
}

.lightbox-close:hover {
  background: var(--coral);
  border-color: var(--coral);
  color: var(--midnight);
  transform: rotate(90deg);
}

.lightbox-content {
  position: relative;
  max-width: 95vw;
  max-height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: zoom-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.lightbox-img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  box-shadow: 0 30px 70px rgba(0, 0, 0, 0.8);
}

.lightbox-caption {
  margin-top: 1.5rem;
  font-size: clamp(1.5rem, 3.5vw, 2.5rem);
  color: var(--cream);
  letter-spacing: 0.05em;
  text-shadow: 0 2px 8px rgba(0,0,0,0.5);
}

/* Vue Transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes zoom-in {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
