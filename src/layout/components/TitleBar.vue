<script setup lang="ts">
import { preferences } from '@/preferences';

const props = defineProps<{
  isFold: boolean;
}>();

defineOptions({ name: 'TitleBar' });

// 是否折叠
const isFold = props.isFold;

// logo
const logoPath = preferences?.logoPath;

// 标题
const titleName = preferences?.titleName;

// 图标大小
const iconSize = 40;
</script>

<template>
  <div class="title-bar">
    <el-avatar v-if="logoPath" :size="iconSize" :src="logoPath" shape="square" />
    <el-avatar v-else :size="iconSize" src="https://empty">
      <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
    </el-avatar>

    <transition name="fade">
      <div v-show="!isFold" class="title">{{ titleName }}</div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.title-bar {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: $navbar-height;
  padding-left: 10px;

  .el-avatar {
    max-width: 40px;
    max-height: 40px;
  }

  .title {
    position: absolute;
    left: 60px;
    width: 130px;
    overflow: hidden;
    font-size: 18px;
    font-weight: 600;
    white-space: nowrap;
  }
}

/* 动画过渡 */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s ease-in-out,
    transform 0.5s ease-in-out;
}
</style>
