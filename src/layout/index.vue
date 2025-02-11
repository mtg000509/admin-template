<script setup lang="ts">
import type { TypeLanguage } from '@/locales';
import { languageList } from '@/locales';
import { useSettingStore } from '@/store/core';

import NavBar from './components/NavBar.vue';

import { computed } from 'vue';

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

// 当前语言
const language = computed(() => settingStore.language);

// 切换语言
const changeLanguge = (command: TypeLanguage) => {
  settingStore.setLanguage(command);
};
</script>

<template>
  <div class="layout">
    <el-container>
      <el-aside :class="{ fold: menuFold }">Aside</el-aside>
      <el-container>
        <el-header :class="{ fold: menuFold }">
          <NavBar
            :iconSize="iconSize"
            :menuFold="menuFold"
            :changeMenuFold="changeMenuFold"
            :language="language"
            :changeLanguge="changeLanguge"
            :languageList="languageList"
          />
        </el-header>
        <el-main :class="{ fold: menuFold }">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.layout {
  width: 100%;
  height: 100vh;

  .el-aside,
  .el-header,
  .el-main {
    transition: all 0.5s ease-in-out;
  }

  .el-aside {
    width: $aside-width;
    height: 100vh;
    background-color: rgb(1 76 76);

    &.fold {
      width: $aside-min-width;
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
    padding: unset;
    background-color: rgb(60 98 0);

    &.fold {
      width: calc(100vw - $aside-min-width);
    }
  }
}
</style>
