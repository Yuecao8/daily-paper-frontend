<template>
  <div class='getMore'>
    <div class='pageName flexBox flexBetween'>
      <p><router-link to="/workbench">工作台 /</router-link><span class="current">{{contributeTitle}}</span></p>
      <!-- <el-button type="primary" size= 'small'>导出</el-button> -->
    </div>
    <div class="getMoreBox">
      <div class="header-top flexBox flexBetween">
        <div class="tab-list" v-if="contributeTitle=='工作统计'||contributeTitle=='投稿统计'">
          <span @click="toggleTab('create')" :class="{isActive: isActive == 'create'}">稿件创建数</span>
          <span @click="toggleTab('publish')" :class="{isActive: isActive == 'publish'}">稿件发布数</span>
          <span @click="toggleTab('upload')" :class="{isActive: isActive == 'upload'}">源文件上传数</span>
        </div>
        <div class="tab-list" v-if="contributeTitle=='互动统计'">
          <span @click="toggleTab('downloads')" :class="{isActive: isActive == 'downloads'}">下载</span>
          <span @click="toggleTab('comments')" :class="{isActive: isActive == 'comments'}">评论</span>
          <span @click="toggleTab('collects')" :class="{isActive: isActive == 'collects'}">收藏</span>
        </div>
        <!-- 筛选条件 -->
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
          <!-- <el-input
            size="small"
            placeholder="请输入内容"
            suffix-icon="el-icon-search"
            v-model="keyInput"
            style="width: 200px;margin-left: 10px;"
            @change = selectKeywords>
          </el-input> -->
        </div>
      </div>
      <ul class="moreList" v-if="isActive=='upload'">
        <li class="title flexBox flexBetween">
          <div style="width: 40%">图片标题</div>
          <div style="width: 10%">作者</div>
          <div style="width: 10%" class="flexBox flexLeft flexAlign">
            <span>上传者</span>
          </div>
          <div style="width: 20%" class="flexBox flexLeft flexAlign">
            <span>上传时间</span>
          </div>
        </li>
        <!-- 循环从这开始 -->
        <div v-if="contentList.total>0">
          <li class="flexBox flexBetween" v-for="(item, index) in contentList.data" :key="index">
            <div style="width: 40%" class="photoTitle flexBox flexLeft flexAlign">
              <div class="imgBox flexBox">
                <img :src="item.photo_url" alt="">
              </div>
              <p v-if="item.atlas&&item.atlas.title">{{item.atlas.title}}</p>
            </div>
            <div style="width: 10%">{{item.author}}</div>
            <div style="width: 10%" v-if="item.atlas&&item.atlas.create_user_name">{{item.atlas.create_user_name}}</div>
            <div style="width: 20%" v-if="item.atlas&&item.atlas.created_at">{{item.atlas.created_at}}</div>
          </li>
        </div>
        <div class="hoge-error" v-else style="margin-top: 40px">
          <div>
            <div class="nodata-img"></div>
            <p>暂无内容</p>
          </div>
        </div>
      </ul>

      <ul class="moreList" v-else-if="isActive=='downloads'">
        <li class="title flexBox flexBetween">
          <div style="width: 40%">图片标题</div>
          <div style="width: 20%" class="flexBox flexLeft flexAlign">
            <span>下载者</span>
          </div>
          <div style="width: 20%" class="flexBox flexLeft flexAlign">
            <span>下载时间</span>
          </div>
        </li>
        <!-- 循环从这开始 -->
        <div v-if="contentList.total>0">
          <li class="flexBox flexBetween" v-for="(item, index) in contentList.data" :key="index">
            <div style="width: 40%" class="photoTitle flexBox flexLeft flexAlign">
              <div class="imgBox flexBox">
                <img :src="item.photo_url" alt="">
              </div>
              <p>{{item.title}}</p>
            </div>
            <div style="width: 20%">{{item.user.name}}</div>
            <div style="width: 20%">{{item.download_time}}</div>
          </li>
        </div>
        <div class="hoge-error" v-else style="margin-top: 40px">
          <div>
            <div class="nodata-img"></div>
            <p>暂无内容</p>
          </div>
        </div>
      </ul>

      <ul class="moreList" v-else-if="isActive=='collects'">
        <li class="title flexBox flexBetween">
          <div style="width: 40%">图片标题</div>
          <div style="width: 20%" class="flexBox flexLeft flexAlign">
            <span>收藏者</span>
          </div>
          <div style="width: 20%" class="flexBox flexLeft flexAlign">
            <span>收藏时间</span>
          </div>
        </li>
        <!-- 循环从这开始 -->
        <div v-if="contentList.total>0">
          <li class="flexBox flexBetween" v-for="(item, index) in contentList.data" :key="index">
            <div style="width: 40%" class="photoTitle flexBox flexLeft flexAlign">
              <div class="imgBox flexBox">
                <img :src="item.extends.index_pic" alt="" v-if="item.extends&&item.extends.index_pic">
              </div>
              <p v-if="item.extends&&item.extends.title">{{item.extends.title}}</p>
            </div>
            <div style="width: 20%" v-if="item.member&&item.member.nick_name">{{item.member.nick_name}}</div>
            <div style="width: 20%">{{item.create_time}}</div>
          </li>
        </div>
        <div class="hoge-error" v-else style="margin-top: 40px">
          <div>
            <div class="nodata-img"></div>
            <p>暂无内容</p>
          </div>
        </div>
      </ul>

      <ul class="moreList" v-else-if="isActive=='comments'">
        <li class="title flexBox flexBetween">
          <div style="width: 40%">标题</div>
          <div style="width: 20%" class="flexBox flexLeft flexAlign">
            <span>评论人</span>
          </div>
          <div style="width: 20%" class="flexBox flexLeft flexAlign">
            <span>评论时间</span>
          </div>
        </li>
        <!-- 循环从这开始 -->
        <div v-if="contentList.total>0">
          <li class="flexBox flexBetween" v-for="(item, index) in contentList.data" :key="index">
            <div style="width: 40%" class="photoTitle flexBox flexLeft flexAlign">
              <!-- <div class="imgBox flexBox">
                <img :src="item.extends.index_pic" alt="">
              </div> -->
              <p>{{item.title}}</p>
            </div>
            <div style="width: 20%" v-if="item.member&&item.member.nick_name">{{item.member.nick_name}}</div>
            <div style="width: 20%">{{item.created_at}}</div>
          </li>
        </div>
        <div class="hoge-error" v-else style="margin-top: 40px">
          <div>
            <div class="nodata-img"></div>
            <p>暂无内容</p>
          </div>
        </div>
      </ul>

      <ul class="moreList" v-else>
        <li class="title flexBox flexBetween">
          <div style="width: 40%">图片标题</div>
          <div style="width: 10%">作者</div>
          <div style="width: 10%" class="flexBox flexLeft flexAlign">
            <span>创建者</span>
          </div>
          <div style="width: 20%" class="flexBox flexLeft flexAlign">
            <span>创建时间</span>
          </div>
        </li>
        <!-- 循环从这开始 -->
        <div v-if="contentList.total>0">
          <li class="flexBox flexBetween" v-for="(item, index) in contentList.data" :key="index">
            <div style="width: 40%" class="photoTitle flexBox flexLeft flexAlign">
              <div class="imgBox flexBox">
                <img :src="item.index_pic" alt="">
              </div>
              <p>{{item.title}}</p>
            </div>
            <div style="width: 10%">{{item.author}}</div>
            <div style="width: 10%">{{item.create_user_name}}</div>
            <div style="width: 20%">{{item.created_at}}</div>
          </li>
        </div>
        <div class="hoge-error" v-else style="margin-top: 40px">
          <div>
            <div class="nodata-img"></div>
            <p>暂无内容</p>
          </div>
        </div>
      </ul>
      <!-- :total="contentList.total" -->
      <el-pagination
        hide-on-single-page
        background
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        :page-size="per_num"
        :total="contentList.total"
        @current-change="handleCurrentPage">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import TimeSelect from '../../../components/common/timeSelect'
