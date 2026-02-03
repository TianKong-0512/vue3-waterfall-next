import { createApp } from 'vue'
import App from './App-image.vue'
import vue3Waterfall from 'vue3-waterfall-next'

const app = createApp(App)
app.use(vue3Waterfall)
app.mount('#app')