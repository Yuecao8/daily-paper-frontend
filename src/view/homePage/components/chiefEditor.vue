<template>
  <div class="chiefEditor">
    <div class='all-statistical'>
      <div class='left-content-box'>
        <!-- 网站统计 -->
        <div class='web-statistics'>
          <div class='header-box flexBox flexBetween'>
            <p>网站统计</p>
            <time-select :opt='opt' @time-select-change = 'webTimeChange'></time-select>
          </div>
          <line-chart style='height: 205px' :chartsOptions='webOption' :refresh = refresh></line-chart>
        </div>
        <!-- 投稿统计 互动统计 -->
        <div class='statistical-num-box'>
            <!-- 投稿统计 -->
          <div class='contribute-statistical'>
            <statistical contributeTitle='投稿统计' :option = contributeOption :refresh = refresh @timeSelectChange = 'tougaoTimeChange'></statistical>
          </div>
          <div class='interactive-statistical'>
            <statistical contributeTitle='互动统计' :option = interactiveOption :refresh = refresh @timeSelectChange = 'hudongTimeChange' @toggleTab = 'hudongToggleTab'></statistical>
          </div>
        </div>
        <!-- 图片下载排行 稿件数量排行 -->
        <div class="ranking-box flexBox">
            <!-- 图片下载排行 完成-->
            <div class="photo-download">
              <div class="header-box flexBox flexBetween">
                <p>图片下载排行</p>
                <time-select :opt="opt" v-on:time-select-change="photoTimeChange"></time-select>
              </div>
              <div class="tab-list">
                <span @click="photoToggleTab('web')" :class="{isActive: isActive == 'web'}">网站</span>
                <!-- <span @click="photoToggleTab('backstage')" :class="{isActive: isActive == 'backstage'}">后台</span> -->
              </div>
              <ul class="photo-download-list" v-if="photoDownloadList && photoDownloadList.length > 0">
                <li class="flexBox flexLeft" v-for="(item, index) in photoDownloadList.slice(0,7)" :key="index">
                    <span :class="{ 'first': index == 0, 'seconde': index == 1, 'third': index == 2}">{{index + 1}}</span>
                    <p class="download-content">{{item.title}}</p>
                    <p><span class="downloadnum">{{item.downloads}}</span>次</p>
                </li>
              </ul>
              <ul class="hoge-error photo-download-list" v-else>
                <div>
                  <div class="nodata-img"></div>
                  <p>暂无内容</p>
                </div>
              </ul>
              <div class="more"><span @click="getMore('photomore')" v-if="photoDownloadList && photoDownloadList.length > 0">更多</span></div>
            </div>
            <!-- 稿件数量排行 完成-->
            <div class="articel-num">
              <div class="header-box flexBox flexBetween">
                <p>稿件数量排行</p>
                <time-select :opt="opt" v-on:time-select-change="articelTimeChange"></time-select>
              </div>
              <ul class="articel-num-list" v-if="articelList && articelList.length > 0">
                <li class="flexBox flexLeft flexAlign" v-for="(item, index) in articelList.slice(0,6)" :key="index">
                    <div class="userBox">
                        <div class="imgBox flexBox">
                            <!-- <img src="../../../assets/image/ceshi.png" alt=""> -->
                            <img v-if="item.avatar!==''" :src="item.avatar" alt="">
                            <img v-else src="../../../assets/image/avatar.png" alt="">
                            <span :class="{ 'first': index == 0, 'seconde': index == 1, 'third': index == 2}">{{index + 1}}</span>
                        </div>
                    </div>
                    <div class="username">{{item.name}}</div>
                    <p class="articel-worker">{{item.group_name}}</p>
                    <p><span class="downloadnum">{{item.create_num}}</span>份</p>
                </li>
              </ul>
              <ul class="hoge-error articel-num-list" v-else>
                <div>
                  <div class="nodata-img"></div>
                  <p>暂无内容</p>
                </div>
              </ul>
              <div class="more"><span @click="getMore('articlemore')" v-if="articelList && articelList.length > 0">更多</span></div>
            </div>
        </div>
        <!-- 平台内容影响力 完成-->
        <div class="platform-content-impact">
          <div class="header-box flexBox flexBetween">
            <p>平台内容影响力</p>
            <time-select :opt="opt" v-on:time-select-change="platformTimetChange"></time-select>
          </div>
          <div class="platform-content flexBox flexBetween">
            <div class="readingTop">
              <platform-content title = '阅读量TOP5' :topList = platformInfluenceData.click_rank></platform-content>
            </div>
            <div class="commentTop">
              <platform-content title = '评论量TOP5' :topList = platformInfluenceData.comment_rank></platform-content>
            </div>
          </div>
        </div>
      </div>
      <div class='right-content-box'>
        <!-- 我的待办 完成-->
        <my-waiting :waitingData = waitingData @ignoreAll = ignoreAll></my-waiting>
        <!-- 成品库稿件统计 -->
        <div class="resource-num-statistics">
          <div class="header-box flexBox flexBetween">
            <p>成品库稿件统计</p>
          </div>
          <div class="resourceBox">
            <el-menu
              :default-openeds = defaultList
              class="el-menu-vertical-demo"
              @open = "handleOpen"
              @close = "handleClose">
              <!-- 一级 -->
              <el-submenu class="first"
                v-for="(item, index) in resourceList"
                :key="index"
                :index = String(item.id)>
                <template slot="title">
                  <span>{{item.name}}</span>
                  <span v-if="resourceList[0].childrenList">{{resourceList[0].childrenList.length}}</span>
                </template>
                <!-- 二级 -->
                <el-submenu v-for="(item2, index2) in item.childrenList"
                  :key="index2"
                  class="second"
                  :index = String(item2.id)
                  >
                  <template slot="title">
                    <span>
                      <i v-if="item2.is_last == 0 && selectIndex != item2.id" class="shouqi" style="width: 25px;display: inline-block;"></i>
                      <i v-else-if="item2.is_last == 0 && selectIndex == item2.id" class="zhankai" style="width: 25px;display: inline-block;"></i>
                      <i v-else style="width: 25px;display: inline-block;"></i>
                      {{item2.name}}
                      </span>
                    <span v-if="item2.children.split(',').length != 1">{{item2.children.split(',').length - 1}}</span>
                  </template>
                  <!-- 三级 -->
                  <el-submenu v-for="(item3, index3) in item2.childrenList"
                  :key="index3"
                  class="third"
                  :index=String(item3.id)>
                    <template slot="title">
                      <span>
                        <i v-if="item3.is_last == 0 && selectIndex != item3.id" class="shouqi" style="width: 25px;display: inline-block;"></i>
                        <i v-else-if="item3.is_last == 0 && selectIndex == item3.id" class="zhankai" style="width: 25px;display: inline-block;"></i>
                        <i v-else style="width: 25px;display: inline-block;"></i>
                        {{item3.name}}
                      </span>
                      <span v-if="item3.children.split(',').length != 1">{{item3.children.split(',').length - 1}}</span>
                    </template>
                    <!-- 四级 -->
                    <el-submenu v-for="(item4, index4) in item3.childrenList"
                    :key="index4"
                    class="four"
                    :index=String(item4.id)>
                      <template slot="title">
                        <span>
                          <i v-if="item4.is_last == 0 && selectIndex != item4.id" class="shouqi" style="width: 25px;display: inline-block;"></i>
                          <i v-else-if="item4.is_last == 0 && selectIndex == item4.id" class="zhankai" style="width: 25px;display: inline-block;"></i>
                          <i v-else style="width: 25px;display: inline-block;"></i>
                          {{item4.name}}
                        </span>
                        <span v-if="item4.children.split(',').length != 1">{{item4.children.split(',').length - 1}}</span>
                      </template>
                      <el-menu-item v-for="(item5, index5) in item4.childrenList" :key="index5">{{item5.name}}</el-menu-item>
                    </el-submenu>
                  </el-submenu>
                </el-submenu>
              </el-submenu>
            </el-menu>
          </div>
        </div>
        <!-- 我的动态 完成-->
        <my-dynamics :dynamicsList = dynamicsList></my-dynamics>
      </div>
    </div>
  </div>
