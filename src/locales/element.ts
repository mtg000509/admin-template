import type { TypeLanguage } from './index';
import type { Language } from 'element-plus/es/locale/';

import en from 'element-plus/es/locale/lang/en';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

// element plus 语言映射
export const elementLangList = {
  zhCn: zhCn,
  en: en,
} satisfies Record<TypeLanguage, Language>;
