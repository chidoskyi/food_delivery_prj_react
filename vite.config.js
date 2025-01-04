import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer';
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist', // Ensure this is the correct directory
  },
  plugins: [react(),  visualizer({
    open: true, // Automatically opens the visualization in your browser
    filename: 'stats.html', // Output file name
    gzipSize: true, // Display gzip size of each module
    brotliSize: true, // Display brotli size of each module
  }),],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, './src'),
    },
  },
})
