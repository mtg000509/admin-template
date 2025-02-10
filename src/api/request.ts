import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import axios from 'axios';
import { ElMessage } from 'element-plus';
import { z } from 'zod';

// 响应数据格式
export const baseSchema = z.object({
  code: z.number(),
  message: z.string(),
  data: z.unknown(),
});

// axios 实例
const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => Promise.reject(error),
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code } = response.data;

    if (code !== 200) {
      return Promise.reject(new Error(response.data.message));
    }

    return response.data;
  },
  (error) => {
    ElMessage.error({
      message: error?.response?.statusText,
      type: 'error',
    });
    return Promise.reject(error);
  },
);

export default request;
