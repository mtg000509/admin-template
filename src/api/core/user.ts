import request, { baseSchema } from '../request';

import { z } from 'zod';

// 接口地址
enum API {
  USER_LOGIN = '/user/login',
  GET_USER_INFO = '/user/info',
}

export const schemaUserLogin = z.object({
  username: z.string(),
  password: z.string(),
});

export type TypeUserLogin = z.infer<typeof schemaUserLogin>;

export const schemaResUserLogin = baseSchema.extend({
  data: z.object({
    token: z.string(),
  }),
});

export type TypeResUserLogin = z.infer<typeof schemaResUserLogin>;

// 用户登录
export const apiUserLogin = (data: TypeUserLogin) => {
  return request.post<any, TypeResUserLogin>(API.USER_LOGIN, data);
};

export const schemaGetUserInfo = baseSchema.extend({
  data: z.object({
    name: z.string(),
    avatar: z.string(),
  }),
});

export type TypeResGetUserInfo = z.infer<typeof schemaGetUserInfo>;

// 获取用户信息
export const apiGetUserInfo = () => {
  return request.get<any, TypeResGetUserInfo>(API.GET_USER_INFO);
};
