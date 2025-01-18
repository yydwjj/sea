import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import BottomNavigation from './components/BottomNavigation.vue'

const app = createApp(App)

// 将router实例暴露到全局
window.__VUE__ = router

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router)
app.use(ElementPlus)
app.component('BottomNavigation',BottomNavigation)
router.isReady().then(() => {
    app.mount('#app')
    console.log('Vue应用已挂载')
  })