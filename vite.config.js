import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],

  server: {
    host: 'hedge.webterminal.trading',
    port: 5173
  },

  build: {
    rollupOptions: {
      input: {
        traderoom: resolve(__dirname, 'traderoom.html')
      }
    }
  }
})
