import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Baris ini memaksa semua library (termasuk framer-motion) 
    // untuk menggunakan React yang sama dengan aplikasi.
    dedupe: ['react', 'react-dom'] 
  }
})