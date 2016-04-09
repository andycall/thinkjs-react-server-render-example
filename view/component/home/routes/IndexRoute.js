if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import Index from '../index/index'

export default {
  path: '/',
  component: Index,
  getChildRoutes (location, cb) {
    require.ensure([], (require) => {
      cb(null, [require('./LoginRoute') ])
    })
  },
  indexRoute: {
    component: Index
  }
}

