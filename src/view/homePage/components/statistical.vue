<template>
  <div class="statistical-com-box">
    <div class="header-box flexBox flexBetween">
      <p @click="toStatisticsDetails()">{{contributeTitle}}
        <span class="more-icon"></span>
      </p>
      <time-select :opt="opt" v-on:time-select-change="timeSelectChange"></time-select>
    </div>
    <div class="statistical-num">
      <div class="tab-list">
        <span @click="toggleTab('web')" :class="{isActive: isActive == 'web'}">网站</span>
        <!-- <span @click="toggleTab('backstage')" :class="{isActive: isActive == 'backstage'}">后台</span> -->
      </div>
      <div class="pie">
        <pie-charts :option="option" :refresh = refresh></pie-charts>
      </div>
    </div>
  </div>
</template>
<script>
import pieCharts from '../../../components/charts/pieChart'
import TimeSelect from '../../../components/common/timeSelect'
export default {
  data () {
    return {
      isActive: 'web',
      opt: ['今日', '近七日', '自定义'],
      // 饼图
      pierefresh: 0, // 饼图刷新
      pieOptions: {
        radius: ['45%', '70%'],
        color: ['#0091FF', '#eee'],
        center: ['80%', '50%'],
        startAngle: 100,
        hoverAnimation: true,
        legend: {
          orient: 'vertical',
          icon: 'circle',
          x: '45',
          y: 'center',
          selectedMode: false,
          data: []
        }
      },
      currentIndex: 1,
      storage: window.localStorage
    }
  },
  props: ['contributeTitle', 'option', 'refresh'],
  components: {
    pieCharts,
    TimeSelect
  },
  methods: {
    // 时间变化
    timeSelectChange (data) {
      // console.log(data)
      const params = {}
      if (data.time.timeRang.start_date) {
        params.start_time = data.time.timeRang.start_date
        params.end_time = data.time.timeRang.end_date
      }
      if (parseInt(data.key, 10) !== -1) {
        params.keys = data.key
      }
      // console.log(params)
      // 获得时间params
      //   this.getMyInfluence()
      this.$emit('timeSelectChange', params)
    },
    toggleTab (currentTab) {
      this.isActive = currentTab
      // console.log(this.isActive)
      this.$emit('toggleTab', this.isActive)
    },
    toStatisticsDetails () {
      this.$router.push({
        path: '/workbench/statisticsdetails',
        name: 'workbench.statisticsdetails',
        params: {
          contributeTitle: this.contributeTitle
        }
      })
      this.storage.contributeTitle = this.contributeTitle
    }
  },
  mounted () {}
}
</script>
<style lang="scss" scoped>
.statistical-com-box {
  width: 100%;
  .header-box {
    height: 54px;
    padding: 17px 24px 15px 24px;
    border-bottom: 1px solid #eeeeee;
    p {
      font-size: 14px;
      color: #333333;
      line-height: 24px;
      font-weight: 500;
      .more-icon{
        display: inline-block;
        background: url('../../../assets/image/workBench/more.png') no-repeat;
        background-size: 12px 12px;
        width: 12px;
        height: 12px;
        margin-left: 6px;
        margin-bottom: -2px;
      }
    }
  }
  .statistical-num {
    position: relative;
    .tab-list {
      color: #333;
      font-size: 14px;
      padding: 16px;
      position: absolute;
      z-index: 999;
      span {
        display: inline-block;
        height: 20px;
        margin-right: 10px;
        line-height: 20px;
      }
      .isActive {
        border-bottom: 1px solid #0091ff;
        color: #38A7FF;
      }
    }
  }
}
.pie {
  width: 100%;
  height: 205px;
  padding: 0 25px;
}
</style>
