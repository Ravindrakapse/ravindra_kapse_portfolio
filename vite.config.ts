import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change base to '/REPO_NAME/' when deploying to project pages.
// For user.github.io root site use '/'.
export default defineConfig({
  plugins: [react()],
  base: '/ravindra_kapse_portfolio/',
})
