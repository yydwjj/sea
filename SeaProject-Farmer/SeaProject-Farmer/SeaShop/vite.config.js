import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: 'https://yydwjj.github.io/sea/SeaProject-Farmer/SeaProject-Farmer/SeaShop/dist'
})
