<template>
  <div class="platformContent">
    <div class="title" v-if="title">{{title}}</div>
    <ul v-if="topList && topList.length > 0">
      <li class="flexBox flexLeft flexAlign" v-for="(item, index) in topList" :key="index">
        <span :class="{ 'first': index == 0, 'seconde': index == 1, 'third': index == 2}">{{index + 1}}</span>
        <p class="content" @click="jumpUrl(item.url)">{{item.title}}</p>
        <p class="flexBox flexLeft flexAlign" v-if="title=='阅读量TOP5'">
          <i class="readersIcon"></i>
          {{item.click_num}}
        </p>
        <p class="flexBox flexLeft flexAlign"  v-else>
          <i class="commentIcon"></i>
          {{item.comment_num}}
        </p>
      </li>
    </ul>
    <ul class="hoge-error" v-else>
      <div>
        <div class="nodata-img"></div>
        <p>暂无内容</p>
      </div>
    </ul>
  </div>
</template>
<script>
import TimeSelect from '../../../components/common/timeSelect'
export default {
  name: '',
  data () {
    return {}
  },
  props: ['title', 'topList'],
  components: {
    TimeSelect
  },
  methods: {
    jumpUrl (url) {
      window.open(url, '_blank')
    }
  }
}
</script>
<style lang='scss' scoped>
.platformContent{
  width: 100%;
  height: 250px;
  .title{
    font-size:14px;
    font-family:PingFangSC;
    font-weight:500;
    color:rgba(51,51,51,1);
    margin-bottom: 28px;
  }
  ul{
    li{
      margin-top: 35px;
      span{
        font-size:18px;
        font-family:PingFangSC;
        font-weight:500;
        color:rgba(56,167,255,1);
        width: 15px;
      }
      .content{
        margin-left: 20px;
        margin-right: 45px;
        width: 80%;
        min-width: 246px;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(51,51,51,1);
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        cursor: pointer;
      }
      p{
        color: #A6A6A6;
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
}
</style>
