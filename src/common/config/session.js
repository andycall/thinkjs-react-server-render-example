'use strict';

/**
 * session configs
 */
export default {
  name: 'Laywer',
  type: 'db',
  secret: '*`.^3P)2',
  timeout: 24 * 3600,
  cookie: { // cookie options
    length: 32,
    httponly: true
  },
};