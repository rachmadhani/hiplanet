import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Wait for router to be ready to avoid flashing incorrect views on page reload
router.isReady().then(() => {
    app.mount('#app')
})
