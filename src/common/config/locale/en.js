'use strict';

export default {
  USER_NOT_LOGIN: [403, '用户未登录'],
  USER_EXIST: [100, '用户已存在'],
  NO_USER: [106, '用户不存在'],
  USER_NO_PERMISSION: [101, '用户没有权限'],
  PARAMS_ERROR: [102, '参数错误'],
  DATA_EMPTY: [103, '发送数据为空'],
  ACCOUNT_ERROR: [104, '账号异常'],
  PASSWORD_ERROR: [105, '密码错误'],
  MAX_MOUNT_ERROR: [106, '今日登陆错误次数超过10次']
};