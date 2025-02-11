<script setup lang="ts">
import type { TypeLanguage } from '@/locales';

import { computed } from 'vue';

const props = defineProps<{
  iconSize: number;
  menuFold: boolean;
  changeMenuFold: () => void;
  language: string;
  changeLanguge: (command: TypeLanguage) => void;
  languageList: object;
}>();

defineOptions({ name: 'NavBar' });

// 图标大小
const iconSize = props.iconSize;

// 菜单折叠
const menuFold = props.menuFold;

// 折叠菜单
const changeMenuFold = () => {
  props.changeMenuFold();
};

// 当前语言
const language = computed(() => props.language);

// 切换语言
const changeLanguge = (command: TypeLanguage) => {
  props.changeLanguge(command);
};
</script>

<template>
  <div class="nav-bar">
    <el-icon class="icon" :size="iconSize" @click="changeMenuFold">
      <component :is="menuFold ? 'Expand' : 'Fold'" />
    </el-icon>

    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="(item, index) in $route.matched" v-show="item.meta.title" :key="index" :to="item.path">
        <el-icon :size="iconSize">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="setting">
      <el-dropdown @command="changeLanguge">
        <SvgIcon name="language" color="black" width="25" height="25" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(value, key) in languageList"
              :key="key"
              :command="key"
              :disabled="language === key"
            >
              {{ value }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav-bar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;

  .icon {
    margin-right: 20px;
  }

  :deep(.el-breadcrumb__inner) {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .setting {
    margin-left: auto;
  }
}

// 去除鼠标聚焦
.el-tooltip__trigger:focus-visible {
  outline: unset;
}

// 去除下拉菜单鼠标 hover背景色
:deep(.el-dropdown-menu__item:hover) {
  background-color: unset;
}
</style>
