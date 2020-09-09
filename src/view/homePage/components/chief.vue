<template>
  <div class="chief">
    <div class="all-statistical">
      <div class="left-content-box">
        <!-- 工作统计 互动统计 -->
        <div class="statistical-num-box">
          <!-- 工作统计 -->
          <div class="contribute-statistical">
            <statistical contributeTitle="工作统计" :option="contributeOption" :refresh = refresh @timeSelectChange = 'tougaoTimeChange' @toggleTab = 'gongzuoToggleTab'></statistical>
          </div>
          <div class="interactive-statistical">
            <statistical contributeTitle="互动统计" :option="interactiveOption" :refresh = refresh @timeSelectChange = 'hudongTimeChange' @toggleTab = 'hudongToggleTab'></statistical>
          </div>
        </div>
        <!-- 最新评论 -->
        <div class="platform-content-impact newComment">
          <div class="header-box flexBox flexBetween">
            <p>最新评论({{commentTotal || 0}})</p>
            <time-select :opt="opt" v-on:time-select-change="commentTimeSelectChange"></time-select>
          </div>
          <ul class="new-comment" v-if="commentList && commentList.length > 0" v-loading='commentLoading'>
            <li class="flexBox flexBetween" v-for="(item, index) in commentList" :key="index">
              <div class="article flexBox flexBetween flexAlign">
                <p>{{item.title}}</p>
                <div class="iconBox flexBox">
                  <div class="photoNum flexBox flexAlign">
                    <i class="photoIcon"></i>
                    <span>{{item.total_photo_count}}</span>
                  </div>
                  <div class="commentBox flexBox flexAlign">
                    <i class="commentIcon"></i>
                    <span>{{item.total_comment}}</span>
                  </div>
                </div>
              </div>
              <div class="comment flexBox flexBetween">
                <p>{{item.content}}</p>
                <div class="datetime">{{item.created_at.substring(0,16)}}</div>
              </div>
            </li>
          </ul>
          <ul class="hoge-error new-comment" v-else style="height:385px;">
            <div>
              <div class="nodata-img"></div>
              <p>暂无内容</p>
            </div>
          </ul>
          <div class="more">
            <span @click="getMore('commentmore')" v-if="commentList && commentList.length > 0">更多</span>
          </div>
        </div>
        <!-- 平台内容影响力 -->
        <div class="platform-content-impact">
          <div class="header-box flexBox flexBetween">
            <p>平台内容影响力</p>
            <time-select :opt="opt" v-on:time-select-change="platformTimetChange"></time-select>
          </div>
          <div class="platform-content flexBox flexBetween">
            <div class="readingTop">
              <platform-content title="阅读量TOP5" :topList = platformInfluenceData.click_rank></platform-content>
            </div>
            <div class="commentTop">
              <platform-content title="评论量TOP5" :topList = platformInfluenceData.comment_rank></platform-content>
            </div>
          </div>
        </div>
      </div>
      <div class="right-content-box">
        <!-- 我的待办 -->
        <my-waiting :waitingData="waitingData" @ignoreAll = ignoreAll></my-waiting>
        <!-- 图片下载排行 -->
        <div class="photo-download">
          <div class="header-box flexBox flexBetween">
            <p>图片下载</p>
            <time-select :opt="opt" v-on:time-select-change="photoTimeChange"></time-select>
          </div>
          <ul class="photo-download-list" v-if="photoDownloadList && photoDownloadList.total > 0">
            <li class="flexBox flexLeft" v-for="(item, index) in photoDownloadList.data.slice(0, 7)" :key="index">
              <span
                :class="{ 'first': index == 0, 'seconde': index == 1, 'third': index == 2}"
              >{{index + 1}}</span>
              <p class="download-content">{{item.title}}</p>
              <p>
                <i class="downloadIcon"></i>
                <span class="downloadnum">{{item.downloads}}</span>
              </p>
            </li>
          </ul>
          <ul class="hoge-error photo-download-list" v-else>
            <div>
              <div class="nodata-img"></div>
              <p>暂无内容</p>
            </div>
          </ul>
          <div class="more">
            <span @click="getMore('photomore')" v-if="photoDownloadList && photoDownloadList.total > 0">更多</span>
          </div>
        </div>
        <!-- 我的动态 -->
        <my-dynamics :dynamicsList="dynamicsList"></my-dynamics>
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
      commentList: [],
      commentLoading: true,
      commentTotal: 0,
      commentTimeRange: 0,
      commentStartTime: '',
      commentEndTime: '',
      contributeTitle: '投稿统计',
      isActive: 'web',
      opt: ['今日', '近七日', '自定义'],
      option: {
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
            data: [
              '12',
              '13',
              '14',
              '15',
              '16',
              '17',
              '18',
              '12',
              '13',
              '14',
              '15',
              '16',
              '17',
              '18'
            ]
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
            data: [120, 79, 180, 11, 59, 48, 78, 110, 79, 181, 11, 59, 48, 210],
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
            data: [110, 112, 150, 78, 60, 46, 210, 95, 112, 15, 78, 6, 46, 210],
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
            data: [110, 180, 120, 134, 69, 230, 210, 8, 112, 15, 78, 6, 46, 75],
            smooth: true
          }
        ]
      },
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
              {
                value: 335,
                name: '稿件创建数',
                itemStyle: { color: '#FFA650' }
              },
              {
                value: 310,
                name: '稿件发布数',
                itemStyle: { color: '#2CD1A5' }
              },
              {
                value: 234,
                name: '源文件上传数',
                itemStyle: { color: '#3D99FF' }
              }
            ]
          }
        ]
      },
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
      resourceList: [
        {
          name: '内容分类',
          num: '1',
          children: [
            {
              name: '国内热点',
              num: '2',
              children: [
                {
                  name: '核问题',
                  num: '3',
                  children: [
                    { name: '朝鲜', num: '3' },
                    { name: '傻子', num: '3' }
                  ]
                }
              ]
            },
            { name: '国际新闻', num: '3', children: [] },
            { name: '经济贸易', num: '4', children: [] }
          ]
        },
        { name: '地区分类', num: '120', children: [] },
        { name: '部门分类', num: '120', children: [] },
        { name: '其他分类', num: '120', children: [] }
      ],
      refresh: 1,
      ratedata: {},
      hudongData: {},
      // 互动时间切换
      hudongTime: {},
      // 互动统计 来源 1为网站
      source: 1,
      // 工作统计 来源 1为网站
      workSource: 1
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
  created () {
    this.getCommentList()
  },
  methods: {
    geshihua (name) {
      let data = [
        { value: this.ratedata.create || 0, name: '稿件创建数' },
        { value: this.ratedata.publish || 0, name: '稿件发布数' },
        { value: this.ratedata.upload || 0, name: '源文件上传数' }
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
    commentTimeSelectChange (value) {
      if (value.key === '自定义') {
        this.commentTimeRange = ''
        this.commentStartTime = value.time.timeRang.start_date
        this.commentEndTime = value.time.timeRang.end_date
        this.getCommentList()
      } else {
        this.commentStartTime = ''
        this.commentEndTime = ''
        this.commentTimeRange = value.key
        this.getCommentList()
      }
    },
    platformTimetChange (value) {
      this.$emit('platformTimetChange', value)
    },
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
    // 图片下载时间切换
    photoTimeChange (value) {
      let param = {
        time: value,
        source: 'chief'
      }
      this.$emit('photoTimeChange', param)
    },
    handleOpen () {},
    handleClose () {},
    getMore (value) {
      this.$router.push({
        name: `workbench.${value}`
      })
    },
    // 获取最新评论
    getCommentList () {
      this.commentLoading = true
      let param = {
        site_id: 1,
        page: 1,
        per_num: 7,
        date_search: this.commentTimeRange
      }
      if (this.commentStartTime) {
        param.start_time = this.commentStartTime
      }
      if (this.commentEndTime) {
        param.end_time = this.commentEndTime
      }
      this.$api.getComment(param).then(res => {
        this.commentList = res.data.data
        this.commentTotal = res.data.total
        this.commentLoading = false
      })
    },
    // 工作统计
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
        // console.log(this.ratedata)
        this.$set(this.contributeOption.series[0].data[0], 'value', this.ratedata.create)
        this.$set(this.contributeOption.series[0].data[1], 'value', this.ratedata.publish)
        this.$set(this.contributeOption.series[0].data[2], 'value', this.ratedata.upload)
      })
    },
    // 工作统计 时间切换
    tougaoTimeChange (value) {
      this.getRate(value.start_time, value.end_time, this.workSource, '')
      this.tougaoTime = value
    },
    // 工作统计 网站后台切换
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
    // 互动统计  网站后台切换
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
    .ranking-box {
      height: 526px;
      margin-top: 20px;
      .photo-download {
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
            color: #38a7ff;
          }
        }
        .photo-download-list {
          padding: 0 20px 0 24px;
          height: 365px;
          border-bottom: 1px solid #eeeeee;
          li {
            margin-top: 35px;
            span {
              font-size: 18px;
              font-family: PingFangSC;
              font-weight: 500;
              color: rgba(56, 167, 255, 1);
              width: 15px;
              display: inline-block;
            }
            .download-content {
              margin-left: 20px;
              margin-right: 45px;
              width: 75%;
              min-width: 246px;
              font-size: 14px;
              font-family: PingFangSC;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            p {
              color: #a6a6a6;
              .downloadnum {
                color: #fb922a;
              }
            }
            &:first-child {
              margin-top: 0;
            }
            .first {
              color: #ff4a39;
            }
            .seconde {
              color: rgba(189, 16, 224, 1);
            }
            .third {
              color: rgba(68, 211, 110, 1);
            }
          }
        }
        .more {
          text-align: right;
          padding-right: 20px;
          line-height: 40px;
          height: 40px;
          font-size: 14px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(166, 166, 166, 1);
          span {
            cursor: pointer;
          }
        }
      }
      .articel-num {
        background-color: #fff;
        width: calc(50% - 10px);
        min-width: 420px;
        .articel-num-list {
          padding: 30px 20px 20px 24px;
          border-bottom: 1px solid #eeeeee;
          height: 435px;
          box-sizing: border-box;
          li {
            margin-bottom: 30px;
            &:last-child {
              margin-bottom: 0;
            }
            .userBox {
              position: relative;
              .imgBox {
                width: 38px;
                height: 38px;
                overflow: hidden;
                border-radius: 50%;
                img {
                  width: 100%;
                  max-height: 100%;
                }
                span {
                  position: absolute;
                  display: inline-block;
                  width: 16px;
                  height: 16px;
                  border-radius: 50%;
                  background-color: rgba(56, 167, 255, 1);
                  color: #fff;
                  bottom: 0;
                  left: 25px;
                  text-align: center;
                  line-height: 16px;
                  &.first {
                    background-color: #ff4a39;
                  }
                  &.seconde {
                    background-color: rgba(189, 16, 224, 1);
                  }
                  &.third {
                    background-color: rgba(68, 211, 110, 1);
                  }
                }
              }
            }
            .username {
              margin-left: 15px;
              font-size: 14px;
              font-family: PingFangSC;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              width: 20%;
            }
            .articel-worker {
              font-size: 14px;
              font-family: PingFangSC;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              width: 60%;
            }
            p {
              color: #a6a6a6;
              .downloadnum {
                font-size: 18px;
                color: #fb922a;
              }
            }
          }
        }
        .more {
          text-align: right;
          padding-right: 20px;
          line-height: 40px;
          height: 40px;
          font-size: 14px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(166, 166, 166, 1);
          span {
            cursor: pointer;
          }
        }
      }
    }
    .platform-content-impact {
      height: 400px;
      background-color: #fff;
      margin-top: 20px;
      &.newComment {
        height: 480px;
      }
      .platform-content {
        .readingTop {
          padding: 23px 20px 34px 22px;
          width: calc(50% - 10px);
          min-width: 420px;
          margin-right: 20px;
        }
        .commentTop {
          padding: 23px 20px 34px 22px;
          width: calc(50% - 10px);
          min-width: 420px;
        }
      }
      .new-comment {
        padding: 24px;
        height:336px;
        max-width: 1344px;
        border-bottom: 1px solid #eeeeee;
        li {
          margin-bottom: 33px;
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          &:last-child {
            margin-bottom: 0;
          }
          .article {
            width: 48%;
            border-right: 1px solid #eee;
            p {
              width: 70%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .iconBox {
              color: rgba(166, 166, 166, 1);
            }
            .commentBox {
              margin: 0 20px;
            }
          }
          .comment {
            width: 52%;
            margin-left: 20px;
            p {
              width: 60%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .datetime {
              color: rgba(166, 166, 166, 1);
              width: 30%;
              // margin-left: 37px;
            }
          }
        }
      }
      .more {
        text-align: right;
        padding-right: 20px;
        line-height: 40px;
        height: 40px;
        font-size: 14px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(166, 166, 166, 1);
        span {
          cursor: pointer;
        }
      }
    }
  }
  .right-content-box {
    width: 20%;
    min-width: 320px;
    .resource-num-statistics {
      height: 670px;
      background-color: #fff;
      margin-top: 20px;
      .resourceBox {
        /deep/ {
          .el-menu {
            .el-submenu {
              &.first {
                margin: 10px 24px;
                background: rgba(248, 248, 248, 1);
                font-size: 14px;
                font-family: PingFangSC;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
                .el-submenu__title {
                  height: 40px;
                  line-height: 40px;
                  display: flex;
                  justify-content: space-between;
                  padding-right: 42px;
                  align-items: center;
                  .el-submenu__icon-arrow.el-icon-arrow-down {
                    display: block;
                  }
                }
              }
              &.second {
                margin-top: 24px;
                .el-submenu__title {
                  .el-submenu__icon-arrow.el-icon-arrow-down {
                    display: none;
                  }
                }
              }
            }
          }
        }
      }
      .el-menu {
        border: none;
      }
    }
    .photo-download {
      background-color: #fff;
      min-width: 320px;
      .photo-download-list {
        padding: 0 20px 0 24px;
        margin-top: 33px;
        height: 353px;
        border-bottom: 1px solid #eeeeee;
        li {
          margin-top: 35px;
          span {
            font-size: 18px;
            font-family: PingFangSC;
            font-weight: 500;
            color: rgba(56, 167, 255, 1);
            width: 15px;
            display: inline-block;
          }
          .download-content {
            margin-left: 20px;
            margin-right: 45px;
            width: 50%;
            // min-width: 246px;
            font-size: 14px;
            font-family: PingFangSC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p {
            color: #a6a6a6;
            .downloadnum {
              font-size: 14px;
              font-family: PingFangSC;
              font-weight: 400;
              color: rgba(166, 166, 166, 1);
            }
          }
          &:first-child {
            margin-top: 0;
          }
          .first {
            color: #ff4a39;
          }
          .seconde {
            color: rgba(189, 16, 224, 1);
          }
          .third {
            color: rgba(68, 211, 110, 1);
          }
        }
      }
      .more {
        text-align: right;
        padding-right: 20px;
        line-height: 40px;
        height: 40px;
        font-size: 14px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(166, 166, 166, 1);
        span {
          cursor: pointer;
        }
      }
    }
    /deep/ {
      .my-dynamics {
        height: 400px;
        width: 336px;
        .my-dynamics-list {
          height: 305px;
        }
      }
    }
  }
}
</style>
