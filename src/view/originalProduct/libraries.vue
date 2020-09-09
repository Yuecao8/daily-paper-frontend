<template>
  <div class='personManage'>
    <iframe
      :src="baseUrl + '/main/app/libraries?access_token=' + access_token + '&hideNavigation=1&vinj=1'"
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
  }
}
</script>
<style lang='scss' scoped>
.personManage{
  height: 100%;
  background: #fff;
}
</style>
