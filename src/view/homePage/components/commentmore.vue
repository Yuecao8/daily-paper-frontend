<template>
  <div class="getMore">
    <div class="pageName flexBox flexBetween">
      <p>
        <router-link to="/workbench">工作台 /</router-link>
        <span class="current">评论列表</span>
      </p>
      <!-- <el-button type="primary" size="small">导出</el-button> -->
    </div>
    <div class="getMoreBox flexBox flexBetween">
      <div class="articleBox">
        <!-- <div class="searchBox">
          <el-input
            size="mini"
            placeholder="输入关键字搜索稿件…"
            suffix-icon="searchIcon"
            v-model="searchValue">
          </el-input>
        </div>-->
        <infinite-hierarchy @columnChange="handleColumnChange"></infinite-hierarchy>
      </div>
      <div class="commentBox">
        <div class="commentTop flexBox flexAlign flexBetween">
          <el-select
            v-model="columnValue"
            @change="changeStatus"
            placeholder="全部状态"
            size="small"
            style="width: 100px;"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input
            class="commentSearch"
            size="small"
            placeholder="输入关键字搜索稿件…"
            suffix-icon="searchIcon"
            v-model="searchValue"
            @keyup.enter.native="$event.target.blur"
            @blur="handleKeyword"
          ></el-input>
        </div>
        <ul class="commentList" v-loading="loading">
          <li class="title flexBox flexBetween">
            <div style="width: 30%">{{`评论内容(${commentTotal}条)`}}</div>
            <div style="width: 25%">评论对象</div>
            <!-- <div style="width: 25%">栏目</div> -->
            <div style="width: 10%">状态</div>
            <div style="width: 25%">时间</div>
            <div style="width: 10%">操作</div>
          </li>
          <!-- 循环从这里开始  -->
          <li
            class="flexBox flexBetween flexAlign"
            v-for="(item,index) in commentList"
            :key="index"
          >
            <!-- <el-checkbox
              style="width: 28px;padding-left: 10px"
              :checked="item.isChecked"
              @change="itemCheck(item)"
            ></el-checkbox>-->
            <input
              type="checkbox"
              style="width: 28px;padding-left: 10px"
              v-model="item.isChecked"
              @click="itemCheck(item)"
            />
            <div style="width: 30%" class="commentContent flexBox flexLeft flexAlign">
              <div class="userLogo flexBox">
                <img src="../../../assets/image/avatar@2x.png" alt />
              </div>
              <div class="userInfo">
                <div>{{item.member.member_name}}</div>
                <div class="content" style="line-height: 16px">{{item.content}}</div>
                <div v-if="item.replies.length">
                  {{item.replies.length}} 回复
                  <el-popover
                    popper-class="commentBox"
                    placement="bottom-start"
                    width="340"
                    trigger="click"
                  >
                    <ul class>
                      <li
                        class="flexBox flexBetween"
                        v-for="(item,index1) in item.replies"
                        :key="index1"
                      >
                        <div class="userLogo flexBox">
                          <img src="../../../assets/image/avatar@2x.png" alt />
                        </div>
                        <div class="commentInfo">
                          <div class="content">
                            <span class="name">{{item.user.username}}</span>
                            <span class="replay">回复:</span>
                            {{item.content}}
                          </div>
                          <div class="commentBottom flexBox flexBetween flexAlign">
                            <span>{{item.updated_at}}</span>
                            <i class="deletIcon" @click="deleteComment(item.id)"></i>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <i class="huifuIcon" slot="reference"></i>
                  </el-popover>
                </div>
              </div>
            </div>
            <div style="flex:1">{{item.title}}</div>
            <div style="width: 10%" class="status">
              <!-- 默认 待审核 -->
              <span v-if="item.status === 0">待审核</span>
              <span v-if="item.status === 1">已审核</span>
              <span v-if="item.status === 2" class="statusIcon yidahui"></span>
              <span v-if="item.status === 2">已打回</span>
            </div>
            <div style="width: 25%">{{item.updated_at}}</div>
            <div style="width: 10%">
              <el-dropdown>
                <i class="el-icon-arrow-down el-icon-more"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="passComment(item.id)">审核</el-dropdown-item>
                  <el-dropdown-item @click.native="banComment(item.id)">打回</el-dropdown-item>
                  <el-dropdown-item @click.native="deleteComment(item.id)">删除</el-dropdown-item>
                  <el-dropdown-item @click.native="openReplyBox(item)">回复</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </li>
          <ul class="hoge-error new-comment" v-if="!commentList.length" style="height:500px">
            <div>
              <div class="nodata-img"></div>
              <p>暂无内容</p>
            </div>
          </ul>
        </ul>
        <div class="commentBottom flexBox flexBetween flexAlign">
          <div class="left">
            <!-- <el-checkbox
              style="width: 28px;padding-left: 10px;padding-right: 68px"
              :checked="allCheck"
              @change="checkAll"
            >全选</el-checkbox>-->
            <input
              type="checkbox"
              style="width: 28px;padding-left: 10px;padding-right: 68px"
              v-model="allCheck"
              @click="checkAll"
            />
            <el-button class="shenhe" @click="passComment('multiple')">审核</el-button>
            <el-button class="dahui" @click="banComment('multiple')">打回</el-button>
            <el-button class="shanchu" @click="deleteComment('multiple')">删除</el-button>
          </div>
          <el-pagination
            hide-on-single-page
            background
            layout="prev, pager, next"
            :total="commentTotal"
            @current-change="handleCurrentPage"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- :before-close="handleClose" 在关闭弹窗前的操作 -->
    <el-dialog title="回复评论" :visible.sync="dialogVisible" width="30%">
      <el-input type="textarea" :rows="9" placeholder="回复:" v-model="textarea" resize="none"></el-input>
      <span slot="footer" class="dialog-footer flexBox flexCenter">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="replyComment">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import infiniteHierarchy from '../../../components/common/infiniteHierarchy'
