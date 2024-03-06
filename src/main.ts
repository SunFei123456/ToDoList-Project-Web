import { createApp } from "vue";
// 导入ant-design ==> 完整引入
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
// import './style.css'
// 全局引入基本base.scss
import "./sass/base.scss";
// 全局引入自己修改的ant-design-scss文件
import "./sass/ant-myself.scss";

import "./theme/main.scss";
// 引入vue-router
import router from "./router";
// 引入数字动画
import countTo from "vue3-count-to";

import { createPinia } from "pinia";
import { createPersistedState } from "pinia-persistedstate-plugin";

// 引入动画css
import "animate.css";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
// 进度条设置
NProgress.configure({
  easing: "ease-in-out",
  speed: 1000,
  trickleSpeed: 1000,
  showSpinner: true, // showSpinner用来控制是否显示进度条右下方加载的小圆圈动画
});

import App from "./App.vue";
const pinia = createPinia();
pinia.use(createPersistedState());
const app = createApp(App);
app.use(Antd);
app.use(router);
app.use(pinia);
app.use(countTo);
app.mount("#app");
