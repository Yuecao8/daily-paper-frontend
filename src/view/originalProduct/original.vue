<template>
  <div class='personManage'>
    <iframe
      :src="baseUrl + '/main/app/originalProduct/list?access_token=' + access_token + '&hideNavigation=1&vinj=1'"
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
      styleFlag: false
    }
  },
  created () {
    // app-body
  }
}
</script>
<style lang='scss' scoped>
.personManage{
  height: 100%;
  background: #fff;
  .app-header ~ .app-body{
    padding-top: 0;
  }
}
</style>
