<template>
  <div class="person">
    <iframe
      :src="baseUrl + '/main/app/personal/overview?access_token=' + access_token + '&hideNavigation=1&vinj=1'"
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
.person{
  height: 100%;
}
</style>
