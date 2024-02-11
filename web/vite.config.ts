import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr';
import sass from 'sass'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
})
