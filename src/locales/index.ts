import { createI18n } from 'vue-i18n';

// 动态导入目录下的所有 .ts 文件
const enModules = import.meta.glob('./en/**/*.ts', { eager: true });
const zhCnModules = import.meta.glob('./zh-cn/**/*.ts', { eager: true });

// 工具函数：将模块内容合并到语言对象中
const mergeLocaleModules = (modules: Record<string, any>) => {
  const localeData: Record<string, any> = {};
  for (const [path, module] of Object.entries(modules)) {
    // 提取文件名（去掉路径和扩展名）
    const fileName = path.replace(/^.*\/(.*)\.ts$/, '$1');
    // 将模块的默认导出内容合并到语言对象中
    localeData[fileName] = module.default;
  }
  return localeData;
};

// 语言列表
export const languageList = {
  zhCn: '中文',
  en: 'English',
} as const;

// 语言类型
export type LanguageTypes = keyof typeof languageList;

// 语言配置
const messages = {
  zhCn: mergeLocaleModules(zhCnModules),
  en: mergeLocaleModules(enModules),
} satisfies Record<LanguageTypes, any>;

// 创建 i18n 实例
const i18n = createI18n({
  // 使用 Composition API 模式，禁用传统 API
  legacy: false,
  // 默认语言为中文
  locale: 'zhCn',
  // 当语言文件中缺少翻译时，回退到英文
  fallbackLocale: 'en',
  // 启用全局注入，允许在组件中使用 `$t` 等方法
  globalInjection: true,
  // 语言包配置
  messages: messages,
});

export default i18n;
