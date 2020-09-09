<template>
  <div class='getMore'>
    <div class='pageName flexBox flexBetween'>
      <p><router-link to="/workbench">工作台 /</router-link><span class="current">稿件数量排行</span></p>
      <!-- <el-button type="primary" size= 'small'>导出</el-button> -->
    </div>
    <div class="getMoreBox">
      <div class="header-top flexBox flexBetween">
        <div class="tab-list">
          <!-- <span @click="toggleTab('web')" :class="{isActive: isActive == 'web'}">网站</span>
          <span @click="toggleTab('backstage')" :class="{isActive: isActive == 'backstage'}">后台</span> -->
        </div>
        <div class="flexBox flexLeft">
          <!-- <el-select v-model="statusValue" placeholder="全部分组" size= 'small' style="width: 120px;margin-right:10px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select> -->
          <time-select :opt="opt" v-on:time-select-change="articelTimeChange"></time-select>
          <el-input
            size="small"
            placeholder="请输入内容"
            suffix-icon="el-icon-search"
            v-model="input"
            style="width: 200px;margin-left: 10px;"
            @blur="searchKey"
            @keyup.enter.native="searchKey">
          </el-input>
        </div>
      </div>
      <ul class="moreList" v-if="articelList.total">
        <li class="title flexBox flexBetween">
          <div style="width: 18%">作者</div>
          <div style="width: 12%">分组</div>
          <div style="width: 13%" class="flexBox flexLeft flexAlign">
            <span>投稿数</span>
            <!-- <span style="margin-left: 5px;font-size: 5px;color:#CCCCCC">
              <i class="el-icon-caret-top" style="display: block;line-height: 0.5;"></i>
              <i class="el-icon-caret-bottom" style="display: block;line-height: 0.5;"></i>
            </span> -->
          </div>
          <div style="width: 13%" class="flexBox flexLeft flexAlign">
            <span>审核通过数</span>
            <!-- <span style="margin-left: 5px;font-size: 5px;color:#CCCCCC">
              <i class="el-icon-caret-top" style="display: block;line-height: 0.5;"></i>
              <i class="el-icon-caret-bottom" style="display: block;line-height: 0.5;"></i>
            </span> -->
          </div>
          <div style="width: 15%" class="flexBox flexLeft flexAlign">
            <span>上网数</span>
            <!-- <span style="margin-left: 5px;font-size: 5px;color:#CCCCCC">
              <i class="el-icon-caret-top" style="display: block;line-height: 0.5;"></i>
              <i class="el-icon-caret-bottom" style="display: block;line-height: 0.5;"></i>
            </span> -->
          </div>
          <div style="width: 15%">当前状态</div>
          <div style="width: 15%">注册时间</div>
        </li>
        <!-- 循环从这开始 -->
        <li class="flexBox flexBetween" v-for="(item, index) in articelList.data" :key="index">
          <div style="width: 18%" class="author flexBox flexLeft flexAlign">
            <div class="imgBox flexBox">
              <img :src="item.avatar" alt="" v-if="item.avatar && item.avatar != ''">
              <img src="../../../assets/image/avatar.png" alt="" v-else>
            </div>
            <p>{{item.name}}</p>
          </div>
          <div style="width: 12%">{{item.group_name}}</div>
          <div style="width: 13%">{{item.create_num}}</div>
          <div style="width: 13%">{{item.audited_num}}</div>
          <div style="width: 15%">{{item.published_num}}</div>
          <div style="width: 15%" class="status" v-if="!item.locked">
            <!-- 已隔离 正常  下架 -->
            <span class="statusIcon"></span>
            <span>正常</span>
          </div>
          <div style="width: 15%" class="status" v-else>
            <!-- 已隔离 正常  下架 -->
            <span class="statusIcon geli"></span>
            <span>已锁定</span>
          </div>
          <div style="width: 15%">{{item.created_at}}</div>
        </li>
      </ul>
      <ul class="hoge-error photo-download-list" v-else>
        <div style="margin-top: 50px">
          <div class="nodata-img"></div>
          <p>暂无内容</p>
        </div>
      </ul>
      <el-pagination
        hide-on-single-page
        background
        page-size = 20
        layout="prev, pager, next"
        @current-change="handleCurrentPage"
        :total="articelList.total?articelList.total:0">
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
      input: '',
      title: '',
      options: [{
        value: '',
        label: '全部分组'
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
      articleSource: 1,
      order: 0,
      statusValue: '',
      articelList: {},
      articelTime: {},
      currentPage: 1
    }
  },
  components: {
    TimeSelect
  },
  // props: ['title'],
  methods: {
    // 处理分页
    handleCurrentPage (val) {
      this.currentPage = val
      this.getRank(this.articelTime.time.timeRang.start_date, this.articelTime.time.timeRang.end_date, this.articleSource, '0', this.input, '', this.order)
    },
    // 稿件数量排行 网站 后台 切换
    toggleTab (currentTab) {
      this.isActive = currentTab
      if (currentTab === 'web') {
        this.articleSource = 1
      } else {
        this.articleSource = 2
      }
      this.getRank(this.articelTime.time.timeRang.start_date, this.articelTime.time.timeRang.end_date, this.articleSource, '1', '', this.order)
    },
    // 稿件数量排行 时间切换
    articelTimeChange (value) {
      this.getRank(value.time.timeRang.start_date, value.time.timeRang.end_date, this.articleSource, '0', '', '', this.order)
      this.articelTime = value
    },
    // 稿件数量排行
    getRank (start, end, source, date, keywords, orderBy, order) {
      let param = {
        source: source,
        start_time: start,
        end_time: end,
        date_search: start ? '' : date,
        name: keywords,
        created_at: orderBy,
        order: order ? 'asc' : 'desc',
        page: this.currentPage,
        per_num: 20
      }
      this.$api.workloadRank(param).then(res => {
        if (!res.error_code) {
          console.log(res.data)
          this.articelList = res.data
        }
      })
    },
    // 关键字搜索
    searchKey () {
      this.getRank(this.articelTime.time.timeRang.start_date, this.articelTime.time.timeRang.end_date, this.articleSource, '0', this.input, '', this.order)
    }
  },
  mounted () {
    this.title = this.$route.params.name
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
