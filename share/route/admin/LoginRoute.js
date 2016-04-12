import Login from '../../../www/client/admin/login/index'

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