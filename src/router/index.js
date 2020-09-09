import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: (to, from, savedPosition) => savedPosition || {
    x: 0,
    y: 0
  },
  routes: [
    {
      path: '/',
      name: 'login',
      // component: () => import('../components/login'),
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/login')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../view/home'),
      children: [
        {
          path: '/workbench',
          name: 'workbench',
          component: () => import('../view/homePage/workbench'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: '/workbench/photomore',
          name: 'workbench.photomore',
          component: () => import('../view/homePage/components/photomore'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: '/workbench/statisticsdetails',
          name: 'workbench.statisticsdetails',
          component: () => import('../view/homePage/components/statisticsDetails'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        // 智能媒资
        {
          path: '/drafting',
          name: 'drafting',
          component: () => import('../view/IntelligentMedia/quickdrafting'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: '/materialbank',
          name: 'materialbank',
          component: () => import('../view/IntelligentMedia/materialbank'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: '/intelligentsearch',
          name: 'intelligentsearch',
          component: () => import('../view/IntelligentMedia/intelligentsearch'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        // 人脸库
        {
          path: '/facedatabase',
          name: 'faceDatabase',
          component: () => import('../view/iframe'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: '/workbench/articlemore',
          name: 'workbench.articlemore',
          component: () => import('../view/homePage/components/articlemore'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: '/workbench/commentmore',
          name: 'workbench.commentmore',
          component: () => import('../view/homePage/components/commentmore'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: '/person',
          name: 'person',
          component: () => import('../view/personalCenter/person'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        // 系统设置
        {
          path: '/personmanagement',
          name: 'personmanagement',
          component: () => import('../view/systemManagement/personmanagement'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: '/rolemanagement',
          name: 'rolemanagement',
          component: () => import('../view/systemManagement/rolemanagement'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        // 图片
        {
          path: '/original',
          name: 'original',
          component: () => import('../view/originalProduct/original'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        // 视频
        {
          path: '/video',
          name: 'video',
          component: () => import('../view/iframe'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        // 摄影之家
        {
          path: '/link',
          name: 'link',
          component: () => import('../view/iframe'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        // 发布库 main/app/libraries
        {
          path: '/libraries',
          name: 'libraries',
          component: () => import('../view/originalProduct/libraries'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        // 成品库
        {
          path: '/finished',
          name: 'finished',
          component: () => import('../view/originalProduct/finished'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: '/quickPost',
          name: 'quickPost',
          component: () => import('../view/iframe'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        // 类目设置
        {
          path: '/classify',
          name: 'classify',
          component: () => import('../view/iframe'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        // 网站栏目
        {
          path: '/columnmanage',
          name: 'columnmanage',
          component: () => import('../view/iframe'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        // 审核流程
        {
          path: '/processconfig',
          name: 'processConfig',
          component: () => import('../view/iframe'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        // 组织架构
        {
          path: '/department',
          name: 'department',
          component: () => import('../view/iframe'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        // 活动管理
        {
          path: '/activity',
          name: 'activity',
          component: () => import('../view/iframe'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        // 隔离库
        {
          path: '/isolatelibrary',
          name: 'isolatelibrary',
          component: () => import('../view/iframe'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        // 会员分组
        {
          path: '/membergroup',
          name: 'membergroup',
          component: () => import('../view/iframe'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        // 会员管理 memberlist
        {
          path: '/memberlist',
          name: 'memberlist',
          component: () => import('../view/iframe'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        // 水印设置 settingwater
        {
          path: '/settingwater',
          name: 'settingwater',
          component: () => import('../view/iframe'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        // 系统消息
        {
          path: '/message',
          name: 'message',
          component: () => import('../view/iframe'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        {
          path: '/contractreview',
          name: 'contractreview',
          component: () => import('../view/iframe'),
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          }
        },
        // 会员角色 memberRole
        {
          path: '/memberrole',
          name: 'memberrole',
          component: () => import('../view/iframe')
        },
        // 摄影分类
        {
          path: '/photographic',
          name: 'photographic',
          component: () => import('../view/iframe')
        }
      ]
    }
  ]
})
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
