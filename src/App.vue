<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
html,body,#app{
  height: 100%;
  width: 100%;
}
.el-cascader__dropdown{
  max-height: 120px;
}
.el-cascader-panel{
  width: 100%;
  // height: 100%;
}
.el-cascader-menu__wrap{
 max-height: 120px;
}
.el-cascader-menu{
  min-width: 120px;
}
.el-scrollbar__wrap{
  // height: unset;
}
.commentBox{
  padding: 14px;
  ul{
    li{
      border-bottom: 2px solid #F6F6F6;
      margin-bottom: 10px;
      &:last-child{
        border: none;
        margin-bottom: 0;
      }
      .userLogo{
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: #000;
        overflow: hidden;
        margin-right: 7px;
        img{
          width: 100%;
          max-height: 100%;
        }
      }
      .commentInfo{
        width: 90%;
        font-size:12px;
        .content{
          background:rgba(249,249,249,1);
          line-height:17px;
          padding: 8px;
        }
        .name{
          color: #999999;
        }
        .replay{
          color: #4A90E2;
        }
        .commentBottom{
          padding: 5px 0 10px 0;
          color:rgba(153,153,153,1);
        }
      }
    }
  }
}
.photoMore{
  width: 280px;
  height: 320px;
  overflow-y: auto;
  overflow-x:hidden;
  background:rgba(250,250,250,0.9);
  padding: 20px;
  padding-right: 40px;
  ul{
    width: 100%;
    li{
      max-width: 220px;
      font-size:14px;
      font-family:PingFangSC;
      font-weight:400;
      margin-bottom: 13px;
      line-height:20px;
      &:hover{
        color:rgba(61,153,255,1);
      }
      &:last-child{
        margin-bottom: 0;
      }
    }
  }
}
</style>
