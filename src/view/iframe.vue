<template>
  <div class='personManage'>
    <iframe
      :src="baseUrl + currentUrl + '?access_token=' + access_token + '&hideNavigation=1&vinj=1' + other"
      frameborder="0"
      scrolling="auto"
      width="100%"
      height="100%"
      :style="styleFlag?'margin-top: -60px;height: calc(100% + 60px)':''"
    ></iframe>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      access_token: this.$global.default.getToken(),
      baseUrl: this.$global.default.baseUrl,
      currentUrl: '',
      other: '',
      routePath: '',
      styleFlag: false
    }
  },
  methods: {
    changeRoute () {
      this.routePath = this.$route.path
      if (!this.access_token) {
        this.$route.push({
          path: '/login'
        })
        return
      }
      switch (this.routePath) {
        // 人像库
        case '/facedatabase':
          this.currentUrl = '/main/app/resource/menu/face'
          this.other = '&is_hide=1'
          break
          // 快速建稿
        case '/quickPost':
          this.currentUrl = '/main/app/picEdit'
          this.other = '&type=original&fast_create=1'
          break
          // 视频
        case '/video':
          this.currentUrl = '/main/app/content/menu/list'
          this.other = '&type=video'
          break
          // 摄影之家
        case '/link':
          this.currentUrl = '/main/app/content/menu/list'
          this.other = '&type=link'
          break
          // 类目设置
        case '/classify':
          this.currentUrl = '/main/app/classifyManage'
          this.other = '&type=atlas'
          break
          // 网站栏目
        case '/columnmanage':
          this.currentUrl = '/main/app/siteManage/column'
          this.other = '&site_id=0'
          break
          // 审核设置
        case '/processconfig':
          this.currentUrl = '/main/app/content/processConfig'
          break
          // 组织架构
        case '/department':
          this.currentUrl = '/main/app/customer/department'
          break
          // 活动管理 /main/app/activityManage/list
        case '/activity':
          this.currentUrl = '/main/app/activityManage/list'
          break
          // 隔离库
        case '/isolatelibrary':
          this.currentUrl = '/main/app/isolateLibrary'
          // this.styleFlag = true
          break
          // 会员分组
        case '/membergroup':
          this.currentUrl = '/main/app/classifyManage'
          this.other = '&type=member'
          // this.styleFlag = true
          break
          // 会员管理
        case '/memberlist':
          this.currentUrl = '/main/app/memberList'
          // this.styleFlag = true
          break
          // 水印设置
        case '/settingwater':
          this.currentUrl = '/main/app/setting/waterList'
          // this.styleFlag = true
          break
        // 系统消息
        case '/message':
          this.currentUrl = '/main/app/personal/message'
          // this.styleFlag = true
          break
          // 签约审核
        case '/contractreview':
          if (this.$route.params && this.$route.params.status) {
            this.currentUrl = '/main/app/contractReview?status=1'
          } else {
            this.currentUrl = '/main/app/contractReview'
          }
          console.log(this.currentUrl)
          // this.currentUrl = '/main/app/contractReview'
          // this.styleFlag = true
          break
        // 会员角色 memberrole
        case '/memberrole':
          this.currentUrl = '/main/app/memberRole'
          // this.styleFlag = true
          break
        // 摄影分类 main/app/classifyManage?type=link
        case '/photographic':
          this.currentUrl = '/main/app/classifyManage'
          this.other = '&type=link'
          // this.styleFlag = true
          break
      }
    }
  },
  created () {
    this.changeRoute()
  },
  watch: {
    $route: {
      handler (val, oldval) {
        this.routePath = val.path
        this.changeRoute()
      },
      deep: true
    }
  }
}
</script>
<style lang='scss' scoped>
.personManage{
  height: 100%;
  background: #fff;
}
</style>
