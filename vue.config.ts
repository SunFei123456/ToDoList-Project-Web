// vue.config.js 或者在 webpack.config.js 中配置
module.exports = {
  pluginOptions: {
    // 在这里添加 TypeScript 配置
    typescript: {
      check: true,
      configFile: "./tsconfig.json",
    },
  },
  runtimeCompiler: true,
  configureWebpack: {
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm-bundler.js",
      },
    },
  },
  compilerOptions: {
    isCustomElement: (tag) => tag === "like-outlined",
  },
};
