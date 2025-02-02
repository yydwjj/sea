import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 确保 @ 指向 src 目录
    },
  },
  base: 'https://yydwjj.github.io/sea/SeaProject-Customer/SeaProject-Customer/SeaShop/dist'
})
