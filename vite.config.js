import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';
import { dependencies } from 'webpack';

const exclVendors = ['react', 'react-router-dom', 'react-dom']
function renderChunks(deps) {
  let chunks = {}
  Object.keys(deps).forEach((key) => {
    if (exclVendors.includes(key)) return
    chunks[key] = key
  })
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          ...renderChunks(dependencies)
        }
      }
    }
  },
  plugins: [
    VitePWA({
      manifest: {
        name: 'kapanlibur',
        short_name: 'kapanlibur',
        display: 'standalone',
        start_url: '.',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: '/pwa-icon.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
      workbox: {},
    }), 
    react()
  ],
})
