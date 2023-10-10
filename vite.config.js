import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({

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
