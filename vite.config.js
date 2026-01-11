import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/ProiectAn/' : '/',
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
  registerType: 'autoUpdate',
  manifest: {
    name: 'Motix Vehicle Lookup',
    short_name: 'Motix',
    start_url: '/MyProject/',
    display: 'standalone',
    theme_color: '#169bcb',
    background_color: '#ffffff',
    icons: [
      {
        src: '/icons/logoMotix-192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icons/logoMotix-512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
}) 
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') }
  }
}))
