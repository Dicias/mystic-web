import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// VITE_BASE_PATH lets the same build target Vercel/HostGator (root domain, base "/")
// or a GitHub Pages project site (e.g. base "/mysac-web/") without code changes.
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
})