export default {
  name: '',
  props: ['userType'],
  data () {
    return {
      storage: window.localStorage,
      access_token: this.$global.default.getToken(),
      photoList: [
        {id: 1,
          image: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2779703336,1661385271&fm=26&gp=0.jpg',
          descr: '着力培育南京地区的艺术市场，普及文物保护及艺术品投资鉴藏知识，助力青年艺术家的起步和发展。'},
        {id: 2,
          image: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2779703336,1661385271&fm=26&gp=0.jpg',
          descr: '绿岛上的海棠花迎春绽放，成为秦淮河畔、明城墙下一道靓丽的风景线。'},
        {id: 3,
          image: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2779703336,1661385271&fm=26&gp=0.jpg',
          descr: '艺博荟主要包括生活艺术品展售、大众艺术品拍卖、生活美学体验三大版块'},
        {id: 4,
          image: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2779703336,1661385271&fm=26&gp=0.jpg',
          descr: '绿岛上的海棠花迎春绽放，成为秦淮河畔、明城墙下一道靓丽的风景线。'},
        {id: 5,
          image: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2779703336,1661385271&fm=26&gp=0.jpg',
          descr: '艺博荟主要包括生活艺术品展售、大众艺术品拍卖、生活美学体验三大版块'},
        {id: 6,
          image: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2779703336,1661385271&fm=26&gp=0.jpg',
          descr: '绿岛上的海棠花迎春绽放，成为秦淮河畔、明城墙下一道靓丽的风景线。'},
        {id: 7,
          image: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2779703336,1661385271&fm=26&gp=0.jpg',
          descr: '着力培育南京地区的艺术市场，普及文物保护及艺术品投资鉴藏知识，助力青年艺术家的起步和发展。'},
        {id: 8,
          image: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2779703336,1661385271&fm=26&gp=0.jpg',
          descr: '绿岛上的海棠花迎春绽放，成为秦淮河畔、明城墙下一道靓丽的风景线。'},
        {id: 9,
          image: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2779703336,1661385271&fm=26&gp=0.jpg',
          descr: '着力培育南京地区的艺术市场，普及文物保护及艺术品投资鉴藏知识，助力青年艺术家的起步和发展。'}
      ],
      contentList: [],
      currentPage: 1,
      per_num: 10,
      type: '',
      date_search: 2,
      start_time: '',
      end_time: '',
      isActive: '',
      opt: ['今日', '近七日', '自定义'],
      keyInput: '',
      title: '',
      contributeTitle: '',
      statusValue: '',
      // changeTime: {},
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
      }]
    }
  },
  components: {
    TimeSelect
  },
  // props: ['title'],
  methods: {
    toggleTab (currentTab) {
      this.isActive = currentTab
      this.type = currentTab
      // this.date_search = 2
      // this.start_time = ''
      // this.end_time = ''
      this.currentPage = 1
      // this.photoTimeChange(value)
      this.getContentList()
    },
    handleCurrentPage (val) {
      this.currentPage = val
      this.getContentList()
    },
    photoTimeChange (value) {
      // console.log(value)
      if (value.key === 0) {
        this.date_search = 1
        this.start_time = ''
        this.end_time = ''
      } if (value.key === 1) {
        this.date_search = 2
        this.start_time = ''
        this.end_time = ''
      } else {
        this.start_time = value.time.timeRang.start_date
        this.end_time = value.time.timeRang.end_date
        this.date_search = ''
      }
      this.currentPage = 1
      this.getContentList()
    },
    getSearchOptions () {
      let param = {
        access_token: this.access_token
      }
      this.$api.searchOptions(param).then(res => {
        // console.log(res)
        if (!res.error_code) {
          // console.log(res)
        }
      })
    },
    getContentList () {
      let param = {
        access_token: this.access_token, //  y
        type: this.type, //  y
        role_id: this.storage.role_id, //   3总编4编辑
        page: this.currentPage,
        per_num: this.per_num,
        date_search: this.date_search, //  值为1表示今天，2表示近7天
        start_time: this.start_time,
        end_time: this.end_time
      }
      this.$api.contentList(param).then(res => {
        // console.log(res)
        if (!res.error_code) {
          this.contentList = res.data
          // console.log(this.contentList)
        }
      })
    }
  },
  mounted () {
    this.title = this.$route.params.name
    this.contributeTitle = this.storage.contributeTitle
    if (this.contributeTitle === '工作统计' || this.contributeTitle === '投稿统计') {
      this.isActive = 'create'
      this.type = 'create'
    } else {
      this.isActive = 'downloads'
      this.type = 'downloads'
    }
    this.getSearchOptions()
    // this.$nextTick(function () {
    //   this.getContentList()
    // })
    this.getContentList()
  }
}
</script>
<style lang='scss' scoped>
.imgsize{
  width: 214px;
  height: 150px;
  background: #999;
}
.imgli{
  width: 214px!important;
  height: 150px!important;
  padding: 0!important;
  margin-right: 24px;
  margin-bottom: 24px;
  border-bottom: 0 solid #eee!important;
  flex-direction: column;
}
.img-desc{
  z-index: 999;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 20px;
  margin: 0 6px;
  margin-top: -50px;
  font-size: 13px;
  color: #fff;
  font-family: PingFangSC-Regular;
}
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
          cursor: pointer;
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
