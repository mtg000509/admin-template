<script setup lang="ts">
import type { TypeLanguage } from '@/locales';

import { computed } from 'vue';

const props = defineProps<{
  iconSize: number;
  language: string;
  changeLanguge: (command: TypeLanguage) => void;
  languageList: object;
  goToGitHub: () => void;
}>();

defineOptions({ name: 'NavBar' });

// 图标大小
const iconSize = computed(() => props.iconSize);

// 当前语言
const language = computed(() => props.language);

// 切换语言
const changeLanguge = (command: TypeLanguage) => {
  props.changeLanguge(command);
};

// 跳转到 GitHub
const goToGitHub = () => {
  props.goToGitHub();
};
</script>
<template>
  <div class="nav-bar">
    <el-dropdown @command="changeLanguge">
      <SvgIcon name="language" color="black" :width="iconSize" :height="iconSize" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(value, key) in languageList" :key="key" :command="key" :disabled="language === key">
            {{ value }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-button circle @click="goToGitHub">
      <SvgIcon name="github" color="black" :width="iconSize" :height="iconSize" />
    </el-button>
  </div>
</template>

<style scoped lang="scss">
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: $navbar-height;
  padding: 0 20px;

  .el-button {
    background: transparent;
    border: none;
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
