<script setup lang="ts">
import { useRouter, type RouteRecordRaw } from 'vue-router';

const props = defineProps<{
  menuList: RouteRecordRaw[];
}>();

defineOptions({ name: 'MenuList' });

// 图标大小
const iconSize = 25;

// 获取路由对象
const $router = useRouter();

// 路由跳转
const goRoute = (value: any) => {
  $router.push(value.index);
};

// 菜单列表
const menuList = props.menuList;
</script>

<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item v-if="!item.meta?.hidden" :index="item.path" @click="goRoute">
        <el-icon :size="iconSize">
          <component :is="item.meta?.icon"></component>
        </el-icon>
        <span>{{ item.meta?.title }}</span>
      </el-menu-item>
    </template>

    <!-- 只有一个子路由 -->
    <template v-else-if="item.children.length === 1">
      <el-menu-item v-if="!item.children[0].meta?.hidden" :index="item.children[0].path" @click="goRoute">
        <el-icon :size="iconSize">
          <component :is="item.children[0].meta?.icon"></component>
        </el-icon>
        <span>{{ item.children[0].meta?.title }}</span>
      </el-menu-item>
    </template>

    <!-- 子路由大于一个 -->
    <el-sub-menu v-else-if="item.children.length > 1" :index="item.path">
      <template #title>
        <el-icon :size="iconSize">
          <component :is="item.meta?.icon"></component>
        </el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <MenuList :menuList="item.children" />
    </el-sub-menu>
  </template>
</template>
