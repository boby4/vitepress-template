
import { defineConfig } from 'vite';
export default defineConfig({
  assetsInclude: ['**/*.gltf'],
  server: {
    host: '0.0.0.0'
  },
})