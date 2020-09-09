<template>
    <div class="aside">
       <el-row class="tac">
         <el-col v-if="sortsList">
             <el-menu
             :default-active = 'currentIndex'
             @open="handleOpen"
             @close="handleClose"
             router>
             <!-- <el-menu-item  v-for="(item,index) in sortsList" :key="index" :index="item.path">
                <i class="el-icon-setting"></i>
                <span slot="title">{{item.name}}</span>
              </el-menu-item> -->
             <el-submenu v-for="(item,index) in sortsList"
             :key="index" :index='index.toString()'>
                 <template slot="title">
                 <i :class="item.iconClass"></i>
                 <span>{{item.name}}</span>
                 </template>
                <el-menu-item-group v-if="item.children.length > 0">
                  <el-menu-item v-for="(item2,i2) in item.children" :key="i2" :index="item2.path" >
                    <span @click="reload()">{{item2.name}}</span>
                  </el-menu-item>
                 </el-menu-item-group>
             </el-submenu>
             </el-menu>
         </el-col>
       </el-row>
   </div>
 </template>
<script>
export default {
  name: '',
  data () {
    return {
      currentIndex: this.routeName, //   当前选中的列表
      sortsList: []
    }
  },
  props: ['routeName', 'reload'],
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    // 获取分类
    getSorts () {
      // this.$api.getClassifyList((res) => {
      //   console.log(res)
      // })
      this.sortsList = [
        {
          name: '首页',
          children: [{ name: '工作台', path: '/workbench' }],
          iconClass: 'shouye'
        },
        {
          name: '原稿中心',
          children: [{ name: '图片', path: '/original' }, { name: '视频', path: '/video' }, { name: '摄影之家', path: '/link' }],
          iconClass: 'ziyuan'
        },
        {
          name: '稿件管理',
          children: [{ name: '成品库', path: '/finished' }],
          iconClass: 'gaojian'
        },
        {
          name: '融合发布',
          children: [{ name: '发布库', path: '/libraries' }],
          iconClass: 'ronghe'
        },
        {
          name: '内容管控',
          children: [{ name: '隔离库', path: '/isolatelibrary' }],
          iconClass: 'neirong'
        },
        {
          name: '智能媒资',
          children: [{name: '素材库', path: '/materialbank'}, {name: '人像库', path: '/facedatabase'}, {name: '快速建稿', path: '/drafting'}],
          iconClass: 'zhineng'
        },
        {
          name: '会员互动',
          children: [{name: '活动管理', path: '/activity'}, {name: '会员管理', path: '/memberlist'}, {name: '签约审核', path: '/contractreview'}, {name: '会员分组', path: '/membergroup'}, {name: '会员角色', path: '/memberrole'}],
          iconClass: 'huiyuan'
        },
        {
          name: '系统管理',
          children: [{name: '类目设置', path: '/classify'}, {name: '网站栏目', path: '/columnmanage'}, {name: '审核设置', path: '/processconfig'}, {name: '组织架构', path: '/personmanagement'}, {name: '架构管理', path: '/department'}, {name: '角色管理', path: '/rolemanagement'}, {name: '摄影分类', path: '/photographic'}, {name: '水印设置', path: '/settingwater'}],
          iconClass: 'xitong'
        },
        {
          name: '个人中心',
          children: [{name: '个人中心', path: '/person'}],
          iconClass: 'geren'
        }
      ]
      this.currentIndex = this.routeName
    }
  },
  mounted () {
    this.getSorts()
  },
  watch: {
    routeName (curVal, oldVal) {
      // console.log(curVal)
      this.currentIndex = curVal
      // this.routeName = curVal.path.match('(/[a-z]+[^/]){1}')[0]
    }
  }
}
</script>
<style lang='scss' scoped>
 .aside{
   min-width: 160px;
   padding-top: 40px;
   /deep/{
       .el-menu{
        border:none;
       }
       .el-submenu{
         i{
           display: inline-block;
           min-width: 18px;
           min-height: 18px;
           background-position: center center;
           margin-right: 12px;
           &.shouye{
             background: url(../../assets/image/workBench/shouye.png) no-repeat;
             background-size: contain;
           }
           &.ziyuan{
             background: url(../../assets/image/workBench/ziyuan.png) no-repeat;
             background-size: contain;
           }
           &.gaojian{
             background: url(../../assets/image/workBench/gaojian.png) no-repeat;
             background-size: contain;
           }
           &.ronghe{
             background: url(../../assets/image/workBench/ronghe.png) no-repeat;
             background-size: contain;
           }
           &.neirong{
             background: url(../../assets/image/workBench/neirong.png) no-repeat;
             background-size: contain;
           }
           &.zhineng{
             background: url(../../assets/image/workBench/zhineng.png) no-repeat;
             background-size: contain;
           }
           &.huiyuan{
             background: url(../../assets/image/workBench/huiyuan.png) no-repeat;
             background-size: contain;
           }
           &.xitong{
             background: url(../../assets/image/workBench/xitong.png) no-repeat;
             background-size: contain;
           }
           &.geren{
             background: url(../../assets/image/workBench/geren.png) no-repeat;
             background-size: contain;
           }
         }
         .el-submenu__title{
           padding-left: 26px !important;
           .el-submenu__icon-arrow{
             display: none;
           }
         }
       }
       .el-submenu .el-menu-item{
         min-width: 160px;
         padding-left: 58px !important;
        color: #666;
        &.is-active{
          color: #409EFF;
        }
       }
   }
 }
</style>
