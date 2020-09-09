<template>
  <div class='workbench-box' v-if="title == ''">
    <div class='pageName flexBox flexBetween' v-if="title">
      <p><span @click="goBack()" style="cursor: pointer;">工作台 / </span><span class="current">{{title}}</span></p>
      <el-button type="primary" size= 'small'>导出</el-button>
    </div>
    <p class='pageName' v-else>工作台</p>
    <!-- 总编 -->
    <div v-if="userType == 1 && title == ''">
      <div class='my-info-statistical flexBox flexBetween'>
        <div class='my-info-left flexBox flexLeft'>
          <div class='userImg flexBox flexMiddel'>
            <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="">
            <img v-else src="../../assets/image/avatar.png" alt>
          </div>
          <div class='userInfo'>
            <p class='username'>您好，{{userInfo.name}}</p>
            <div class='worker'>总编 | 南京日报-信息建设部门</div>
          </div>
        </div>
        <div class='my-info-right flexBox flexRight'>
          <li>
            <div class='type'>图片总数</div>
            <div class='num'>{{totalData.photos_amount || 0}}</div>
          </li>
          <li>
            <div class='type'>稿件总数</div>
            <div class='num'>{{totalData.atlas_amount || 0}}</div>
          </li>
          <li>
            <div class='type'>会员总数</div>
            <div class='num'>{{totalData.member_amount || 0}}</div>
          </li>
        </div>
      </div>
      <chief-editor :waitingData = waitingData @ignoreAll = ignoreAll :platformInfluenceData = platformInfluenceData @platformTimetChange = platformTimetChange @photoTimeChange = photoTimeChange :photoDownloadList = photoDownloadList @photoToggleTab = photoToggleTab></chief-editor>
    </div>
    <!-- 编辑 -->
    <div v-if="userType == 2">
      <div class='my-info-statistical flexBox flexBetween'>
        <div class='my-info-left flexBox flexLeft'>
          <div class='userImg flexBox flexMiddel'>
            <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="">
            <img v-else src="../../assets/image/avatar.png" alt>
          </div>
          <div class='userInfo'>
            <p class='username'>您好，{{userInfo.name}}</p>
            <div class='worker'>编辑 | 南京日报-信息建设部门</div>
          </div>
        </div>
        <div class='my-info-right flexBox flexRight'>
          <!-- <li>
            <div class='type'>团队排名</div>
            <div class='num'>12</div>
          </li> -->
          <li>
            <div class='type'>发稿总数</div>
            <div class='num'>{{totalData.publish_amount || 0}}</div>
          </li>
          <li>
            <div class='type'>稿件访问总数</div>
            <div class='num'>{{totalData.click_amount || 0}}</div>
          </li>
        </div>
      </div>
      <chief :waitingData = waitingData @ignoreAll = ignoreAll :platformInfluenceData = platformInfluenceData @platformTimetChange = platformTimetChange @photoTimeChange = photoTimeChange :photoDownloadList = photoDownloadList></chief>
    </div>
  </div>
</template>
<script>
import chiefEditor from './components/chiefEditor'
import chief from './components/chief'
export default {
  data () {
    return {
      storage: window.localStorage,
      title: '',
      dynamicsList: [],
      waitingData: {},
      totalData: {},
      platformInfluenceData: {},
      photoDownloadList: {},
      photoSource: 1,
      platformTime: {},
      photoTime: {}
    }
  },
  props: ['userType', 'userInfo'],
  components: {
    chiefEditor,
    chief
  },
  methods: {
    // 我的待办
    getWaitingData () {
      this.$api.getWaiting().then(res => {
        if (res.error_code === 0) {
          this.waitingData = res.data
        }
      })
    },
    // 我的待办 忽略全部
    ignoreAll () {
      this.$api.ignoreWaiting().then(res => {
        // console.log(res)
        if (!res.error_code) {
          this.getWaitingData()
        }
      })
    },
    // 数据统计statisticTotal
    getTotalData () {
      this.$api.statisticTotal().then(res => {
        // console.log(res)
        this.totalData = res.data
      })
    },
    // 平台内容影响力 platformInfluence
    getPlatformData (start, end, date) {
      let param = {
        start_time: start,
        end_time: end,
        date_search: start ? '' : date
      }
      this.$api.platformInfluence(param).then(res => {
        if (!res.error_code) {
          this.platformInfluenceData = res.data
        }
      })
    },
    // 平台影响力时间切换
    platformTimetChange (value) {
      // console.log(value)
      this.getPlatformData(value.time.timeRang.start_date, value.time.timeRang.end_date, '1')
      this.platformTime = value
    },
    // 图片下载排行
    getPhotoDownload (start, end, source, date) {
      let param = {
        source: source,
        start_time: start,
        end_time: end,
        date_search: start ? '' : date
      }
      this.$api.photoDownload(param).then(res => {
        // console.log(res)
        if (!res.error_code) {
          this.photoDownloadList = res.data
        }
      })
    },
    // 图片下载时间切换 编辑不区分后台和网站
    photoTimeChange (value) {
      // console.log(value)
      if (value.source === 'chiefEditor') {
        this.getPhotoDownload(value.time.time.timeRang.start_date, value.time.time.timeRang.end_date, this.photoSource, '')
      } else {
        this.getPhotoDownload(value.time.time.timeRang.start_date, value.time.time.timeRang.end_date, '', '')
      }
      this.photoTime = value
    },
    // 图片下载 前后台切换
    photoToggleTab (value) {
      this.getPhotoDownload(this.photoTime.time.time.timeRang.start_date, this.photoTime.time.time.timeRang.end_date, value, '1')
    }
  },
  mounted () {
    // console.log(this.userType)
    // console.log(this.storage)
    this.getWaitingData()
    this.getTotalData()
  }
}
</script>
<style lang='scss' scoped>
.workbench-box {
  .pageName {
    color: rgba(166, 166, 166, 1);
    font-size: 14px;
    padding: 20px 0;
  }
  .my-info-statistical {
    width: 100%;
    height: 100px;
    min-width: 1200px;
    margin-bottom: 20px;
    padding: 24px;
    background: rgba(255, 255, 255, 1);
    align-items: center;
    .my-info-left {
      align-items: center;
      .userImg {
        width: 54px;
        height: 54px;
        overflow: hidden;
        border-radius: 50%;
        background: #000;
        margin-right: 15px;
        img {
          width: 100%;
          max-height: 100%;
        }
      }
      .userInfo {
        .username {
          font-size: 20px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
        }
        .worker {
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 14px;
          font-size: 14px;
          margin-top: 12px;
        }
      }
    }
    .my-info-right {
      li {
        padding: 0 38px;
        border-right: 1px solid #eeeeee;
        &:last-child {
          border: none;
        }
        .type {
          font-size: 14px;
          font-weight: 400;
          color: rgba(166, 166, 166, 1);
        }
        .num {
          margin-top: 12px;
          color: rgba(51, 51, 51, 1);
          font-size: 28px;
        }
      }
    }
  }
}
</style>
