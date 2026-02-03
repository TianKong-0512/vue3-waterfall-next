import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path, { resolve } from 'path'
import dts from 'vite-plugin-dts'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import fs from 'fs'

// 确保目录存在
function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

// 创建必要的目录
ensureDir(resolve(__dirname, 'dist'))

export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }),
    vueJsx(),
    libInjectCss(),
    dts({
      include: ['packages/**/*.ts', 'packages/**/*.vue'],
      exclude: ['node_modules/**', 'examples/**', '**/*.md'],
      tsconfigPath: "./tsconfig.app.json",
      // 关键配置
      staticImport: true,
      insertTypesEntry: true,
      cleanVueFileName: true,
      // 生成独立的类型文件
      rollupTypes: false, // 改为 false，让插件自己处理
      copyDtsFiles: false,
      // 不指定 outDir，让插件决定输出位置
      beforeWriteFile: (filePath, content) => {
        // 确保目录存在
        ensureDir(resolve(__dirname, path.dirname(filePath)))
        return { filePath, content }
      }
    })
  ],
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      name: 'Vue3Waterfall',
      formats: ['es', 'umd'],
      fileName: (format) => {
        if (format === 'es') return 'index.mjs'
        return `index.${format}.js`
      }
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        assetFileNames: 'style.[ext]'
      }
    },
    sourcemap: false,
    minify: true
  },
  // 添加 resolve 配置
  resolve: {
    alias: {
      '@': resolve(__dirname, 'packages')
    }
  }
})