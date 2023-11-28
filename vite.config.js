import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const isProduction = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  homepage: "https://snapmeout.github.io/",
  base: isProduction ? '/' : '/',
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  rules: [
    {
      test: /\.js$/, // Ensure this rule applies to .js files
      loader: 'esbuild-loader',
      options: {
        loader: 'jsx', // Set the loader to handle JSX
        // Other options...
      },
    },
    // Other rules...
  ],
})
