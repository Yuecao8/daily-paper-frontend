<template>
  <div class='getMore'>
    <div class='pageName flexBox flexBetween'>
      <p><router-link to="/workbench">工作台 /</router-link><span class="current">图片下载排行</span></p>
      <!-- <el-button type="primary" size= 'small'>导出</el-button> -->
    </div>
    <div class="getMoreBox">
      <div class="header-top flexBox flexBetween">
        <div class="tab-list">
          <span @click="toggleTab('web')" :class="{isActive: isActive == 'web'}">网站</span>
          <span @click="toggleTab('backstage')" :class="{isActive: isActive == 'backstage'}">后台</span>
        </div>
        <div class="flexBox flexLeft">
          <!-- <el-select v-model="statusValue" placeholder="全部状态" size= 'small' style="width: 120px;margin-right:10px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select> -->
          <time-select :opt="opt" v-on:time-select-change="photoTimeChange"></time-select>
          <el-input
            size="small"
            placeholder="请输入内容"
            suffix-icon="el-icon-search"
            v-model="keyInput"
            style="width: 200px;margin-left: 10px;"
            @change = selectKeywords>
          </el-input>
        </div>
      </div>
      <ul class="moreList">
        <li class="title flexBox flexBetween">
          <div style="width: 30%">图片标题</div>
          <div style="width: 10%">作者</div>
          <div style="width: 10%" class="flexBox flexLeft flexAlign">
            <span>下载次数</span>
            <span style="margin-left: 5px;font-size: 5px;color:#CCCCCC" @click="orderBy('downloads', 1)">
              <i class="el-icon-caret-top" style="display: block;line-height: 0.5;"></i>
              <i class="el-icon-caret-bottom" style="display: block;line-height: 0.5;"></i>
            </span>
          </div>
          <!-- <div style="width: 10%">当前状态</div> -->
          <div style="width: 15%" class="flexBox flexLeft flexAlign">
            <span>发布时间</span>
            <span style="margin-left: 5px;font-size: 5px;color:#CCCCCC" @click="orderBy('publish_time', 1)">
              <i class="el-icon-caret-top" style="display: block;line-height: 0.5;"></i>
              <i class="el-icon-caret-bottom" style="display: block;line-height: 0.5;"></i>
            </span>
          </div>
          <!-- <div style="width: 25%">相关稿件</div> -->
        </li>
        <!-- 循环从这开始 -->
        <div v-if="photoDownloadList.total>0">
          <li class="flexBox flexBetween" v-for="(item, index) in photoDownloadList.data" :key="index">
            <div style="width: 30%" class="photoTitle flexBox flexLeft flexAlign">
              <div class="imgBox flexBox">
                <img :src="item.photo_key" alt="">
              </div>
              <p>{{item.title}}</p>
            </div>
            <div style="width: 10%">{{item.author}}</div>
            <div style="width: 10%">{{item.downloads}}</div>
            <!-- 已隔离 正常  下架 -->
            <!-- <div style="width: 10%" class="status" v-if="item.status === 3">
              <span class="statusIcon"></span>
              <span>正常</span>
            </div>
            <div style="width: 10%" class="status" v-else-if="item.status === 24">
              <span class="statusIcon geli"></span>
              <span>已隔离</span>
            </div>
            <div style="width: 10%" class="status" v-else-if="item.status === 23">
              <span class="statusIcon xiajia"></span>
              <span>已下架</span>
            </div> -->
            <div style="width: 15%">{{item.publish_time}}</div>
            <!-- <div style="width: 25%" class="relative flexBox flexRight flexAlign">
              <p>相关稿件相关稿件相关稿件相关稿件相关稿件相关稿件相关稿件相关稿件相关稿件</p>
              <span style="margin-right:13px">2</span>
              <el-popover
                popper-class = 'photoMore'
                placement="bottom-end"
                trigger="hover">
                <ul>
                  <li>濠河环绕南通老城区，形如钥匙</li>
                  <li class="active">江苏那些令人惊叹的航拍图~咱南通的简直美哭！</li>
                  <li>濠河环绕南通老城区，形如钥匙</li>
                  <li>濠河环绕南通老城区，形如钥匙</li>
                  <li>濠河环绕南通老城区，形如钥匙</li>
                  <li>濠河环绕南通老城区，形如钥匙</li>
                  <li>濠河环绕南通老城区，形如钥匙</li>
                  <li>濠河环绕南通老城区，形如钥匙</li>
                  <li>濠河环绕南通老城区，形如钥匙</li>
                  <li>濠河环绕南通老城区，形如钥匙</li>
                </ul>
                <i class="el-icon-arrow-down" slot="reference"></i>
              </el-popover>
            </div> -->
          </li>
        </div>
        <div class="hoge-error" v-else style="margin-top: 40px">
          <div>
            <div class="nodata-img"></div>
            <p>暂无内容</p>
          </div>
        </div>
      </ul>
      <el-pagination
        hide-on-single-page
        background
        layout="prev, pager, next"
        :total="photoDownloadList.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import TimeSelect from '../../../components/common/timeSelect'
