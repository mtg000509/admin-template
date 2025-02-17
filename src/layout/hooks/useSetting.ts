import type { TypeLanguage } from '@/locales';
import { languageList } from '@/locales';
import { useSettingStore } from '@/store/core';

import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

export function useSetting() {
  // setting store
  const settingStore = useSettingStore();

  // 菜单折叠
  const menuFold = computed(() => settingStore.menuFold);

  // 折叠菜单
  const changeMenuFold = () => {
    settingStore.menuFold = !settingStore.menuFold;
  };

  // 折叠开关
  const foldEnable = ref<boolean>(true);

  // 创建一个响应式的宽度变量
  const windowWidth = ref(window.innerWidth);

  // 定义更新宽度的函数
  const handleResize = () => {
    windowWidth.value = window.innerWidth;
  };

  // 当组件挂载时添加resize事件监听器
  onMounted(() => {
    window.addEventListener('resize', handleResize);
  });

  // 在组件卸载前移除resize事件监听器，避免内存泄漏
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });

  // 监听窗口宽度变化，当宽度小于768时，折叠菜单并禁用折叠按钮
  watch(
    () => windowWidth.value,
    (newVal) => {
      if (newVal < 768) {
        foldEnable.value = false;
        settingStore.menuFold = true;
      } else {
        foldEnable.value = true;
      }
    },
    { immediate: true },
  );

  // 当前语言
  const language = computed(() => settingStore.language);

  // 切换语言
  const changeLanguge = (command: TypeLanguage) => {
    settingStore.setLanguage(command);
  };

  // 刷新
  const refresh = computed(() => settingStore.refresh);

  // 刷新页面
  const updateRefresh = () => {
    settingStore.refresh = !refresh.value;
  };

  // 全屏
  const fullScreen = () => {
    // DOM对象的一个属性:可以用来判断当前是不是全屏模式[全屏:true,不是全屏:false]
    const full = document.fullscreenElement;
    // 切换为全屏模式
    if (!full) {
      // 文档根节点的方法requestFullscreen,实现全屏模式
      document.documentElement.requestFullscreen();
    } else {
      // 变为不是全屏模式->退出全屏模式
      document.exitFullscreen();
    }
  };

  return {
    menuFold,
    changeMenuFold,
    foldEnable,
    languageList,
    language,
    changeLanguge,
    refresh,
    updateRefresh,
    fullScreen,
  };
}
