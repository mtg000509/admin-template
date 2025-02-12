import {
  apiGetUserInfo,
  apiUserLogin,
  schemaGetUserInfo,
  schemaResUserLogin,
  schemaUserLogin,
  type TypeUserLogin,
} from '@/api/core';
import routes from '@/router/routes';

import { ref } from 'vue';

import { acceptHMRUpdate, defineStore } from 'pinia';

// store id
const storeId = 'user';

export const useUserStore = defineStore(
  storeId,
  () => {
    // 菜单列表
    const menuList = [...routes];

    // 用户 token
    const userToken = ref<string | null>(null);

    // 用户登录
    const userLogin = async (data: TypeUserLogin) => {
      const result = await apiUserLogin(schemaUserLogin.parse(data));
      const checkResult = schemaResUserLogin.parse(result);
      userToken.value = checkResult.data.token;
      return checkResult;
    };

    // 用户信息类型
    interface TypeUserInfo {
      // 名称
      name: string;
      // 头像
      avatar: string;
    }

    // 用户信息
    const userInfo = ref<TypeUserInfo | null>(null);

    // 获取用户信息
    const getUserInfo = async () => {
      const result = await apiGetUserInfo();
      const checkResult = schemaGetUserInfo.parse(result);

      if (checkResult.code === 200) {
        userInfo.value = checkResult.data;
        return checkResult;
      } else {
        return Promise.reject(new Error(checkResult.message));
      }
    };

    // 退出登录
    const userLogout = () => {
      userToken.value = null;
      userInfo.value = null;
    };

    return { menuList, userToken, userLogin, userInfo, getUserInfo, userLogout };
  },
  {
    persist: {
      key: storeId,
      storage: sessionStorage,
      // 指定需要持久化的状态字段，[] 表示不持久化任何状态
      omit: [],
    },
  },
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
