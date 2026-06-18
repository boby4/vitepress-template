import { defineConfig } from 'vite';

export default defineConfig({
  assetsInclude: ['**/*.gltf', '**/*.glb'],
  server: {
    host: '0.0.0.0'
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 1500,
    emptyOutDir: true,
    esbuild: {
      drop: ['console', 'debugger']
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[hash].js',
        entryFileNames: 'js/[hash].js',
        assetFileNames: '[ext]/[hash].[ext]',
      }
    }
  },
})
