<template>
  <div class="header flexBetween flexBox">
    <div class="headerLeft flexLeft flexBox">
      <div class="logo">
        <img src="../../assets/image/logo.png" alt>
      </div>
      <!-- <h3>视觉南京</h3> -->
    </div>
    <div class="headerRight flexLeft flexBox">
      <!-- <i class="shezhi"></i> -->
      <i class="tishi active" style="margin-right: 20px" @click="goRoute()"></i>
      <el-container>
        <el-header class="flexBox flexBetween" height="unset" style="position:relative;padding:0;">
          <div class="userLogo flexBox">
            <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="">
            <img v-else src="../../assets/image/avatar.png" alt>
            <el-cascader
              :options="options"
              :show-all-levels="false"
              size="mini"
              style="opacity: 0;top: 0px;right: 0;position: absolute;height: 28px;width:100%"
              @change="getUserTypeId"
            ></el-cascader>
          </div>
          <div class="userName flexBox flexAlign">
            <div class="name">{{userInfo.name}}</div>
            <!-- <div class="worker">{{userName}}</div> -->
          </div>
        </el-header>
      </el-container>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      role: 2,
      userName: '',
      // userType: [{ value: 1, label: '总编' }, { value: 2, label: '编辑' }],
      options: [
        {
          value: 'person',
          label: '个人中心'
        },
        {
          value: 'juese',
          label: '角色管理',
          children: [{ value: 1, label: '总编' }, { value: 2, label: '编辑' }]
        },
        {
          value: 'tuichu',
          label: '退出'
        }
      ]
    }
  },
  props: ['userInfo'],
  methods: {
    getUserTypeId (value) {
      if (value[0] === 'person') {
        this.$router.push({
          name: 'person'
        })
      }
      if (value[0] === 'tuichu') {
        this.$api.userLogout().then(res => {
          if (res.error_code === 0) {
            window.localStorage.clear()
            this.$router.push({
              name: 'login'
            })
          }
        })
      }
      this.role = value[1] || this.role
      // if (this.role === 2) {
      //   this.options.splice(1, 1)
      // }
      // console.log(this.role)
      window.localStorage.setItem('role', this.role)
      window.localStorage.setItem('role_id', +window.localStorage.role + 2)
      // console.log(window.localStorage)
      this.$emit('getUserType', this.role)
    },
    goRoute () {
      this.$router.push({
        path: '/message'
      })
    }
  },
  mounted () {
    // if (this.role === 2) {
    //   this.options.splice(1, 1)
    // }
    this.$emit('getUserType', this.role)
    // window.localStorage.setItem('role', this.role)
    // console.log(window.localStorage)
  }
}
</script>
<style lang='scss' scoped>
.header {
  padding: 16px 30px;
  height: 60px;
  background: #ffffff;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.06);
  position: relative;
  .headerLeft {
    .logo {
      background-color: #fff;
      width: 114px;
      height: 36px;
      overflow: hidden;
      img {
        width: 100%;
        max-height: 100%;
      }
    }
    h3 {
      font-family: PingFangSC-Regular;
      font-size: 20px;
      color: #333333;
      margin-left: 10px;
      font-weight: normal;
    }
  }
  .headerRight {
    .shezhi {
      display: inline-block;
      width: 21px;
      height: 18px;
      background: url(../../assets/image/workBench/icon_xitongguankong.png)
        no-repeat center center;
      margin-top: 5px;
    }
    .tishi {
      margin-left: 27px;
      width: 16px;
      display: inline-block;
      height: 18.7px;
      background: url(../../assets/image/workBench/icon_xiaoxi.png) no-repeat
        center center;
      margin-top: 5px;
      position: relative;
    }
    .tishi.active:after {
      display: inline-block;
      width: 6px;
      height: 6px;
      content: "";
      background: #e7505a;
      border-radius: 50%;
      position: absolute;
      right: -3px;
      top: -4px;
    }
    .userLogo {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      overflow: hidden;
      background-color: #000;
      img {
        width: 100%;
        max-height: 100%;
      }
    }
    .userName {
      min-width: 50px;
      font-family: PingFangSC-Regular;
      font-size: 10px;
      color: #333333;
      margin-left: 14px;
      .worker {
        line-height: 20px;
        color: #999999;
      }
    }
  }
}
</style>
