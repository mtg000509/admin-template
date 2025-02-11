import i18n, { type TypeLanguage } from '@/locales';

import { ref } from 'vue';

import { acceptHMRUpdate, defineStore } from 'pinia';

// store id
const storeId = 'setting';

export const useSettingStore = defineStore(
  storeId,
  () => {
    // 当前语言
    const language = ref<string>(i18n.global.locale.value);

    // 设置语言
    const setLanguage = (lang: TypeLanguage) => {
      language.value = lang;
      i18n.global.locale.value = lang;
    };

    // 菜单折叠
    const menuFold = ref<boolean>(false);

    return { language, setLanguage, menuFold };
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
  import.meta.hot.accept(acceptHMRUpdate(useSettingStore, import.meta.hot));
}
