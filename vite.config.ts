import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // devOptions:{
      //   enabled:true,
      //   type: 'module',
      //   navigateFallback: 'index.html',
      // },
      base: '/',
      srcDir:'src',
      filename:'serviceWorker.ts',
      includeAssets: ['favicon.svg'],
      strategies:'injectManifest',
      manifest: {
        name: 'Sumadora Virtual',
        short_name: 'VSumadora',
        theme_color: '#ffffff',
        // icons: [
        //   {
        //     src: 'pwa-192x192.png', // <== don't add slash, for testing
        //     sizes: '192x192',
        //     type: 'image/png',
        //   },
        //   {
        //     src: '/pwa-512x512.png', // <== don't remove slash, for testing
        //     sizes: '512x512',
        //     type: 'image/png',
        //   },
        //   {
        //     src: 'pwa-512x512.png', // <== don't add slash, for testing
        //     sizes: '512x512',
        //     type: 'image/png',
        //     purpose: 'any maskable',
        //   },
        // ],
      },   
    })
  ]
})
