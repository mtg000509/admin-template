<script setup lang="ts">
import ContentArea from './components/ContentArea.vue';
import MenuList from './components/MenuList.vue';
import NavBar from './components/NavBar.vue';
import TitleBar from './components/TitleBar.vue';
import { useSetting } from './hooks/useSetting';
import { useUser } from './hooks/useUser';

defineOptions({ name: 'Layout' });

const { menuFold, refresh } = useSetting();

const { menuList } = useUser();

// icon size
const iconSize = 20;
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
          <NavBar :iconSize="iconSize" />
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
    background-color: rgb(128 128 128 / 5%);

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
