import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/your-digital-library/',
  plugins: [tailwindcss()],
})
