/***饼图****/
<!--
// hover时   是否在圆的中间显示 name
emphasis: {
  show: true,
  textStyle: {
    fontSize: '30',
    fontWeight: 'bold'
  }
}
// 饼图的位置
series:[center: ['80%', '55%']]
-->
<template>
    <div class='pie-charts'>
      <div ref='myChart' class='myChart flex-one'></div>
    </div>
</template>
<script>
import debounce from '../../utils/mixins/debounce.js'// 混入图表自适应
let echarts = require('echarts/lib/echarts')
// 引入提示框和标题组件
require('echarts/lib/component/legend')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: '',
  props: ['option', 'refresh'],
  data () {
    return {}
  },
  mixins: [debounce],
  methods: {
    drawCharts () {
      let piechart = echarts.init(this.$refs.myChart)
      piechart.showLoading()
      piechart.setOption(this.option, true)
      window.onresize = function () {
        piechart.resize()
      }
      piechart.hideLoading()
    }
  },
  mounted () {
    this.drawCharts()
  },
  watch: {
    refresh (curVal, oldVal) {
      this.drawCharts()
    }
  }
}
</script>
<style lang='scss' scoped>
.pie-charts {
  width: 100%;
  height: 100%;
  .myChart {
    height: 100%;
    width: 100%;
  }
  .myChart > div {
    width: 100%;
  }
}
</style>
