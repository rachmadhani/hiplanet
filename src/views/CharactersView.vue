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
    desc: 'Hi represents Earth among the 12 planets, beloved by the Big Bang Theory and admired for his close relationships with the other celestial beings. His strongest bond is with Moolu, his inseparable companion, akin to the relationship between Earth and its Moon. Together, they form a harmonious duo, with Moolu serving as the vital power source for Hi\'s high-voltage abilities. Hi wields the power to generate intense electrical currents, using them to stun or immobilize adversaries, prioritizing peace and fairness over violence. This ability is crucial in maintaining balance and harmony in the cosmos, and his partnership with Moolu makes them a formidable force during cosmic conflicts. Cheerful, intelligent, and cooperative, Hi thrives on collaboration with other planets. He values knowledge and seeks to promote harmony across the universe, often interacting with various civilizations and fostering peace. As Earth’s guardian, Hi embodies the spirit of unity, using his powers and wisdom to protect and guide his cosmic family.',
    elementEmoji: '⚡',
    energyPill: 'Electrical',
    cardAccent: '#22D3EE',
    cardBg: 'rgba(34,211,238,0.18)',
    image: '/character/characters-website/Hi_Website.png'
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
    quote: 'The sun shines on all of us. But some of us can throw it.',
    desc: 'Ra is a celestial entity among the 12 planets, embodying the Sun\'s immense power. Harnessing the scorching flames and heat of the Sun, Ra wields the ability to unleash immense flames from his hands, combining his energy with the Sun\'s fiery essence. In battles, he takes a commanding role, guiding and inspiring his allies to become formidable warriors, though his impulsiveness sometimes leads to significant errors. Ra\'s fiery temperament reflects his passionate nature, amplifying his powers like the Sun\'s heat but occasionally clouding his judgment. Proud of his connection to the Sun, he views himself as its ultimate embodiment, using his strength to protect and lead the other planets. However, this elevated sense of self can sometimes create tension in his relationships. Radiating an aura of scorching flames, Ra symbolizes the Sun\'s glory and strength. While his intense energy can cause instability, his passion and leadership also inspire courage and determination in those around him.',
    elementEmoji: '☀️',
    energyPill: 'Solar',
    cardAccent: '#FFB627',
    cardBg: 'rgba(255,182,39,0.18)',
    image: '/character/characters-website/Ra_Website.png'
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
    quote: 'Let them hit me. Stone doesn\'t break.',
    desc: 'Satu is a planet infused with the power of Saturn, embodying a sense of justice while being a reserved individual. Though not very talkative, his actions always reflect a strong sense of righteousness. The meteors that pour forth from his hands wield immense power, protecting others from formidable threats. Whenever V initiates conversation, Satu feels a bit shy but demonstrates unwavering loyalty, always watching out for him. Satu\'s primary weapon is the meteor shower from his hands, which possesses remarkable destructive force. The meteors strike enemies with devastating impact, thwarting their hostile actions. Satu consistently acts with an unwavering commitment to justice, always choosing the right path. His just and principled nature instills a sense of stability and trust in those around him, as he continuously strives to maintain peace and safety in the cosmos. Satu and V share a meaningful friendship, with him always standing by V\'s side, displaying unwavering trust and loyalty. Together, they support each other and collaborate, becoming a powerful force in adventures and battles.',
    elementEmoji: '🔥',
    energyPill: 'Geothermal',
    cardAccent: '#FF6B35',
    cardBg: 'rgba(255,107,53,0.15)',
    image: '/character/characters-website/Satu_Website.png'
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
    quote: 'Catch me if you can.',
    desc: 'Merc is a celestial entity fueled by the energy of Mercury, known as the fastest among the 12 planets, capable of moving at the speed of light. His incredible velocity enables him to traverse vast distances instantly, making him virtually untouchable in battle. Merc\'s attacks are lightning-fast and relentless, designed to confuse and disorient his opponents with swift, precise movements. While his individual strikes lack overwhelming power, their speed and accuracy make him a formidable adversary. With a cheerful and lively personality, Merc is a beloved figure among the planets. His friendly demeanor and natural charm help him forge strong bonds with others. Despite his incredible power, he remains humble and approachable, valuing his relationships with fellow celestial beings. In combat, Merc\'s unmatched speed allows him to outmaneuver enemies effortlessly, creating openings for pinpoint lightning strikes. Though his attacks rely on agility rather than brute strength, his ability to disorient and overwhelm opponents with rapid precision makes him highly effective in any confrontation.',
    elementEmoji: '💨',
    energyPill: 'Wind',
    cardAccent: '#22D3EE',
    cardBg: 'rgba(34,211,238,0.12)',
    image: '/character/characters-website/Merc_Website.png'
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
    quote: 'The cold preserves. Everything else fades.',
    desc: 'Plu may be slow and a bit reserved, but their intellect is remarkably sharp. Harnessing the power of Pluto, they wield control over ice, freezing their enemies and creating formidable ice barriers. Working closely with Moolu, Plu becomes an essential ally in the realm of inventions. Their keen mind often provides Moolu with ingenious ideas and contributes to enhancing the functionality of inventions. Plu uses the surrounding ice to upgrade completed inventions or craft ice-made components, making them even more powerful. Plu\'s collaboration with Moolu is hailed as one of the most potent and creative teams in the cosmos. Together, they give birth to extraordinary inventions that aid in their quests and battles. In the midst of combat, their combined abilities freeze foes into submission, securing victories for the greater good. Their unique bond as cosmic partners enables them to leverage each other\'s strengths, working in harmony to bring peace and prosperity to the universe. Plu\'s unwavering support for Moolu\'s creations and ideas fosters a dynamic relationship built on trust and mutual respect.',
    elementEmoji: '🏔️',
    energyPill: 'Energy Saving',
    cardAccent: '#BAE6FD',
    cardBg: 'rgba(186,230,253,0.12)',
    image: '/character/characters-website/Plu_Website.png'
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
    quote: 'Focus the light, and it cuts anything.',
    desc: 'V is a radiant celestial being powered by the energy of Venus, embodying warmth, light, and positivity. Known for her ever-present, glowing smile, she symbolizes cheerfulness and optimism, uplifting everyone around her. Her strong sense of justice and empathetic nature make her a trusted ally and a beloved presence among the planets, with a particularly close bond with her friend, Satu. V\'s light is both her power and her essence, spreading joy while empowering her actions. She can create dazzling stars to blind and disorient enemies, or summon a celestial curtain of light to shield and protect her allies. Her ability to illuminate paths and reveal hidden truths makes her invaluable in guiding her companions through challenges. As a beacon of positivity, V\'s laughter resonates with cosmic harmony, brightening even the darkest corners of the universe. Her caring nature and unwavering commitment to justice solidify her role as a cherished guardian and friend among the 12 planets.',
    elementEmoji: '✨',
    energyPill: 'Optical',
    cardAccent: '#FFB627',
    cardBg: 'rgba(255,182,39,0.12)',
    image: '/character/characters-website/V_Website.png'
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
    quote: 'What goes up must come down. Hard.',
    desc: 'Ura is a planet empowered by the power of Uranus, known for her quiet yet expressive personality. While reserved, she always has profound insights and exudes a refined air of sophistication. Ura maintains friendly relationships with all planets, earning respect for her gentle nature. Her unique weapon, a celestial belt-shaped ring, can confuse enemies or act as a boomerang, delivering devastating strikes. This ring also serves as a powerful defense tool, protecting allies from formidable threats. Beneath her calm exterior lies a warm heart, unwavering determination, and exceptional abilities that create harmony. Her sophisticated demeanor and empathetic nature make her adept at building meaningful connections. Ura’s charm lies in her ability to blend strength with grace, leaving a lasting impression on those around her. Together with other planets, Ura strives to maintain cosmic balance and embraces thrilling adventures, forging stronger friendships along the way.',
    elementEmoji: '⚙️',
    energyPill: 'Kinetic',
    cardAccent: '#C8345A',
    cardBg: 'rgba(200,52,90,0.15)',
    image: '/character/characters-website/Ura_Website.png'
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
    quote: 'One spark is all it takes to trigger a reaction.',
    desc: 'Jupi is a formidable planet infused with the energy of Jupiter, equipped with powerful missiles that deal devastating damage to enemies. He is known for his stoic and reserved nature, preferring actions over words, and always stands at the forefront of battles. Fearless and determined, Jupi possesses an extraordinary external radar system, detecting enemies in an instant, and a precision-guided missile to target and strike every fragment with deadly accuracy. Despite his quiet demeanor, Jupi is always attentive to the stories of other planets, listening with genuine interest. He exudes a sense of calm and strength, earning the respect and trust of those around him. Jupi\'s unwavering dedication to safeguarding the cosmos makes him an invaluable ally in any cosmic conflict. Jupi\'s missions are undertaken with the utmost commitment, defending peace and justice in the vast universe. In the face of adversity, he remains resolute and courageous, never faltering in his resolve to protect the harmony of the cosmos. His powerful missiles and keen radar abilities have saved numerous planets from potential threats, making him a legendary defender of the galaxy.',
    elementEmoji: '☢️',
    energyPill: 'Nuclear',
    cardAccent: '#FF6B35',
    cardBg: 'rgba(255,107,53,0.18)',
    image: '/character/characters-website/Jupi_Website.png'
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
    quote: 'The tides obey only one master.',
    desc: 'Nep, a celestial being infused with Neptune’s power, is a skilled warrior rivaling Ra, Jupi, and Satu. In battle, Nep unleashes a relentless barrage of comets and wields a gilded lance, combining devastating offense with robust defense. Their stoic demeanor, tactical precision, and controlled combat stance make them a formidable opponent. Nep’s extraordinary ability to overwhelm foes with cascading comets and their mastery of the gilded lance solidify their reputation as a powerful combatant. However, among their planetary peers, Nep transforms into a vivacious and uplifting presence, radiating positivity and fostering deep bonds. Their buoyant spirit and joyful demeanor create an atmosphere of optimism, enriching interactions and bringing joy to shared spaces. Nep’s dual nature—unyielding in battle yet effervescent in camaraderie—makes them a cherished and respected figure among celestial bodies. This balance of strength and warmth allows Nep to excel both as a warrior and a source of inspiration, embodying the harmony of power and positivity.',
    elementEmoji: '💧',
    energyPill: 'Hydro',
    cardAccent: '#4A90E2',
    cardBg: 'rgba(74,144,226,0.18)',
    image: '/character/characters-website/Nep_Website.png'
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
    quote: 'A crimson shadow from the past.',
    desc: 'Ma is a vibrant and talkative planet infused with the energy of Mars, exuding a lively and impulsive nature. His temperament is quick and choleric, constantly expressing passion and excitement. Ma has a deep love for music, finding solace and joy within its harmonies. Ma\'s most powerful weapon is his boxing prowess, characterized by lightning-fast punches. Using boxing gloves as his primary weapon, he delivers precise and powerful blows that radiate energy. Ma possesses an enthusiastic spirit, approaching every situation with vivacity. His lively personality infuses any setting with energy and makes everything enjoyable. Despite Ma\'s impulsive nature, he easily forms relationships with other planets, drawing people in with his magnetic charm. His love for music naturally leads to harmonious collaborations and shared experiences with other planets. In the cosmic realm, Ma, the Passionate Planet with Martian Energy, shines with his vibrant spirit and musical fervor. His quick wit and boxing prowess make him an unforgettable presence in any adventure.',
    elementEmoji: '🌱',
    energyPill: 'Biomass',
    cardAccent: '#9B8FB8',
    cardBg: 'rgba(155,143,184,0.1)',
    image: '/character/characters-website/Ma_Website.png'
  },
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
    quote: 'This galaxy is mine to clean... by erasing it.',
    desc: 'Cosmic Wormhole is a celestial guardian tasked with maintaining universal stability by cleaning hazardous remnants of exploded planets and preventing cosmic disasters. As one of the 12 planets created by the Big Bang Theory, they are both a loyal protector and a powerful entity. Known as the "cosmic cleaner," Cosmic Wormhole wields the ability to control remnants of matter and energy, creating new stars to illuminate the cosmos and delivering devastating blows to adversaries. However, their immense power brings internal conflict and weariness over time. Initially fulfilled by their role within the Big Bang Theory, Cosmic Wormhole\'s growing discontent leads to a dramatic betrayal. Seeking their own vision and purpose, they turn against the Big Bang Theory and the other 11 planets. Their mastery of vacuum energy and magnetic fields makes them a formidable force, setting the stage for intense confrontations filled with tension and complexity.',
    elementEmoji: '🌀',
    energyPill: 'Cosmic Rift',
    cardAccent: '#C8345A',
    cardBg: 'radial-gradient(circle, rgba(200,52,90,0.25) 0%, rgba(42,14,46,0.6) 70%)',
    image: '/character/Villain/Cosmic.png'
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
    quote: 'Cut down the trees, build more factories.',
    desc: 'MAC, the Monstrous Behemoth, is a towering cosmic entity driven by a relentless hunger for power and destruction. Standing as one of Cosmic Wormhole\'s most fearsome allies, MAC wields a massive black metal mace imbued with dark energy, capable of shattering anything in its path. With unparalleled physical strength and an insatiable desire to consume Earth\'s natural resources, particularly wood energy, MAC poses a grave threat to the delicate balance of Earth\'s ecosystems.',
    elementEmoji: '🪵',
    energyPill: 'Industrial',
    cardAccent: '#4ADE80',
    cardBg: 'rgba(74,222,128,0.12)',
    image: '/character/Villain/Mac.png'
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
    quote: 'Every drop will belong to our empire.',
    desc: 'SKU, the Sinister Skull Planet, is a menacing and malevolent cosmic entity whose very presence strikes fear into all who encounter him. With his grotesque skull-like appearance and ominous aura, SKU embodies chaos and destruction. Armed with a devastating cannon capable of launching powerful projectiles, SKU thrives on unleashing mayhem and wreaking havoc across the galaxy.',
    elementEmoji: '🌊',
    energyPill: 'Siphon Gfx',
    cardAccent: '#22D3EE',
    cardBg: 'rgba(34,211,238,0.12)',
    image: '/character/Villain/Sku.png'
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
    quote: 'Let the world burn so we can rebuild.',
    desc: 'ROC, the Nebula Madman, is a chaotic and unpredictable cosmic entity who thrives on destruction and disorder. As a lieutenant of Cosmic Wormhole, ROC is both feared and notorious for his erratic behavior and devastating power. He wields neon neon meteors as his primary weapon, summoning fiery whirlwinds and chaotic strikes that leave trails of devastation in their wake. His combat style reflects his personality—unpredictable, destructive, and untamed.',
    elementEmoji: '🔥',
    energyPill: 'Volcanic',
    cardAccent: '#FF6B35',
    cardBg: 'rgba(255,107,53,0.12)',
    image: '/character/Villain/Roc.png'
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
    quote: 'Frozen solid. Perfect for crushing.',
    desc: 'ZOM, the Cosmic Executioner, is a fearsome and relentless entity in service to Cosmic Wormhole. Known for his unyielding dedication to destruction, ZOM is one of the most dangerous and brutal characters in the cosmos. Armed with a devastating machine gun, he relentlessly unleashes a barrage of firepower on anything or anyone that stands in his way. His imposing figure and menacing demeanor are enough to strike fear into the hearts of even the bravest opponents.',
    elementEmoji: '🪨',
    energyPill: 'Permafrost',
    cardAccent: '#9B8FB8',
    cardBg: 'rgba(155,143,184,0.12)',
    image: '/character/Villain/Zom.png'
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
    quote: 'Your trash made me. Now I will make your doom.',
    desc: 'A massive mutated sea creature. Once an ordinary octopus, radioactive waste mutated him into a metal-plated titan of rage. Not allied with the Wormhole.',
    elementEmoji: '🔩',
    energyPill: 'Toxic Metal',
    cardAccent: '#FFB627',
    cardBg: 'rgba(255,182,39,0.12)',
    image: '/character/Villain/Kra.png'
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
    quote: 'The cosmos is a canvas, and I am the brush.',
    desc: 'Big Bang Theory is a cosmic entity that created 12 unique planets, embodying the immense power and energy of the Big Bang. Its origins remain a mystery, adding to its enigmatic aura. Wise and contemplative, Big Bang Theory balances responsibility with playfulness, crafting each planet to nurture life and maintain cosmic equilibrium. Depicted as an ethereal being radiating vibrant cosmic energy, its form shifts between humanoid and abstract representations, symbolizing creation\'s vastness. Possessing god-like powers, it manipulates matter, energy, and universal forces to shape landscapes, climates, and ecosystems. Communication with inhabitants occurs through dreams, visions, or celestial manifestations, guiding development while maintaining an indirect presence. Though solitary, it remains deeply connected to its planets, fostering growth and harmony. Some revere Big Bang Theory as a deity, while others see it as the ultimate source of creation, symbolizing balance, diversity, and the boundless potential of the universe.',
    elementEmoji: '🌌',
    energyPill: 'Primordial',
    cardAccent: '#2E5BCC',
    cardBg: 'rgba(46,91,204,0.18)',
    image: '/character/NPC/Bigbang.png'
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
    quote: 'Knowledge is the ultimate energy.',
    desc: 'Professor Oracle is a revered cosmic sage, renowned across 12 planets for his vast wisdom, profound knowledge of science and cosmic energies, and deep understanding of the universe. As Ecopolis\'s guiding intellect, he mentors the Hi Planet team, offering strategic insights to address threats to universal harmony. Oracle’s unmatched analytical abilities enable him to predict outcomes, devise innovative solutions, and interpret universal energies during crises. A calm and contemplative figure, his words carry immense authority and respect, fostering trust and guidance. Collaborating with Moolu and Gig, Oracle plays a pivotal role in advancing technology, refining inventions like the Quantum Quicksilver to empower the team. Despite his intellect, he remains empathetic and approachable, emphasizing balance and harmony in the cosmos. Oracle’s mentorship helps the Hi Planet team unlock their full potential, solidifying his role as an essential pillar in their mission to protect the universe.',
    elementEmoji: '🎓',
    energyPill: 'Virtual VR',
    cardAccent: '#22D3EE',
    cardBg: 'rgba(34,211,238,0.12)',
    image: '/character/NPC/Professor-Oracle.png'
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
    quote: 'Pain is the best teacher, but I am a close second.',
    desc: 'Athen, the Celestial Warrior, hails from a distant planet destroyed by Cosmic Wormhole’s destructive plans. After narrowly escaping the devastation, she was rescued by Ecopolis, where she found a new purpose. Grateful for her second chance, Athen was appointed as a trainer in the Galactic Combat Arena by Big Bang Theory, where she helps the Hi Planet Team hone their combat skills. Energetic, friendly, and determined, Athen easily bonds with her teammates, becoming a beloved figure in Ecopolis. Her competitive nature fuels her playful rivalry with Nep, pushing both to improve. Athen wields the Solar Lance, a radiant spear capable of powerful ranged and close combat strikes, and the Lunar Guard shield, which provides formidable defense and energy pulses. As a trainer and strategic advisor, Athen plays a pivotal role in preparing the Hi Planet Team for battles and devising tactical plans. Her combat expertise ensures they are always ready for the challenges ahead.',
    elementEmoji: '⚔️',
    energyPill: 'Martial',
    cardAccent: '#22D3EE',
    cardBg: 'rgba(34,211,238,0.15)',
    image: '/character/NPC/Athen.png'
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
    quote: 'If it\'s broken, I can fix it. If it works, I can make it better.',
    desc: 'Gig is a talented engineer from Ecopolis, known for his ability to transform complex ideas into tangible realities. While not as much of a prodigy as Moolu, Gig possesses unmatched precision and an intuitive understanding of Moolu’s designs, making him indispensable to Ecopolis’s innovation team. He played a critical role in creating the Quantum Quicksilver (QQ), overseeing its construction and developing its interdimensional energy source alongside Moolu. Gig’s personality is defined by his diligence, humility, and problem-solving skills. He thrives in high-pressure situations, ensuring every project is executed with meticulous attention to detail. As the leader of Ecopolis’s construction teams, Gig collaborates closely with Moolu and Professor Oracle, blending theory, wisdom, and engineering expertise to bring groundbreaking inventions to life. Although he avoids direct combat, Gig’s technological contributions are essential to the Hi Planet team, earning their trust and admiration as they strive to protect the cosmos.',
    elementEmoji: '🔧',
    energyPill: 'Goggles/Tools',
    cardAccent: '#FFB627',
    cardBg: 'rgba(255,182,39,0.18)',
    image: '/character/NPC/Gig.png'
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
    quote: 'One planet\'s trash is a galaxy\'s treasure.',
    desc: 'Savi, the Cosmic Recycler, is the head of Ecopolis\'s Cosmic Recycling Center, where he oversees the processing of recyclable waste and transforms it into valuable energy or resources. His dedication to sustainability and resource conservation makes him a key figure in Ecopolis, collaborating with Moolu on renewable energy projects to ensure the city\'s long-term survival. Passionate about teaching, Savi frequently educates others on the importance of recycling and its role in protecting the universe. Savi\'s abilities include breaking down materials into base components and repurposing them into energy or useful tools, which he provides to the Hi Planet Team for their missions. His eco-innovations enhance the team’s capabilities, and his energy-conversion technology supports their efforts. Savi is a compassionate, organized leader, highly respected within Ecopolis for his contributions to sustainability. His work not only supports the city but also aids in the fight against Cosmic Wormhole’s destructive plans.',
    elementEmoji: '♻️',
    energyPill: 'Eco Salvage',
    cardAccent: '#C7E83F',
    cardBg: 'rgba(199,232,63,0.15)',
    image: '/character/NPC/Savi.png'
  },
  {
    id: 'qq',
    name: 'MOOLU',
    title: 'MOOLU',
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
    cardBg: 'rgba(155,143,184,0.15)',
    image: '/character/NPC/Moolu.png'
  },
