import { useUserStore } from '@/store/core';

import type { Router } from 'vue-router';

import nprogress from 'nprogress';

// 引入进度条样式
import 'nprogress/nprogress.css';

nprogress.configure({ showSpinner: false });

/**
 * 注册全局路由守卫
 * @param router - 路由实例
 */
export function setupRouterGuards(router: Router) {
  // 全局前置守卫
  router.beforeEach(async (to, _from, next) => {
    // 开启进度条
    nprogress.start();

    // 获取 user store
    const userStore = useUserStore();

    if (userStore.userToken) {
      if (to.path === '/login') {
        next({ path: '/' });
      } else {
        if (userStore.userInfo) {
          next();
        } else {
          try {
            await userStore.getUserInfo();
            next({ ...to });
          } catch (error) {
            userStore.userLogout();
            next({ path: '/login', query: { redirect: to.path } });
          }
        }
      }
    } else {
      if (to.path === '/login') {
        next();
      } else {
        next({ path: '/login', query: { redirect: to.path } });
      }
    }
  });

  // 全局后置守卫
  router.afterEach(() => {
    // 关闭进度条
    nprogress.done();
  });
}
