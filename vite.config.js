import { defineConfig } from 'vite'
import postcss from 'postcss'

export default defineConfig({
  plugins: [],
  build: {
    rollupOptions: {
      output: {
        // Ensure proper asset naming
        assetFileNames: 'assets/[name].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js'
      }
    }
  },
  css: {
    postcss: {
      plugins: [
        postcss([
          require('tailwindcss')({
            config: './tailwind.config.cjs'
          }),
          require('autoprefixer')
        ])
      ]
    }
  }
})