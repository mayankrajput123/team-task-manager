import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({

  plugins: [react()],   // ✅ MUST be react()

  preview: {
    host: true,
    port: process.env.PORT || 5173,
    allowedHosts: "all"
  }

})