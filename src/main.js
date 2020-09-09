// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import * as util from './utils/util'
import * as api from './api/api'
import * as global from './utils/global'
import NProgress from 'nprogress'
// import filters from './utils/filter.js'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/reset.css'
import './assets/style/global.css'
import './assets/style/fontstyle.css'
import 'nprogress/nprogress.css'
import echarts from 'echarts'

Vue.use(ElementUI)
Vue.use(echarts)
util.defVueProto({
  api,
  util,
  global
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (window.localStorage.getItem('accessToken')) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})
router.afterEach(() => {
  NProgress.done()
  // 接收消息 退出登录
  window.addEventListener('message', function (ev) {
    if (!ev.origin.includes(global.default.baseUrl) || location.href.includes('login')) return
    var data = ev.data
    switch (data) {
      case 'goLogin':
        router.replace('/login')
        break
      default:
    }
  }, false)
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
