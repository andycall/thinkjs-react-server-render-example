import Root from '../root'
import Index from '../index/index'

export default {
  path: '/',
  component: Root, // 路由容器组件, 类似与Router组件
  getChildRoutes(location, cb) {
    // 使用require.ensure 来动态加载其他页面的组件
    require.ensure([], (require) => {
      cb(null, [require('./TestRoute')])
    })
  },
  indexRoute: {
    component: Index // 首页的组件入口
  }
}