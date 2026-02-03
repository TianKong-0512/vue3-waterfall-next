import { createApp } from 'vue'
import App from './App-image.vue'
import vue3Waterfall from 'vue3-waterfall-next' // 从 npm 安装
// import vue3Waterfall from '../dist/index' // 从 dist 目录引入
// import vue3Waterfall from '../packages/index' // 从 packages 目录引入


const app = createApp(App)
app.use(vue3Waterfall)
app.mount('#app')