export default {
  name: '',
  data () {
    return {
      isActive: 'web',
      opt: ['今日', '近七日', '自定义'],
      keyInput: '',
      title: '',
      statusValue: '',
      options: [{
        value: '',
        label: '全部状态'
      }, {
        value: '1',
        label: '已隔离'
      }, {
        value: '2',
        label: '正常'
      }, {
        value: '3',
        label: '已下架'
      }],
      photoDownloadList: {},
      photoSource: 1,
      changeTime: {},
      order: 0
    }
  },
  components: {
    TimeSelect
  },
  // props: ['title'],
  methods: {
    toggleTab (currentTab) {
      this.isActive = currentTab
      if (currentTab === 'web') {
        this.photoSource = 1
      } else {
        this.photoSource = 2
      }
      this.getPhotoDownload(this.changeTime.time.timeRang.start_date, this.changeTime.time.timeRang.end_date, this.photoSource, '1', '', '', this.order)
    },
    // 图片下载排行
    // 排序传order_by  和 order ,
    // 下载量order_by 传downloads  ,
    // 发布时间排序order_by传publish_time
    // 升序order传asc,降序order传desc
    getPhotoDownload (start, end, source, date, keywords, orderBy, order) {
      let param = {
        source: source,
        start_time: start,
        end_time: end,
        date_search: start ? '' : date,
        keyword: keywords,
        order_by: orderBy,
        order: order ? 'asc' : 'desc'
      }
      this.$api.photoDownload(param).then(res => {
        console.log(res)
        if (!res.error_code) {
          this.photoDownloadList = res.data
        }
      })
    },
    orderBy (orderBy) {
      this.order = !this.order
      this.getPhotoDownload(this.changeTime.time.timeRang.start_date, this.changeTime.time.timeRang.end_date, this.photoSource, '', '', orderBy, this.order)
    },
    photoTimeChange (value) {
      this.getPhotoDownload(value.time.timeRang.start_date, value.time.timeRang.end_date, this.photoSource, '0', '', this.order)
      this.changeTime = value
    },
    selectKeywords () {
      this.getPhotoDownload(this.changeTime.time.timeRang.start_date, this.changeTime.time.timeRang.end_date, this.photoSource, '', this.keyInput, '', this.order)
    }
  },
  mounted () {
    this.title = this.$route.params.name
    // console.log(this.title)
    // this.getPhotoDownload(this.photoSource)
  }
}
</script>
<style lang='scss' scoped>
.getMore{
  // margin-right: 30px;
  .pageName {
    color: rgba(166, 166, 166, 1);
    font-size: 14px;
    padding: 20px 0;
    a{
      color: rgba(166, 166, 166, 1);
      font-size: 14px;
    }
    .current{
      margin-left: 10px;
      color:rgba(102,102,102,1);
    }
  }
  .getMoreBox{
    position: relative;
    min-width: 1152px;
    background: #fff;
    padding-bottom: 105px;
    .header-top{
      height: 64px;
      line-height: 64px;
      padding: 0px 24px;
      border-bottom: 1px solid #eee;
      .tab-list {
        color: #333;
        font-size: 14px;
        span {
          display: inline-block;
          margin-right: 40px;
        }
        .isActive {
          border-bottom: 2px solid #0091ff;
          color: #38A7FF;
        }
      }
      /deep/{
        .time-select-component{
          padding-top: 16px;
          .fixed-btn{
            width: 60px;
            height: 32px;
            line-height: 32px;
          }
        }
      }
    }
    .moreList{
      padding: 24px;
      font-size:14px;
      font-family:PingFangSC;
      font-weight:400;
      color:rgba(102,102,102,1);
      li{
        padding: 0 21px;
        height: 66px;
        border-bottom: 1px solid #eee;
        line-height: 66px;
        &.title{
          height:50px;
          background:rgba(248,248,248,1);
          border-radius:4px 4px 0px 0px;
          line-height: 50px;
          font-size:14px;
          font-family:PingFangSC;
          font-weight:500;
          color:rgba(79,79,79,1);
          border-bottom: none;
        }
        .status{
          .statusIcon{
            display: inline-block;
            width:8px;
            height:8px;
            background:rgba(77,218,186,1);
            border-radius: 50%;
            margin-right: 5px;
            &.xiajia{
              background:rgba(185,205,222,1);
            }
            &.geli{
              background:rgb(244,111,111);
            }
          }
        }
        .photoTitle{
          padding-right: 15px;
          .imgBox{
            width: 60px;
            height: 46px;
            overflow: hidden;
            background: #000;
            margin-right: 10px;
            img{
              width: 100%;
              max-height: 100%;
            }
          }
          p{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            font-size:14px;
            font-family:PingFangSC;
            font-weight:400;
            color:rgba(51,51,51,1);
            width: 85%;
          }
        }
        .relative{
          p{
            width: 90%;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            margin-right: 20px;
          }
        }
        .author{
          padding-right: 15px;
          .imgBox{
            width: 36px;
            height: 36px;
            overflow: hidden;
            background: #000;
            margin-right: 10px;
            border-radius: 50%;
            img{
              width: 100%;
              max-height: 100%;
            }
          }
          p{
            font-size:14px;
            font-family:PingFangSC;
            font-weight:400;
            color:rgba(51,51,51,1);
          }
        }
      }
    }
    /deep/{
      .el-pagination{
        position: absolute;
        right: 24px;
        font-weight:400;
        color:rgba(166,166,166,1);
        .btn-prev,.btn-next{
          border:1px solid rgba(226,226,226,1);
          border-radius:4px 6px 6px 6px;
          background: unset;
          width: 32px;
          height: 32px;
          line-height: 32px;
        }
        .el-pager li{
          border:1px solid rgba(226,226,226,1);
          border-radius:4px 6px 6px 6px;
          background: unset;
          width: 32px;
          height: 32px;
          line-height: 32px;
          &.active{
            background:rgba(56,167,255,1);
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
