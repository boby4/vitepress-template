
import { defineConfig } from 'vite';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default defineConfig({
  assetsInclude: ['**/*.gltf'],
  server: {
    host: '0.0.0.0'
  },
  plugins: [
  ],
  resolve: {
    alias: {
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        commonjs(), // 处理 CommonJS 模块
        nodeResolve(), // 解析第三方模块
      ],
    },
  },
})