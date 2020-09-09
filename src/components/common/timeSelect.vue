// 传入opt: ['今日', '本周', '本月'],
// url带参如下
// if (data.time.timeRang.start_date) {
        params.start_date = data.time.timeRang.start_date;
        params.end_date = data.time.timeRang.end_date;
      }
      if (parseInt(data.key, 10) !== 0) {
        params.keys = data.key;
      }
<template>
  <div class="time-select-component flexBox">
    <div :class="{'active':activeClass == key}" @click="changeTime(item,key)" v-for="(item,key) in showData" :key="key" :style="{left:`-${key*1}px`}"  class="fixed-btn select-button d-inline-block">{{item.name}}</div>
    <!-- <div class="select-button d-inline-block"
    :class="{'active':activeClass == 'cur'}"
    :style="{left:`-${showData.length*1}px`,opacity:0}"> -->
      <el-date-picker
        size="small"
        :picker-options="customizeOption"
        :clearable=false
        v-model="customizeTime"
        @change="changeCustomizeTime"
        value-format='yyyy-MM-dd'
        type="daterange"
        ref="datePicker"
        style="position: absolute;z-index:-1;width: 72px;height: 24px;right: 0;">
      </el-date-picker>
    <!-- </div> -->

  </div>
</template>

<script>
let moment = require('moment')
export default {
  name: 'TimeSelect',
  props: ['opt'],
  data () {
    return {
      showPicker: false,
      customizeOption: {
        // disabledDate (time) {
        //   return time.getTime() > Date.now() - 8.64e7;
        // },
      },
      // listData: [
      //   { show: false, name: '昨天', timeRang: { start_date: moment().subtract(1, 'days').format('YYYY-MM-DD'), end_date: moment().subtract(1, 'days').format('YYYY-MM-DD') } },
      //   { show: false, name: '3天', timeRang: { start_date: moment().subtract(3, 'days').format('YYYY-MM-DD'), end_date: moment().subtract(1, 'days').format('YYYY-MM-DD') } },
      //   { show: false, name: '7天', timeRang: { start_date: moment().subtract(7, 'days').format('YYYY-MM-DD'), end_date: moment().subtract(1, 'days').format('YYYY-MM-DD') } },
      //   { show: false, name: '30天', timeRang: { start_date: moment().subtract(30, 'days').format('YYYY-MM-DD'), end_date: moment().subtract(1, 'days').format('YYYY-MM-DD') } },
      //   { show: false, name: '90天', timeRang: { start_date: moment().subtract(90, 'days').format('YYYY-MM-DD'), end_date: moment().subtract(1, 'days').format('YYYY-MM-DD') } },
      // ],
      listData: [
        { show: false, name: '今日', timeRang: { start_date: moment(new Date()).format('YYYY-MM-DD'), end_date: moment(new Date()).format('YYYY-MM-DD') } },
        { show: false, name: '本周', timeRang: { start_date: moment().day('Monday'), end_date: moment() } },
        { show: false, name: '近七日', timeRang: { start_date: moment().subtract(7, 'days').format('YYYY-MM-DD'), end_date: moment().subtract(1, 'days').format('YYYY-MM-DD') } },
        { show: false, name: '本月', timeRang: { start_date: moment().startOf('month'), end_date: moment() } },
        { show: false, name: '自定义', timeRang: {} }
      ],
      showData: [],
      activeClass: 1,
      customizeTime: []
    }
  },
  methods: {
    // 切换选项
    changeTime (time, key) {
      this.activeClass = key
      this.customizeTime = []
      if (time.name === '自定义') {
        this.$refs.datePicker.pickerVisible = true
      } else {
        this.$emit('time-select-change', { time: time, key: key })
      }
    },
    // 自定义时间
    changeCustomizeTime (value) {
      // 可以clear时
      if (value == null) {
        this.activeClass = 0
        this.$emit('time-select-change', { time: { timeRang: { start_date: '', end_date: '' } }, key: '0' })
        return
      }
      this.activeClass = '自定义'
      this.$emit('time-select-change', { time: { timeRang: { start_date: value[0], end_date: value[1] } }, key: '自定义' })
    }
  },
  mounted () {
  },
  created () {
    // this.activeClass = this.$route.query.keys ? this.$route.query.keys : this.activeClass;
    // if (this.activeClass === 'cur') {
    //   this.customizeTime[0] = this.$route.query.start_date ? this.$route.query.start_date : '';
    //   this.customizeTime[1] = this.$route.query.end_date ? this.$route.query.end_date : '';
    // }
    this.$emit('time-select-change', { time: this.listData[2], key: 2 })
    this.listData.forEach((vv) => {
      if (this.opt.includes(vv.name)) {
        vv.show = true
        this.showData.push(vv)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.time-select-component{
  position: relative;
}
.select-button{
  border:1px solid #DCDCDC;
  position: relative;
  cursor: pointer;
  &.active{
    border: 1px solid #0091FF;
    color: #0091FF;
    z-index: 1;
  }
}
.fixed-btn{
  width: 60px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  color: #666666;
  text-align: center;
  &:first-child{
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  &:last-child{
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
}
</style>
<style lang="scss">
  .time-select-component {
    //时间选择
  .el-input__icon.el-range__close-icon{
      display: none;
  }
  .el-range-separator{
    width: 25px;
  }

  .el-range-editor--small.el-input__inner{
      height: 30px;
      width: 220px;
      border:none;
      box-shadow:none;
      border-radius:0 !important;
  }
  .active .el-input__icon.el-range__icon.el-icon-date{
    color:#52A1F4
  }
}
</style>
