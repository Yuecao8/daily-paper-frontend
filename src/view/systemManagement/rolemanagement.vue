<template>
  <div class='personManage'>
    <iframe
      :src="baseUrl + '/main/app/customer/role?access_token=' + access_token + '&hideNavigation=1&vinj=1'"
      frameborder="0"
      scrolling="auto"
      width="100%"
      height="100%"
    ></iframe>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      access_token: this.$global.default.getToken(),
      baseUrl: this.$global.default.baseUrl
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
