// 引入全局样式
import '@/styles/index.scss';

// 引入全局组件
import globalComponent from '@/components';
import i18n from '@/locales';
import router from '@/router';
import pinia from '@/store';

// 注册 vite-plugin-svg-icons
import 'virtual:svg-icons-register';

import App from './App.vue';

import { createApp } from 'vue';

import ElementPlus from 'element-plus';
// 引入 Element Plus 样式
import 'element-plus/dist/index.css';

const app = createApp(App);

app.use(i18n);
app.use(pinia);
app.use(router);
app.use(globalComponent);
app.use(ElementPlus);

app.mount('#app');
