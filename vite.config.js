
import { defineConfig } from 'vite';
// import vue from '@vitejs/plugin-vue';
// import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    // vue(),
    AutoImport({
      imports: ['vue'],
      resolvers: [
        // ElementPlusResolver(), // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon'
        })
      ],
    }),
    Components({
      resolvers: [
        IconsResolver({
          enabledCollections: ['ep']
        }),
        // ElementPlusResolver()
      ],
    }),
    Icons({
      compiler: 'vue3',
      autoInstall: true
    }),
    // terser()
    viteCompression({
      threshold: 1000 * 100 // 对大于 100kb 的文件进行压缩
    })
  ],
  assetsInclude: ['**/*.gltf'],
  server: {
    open: true,
    host: '0.0.0.0',
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    },
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