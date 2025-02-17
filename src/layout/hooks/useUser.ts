import { useUserStore } from '@/store/core';

import { useRoute, useRouter } from 'vue-router';

export function useUser() {
  // user store
  const userStore = useUserStore();

  // 菜单列表
  const menuList = userStore.menuList;

  // 用户信息
  const userInfo = userStore.userInfo;

  // 获取路由器
  const $router = useRouter();

  // 获取路由
  const $route = useRoute();

  // 退出登录
  const logOut = () => {
    userStore.userLogout();

    $router.push({ path: '/login', query: { redirect: $route.path } });
  };

  return {
    menuList,
    userInfo,
    logOut,
  };
}
