import react from '@vitejs/plugin-react'
import { config } from 'dotenv'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

config({
  path: '.env',
  override: true,
})

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: 'jsdom',
    dir: 'src',
    coverage: {
      exclude: ['**/node_modules/**', '**/out/**', '**/.next/**'],
    },
  },
})
