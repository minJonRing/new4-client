// 所有vuex里的数据
import { getters as GlobalGetter } from './global/index'
const getters = {
  // 系统设置
  loading: state => state.app.loading,
  sidebar: state => state.app.sidebar,
  search: state => state.app.search,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  fullScreen: state => state.settings.fullScreen,
  menuSearch: state => state.settings.menuSearch,
  resize: state => state.settings.resize,
  errorBtn: state => state.settings.errorBtn,
  // blobal
  ...GlobalGetter,
  // 用户信息
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userInfo: state => state.user.userInfo,
  logo: state => state.user.logo,
  roles: state => state.user.roles,
  collect: state => state.user.collect,
  collectTopic: state => state.user.collectTopic,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  // more
  goods: state => state.cart.goods
}
export default getters
