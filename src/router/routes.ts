import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    meta: {
      hidden: false,
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'HomeFilled',
          hidden: false,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/4041',
    name: '4041',
    component: () => import('@/views/error/index.vue'),
    meta: {
      title: '404',
      icon: 'HomeFilled',
      hidden: false,
    },
    children: [
      {
        path: '/login1',
        name: 'Login1',
        component: () => import('@/views/login/index.vue'),
        meta: {
          title: '首页',
          icon: 'HomeFilled',
          hidden: false,
        },
      },
      {
        path: '/login2',
        name: 'Login2',
        component: () => import('@/views/login/index.vue'),
        meta: {
          title: '首页',
          icon: 'HomeFilled',
          hidden: false,
        },
      },
      {
        path: '/login3',
        name: 'Login3',
        component: () => import('@/views/login/index.vue'),
        meta: {
          title: '首页',
          icon: 'HomeFilled',
          hidden: false,
        },
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/index.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/404',
    meta: {
      hidden: true,
    },
  },
];

export default routes;
