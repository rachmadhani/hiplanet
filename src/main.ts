import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'jsvectormap/dist/jsvectormap.css'
import 'flatpickr/dist/flatpickr.css'

import VueApexCharts from 'vue3-apexcharts'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueApexCharts)

// Wait for router to be ready to avoid flashing incorrect views on page reload
router.isReady().then(() => {
    app.mount('#app')
})
