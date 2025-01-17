import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/styles/rem.js'// 适配移动端
import 'amfe-flexible'
// import './style.css'
import App from './App.vue'
import router from './router'
import './assets/global.css'

const app = createApp(App)
app.use(ElementPlus, {
    // 修改主题色
    zIndex: 3000,
    size: 'default',
    theme: {
      primary: '#409EFF' // 保持默认的蓝色
    }
  })
app.use(router)
app.mount('#app')


