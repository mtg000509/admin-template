<script setup lang="ts">
import type { TypeLanguage } from '@/locales';
import { languageList } from '@/locales';
import { useSettingStore, useUserStore } from '@/store/core';

import ContentArea from './components/ContentArea.vue';
import MenuList from './components/MenuList.vue';
import NavBar from './components/NavBar.vue';
import TitleBar from './components/TitleBar.vue';

import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue';

import { useRoute, useRouter } from 'vue-router';

defineOptions({ name: 'Layout' });

// setting store
const settingStore = useSettingStore();

// icon size
const iconSize = 20;

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

// user store
const userStore = useUserStore();

// 菜单列表
const menuList = userStore.menuList;

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
</script>

<template>
  <div class="layout">
    <el-container>
      <el-aside :class="{ fold: menuFold }">
        <TitleBar :isFold="menuFold" />
        <el-scrollbar>
          <el-menu :collapse="menuFold" :default-active="$route.path" collapse-transition>
            <MenuList :menuList="menuList" />
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header :class="{ fold: menuFold }">
          <NavBar
            :iconSize="iconSize"
            :menuFold="menuFold"
            :foldEnable="foldEnable"
            :changeMenuFold="changeMenuFold"
            :language="language"
            :changeLanguge="changeLanguge"
            :languageList="languageList"
            :updateRefresh="updateRefresh"
            :fullScreen="fullScreen"
            :userInfo="userInfo"
            :logOut="logOut"
          />
        </el-header>
        <el-main :class="{ fold: menuFold }">
          <ContentArea :refresh="refresh" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.layout {
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .el-aside,
  .el-header,
  .el-main {
    transition: all 0.5s ease-in-out;
  }

  .el-aside {
    width: $aside-width;
    height: 100vh;
    overflow: hidden;
    background-color: rgb(128 128 128 / 20%);

    &.fold {
      width: $aside-min-width;
      border-radius: 20px;
    }

    :deep(.el-menu) {
      --el-menu-bg-color: transparent;

      min-width: $aside-min-width;
      border: none;

      :deep(.el-menu-item:hover) {
        background-color: unset;
      }

      :deep(.el-sub-menu__title:hover) {
        background-color: unset;
      }
    }
  }

  .el-header {
    width: calc(100vw - $aside-width);
    height: $navbar-height;
    padding: 0 20px;

    &.fold {
      width: calc(100vw - $aside-min-width);
    }
  }

  .el-main {
    width: calc(100vw - $aside-width);
    height: calc(100vh - $navbar-height);
    padding: 20px;

    &.fold {
      width: calc(100vw - $aside-min-width);
    }
  }
}
</style>
