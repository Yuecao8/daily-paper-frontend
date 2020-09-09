/***柱状图****/
<template>
  <div class="bar-charts">
    <div ref="myChart" class="myChart flex-one" option :style="{'height':heights||'300px','width':widths||'100%'}"></div>
  </div>
</template>

<script>
import debounce from '../../utils/mixins/debounce.js'// 混入图表自适应
let echarts = require('echarts/lib/echarts')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend') // 图例
require('echarts/lib/chart/bar')
export default {
  name: 'BarCharts',
  // 刚进来取阅读次数 将数据整理为以下格式 分别为 图例数据，x轴，data数据
  // 数据的顺序 要对应图例的顺序  chartsOptions
  // chartsOpt.legendData = ['今日'];
  // chartsOpt.showLegend = true;
  // chartsOpt.xAxisData = ['00:00', '01:00'];
  // chartsOpt.seriesData = [
  //   [0, 132],
  //   [220, 182],
  // ];
  // refreshData  刷新数据
  //
  props: ['chartsOptions', 'refreshData', 'heights', 'widths'],
  mixins: [debounce],
  data () {
    return {
      seriesOption: {
        symbolSize: 2, // 折现上小圆点大小
        barWidth: 12,
        smooth: 0.4,
        barGap: '80%',
        // name: '今日',
        name: '',
        type: 'bar',
        // color: ['skyblue'], // 折现颜色
        data: []
        // data: [0, 132, 301, 834, 80, 230, 210, 120, 132, 101, 634, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210],
      },
      option: {
        // 鼠标悬停后方框
        tooltip: {
          // formatter: '{a0}: {c0}<br/>{a1}: {c1}',
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          // backgroundColor: '#fff', // 背景色
          borderRadius: 3, // 边框圆角
          padding: [10, 20, 10, 20] // [5, 10, 15, 20] 内边距
          // formatter: function (params) {
          //   debugger
          //   let tar
          //   if (params[1].value !== '-') {
          //     tar = params[1]
          //   } else {
          //     tar = params[0]
          //   }
          //   return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value
          // }
        },
        // 图例
        legend: {
          left: '-4',
          data: [], // 图例数据
          icon: 'rect', //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
          itemWidth: 12, // 图例的宽度
          itemHeight: 4, // 图例的高度
          itemGap: 20, // 设置间距
          textStyle: {// 图例文字的样式
            color: '#ccc',
            fontSize: 12
          },
          show: false // 图例是否显示
        },
        // 整个区域的位置
        grid: {
          left: '0',
          right: '20',
          bottom: '20',
          top: '35',
          containLabel: true
        },
        // x轴
        xAxis: {
          type: 'category',
          boundaryGap: [20, 20], // 两侧留白
          axisTick: {
            show: false // x轴刻度线
          },
          axisLine: {
            lineStyle: {// x轴最底部的坐标线
              color: '#dcdcdc', // 颜色
              width: 1 // 宽度
            }
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: '#666666' // x轴 坐标值的颜色
            }
            // rotate: 45,
          },
          splitLine: {
            show: false
          },

          data: []
        },
        // y轴
        yAxis: {
          type: 'value',
          axisLine: {
            show: false // y轴竖线
          },
          axisTick: {
            show: false // y轴刻度线
          },
          splitLine: {
            lineStyle: {
              color: ['#EDEDED'] // y轴网格线颜色
            }
          },
          axisLabel: {
            textStyle: {
              color: '#666666' // y轴 坐标值的颜色
            }
          }

        },
        series: []
      }
    }
  },
  methods: {
    drawLine () {
      if (this.refreshData > 0) {
        const chartsOpt = JSON.parse(JSON.stringify(this.chartsOptions))
        const opt = JSON.parse(JSON.stringify(this.option))
        if (this.refreshData > 1 && this.chart) {
          this.chart.clear()
        }
        // 存入传入的数据 start
        opt.color = chartsOpt.color
        opt.legend.data = chartsOpt.legendData
        opt.legend.show = true
        opt.xAxis.data = chartsOpt.axisData
        if (chartsOpt.seriesData.length) {
          chartsOpt.seriesData.forEach((vv, index) => {
            let obj = JSON.parse(JSON.stringify(this.seriesOption))// 直接等于 浅拷贝 会出问题
            obj.data = vv
            obj.barMaxWidth = 50
            obj.name = chartsOpt.legendData ? chartsOpt.legendData[index] : ''
            opt.series.push(obj)
          })
          // console.log(opt.series)
        }
        // console.log(opt)
        // 存入传入的数据 end
        this.chart = echarts.init(this.$refs.myChart)
        this.chart.showLoading()
        this.chart.setOption(opt, true)
        this.chart.hideLoading()
      }
    }
  },
  mounted () {
    this.drawLine()
  },
  created () {

  },
  watch: {
    refreshData (curVal, oldVal) {
      this.drawLine()
    }
  }
}
</script>

<style lang="scss" scoped>
.myChart{
  height: 300px;
}
</style>
