import { reactive } from 'vue';

interface TypePreferences {
  // logo 路径
  logoPath?: string;
  // 标题名
  titleName?: string;
}

// 偏好设置
export const preferences = reactive<TypePreferences>({
  logoPath: '/圣诞树.svg',
  titleName: 'Template',
});
