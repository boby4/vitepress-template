
import { defineConfig } from 'vite';
// import Vue from '@vitejs/plugin-vue';

export default defineConfig({
  // plugins: [Vue()],
  assetsInclude: ['**/*.gltf'],
  server: {
    host: '0.0.0.0'
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1500,
    emptyOutDir: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[hash].js', // 引入文件名的名称
        entryFileNames: 'js/[hash].js', // 包的入口文件名称
        assetFileNames: '[ext]/[hash].[ext]', // 资源文件像 字体，图片等
      }
    }
  },

})