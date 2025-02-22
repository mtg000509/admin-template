<script setup lang="ts">
import { useSetting } from '../hooks/useSetting';
import { useUser } from '../hooks/useUser';

import { computed, ref } from 'vue';

import { useRoute } from 'vue-router';

const props = defineProps<{
  iconSize: number;
}>();

// 图标大小
const iconSize = props.iconSize;

defineOptions({ name: 'NavBar' });

const { userInfo, logOut } = useUser();

// 用户名
const name = userInfo?.name;

// 用户头像
const avatar = userInfo?.avatar;

const { menuFold, changeMenuFold, foldEnable, languageList, language, changeLanguge, updateRefresh, fullScreen } =
  useSetting();

// 设置抽屉显示
const settingVisible = ref<boolean>(false);

// 切换设置抽屉显示
const changeSettingVisible = () => {
  settingVisible.value = !settingVisible.value;
};

const $route = useRoute();

const filteredMatched = computed(() => {
  return $route.matched.filter((item) => item.meta?.title);
});

console.log(languageList);
</script>

<template>
  <div class="nav-bar">
    <el-button :disabled="!foldEnable" class="button-no-style" @click="changeMenuFold">
      <el-icon class="icon" :size="iconSize">
        <component :is="menuFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </el-button>

    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="(item, index) in filteredMatched" :key="index" :to="item.path">
        <el-icon :size="iconSize">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ $t(item.meta.title as string) }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="setting">
      <el-button class="button-no-style" @click="updateRefresh">
        <el-icon :size="iconSize">
          <Refresh />
        </el-icon>
      </el-button>

      <el-button class="button-no-style" @click="fullScreen">
        <el-icon :size="iconSize">
          <FullScreen />
        </el-icon>
      </el-button>

      <el-dropdown @command="changeLanguge">
        <SvgIcon name="language" color="black" :width="iconSize" :height="iconSize" />
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

      <el-dropdown>
        <div class="user-info">
          <el-avatar :size="30" :src="avatar" />
          <div class="username">
            <span>{{ name }}</span>
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
          </div>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="SwitchButton" @click="logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-button class="button-no-style" @click="changeSettingVisible">
        <el-icon :size="iconSize"><Setting /></el-icon>
      </el-button>
    </div>

    <!-- 设置抽屉 -->
    <el-drawer v-model="settingVisible" :show-close="false" size="20%">
      <template #header="{ close }">
        <span>系统设置</span>
        <el-button class="button-no-style" @click="close">
          <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
        </el-button>
      </template>

      <template #default>
        <el-form>
          <el-form-item label="语言：">
            <el-select v-model="language"> </el-select>
          </el-form-item>
        </el-form>
      </template>

      <template #footer>
        <el-button class="btn">保存</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.nav-bar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid rgb(0 0 0 / 30%);

  .icon {
    margin-right: 20px;
  }

  :deep(.el-breadcrumb__inner) {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .setting {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-left: auto;

    .user-info {
      display: flex;
      gap: 10px;
      align-items: center;

      .username {
        display: flex;
        align-items: center;
        font-weight: 600;
      }
    }
  }

  :deep(.el-drawer) {
    min-width: 150px;

    .el-drawer__header {
      height: 60px;
      padding: 0 20px;
      margin: unset;
      font-size: 20px;
      font-weight: 600;
      color: black;
    }
  }
}

:deep(.el-form-item__label) {
  font-size: 18px;
}

.button-no-style {
  padding: unset;
  margin: unset;
  background-color: unset;
  border: unset;
}

// 去除鼠标聚焦
.el-tooltip__trigger:focus-visible {
  outline: unset;
}

// 去除下拉菜单鼠标 hover背景色
:deep(.el-dropdown-menu__item) {
  display: flex;
  align-items: center;
}

// 去除下拉菜单鼠标 hover背景色
:deep(.el-dropdown-menu__item:hover) {
  background-color: unset;
}
</style>