</template>
<script>
import Statistical from './statistical'
import platformContent from './platformContent'
import myWaiting from './myWaiting'
import myDynamics from './myDynamics'
import TimeSelect from '../../../components/common/timeSelect'
import lineChart from '../../../components/charts/lineChart'
export default {
  name: '',
  data () {
    return {
      isActive: 'web',
      opt: ['今日', '近七日', '自定义'],
      webOption: {
        // title: {
        //   text: '堆叠区域图'
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['PV', 'UV', 'IP']
        },
        grid: {
          left: '24px',
          right: '24px',
          bottom: '19px',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: []
          }
        ],
        yAxis: [
          {
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
            data: [],
            smooth: true
          },
          {
            name: 'UV',
            type: 'line',
            stack: '总量',
            // 设置 线的颜色
            color: ['#FF9631'],
            // 线以下的区域颜色  不知道怎么不显示 可以设置不透明
            areaStyle: {
              opacity: 0
            },
            data: [],
            smooth: true
          },
          {
            name: 'IP',
            type: 'line',
            stack: '总量',
            // 设置 线的颜色
            color: ['#38A7FF'],
            // 线以下的区域颜色  不知道怎么不显示 可以设置不透明
            areaStyle: {
              opacity: 0
            },
            data: [],
            smooth: true
          }
        ]
      },
      // 投稿统计
      contributeOption: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          selectedMode: false,
          orient: 'vertical',
          top: '25%',
          x: 'left',
          data: ['稿件创建数', '稿件发布数', '源文件上传数'],
          itemHeight: 13,
          itemWidth: 13,
          formatter: this.geshihua,
          textStyle: {
            rich: {
              b: {
                fontSize: 14,
                color: '#666',
                padding: 10
              },
              a: {
                fontSize: 14,
                color: '#333333',
                fontWeight: 500
              }
            }
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['45%', '70%'],
            center: ['80%', '55%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '稿件创建数', itemStyle: { color: '#FFA650' } },
              { value: 310, name: '稿件发布数', itemStyle: { color: '#2CD1A5' } },
              { value: 234, name: '源文件上传数', itemStyle: { color: '#3D99FF' } }
            ]
          }
        ]
      },
      // 互动统计
      interactiveOption: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          top: '25%',
          x: 'left',
          itemHeight: 13,
          itemWidth: 13,
          data: ['下载', '评论', '收藏'],
          formatter: this.hudong,
          textStyle: {
            rich: {
              b: {
                fontSize: 14,
                color: '#666',
                padding: 10
              },
              a: {
                fontSize: 14,
                color: '#333333',
                fontWeight: 500
              }
            }
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['45%', '70%'],
            avoidLabelOverlap: false,
            center: ['80%', '55%'],
            label: {
              normal: {
                show: false,
                position: 'center'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: '下载', itemStyle: { color: '#3D99FF' } },
              { value: 310, name: '评论', itemStyle: { color: '#2CD1A5' } },
              { value: 234, name: '收藏', itemStyle: { color: '#FFA650' } }
            ]
          }
        ]
      },
      downloadList: [
        {content: '中国的溶洞有千千万，只有有一个叫“国中国的溶洞有千千万，只有有一个叫“国中国的溶洞有千千万，只有有一个叫“国', num: '5000', name: '小花'},
        {content: '中国的溶洞有千千万，只有一个叫“国…', num: '5000', name: '小花'},
        {content: '中国的溶洞有千千万，只有一个叫“国…', num: '5000', name: '小花去'},
        {content: '中国的溶洞有千千万，只有一个叫“国…', num: '5000', name: '小花是'},
        {content: '中国的溶洞有千千万，只有一个叫“国…', num: '5000', name: '小花'},
        {content: '中国的溶洞有千千万，只有一个叫“国…', num: '5000', name: '小花'},
        {content: '中国的溶洞有千千万，只有一个叫“国…', num: '5000', name: '小花'}
      ],
      resourceList: [
        {
          name: '内容分类',
          id: 0
        }
      ],
      webData: [],
      refresh: 1,
      loading: false,
      articelList: [],
      ratedata: {},
      hudongData: {},
      source: 1,
      workSource: 1,
      photoSource: 1,
      selectIndex: '',
      defaultList: ['0'],
      hudongTime: {},
      tougaoTime: {}
    }
  },
  props: ['dynamicsList', 'waitingData', 'platformInfluenceData', 'photoDownloadList'],
  components: {
    Statistical,
    TimeSelect,
    lineChart,
    platformContent,
    myWaiting,
    myDynamics
  },
  methods: {
    // 图片下载排行 网站/后台切换
    photoToggleTab (value) {
      this.isActive = value
      if (value === 'web') {
        this.photoSource = 1
      } else {
        this.photoSource = 2
      }
      this.$emit('photoToggleTab', this.photoSource)
    },
    // 互动统计 图表左侧数据格式化
    hudong (name) {
      let data = [
        { value: this.hudongData.downloads || 0, name: '下载' },
        { value: this.hudongData.comments || 0, name: '评论' },
        { value: this.hudongData.collects || 0, name: '收藏' }
      ]
      let target
      for (let i = 0; i < data.length; i++) {
        if (data[i].name === name) {
          target = data[i].value
        }
      }
      let arr = ['{b|' + name + '}    {a|' + target + '}']
      return arr
    },
    // 投稿统计 图表左侧数据格式化
    geshihua (name) {
      let data = [
        { value: this.ratedata.create || 0, name: '稿件创建数' },
        { value: this.ratedata.publish || 0, name: '稿件发布数' },
        { value: this.ratedata.create || 0, name: '源文件上传数' }
      ]
      // let data = ratedata
      let target
      for (let i = 0; i < data.length; i++) {
        if (data[i].name === name) {
          target = data[i].value
        }
      }
      let arr = [ '{b|' + name + '}    {a|' + target + '}' ]
      return arr
    },
    // 网站时间切换
    webTimeChange (value) {
      let date = value.time.timeRang
      this.getWebData(date)
    },
    // 图片下载时间切换
    photoTimeChange (value) {
      let param = {
        time: value,
        source: 'chiefEditor'
      }
      this.$emit('photoTimeChange', param)
    },
    // 平台影响力 时间切换
    platformTimetChange (value) {
      this.$emit('platformTimetChange', value)
    },
    // 获取网站数据
    getWebData (date) {
      let param = {
        end_date: date.end_date,
        site_id: 0,
        start_date: date.start_date
      }
      this.$api.getWeb(param).then(res => {
        if (res.error_code === 0) {
          this.refresh = !this.refresh
          this.webData = res.data
          // this.webOption.xAxis[0].data = []
          let xAxisList = []
          let PVdata = []
          let UVdata = []
          let IPdata = []
          // console.log(this.webData)
          this.webData.forEach((item, index) => {
            xAxisList.unshift(item.date)
            PVdata.unshift(item.web_pv_amount)
            UVdata.unshift(item.web_uv_amount)
            IPdata.unshift(item.web_ip_amount)
          })
          this.$set(this.webOption.xAxis[0], 'data', xAxisList)
          this.$set(this.webOption.series[0], 'data', PVdata)
          this.$set(this.webOption.series[1], 'data', UVdata)
          this.$set(this.webOption.series[2], 'data', IPdata)
        }
      })
    },
    // 成品库稿件统计
    getCategoryList (id, sign) {
      let param = {
        type: 'atlas',
        fid: id
      }
      this.$api.category(param).then(res => {
        if (!res.error_code) {
          if (sign.length === 1) {
            this.$set(this.resourceList[0], 'childrenList', res.data)
          } else if (sign.length === 2) {
            this.resourceList[0].childrenList.forEach((item, index) => {
              if (Number(item.id) === Number(id)) {
                this.$set(this.resourceList[0].childrenList[index], 'childrenList', res.data)
              }
            })
          } else if (sign.length === 3) {
            this.resourceList[0].childrenList.forEach((item, index) => {
              if (item.id === Number(sign[1])) {
                item.childrenList.forEach((item2, index2) => {
                  if (item2.id === Number(sign[2])) {
                    // console.log(item2.id)
                    this.$set(this.resourceList[0].childrenList[index].childrenList[index2], 'childrenList', res.data)
                  }
                })
              }
            })
          }
        }
      })
    },
    // 稿件统计展开
    handleOpen (value, path) {
      if (path.length === 1 && !this.resourceList[0].childrenList) {
        this.getCategoryList(value, path)
      } else if (path.length === 2) {
        this.resourceList[0].childrenList.forEach((item, index) => {
          if (Number(item.id) === Number(value)) {
            if (!item.childrenList || item.is_last !== 1) {
              this.getCategoryList(value, path)
            }
          }
        })
      } else if (path.length === 3) {
        this.resourceList[0].childrenList.forEach((item, index) => {
          if (item.id === Number(path[1])) {
            item.childrenList.forEach((item2, index2) => {
              if (item2.id === Number(path[2])) {
                if (!item2.childrenList || item2.is_last !== 1) {
                  this.getCategoryList(value, path)
                }
              }
            })
          }
        })
      }
      this.selectIndex = value
    },
    // 稿件统计收起
    handleClose (value, path) {
      this.selectIndex = ''
    },
    // 更多跳转
    getMore (value) {
      this.$router.push({
        name: `workbench.${value}`
      })
    },
    // 稿件数量排行 时间切换
    articelTimeChange (value) {
      this.getRank(value.time.timeRang.start_date, value.time.timeRang.end_date)
    },
    // 稿件数量排行
    getRank (start, end) {
      let param = {
        start_time: start,
        end_time: end
      }
      this.$api.workloadRank(param).then(res => {
        if (!res.error_code) {
          this.articelList = res.data.data
        }
      })
    },
    // 投稿统计
    getRate (start, end, source, date) {
      let param = {
        source: source,
        start_time: start,
        end_time: end,
        date_search: start ? '' : date
      }
      this.$api.workloadRate(param).then(res => {
        this.refresh = !this.refresh
        this.ratedata = res.data
        this.$set(this.contributeOption.series[0].data[0], 'value', this.ratedata.create)
        this.$set(this.contributeOption.series[0].data[1], 'value', this.ratedata.publish)
        this.$set(this.contributeOption.series[0].data[2], 'value', this.ratedata.upload)
      })
    },
    // 投稿统计 时间切换
    tougaoTimeChange (value) {
      this.getRate(value.start_time, value.end_time, this.workSource, '')
      this.tougaoTime = value
    },
    // 投稿统计 网站/后台切换
    gongzuoToggleTab (value) {
      if (value === 'web') {
        this.workSource = 1
      } else {
        this.workSource = 2
      }
      this.getRate(this.tougaoTime.start_time, this.tougaoTime.end_time, this.workSource, '1')
    },
    // 互动统计
    getInteraction (start, end, source, date) {
      let param = {
        source: source,
        start_time: start,
        end_time: end,
        date_search: start ? '' : date
      }
      this.$api.interaction(param).then(res => {
        // console.log(res)
        this.refresh = !this.refresh
        this.hudongData = res.data
        this.$set(this.interactiveOption.series[0].data[0], 'value', res.data.downloads)
        this.$set(this.interactiveOption.series[0].data[1], 'value', res.data.comments)
        this.$set(this.interactiveOption.series[0].data[2], 'value', res.data.collects)
      })
    },
    // 互动统计  时间切换
    hudongTimeChange (value) {
      this.getInteraction(value.start_time, value.end_time, this.source, '')
      this.hudongTime = value
    },
    // 互动统计 网站/后台切换
    hudongToggleTab (value) {
      if (value === 'backstage') {
        this.source = 2
      } else {
        this.source = 1
      }
      this.getInteraction(this.hudongTime.start_time, this.hudongTime.end_time, this.source, '1')
    },
    // 我的待办 忽略全部
    ignoreAll () {
      this.$emit('ignoreAll')
    }
  },
  mounted () {
    // this.getRank()
    // this.getRate('', '', this.workSource, '1')
    // this.getPhotoDownload('', '', this.photoSource, '1')
    // this.getRank('', '', this.source, '1')
    this.getCategoryList('0', [1])
    // console.log(this.getCategoryList('0'))
  }
}
</script>
<style lang='scss' scoped>
.all-statistical {
  width: 100%;
  // height: 600px;
  display: flex;
  .left-content-box {
    width: 80%;
    min-width: 860px;
    margin-right: 20px;
    .web-statistics {
      height: 260px;
      background-color: #fff;
      margin-bottom: 20px;
      min-width: 420px;
      .header-box {
        padding: 17px 24px 15px 24px;
        border-bottom: 1px solid #eeeeee;
        p {
          font-size: 14px;
          color: #333333;
          line-height: 24px;
          font-weight: 500;
        }
      }
    }
    .statistical-num-box {
      display: flex;
      .contribute-statistical {
        background: #fff;
        width: calc(50% - 10px);
        margin-right: 20px;
        height: 260px;
        min-width: 420px;
      }
      .interactive-statistical {
        width: calc(50% - 10px);
        background: #e4e4e4;
        background: #fff;
        width: calc(50% - 10px);
        height: 260px;
      }
    }
    .ranking-box{
      height: 526px;
      margin-top: 20px;
      .photo-download{
        background-color: #fff;
        width: calc(50% - 10px);
        min-width: 420px;
        margin-right: 20px;
        .tab-list {
          color: #333;
          font-size: 14px;
          padding: 18px 20px 28px 24px;
          height: 40px;
          margin-bottom: 23px;
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
        .photo-download-list{
          padding: 0 20px 0 24px;
          height: 365px;
          border-bottom: 1px solid #EEEEEE;
          li{
            margin-top: 35px;
            span{
              font-size:18px;
              font-family:PingFangSC;
              font-weight:500;
              color:rgba(56,167,255,1);
            }
            .download-content{
              margin-left: 20px;
              margin-right: 45px;
              width: 75%;
              min-width: 246px;
              font-size:14px;
              font-family:PingFangSC;
              font-weight:400;
              color:rgba(51,51,51,1);
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            p{
              color: #A6A6A6;
              min-width: 56px;
              .downloadnum{
                color: #FB922A;
              }
            }
            &:first-child{
              margin-top: 0;
            }
            .first{
              color: #FF4A39;
            }
            .seconde{
              color:rgba(189,16,224,1);
            }
            .third{
              color:rgba(68,211,110,1);
            }
          }
        }
        .more{
          text-align: right;
          padding-right: 20px;
          line-height: 40px;
          height: 40px;
          font-size:14px;
          font-family:PingFangSC;
          font-weight:400;
          color:rgba(166,166,166,1);
          span{
            cursor: pointer;
          }
        }
      }
      .articel-num{
        background-color: #fff;
        width: calc(50% - 10px);
        min-width: 420px;
        .articel-num-list{
          padding: 30px 20px 20px 24px;
          border-bottom: 1px solid #EEEEEE;
          height: 435px;
          box-sizing: border-box;
          li{
              margin-bottom: 30px;
              &:last-child{
                  margin-bottom: 0;
              }
              .userBox{
                  position: relative;
                  .imgBox{
                      width: 38px;
                      height: 38px;
                      overflow: hidden;
                      border-radius: 50%;
                      img{
                          width: 100%;
                          max-height: 100%;
                      }
                      span{
                          position: absolute;
                          display: inline-block;
                          width: 16px;
                          height: 16px;
                          border-radius: 50%;
                          background-color: rgba(56,167,255,1);
                          color: #fff;
                          bottom: 0;
                          left: 25px;
                          text-align: center;
                          line-height: 16px;
                          &.first{
                              background-color: #FF4A39;
                          }
                          &.seconde{
                              background-color:rgba(189,16,224,1);
                          }
                          &.third{
                              background-color:rgba(68,211,110,1);
                          }
                      }
                  }
              }
              .username{
                  margin-left: 15px;
                  font-size:14px;
                  font-family:PingFangSC;
                  font-weight:400;
                  color:rgba(51,51,51,1);
                  width: 20%;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
              }
              .articel-worker{
                  font-size:14px;
                  font-family:PingFangSC;
                  font-weight:400;
                  color:rgba(51,51,51,1);
                  width: 60%;
              }
              p{
                  color: #A6A6A6;
                  min-width: 55px;
                  .downloadnum{
                      font-size: 18px;
                      color: #FB922A;
                  }
              }
          }
        }
        .more{
          text-align: right;
          padding-right: 20px;
          line-height: 40px;
          height: 40px;
          font-size:14px;
          font-family:PingFangSC;
          font-weight:400;
          color:rgba(166,166,166,1);
          span{
              cursor: pointer;
          }
        }
      }
    }
    .platform-content-impact{
      height: 400px;
      background-color: #fff;
      margin-top: 20px;
      .platform-content{
          .readingTop{
              padding: 23px 20px 34px 22px;
              width: calc(50% - 10px);
              min-width: 420px;
              margin-right: 20px;
          }
          .commentTop{
              padding: 23px 20px 34px 22px;
              width: calc(50% - 10px);
              min-width: 420px;
          }
      }
    }
  }
  .right-content-box {
    width: 20%;
    min-width: 320px;
    .resource-num-statistics{
      height: 670px;
      background-color: #fff;
      margin-top: 20px;
      .resourceBox{
        height: 610px;
        overflow-y: auto;
        &::-webkit-scrollbar { width: 0 !important }
        /deep/{
          .el-menu{
            .el-submenu{
              &.first{
                margin: 10px 24px;
                background:rgba(248,248,248,1);
                font-size:14px;
                font-family:PingFangSC;
                font-weight:400;
                color:rgba(51,51,51,1);
                .el-submenu__title{
                  height: 40px;
                  line-height: 40px;
                  display: flex;
                  justify-content: space-between;
                  padding-right: 42px;
                  align-items: center;
                  .el-submenu__icon-arrow.el-icon-arrow-down{
                    display: block;
                  }
                }
              }
              &.second{
                margin-top: 10px;
                .el-submenu__title{
                  .el-submenu__icon-arrow.el-icon-arrow-down{
                    display: none;
                  }
                }
              }
            }
          }
        }
      }
      .el-menu{
        border: none;
      }
    }
    /deep/{
      .my-dynamics{
        height: 535px;
        .my-dynamics-list{
          height: 425px;
        }
      }
    }
  }
}
</style>
