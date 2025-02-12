<script setup lang="ts">
import type { TypeLanguage } from '@/locales';
import { elementLangList } from '@/locales/element';

import { useSettingStore } from './store/core';

import { computed } from 'vue';

defineOptions({ name: 'App' });

// 获取 setting store
const settingStore = useSettingStore();

// 根据语言设置element-plus的语言
const locale = computed(() => {
  return elementLangList[settingStore.language as TypeLanguage];
});
</script>

<template>
  <!-- 全局配置 -->
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>
