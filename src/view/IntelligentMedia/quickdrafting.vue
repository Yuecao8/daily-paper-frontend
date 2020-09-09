<template>
  <div class="quickdrafting">
    <div class='pageName'>快速建稿</div>
    <div class="draftingBox">
      <div class="top flexBox flexBetween">
        <div class="top-left flexBox flexAlign">
          <el-button @click="quickPost()" type="primary" size = 'mini'><span class="flexBox flexAlign"><i class="creatIcon"></i>快速建稿</span></el-button>
          <span class="tips flexBox flexAlign"><i class="tipIcon"></i>将抓取本层文件夹中所有JPG、PNG、JPEG图片</span>
        </div>
      </div>
      <div class="resource">
        <ul class="flexBox">
          <li @click="goFirst()">root</li>
          <li v-for="(item,index) in sourceList" :key="index" @click="goSource(item,index)"> > {{item}}</li>
        </ul>
      </div>
    <ul class="fileList" v-loading="loading">
      <li class="flexBox flexBetween flexAlign title">
        <div style="width: 60%">
          <!-- <el-checkbox style="margin-right: 20px" v-model="checkAllValue" @change="checkAll"></el-checkbox> -->
          <input type="checkbox" :checked="allCheck" @click="checkAll">
          文件名称
        </div>
        <div style="width: 20%">文件大小</div>
        <div style="width: 20%">修改日期</div>
      </li>
      <li class="flexBox flexBetween flexAlign" v-for="(item,index) in tableData" :key="index">
        <div style="width: 60%" class="flexBox flexAlign name">
          <!-- <el-checkbox style="margin-right: 20px" @change="getValue(item)" v-model='check' :data_value = "'check' + index"></el-checkbox> -->
          <input type="checkbox" :checked = 'item.is_check' @click="itemCheck(item)" :disabled = 'item.isFile === 0'>
          <span @click="setting(item)" class="flexBox flexAlign">
            <i class="wenjianjiaIcon" v-if="item.isFile === 0"></i>
            <i class="tupianIcon" v-if="item.extension === 'png' || item.extension === 'jpg' || item.extension === 'gif' || item.extension === 'jpeg' || item.extension === 'JPG'"></i>
            <i class="txtIcon" v-else-if="item.extension === 'txt'"></i>
            <!-- <img :src="item.url + item.selfPath + item.name" alt="" style="width: 24px; height: 24px"> -->
            {{item.name}}
          </span>
        </div>
        <div style="width: 20%" v-if="item.size>=(1024*1024)">{{(item.size/1024/1024).toFixed(2)}}M</div>
        <div style="width: 20%" v-else>{{(item.size/1024).toFixed(2)}}K</div>
        <div style="width: 20%">{{item.time}}</div>
      </li>
    </ul>
    </div>
    <el-dialog
    center
    :visible.sync="showImg"
    width="50%">
    <img :src='bigImgUrl' alt="" style="width: 100%; max-height: 100%">
  </el-dialog>
  <iframe :src="baseUrl" frameborder="0" v-show="false"></iframe>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      baseUrl: this.$global.default.baseUrl,
      loading: true,
      showImg: false,
      allCheck: false,
      sourceList: [],
      bigImgUrl: '',
      statusValue: '',
      keyword: '',
      checkList: [],
      tableData: [],
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
      tabLength: 0,
      uploadImgList: []
    }
  },
  methods: {
    handleSelectionChange () {},
    getFileList (path) {
      this.allCheck = false
      this.checkList.forEach((item, index) => {
        item.is_check = 1
      })
      this.checkList = []
      let param = {
        path: path
      }
      this.$api.atlasFile(param).then(res => {
        // console.log(res.data)
        if (res.error_code === 0) {
          this.tableData = res.data
          this.loading = false
          this.tableData.forEach(item => {
            item.is_check = 0
          })
        }
      })
    },
    setting (item) {
      if (item.isFile === 0) {
        console.log(item.childPath)
        this.sourceList = item.childPath.split('/')
        console.log(this.sourceList)
        this.getFileList(item.childPath)
      } else if (item.extension === 'png' || item.extension === 'jpg' || item.extension === 'gif' || item.extension === 'jpeg' || item.extension === 'JPG') {
        this.bigImgUrl = item.url + item.selfPath + item.name
        this.showImg = true
      }
    },
    goSource (item, index) {
      this.sourceList = this.sourceList.slice(0, index + 1)
      this.getFileList(this.sourceList.join('/'))
    },
    goFirst () {
      this.sourceList = []
      this.getFileList()
    },
    checkAll () {
      this.allCheck = !this.allCheck
      if (this.allCheck) {
        this.tableData.forEach(item => {
          if (item.isFile !== 0) {
            this.checkList.push(item)
          }
        })
        this.tabLength = this.checkList.length
      } else {
        this.checkList = []
      }
      this.tableData.forEach(item => {
        if (item.isFile !== 0) {
          item.is_check = this.allCheck
        }
      })
      console.log(this.checkList)
    },
    itemCheck (item) {
      if (this.checkList.findIndex(obj => obj.sign === item.sign) > -1) {
        this.checkList.splice(this.checkList.indexOf(item), 1)
      } else {
        this.checkList.push(item)
      }
      if (this.checkList.length === this.tabLength && this.checkList.length !== 0) {
        this.allCheck = true
      } else {
        this.allCheck = false
      }
      // console.log(this.checkList)
    },
    // 快速建图集
    quickPost () {
      this.loading = true
      // return
      let promises = []
      this.checkList.forEach(item => {
        let formdata = new FormData()
        formdata.append('need_txt', 1)
        formdata.append('access_token', window.localStorage.getItem('accessToken'))
        formdata.append('url', item.url + item.childPath)
        formdata.append('name', item.name)
        promises.push(this.$api.uploadImg(formdata).then(res => {
          if (res.error_code === 0) {
            this.uploadImgList.push(res.data)
          }
        }))
      })
      console.log(promises, 'promises')
      Promise.all(promises).then(() => {
        var data = {
          type: 'atlas',
          imgList: this.uploadImgList
        }
        window.frames[0].postMessage(JSON.stringify(data), this.$global.default.baseUrl)
        setTimeout(() => {
          this.$router.push({
            path: '/quickPost'
          })
        }, 0)
      })
    }
  },
  mounted () {
    this.getFileList()
  }
}
</script>
<style lang='scss' scoped>
.quickdrafting{
  .pageName {
    color: rgba(166, 166, 166, 1);
    font-size: 14px;
    padding: 20px 0;
    font-size:14px;
    font-family:PingFangSC;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .draftingBox{
    background-color: #fff;
    min-height: 780px;
    padding: 24px;
    .top-left{
      font-size:12px;
      font-family:PingFangSC;
      font-weight:400;
      color:rgba(153,153,153,1);
      .tips{
        margin-left: 18px;
      }
    }
    .resource{
      margin-top: 20px;
      padding-bottom: 11px;
      border-bottom: 1px solid #eee;
      li{
        color: #A6A6A6;
        font-size:12px;
        font-family:PingFangSC;
        font-weight:400;
        cursor: pointer;
        &.active{
          color:#3E4851;
        }
        margin-left: 10px;
        &:first-child{
          margin-left: 0;
        }
        &:last-child{
          color:#3E4851;
        }
      }
    }
    .fileList{
      min-height: 500px;
      li{
        border-bottom: 1px solid #eee;
        color: #3e4851;
        font-size: 14px;
        height: 50px;
        &.title{
          color: #666;
        }
        .name{
          cursor: pointer;
        }
      }
      input{
        width: 14px!important;
        height: 14px;
        border-radius: 2px;
        cursor: pointer;
        margin-right: 10px;
      }
    }
  }
  /deep/{
    .el-dialog{
      min-height: 500px;
    }
      .el-dialog__body{
        display: flex;
        justify-content: center;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
}
</style>
