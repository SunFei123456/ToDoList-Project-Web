import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // 配置别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname,'./src'),
      "@assets": path.resolve(__dirname,'./src/assets'),
      "@components": path.resolve(__dirname,'./src/components'),
    },
  },
  plugins: [vue()],

  optimizeDeps: {
    include: ["@surely-vue/table", "vue"],
  },

  css: {
    preprocessorOptions: {
      sass: {
        javascriptEnabled: true,
        modifyVars: {},
      },
    },
  },
});
