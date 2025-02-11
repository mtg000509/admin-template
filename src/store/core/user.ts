import { apiUserLogin, schemaResUserLogin, schemaUserLogin, type TypeUserLogin } from '@/api/core';
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

    return { menuList, userToken, userLogin };
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
