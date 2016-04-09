'use strict';

/**
 * hook config
 * https://thinkjs.org/doc/middleware.html#toc-df6
 */
export default {
  logic_before: ["prepend", "csrf"],
  view_before: ['append', 'react']
}