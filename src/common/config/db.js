'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  log_sql: false,
  log_connect: false,
  adapter: {
    mysql: {
      host: '127.0.0.1',
      port: '3306',
      database: 'homework',
      user: 'root',
      password: '',
      prefix: '',
      encoding: 'utf8'
    }
  }
};
