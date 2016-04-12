import Login from '../index'

export default {
  path: '/',
  component: Login,
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {

    })
  },
  indexRoute: {
    component: Login
  }
}