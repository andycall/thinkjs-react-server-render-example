import Index from '../../../www/client/home/index/index'
import Test from '../../../www/client/home/test/index'

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