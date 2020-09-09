/* 折线图 */
<!--
option: {
  // 标题
  title: {
    text: '堆叠区域图'
  },
  // 鼠标hover时  显示数据
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  // 分类
  legend: {
    data: ['PV', 'UV', 'IP']
  },
  // 右上角 保存为图片 按钮
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  // 设置 图表的位置
  grid: {
    left: '24px',
    right: '24px',
    bottom: '19px',
    // 不设置的话 就会超出你设置的区域
    containLabel: true
  },
  // x轴坐标设置
  xAxis: [
    {
      type: 'category',
      // 'value' 数值轴，适用于连续数据。
      // 'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
      // 'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
      // 'log' 对数轴。适用于对数数据。
      boundaryGap: false,
      // 控制竖向网格线是否显示（默认不显示）
      // splitLine: {
      //   show: true
      // },
      data: ['12', '13', '14', '15', '16', '17', '18']
    }
  ],
  yAxis: [
    {
      // 控制横向网格线是否显示（默认显示）
      splitLine: {
        show: false
      },
      type: 'value'
    }
  ],
  series: [
    {
      name: 'PV',
      type: 'line',
      stack: '总量',
      // 设置 线的颜色
      color: ['#2CD1A5'],
      // 线以下的区域颜色  不知道怎么不显示 可以设置不透明
      areaStyle: {
        opacity: 0
      },
      data: [120, 132, 101, 134, 90, 230, 210],
      smooth: true // 曲线圆滑
    }
  ]
-->
<template>
  <div class='line-charts'>
    <div ref='myChart' class='myChart flex-one' option></div>
  </div>
</template>

<script>
import debounce from '../../utils/mixins/debounce.js' // 混入图表自适应
let echarts = require('echarts/lib/echarts')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend') // 图例
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
export default {
  name: 'LineCharts',
  props: ['chartsOptions', 'refresh'],
  mixins: [debounce],
  data () {
    return {}
  },
  methods: {
    drawCharts () {
      let piechart = echarts.init(this.$refs.myChart)
      piechart.clear()
      piechart.showLoading()
      piechart.setOption(this.chartsOptions, true)
      window.onresize = function () {
        piechart.resize()
      }
      piechart.hideLoading()
    }
  },
  mounted () {
    this.drawCharts()
  },
  // updated () {
  //   this.drawCharts()
  // },
  watch: {
    refresh (curVal, oldVal) {
      this.drawCharts()
    }
  }
}
</script>

<style lang='scss' scoped>
.myChart {
  height: 100%
}
</style>
