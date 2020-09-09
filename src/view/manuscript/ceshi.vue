<template>
  <div class="ceshi">
    <iframe :src="iframeSrc" frameborder="0" scrolling="auto" width="100%" height="100%"></iframe>
  </div>
  <!-- <iframe src="https://www.baidu.com/" width="300" height="300" frameborder="0" scrolling="auto"></iframe> -->
</template>
<script>
export default {
  data () {
    return {
      iframeSrc: `${this.$global.default.baseUrl}/main/app/content/menu/list?type=article&access_token=${this.$global.default.getToken()}&hideNavigation=1`
    }
  }
}
</script>
<style lang="scss" scoped>
.ceshi{
  height: 100%;
}
</style>
