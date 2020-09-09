<template>
    <div class="index">
        <el-container>
          <el-header>
            <!-- header -->
            <Header @getUserType="getUserType" :userInfo = userInfo ></Header>
          </el-header>
          <el-container class="center">
            <el-aside width="160">
              <Aside :routeName = routeName :reload=reload ></Aside>
            </el-aside>
            <el-main>
              <router-view :userType='userType' :userInfo = userInfo v-if="isRouterAlive"/>
            </el-main>
          </el-container>
        </el-container>
    </div>
  </template>
<script>
import Header from '../components/common/header'
import Aside from '../components/common/aside'
export default {
  name: '',
  components: {
    Header,
    Aside
  },
  data () {
    return {
      msg: '',
      userType: '',
      routeName: this.$route.path.match('(/[a-z]+[^/]){1}')[0],
      userInfo: {},
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    },
    changeRouter (item) {
      if (item.path === this.$route.path) {
        this.$router.go(0)
      } else {
        this.$router.push({
          path: item.path
        })
      }
    },
    // 获取用户类别
    getUserType (val) {
      this.userType = val
      this.routeName = this.$route.path.match('(/[a-z]+[^/]){1}')[0]
    },
    getUserInfo () {
      // let param = {
      //   access_token: window.localStorage.getItem('accessToken')
      // }
      // console.log(window.localStorage.getItem('accessToken'))
      this.$api.userInfo().then(res => {
        if (res.error_code === 0) {
          this.userInfo = res.data
          // console.log(this.userInfo)
        }
      })
    }
  },
  mounted () {
    this.getUserInfo()
    // console.log(this.routeName)
  },
  watch: {
    $route (curVal, oldVal) {
      // console.log(curVal.path)
      this.routeName = curVal.path.match('(/[a-z]+[^/]){1}')[0]
    }
  }
}
</script>
<style lang='scss' scoped>
.index{
  height: 100%;
}
  .el-header{
    height: 200px;
    padding: 0;
  }
  .el-aside{
    width: 160px;
    background-color: #fff;
    height: 100%;
    &::-webkit-scrollbar {display:none}
  }
  .el-container{
    height: 100%;
  }
  .el-container.center{
    background: #F6F8F9;
    padding: 20px;
    height: 100%;
    .el-main{
      width: 90%;
      padding: 0px;
      margin-left: 20px;
      &::-webkit-scrollbar {display:none}
    }
  }
</style>
