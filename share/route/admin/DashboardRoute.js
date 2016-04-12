import Dashboard from '../../../www/client/admin/dashboard/index'

export default {
  path: '/',
  component: Dashboard,
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {

    })
  },
  indexRoute: {
    component: Dashboard
  }
}