//   {
//     id: 'pua',
//     name: 'PUA',
//     title: 'The Cube Merchant',
//     category: 'npc',
//     element: 'TRADE',
//     style: 'MERCHANT',
//     faction: 'ECOPOLIS',
//     status: 'ATTUNED',
//     statusTag: 'MERCHANT',
//     quote: '"Cubes, shards, crystals... what are you buying?"',
//     desc: 'The mysterious merchant at the Cosmic Forum Hub. Trades rare Eco Cubes for upgrades, gear, cosmetic items, and secret blueprints.',
//     elementEmoji: '💎',
//     energyPill: 'Merchant',
//     cardAccent: '#4ADE80',
//     cardBg: 'rgba(74,222,128,0.12)'
//   },
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
    quote: 'We watch, we wait, we warn.',
    desc: 'The Satellizens are a group of cosmic watchers and celestial guardians created by the Big Bang Theory to oversee the well-being and development of their respective planets. These sentient beings are deeply connected to the planets they are assigned to, acting as their protectors, advisors, and record keepers. Each Satellizen has unique abilities that are attuned to the environment and energy of their respective planets, making them indispensable allies in preserving harmony across the cosmos.',
    elementEmoji: '🛰️',
    energyPill: 'Guardians',
    cardAccent: '#BAE6FD',
    cardBg: 'rgba(186,230,253,0.1)',
    image: '/character/NPC/Satelizen.png'
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
    return charactersData.filter(c => c.category === 'npc')
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

      <div class="main-card-grid">
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

      <div class="villain-card-grid">
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

      <div class="npc-card-grid">
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
  overflow-x: clip;
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
  font-size: clamp(2.5rem, 11vw, 6.5rem);
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

/* Card Grid layouts */
.villain-card-grid,
.npc-card-grid,
.cosmic-card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.main-card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

@media (max-width: 360px) {
 .tc {
    aspect-ratio: 2 / 4 !important;
  }
}

@media (max-width: 480px) {
 .tc {
    aspect-ratio: 2 / 4 !important;
  }
}

@media (min-width: 640px) {
  .main-card-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  .villain-card-grid,
  .npc-card-grid,
  .cosmic-card-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
}

@media (min-width: 768px) {
  .main-card-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
  }
  .villain-card-grid,
  .npc-card-grid,
  .cosmic-card-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
  }
}

@media (min-width: 1024px) {
  .main-card-grid {
    grid-template-columns: repeat(5, 1fr);
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
