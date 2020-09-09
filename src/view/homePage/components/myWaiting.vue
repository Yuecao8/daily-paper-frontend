<template>
  <div class="my-wait">
    <div class="header-box flexBox flexBetween">
      <p>我的待办</p>
      <div class="ignore" @click="ignoreAll()">全部忽略</div>
    </div>
    <ul class="my-wait-list">
      <li class="flexBox flexBetween" @click="goDetail('original')">
        <span>待审核稿件</span>
        <i :class="{active: waitingData.content_count>0}">{{Number(waitingData.content_count)>=99?'99+':waitingData.content_count}}</i>
      </li>
      <li class="flexBox flexBetween" @click="goDetail('workbench/commentmore')">
        <span>待审核评论</span>
        <i :class="{active: waitingData.comment_count>0}">{{Number(waitingData.comment_count)>=99?'99+':waitingData.comment_count}}</i>
      </li>
      <li class="flexBox flexBetween" @click="goDetail('contractreview')">
        <span>待审核摄影师</span>
        <i :class="{active: waitingData.photo_user>0}">{{Number(waitingData.photo_user)>=99?'99+':waitingData.photo_user}}</i>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      msg: ''
    }
  },
  props: ['waitingData'],
  methods: {
    ignoreAll () {
      this.$emit('ignoreAll')
    },
    goDetail (value) {
      if (value === 'contractreview') {
        this.$router.push({
          name: `contractreview`,
          params: { status: 1 }
        })
      } else {
        this.$router.push({
          path: `/${value}`
        })
      }
      // this.$router.push({
      //   path: `/${value}`
      // })
      // this.$emit('goWaitDetail', value)
    }
  }
}
</script>
<style lang='scss' scoped>
.my-wait {
  background-color: #fff;
  height: 260px;
  margin-bottom: 20px;
  .header-box {
    padding: 17px 24px 15px 24px;
    border-bottom: 1px solid #eeeeee;
    p {
      font-size: 14px;
      color: #333333;
      line-height: 24px;
      font-weight: 500;
    }
    .ignore {
      cursor: pointer;
      font-size: 14px;
      font-weight: 200;
      color: rgba(56, 167, 255, 1);
      line-height: 24px;
    }
  }
  .my-wait-list {
    padding: 25px;
    li {
      font-size: 14px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 40px;
      margin-bottom: 20px;
      cursor: pointer;
      &:last-child {
        margin-bottom: 0;
      }
      i {
        display: inline-block;
        border-radius: 10px;
        text-align: center;
        line-height: 20px;
        font-style: unset;
        min-width: 20px;
        height: 20px;
        font-size: 12px;
        margin-top: 10px;
        background: rgba(238, 238, 238, 1);
        color: rgba(153, 153, 153, 1);
        &.active {
          background: rgba(249, 80, 64, 1);
          color: #fff;
        }
      }
    }
  }
}
</style>
