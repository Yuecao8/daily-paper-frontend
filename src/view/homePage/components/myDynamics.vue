<template>
  <div class="my-dynamics">
    <div class="header-box flexBox flexBetween">
      <p>我的动态</p>
    </div>
    <ul class="my-dynamics-list"
        v-if = 'dynamicsList.length > 0'
        v-loading="loading"
        element-loading-text="加载更多"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
      <li class="flexBox flexLeft" v-for="(item, index) in dynamicsList" :key="index">
        <span class="cricel"></span>
        <div class="content">
          <p class="title">{{item.operate_name}} {{item.title}}</p>
          <p class="datetime">{{item.list_time_line}}</p>
        </div>
      </li>
    </ul>
    <ul class="my-dynamics-list hoge-error" v-else>
      <div>
        <div class="nodata-img"></div>
        <p>暂无内容</p>
      </div>
    </ul>
    <!-- <div class="more">
      <span @click="getMore()" ref="more" v-if = 'dynamicsList.length > 0'>更多</span>
    </div> -->
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      dynamicsList: [],
      loading: false,
      page: 1,
      count: 10,
      totalNum: ''
    }
  },
  methods: {
    // 我的动态
    getMyDynamic (page) {
      let param = {
        page: page,
        per_num: this.count,
        site_id: 0
      }
      this.$api.getMyLog(param).then(res => {
        if (res.error_code === 0) {
          this.totalNum = res.data.total
          this.loading = false
          res.data.data.forEach(item => {
            this.dynamicsList.push(item)
          })
        }
      })
    },
    getMore () {
      if (this.totalNum < this.page * this.count) {
        this.$refs.more.innerHTML = '没有更多了'
        return
      }
      this.loading = true
      this.page = this.page + 1
      this.getMyDynamic(this.page)
    }
  },
  mounted () {
    this.getMyDynamic(this.page)
  }
}
</script>
<style lang='scss' scoped>
.my-dynamics {
  width: 320px;
  height: 100%;
  background-color: #fff;
  margin-top: 20px;
  .my-dynamics-list {
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    overflow-x: hidden;
    border-bottom: 1px solid #eeeeee;
    padding: 0px 24px 0 24px;
    height: 430px;
    &.hoge-error{
      padding: 0;
    }
    li {
      margin-top: 20px;
      &:first-child {
        .cricel {
          background: rgba(56, 167, 255, 1);
        }
      }
      &:last-child {
        .content {
          border: none;
          padding-bottom: 0px;
        }
      }
      .cricel {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(224, 229, 235, 1);
        margin-right: 24px;
        margin-top: 3px;
      }
      .content {
        width: 100%;
        border-bottom: 1px solid #eeeeee;
        padding-bottom: 20px;
        .title {
          // height:14px;
          font-size: 14px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
        }
        .datetime {
          margin-top: 12px;
          font-size: 13px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(166, 166, 166, 1);
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
</style>
