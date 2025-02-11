<script setup lang="ts">
import type { TypeLanguage } from '@/locales';
import { languageList } from '@/locales';
import { useSettingStore } from '@/store/core';

import LoginForm from './components/LoginForm.vue';
import NavBar from './components/NavBar.vue';

import { computed } from 'vue';

defineOptions({ name: 'Login' });

// icon size
const iconSize = 20;

// setting store
const settingStore = useSettingStore();

// 当前语言
const language = computed(() => settingStore.language);

// 切换语言
const changeLanguge = (command: TypeLanguage) => {
  settingStore.setLanguage(command);
};

// 跳转到 GitHub
const goToGitHub = () => {
  window.location.href = 'https://github.com/mtg000509/admin-template';
};
</script>

<template>
  <div class="login">
    <NavBar
      :iconSize="iconSize"
      :language="language"
      :changeLanguge="changeLanguge"
      :languageList="languageList"
      :goToGitHub="goToGitHub"
    />
    <LoginForm />
  </div>
</template>

<style scoped lang="scss">
.login {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-image: url('@/assets/images/login/bg.png');
  background-position: center center;
  background-size: cover;
}
</style>
