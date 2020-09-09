/* 无限层级 */
<template>
  <div class='infinite'>
    <div class='header-box flexBox flexBetween'>
      <p v-if='fartherId == 0' @click='selectAll'>全部稿件</p>
      <p v-else @click='goFirst()' class='goBack'>返回上一层</p>
    </div>
    <ul class='infiniteList'>
      <li v-for='(item, index) in resourceList' :key='index' class='flexBox flexBetween flexAlign' :class="{'active':index === selected}" @click='changeIndex(index,item.id)'>
        <span>{{item.name}}</span>
        <i v-if='item.is_last == 0' class='el-icon-arrow-right' @click='goChild(item.id)'></i>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      fartherId: 0,
      resourceList: [],
      selected: ''
      // resourceList: [
      //   { name: '地区分类', num: '120', id: 2, fid: 0, is_last: 1 },
      //   { name: '部门分类', num: '120', id: 3, fid: 0, is_last: 1 },
      //   { name: '其他分类', num: '120', id: 4, fid: 0, is_last: 1 }
      // ]
    }
  },
  methods: {
    getColumnList () {
      this.$api.getColumnList().then(res => {
        if (res.data.length) {
          res.data.forEach(element => {
            this.resourceList.push({
              name: element.name,
              id: element.id,
              fid: 0,
              is_last: 1
            })
          })
        }
      })
    },
    changeIndex (index, id) {
      this.selected = index
      this.$emit('columnChange', id)
    },
    selectAll () {
      this.selected = ''
      this.$emit('columnChange', '')
    },
    goChild (id) {
      // let param = {
      //   fid: id
      // }
      // this.$api.sortList(param).then((res) => {
      //   console.log(res)
      // })
      if (id === 1) {
        console.log(222)
        this.resourceList = [
          { name: '核问题1', num: '3' },
          { name: '核问题2', num: '3' },
          { name: '核问题3', num: '3' },
          { name: '核问题4', num: '3' }
        ]
      }
      this.fartherId = id
    },
    goFirst () {
      if (this.fartherId === 1) {
        this.resourceList = [
          { name: '内容分类', num: '1', id: 1, fid: 0, is_last: 0 },
          { name: '地区分类', num: '120', id: 2, fid: 0, is_last: 0 },
          { name: '部门分类', num: '120', id: 3, fid: 0, is_last: 1 },
          { name: '其他分类', num: '120', id: 4, fid: 0, is_last: 1 }
        ]
      }
      this.fartherId = 0
    }
  },
  created () {
    this.getColumnList()
  }
}
</script>
<style lang='scss' scoped>
.header-box {
  cursor: pointer;
  .goBack {
    cursor: pointer;
  }
}
ul {
  padding: 24px;
  font-size: 14px;
  font-family: PingFangSC;
}
li {
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin-bottom: 24px;
  line-height: 20px;
  cursor: pointer;
  &.title {
    font-weight: 500;
  }
  &.active {
    color: rgba(56, 167, 255, 1);
  }
  .el-icon-arrow-right {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
