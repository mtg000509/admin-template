import { acceptHMRUpdate, defineStore } from 'pinia';

// store id
const storeId = 'setting';

export const useSettingStore = defineStore(
  storeId,
  () => {
    return {};
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
