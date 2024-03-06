import { createRouter, createWebHistory } from "vue-router";

import { getCurrentUserid } from "@/utils/CurrentUserid";

// 引入nprogress
import NProgress from "nprogress";
import "nprogress/nprogress.css";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/register",
      name: "register",
      meta: {
        title: "注册",
      },
      component: () => import("@/views/register/index.vue"),
    },
    {
      path: "/login",
      name: "login",
      meta: {
        title: "登录",
      },
      component: () => import("@/views/login/index.vue"),
    },
    {
      path: "/",
      name: "index",
      component: () => import("@/layout/index.vue"),
      redirect: "/home",

      // 子路由/嵌套路由
      children: [
        {
          path: "/home",
          name: "home",
          meta: {
            title: "首页",
          },
          component: () => import("@/views//home/index.vue"),
        },

        {
          path: "/list",
          name: "list",
          meta: {
            keepAlive: true,
            title: "列表",
          },
          component: () => import("@/views/todo/showList.vue"),
        },
        {
          path: "/simple-list",
          name: "simple-list",
          meta: {
            title: "每日计划概述列表",
          },
          component: () => import("@/views/todo/SimpleList.vue"),
        },
        {
          path: "/DataMetrics",
          name: "DataMetrics",
          meta: {
            title: "数据可视化",
          },
          component: () => import("@/views/todo/DataMetrics.vue"),
        },
        {
          path: "/userInfo",
          name: "userInfo",
          meta: {
            title: "个人信息",
          },
          component: () => import("@/views/user/userInfo.vue"),
        },
        {
          path: "/rankings",
          name: "rankings",
          meta: {
            title: "排行榜",
          },
          component: () => import("@/views/rankings/index.vue"),
        },
      ],
    },
  ],
});

/**
 * to:从哪个页面
 * from:到哪个页面
 * next:只有执行next()页面才会进行跳转
 */
// 判断用户是否登录
// console.log("store", store.state.uInfo)
// 路由守卫
// 用来在路由切换前和切换后执行一些逻辑，例如权限验证、页面加载状态控制、页面切换动画等。
router.beforeEach((to, from, next) => {
  // 修改浏览器窗口的标题
  document.title = to.meta.title as string;
  // 在路由切换前开始进度条
  NProgress.start();
  // 用户未登录 只可以 访问登录和注册的页面 其他页面会被重定向登录页面
  if (to.name !== "login" && to.name !== "register" && !getCurrentUserid()) next({ name: "login" });
  else next();
});

router.afterEach(() => {
  // 在路由切换后结束进度条
  NProgress.done();
});
export default router;