export default {
  name: '',
  components: {
    infiniteHierarchy
  },
  data () {
    return {
      loading: true,
      commentList: [],
      checkList: [],
      commentTotal: 0,
      currentPage: 1,
      currentColumnId: '',
      currentStatus: '',
      replyId: '',
      searchValue: '',
      columnValue: '',
      dialogVisible: false,
      textarea: '',
      allCheck: false,
      options: [
        {
          value: '',
          label: '全部状态'
        },
        {
          value: 0,
          label: '待审核'
        },
        {
          value: 1,
          label: '已审核'
        },
        {
          value: 2,
          label: '已打回'
        }
      ]
    }
  },
  // props: ['title'],
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 栏目列表变动
    handleColumnChange (data) {
      this.currentPage = 1
      this.currentColumnId = data
      this.getCommentList()
    },
    // 获取评论列表
    getCommentList () {
      this.loading = true
      this.checkList = []
      this.commentList = []
      let param = {
        site_id: 1,
        page: this.currentPage,
        per_num: 10,
        status: this.currentStatus,
        content: this.searchValue,
        column_id: this.currentColumnId
      }
      this.$api.getComment(param).then(res => {
        this.commentTotal = res.data.total
        this.commentList = res.data.data
        this.commentList.forEach(ele => {
          ele.isChecked = false
        })
        this.loading = false
      })
    },
    // 处理分页
    handleCurrentPage (val) {
      this.checkList = []
      this.currentPage = val
      this.getCommentList()
    },
    // 状态变化
    changeStatus (val) {
      if (val !== this.currentStatus) {
        this.currentPage = 1
        this.currentStatus = val
        this.getCommentList()
      }
    },
    // 关键词变化
    handleKeyword () {
      this.currentPage = 1
      this.getCommentList()
    },
    // 审核评论
    passComment (id) {
      const param = {
        status: 1,
        site_id: 0
      }
      if (id === 'multiple') {
        id = this.checkList.join(',')
      }
      this.$api.banComment(id, param).then(res => {
        if (res.data.status === 1) {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.getCommentList()
        }
      })
    },
    // 打回评论
    banComment (id) {
      const param = {
        status: 2,
        site_id: 0
      }
      if (id === 'multiple') {
        id = this.checkList.join(',')
      }
      this.$api.banComment(id, param).then(res => {
        if (res.data.status === 2) {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          this.getCommentList()
        }
      })
    },
    // 删除评论
    deleteComment (id) {
      this.$confirm('您确定删除选中数据?', '提醒', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const param = {
            site_id: 1,
            access_token: this.$global.default.getToken()
          }
          if (id === 'multiple') {
            id = this.checkList.join(',')
          }
          this.$api.delComment(id, param).then(res => {
            if (res.data.ids) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getCommentList()
            }
          })
        })
        .catch(() => {})
    },
    // 回复评论
    replyComment (id) {
      const param = {
        access_token: this.$global.default.getToken(),
        reply_id: this.replyId,
        content: this.textarea,
        site_id: 0
      }
      this.$api.replyComment(param).then(res => {
        if (res.data === 'success') {
          this.$message({
            type: 'success',
            message: '回复评论成功!'
          })
          this.dialogVisible = false
          this.getCommentList()
        }
      })
    },
    // 打开评论回复框
    openReplyBox (item) {
      this.dialogVisible = true
      this.replyId = item.id
    },
    // 切换单个选中
    itemCheck (item) {
      item.isChecked = !item.isChecked
      if (this.checkList.findIndex(obj => obj === item.id) > -1) {
        this.checkList.splice(this.checkList.indexOf(item.id), 1)
      } else {
        this.checkList.push(item.id)
      }
      if (this.checkList.length === this.commentList.length) {
        this.allCheck = true
      } else {
        this.allCheck = false
      }
      // console.log(this.checkList);
    },
    // 切换全选
    checkAll () {
      this.allCheck = !this.allCheck
      if (this.allCheck) {
        this.commentList.forEach(item => {
          if (!item.isChecked) {
            item.isChecked = true
            this.checkList.push(item.id)
          }
        })
      } else {
        this.checkList = []
        this.commentList.forEach(item => {
          if (item.isChecked) {
            item.isChecked = false
          }
        })
      }
      // console.log(this.checkList);
    }
  },
  created () {
    this.getCommentList()
  },
  mounted () {}
}
</script>
<style lang='scss' scoped>
.getMore {
  // margin-right: 30px;
  .pageName {
    color: rgba(166, 166, 166, 1);
    font-size: 14px;
    padding: 20px 0;
    a {
      color: rgba(166, 166, 166, 1);
      font-size: 14px;
    }
    .current {
      margin-left: 10px;
      color: rgba(102, 102, 102, 1);
    }
  }
  .getMoreBox {
    background-color: #fff;
    min-height: 780px;
    .articleBox {
      width: 200px;
      border-right: 1px solid #eeeeee;
      .header-box {
        width: 200px;
        padding: 0 16px;
        height: 66px;
        line-height: 66px;
        border-bottom: none;
        div {
          color: rgba(102, 102, 102, 1);
          font-size: 12px;
        }
      }
      .searchBox {
        padding: 15px;
        /deep/ {
          .el-input__suffix {
            right: unset;
            left: 5px;
            top: 7px;
          }
          .el-input--suffix .el-input__inner {
            padding-left: 22px;
            padding-right: unset;
            border: none;
          }
        }
      }
      .articleList {
        padding: 24px;
        font-size: 14px;
        font-family: PingFangSC;
      }
    }
    .commentBox {
      width: 100%;
      padding: 0 24px;
      .commentTop {
        height: 66px;
        /deep/ {
          .el-input.commentSearch {
            width: 200px;
            .el-input__suffix {
              top: 10px;
            }
          }
        }
      }
      .commentList {
        min-width: 954px;
        li {
          height: 77px;
          border-bottom: 1px solid #eee;
          font-size: 14px;
          color: rgba(153, 153, 153, 1);
          padding-right: 24px;
          .commentContent {
            .userLogo {
              width: 36px;
              height: 36px;
              overflow: hidden;
              background-color: #000;
              border-radius: 50%;
              margin-right: 10px;
              img {
                width: 100%;
                max-height: 100%;
              }
            }
            .userInfo {
              width: 65%;
              line-height: 16px;
              .name {
                color: rgba(153, 153, 153, 1);
                line-height: 16px;
              }
              .content {
                color: rgba(51, 51, 51, 1);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
          .status {
            .statusIcon {
              display: inline-block;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: rgba(251, 146, 42, 1);
              margin-right: 5px;
              &.yishenghe {
                background: rgba(77, 218, 186, 1);
              }
              &.yidahui {
                background: rgba(244, 111, 111, 1);
              }
            }
          }
          &.title {
            height: 50px;
            line-height: 50px;
            font-weight: 500;
            color: rgba(79, 79, 79, 1);
            font-size: 14px;
            background: rgba(248, 248, 248, 1);
            padding: 0 24px 0 38px;
            &:hover {
              background: rgba(248, 248, 248, 1);
            }
          }
          &:hover {
            background: rgba(248, 251, 255, 1);
          }
        }
      }
      .commentBottom {
        margin-top: 30px;
        padding-bottom: 20px;
        /deep/ {
          .el-button {
            width: 68px;
            height: 30px;
            padding: unset;
            font-size: 14px;
            font-family: PingFangSC;
            font-weight: 400;
          }
        }
      }
    }
    /deep/ {
      .el-pagination {
        // position: absolute;
        right: 24px;
        font-weight: 400;
        color: rgba(166, 166, 166, 1);
        .btn-prev,
        .btn-next {
          border: 1px solid rgba(226, 226, 226, 1);
          border-radius: 4px 6px 6px 6px;
          background: unset;
          width: 32px;
          height: 32px;
          line-height: 32px;
        }
        .el-pager li {
          border: 1px solid rgba(226, 226, 226, 1);
          border-radius: 4px 6px 6px 6px;
          background: unset;
          width: 32px;
          height: 32px;
          line-height: 32px;
          &.active {
            background: rgba(56, 167, 255, 1);
            color: #fff;
          }
        }
      }
    }
  }
  /deep/ {
    .el-dialog__wrapper {
      .el-dialog__header {
        font-size: 16px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        border-bottom: 1px solid #eeeeee;
      }
      .el-dialog__body {
        padding: 40px;
      }
      .el-dialog__footer {
        .el-button {
          width: 68px;
          height: 30px;
          padding: unset;
          font-size: 14px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(56, 167, 255, 1);
          &.el-button--default {
            color: #38a7ff;
            border: 1px solid rgba(56, 167, 255, 1);
          }
          &.el-button--primary {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
