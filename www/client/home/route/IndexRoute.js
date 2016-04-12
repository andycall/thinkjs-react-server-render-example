import Index from '../index/index'
import Test from '../test/index'

export default {
  path: '/',
  component: Index,
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [require('./TestRoute')])
    })
  },
  indexRoute: {
    component: Test
  }
}