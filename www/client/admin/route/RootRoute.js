import Root from '../root'
import Index from '../index/index'

export default {
  path: '/admin',
  component: Root, // 路由容器组件, 类似与Router组件
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [require('./LoginRoute'), require('./IndexRoute')]);
    })
  },
  indexRoute: {
    component: Index // 首页的组件入口
  }
}