<template>
    <div class="login-box">
      <div class="loginBox content flexBox flexLeft">
        <div class="login-left">
          <img src="../assets/image/login/bg1.png" alt="">
          <p>南京报业图库管理共享平台</p>
        </div>
        <div class="login-right" v-if="show_login">
          <div class="right-top flexBox flexAlign">
            <img src="../assets/image/login/vinj_Logo.png" alt="">
          </div>
          <div class="right-content" @keyup.enter="login()">
            <div class="title">密码登录</div>
            <el-form ref="form" :model="form">
              <el-form-item>
                <el-input v-model="form.name"
                placeholder="账号"
                prefix-icon="nameIcon"></el-input>
              </el-form-item>
              <el-form-item>
               <el-input v-model="form.password"
                type="password"
                show-password
                placeholder="密码"
                prefix-icon="mimaIcon"></el-input>
              </el-form-item>
            </el-form>
            <!-- <div class="bottom flexBox flexBetween flexAlign">
              <div class="remeber">
                <el-checkbox label="记住密码" v-model="form.checked"></el-checkbox>
              </div>
              <div class="forget">
                <span @click="goForget()">忘记密码</span>
              </div>
            </div> -->
          </div>
          <el-button type="primary" round size="medium" @click="login()">
            {{logining ? '正在登录...' : '登 录'}}
          </el-button>
        </div>
        <div class="login-right" v-else>
          <div class="right-top flexBox flexAlign">
            <img src="../assets/image/login/vinj_Logo.png" alt="">
          </div>
          <div class="right-content">
            <div class="title">重置密码</div>
            <el-form ref="form" :model="form">
              <el-form-item>
                <el-input v-model="form.newPassword"
                placeholder="请输入密码"
                type="password"
                show-password></el-input>
              </el-form-item>
              <el-form-item>
               <el-input v-model="form.checkPassword"
                placeholder="确认密码"
                type="password"
                show-password></el-input>
              </el-form-item>
            </el-form>
          </div>
          <el-button type="primary" round size="medium" @click="resetPassword">确 认</el-button>
          <!-- <div class="tip">
            已有账号，马上<span @click="goLogin()">登录</span>
          </div> -->
        </div>
      </div>
    </div>
</template>
<script>
import secret from '../utils/secret'
export default{
  data () {
    return {
      show_login: true,
      logining: false,
      form: {
        name: '',
        password: '',
        checked: false,
        newPassword: '',
        checkPassword: ''
      },
      userInfo: {},
      member_id: ''
    }
  },
  methods: {
    goLogin () {
      this.show_login = true
    },
    goForget () {
      this.show_login = false
    },
    login () {
      if (this.form.password === '' || this.form.name === '') {
        this.$message({
          message: '请输入账号密码',
          type: 'warning',
          duration: 1000,
          center: true
        })
        return
      }
      const encryptionPassword = this.form.password
      const encrypted = secret.Encrypt(encryptionPassword)
      let param = {
        is_fusion: 0,
        remember: this.form.checked ? 1 : 0,
        password: encrypted,
        username: this.form.name
      }
      if (this.logining) return
      this.logining = true
      this.$api.userLogin(param).then((res) => {
        if (res.error_code === 0) {
          if (res.data.reset_pwd === 0) {
            this.userInfo = res.data
            window.localStorage.setItem('accessToken', this.userInfo.access_token)
            this.$message({
              showClose: true,
              message: '登录成功',
              type: 'success'
            })
            setTimeout(() => {
              this.$router.push({
                name: 'workbench',
                params: {userInfo: this.userInfo}
              })
            }, 2000)
          } else {
            this.$message({
              showClose: true,
              message: '请重置密码',
              type: 'success'
            })
            this.member_id = res.data.id
            this.show_login = false
            this.logining = false
          }
        } else {
          this.$message({
            showClose: true,
            message: res.error_message,
            type: 'error'
          })
          this.logining = false
        }
      })
    },
    resetPassword () {
      if (this.form.newPassword !== '' && this.form.checkPassword !== '') {
        if (this.form.newPassword !== this.form.checkPassword) {
          this.$message({
            showClose: true,
            message: '两次输入的密码不一致',
            type: 'warning'
          })
        }
        // const encryptionNewPassword = this.form.newPassword
        // const newPassword = secret.Encrypt(encryptionNewPassword)
        // const encryptionCheckPassword = this.form.checkPassword
        // const checkPassword = secret.Encrypt(encryptionCheckPassword)
        let param = {
          confirm_password: this.form.newPassword,
          password: this.form.checkPassword
        }
        this.$api.resetPassword(this.member_id, param).then(res => {
          // console.log(res)
          if (res.error_code === 0) {
            this.$message({
              showClose: true,
              message: '密码重置成功',
              type: 'success'
            })
            this.show_login = true
          } else {
            this.$message({
              showClose: true,
              message: res.error_message,
              type: 'error'
            })
            this.form.newPassword = ''
            this.form.checkPassword = ''
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: '请输入密码',
          type: 'warning'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.content{
  width: 1200px;
  margin: 0 auto;
}
.login-box{
  width: 100%;
  height: 100%;
  background: url(../assets/image/login/bg.png) no-repeat;
  background-size: contain;
  .loginBox{
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    height:660px;
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 32px 0px rgba(35,137,218,0.16);
    border-radius:3px;
    .login-left{
      width:720px;
      height:660px;
      overflow: hidden;
      position: relative;
      img{
        width: 100%;
        max-height: 100%;
      }
      p{
        font-size:24px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:33px;
        letter-spacing:8px;
        position: absolute;
        bottom: 55px;
        left: 172px;
      }
    }
    .login-right{
      padding: 50px 90px 50px 60px;
      width: 480px;
      .right-top{
        width: 123px;
        height: 40px;
        overflow: hidden;
        img{
          width: 100%;
          max-height: 100%
        }
      }
      .right-content{
        margin-top: 82px;
        .title{
          font-size:18px;
          font-family:PingFangSC;
          font-weight:400;
          color:rgba(51,51,51,1);
        }
        /deep/{
          .el-form{
            .el-form-item{
              width: 320px;
              margin-top: 30px;
              /* border: none; */
              outline: none;
              border-bottom: 1px solid rgba(235,235,235,1);
              .el-input{
                input{
                  outline: none;
                  border: none;
                  height: 30px;
                }
              }
            }
          }
        }
        .bottom{
          font-size:12px;
          font-family:PingFangSC;
          font-weight:400;
          .remeber{
            color:rgba(102,102,102,1);
          }
          .forget{
            color:rgba(56,167,255,1);
            cursor: pointer;
          }
        }
      }
      /deep/{
        .el-button{
          width: 100%;
          margin-top: 78px;
        }
      }
      .tip{
        text-align: center;
        margin-top: 16px;
        color: #333333;
        font-size: 12px;
        span{
          color: #38A7FF;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
