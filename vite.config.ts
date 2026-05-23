import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    svgLoader({
      /** Иначе любой `import './x.svg'` станет компонентом — ломает `<img src>` и `url()` в CSS */
      defaultImport: 'url',
    }),
  ],
  optimizeDeps: {
    // Use official Vite/Rolldown setting to avoid generating dependency sourcemaps
    // in node_modules/.vite/deps, which trigger oxc/client-inject parsing errors.
    rolldownOptions: {
      output: {
        sourcemap: false,
      },
    },
  },
  server: {
    proxy: {
      "/rpc": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
