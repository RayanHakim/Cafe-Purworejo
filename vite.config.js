import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Sesuaikan base dengan nama repository di GitHub (Case Sensitive)
  base: '/Cafe-Purworejo/', 
})