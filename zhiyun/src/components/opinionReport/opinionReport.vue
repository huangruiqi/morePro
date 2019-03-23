<template>
  <div class="opinion-report">
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <ul>
        <!-- <li style="height: 1000px"></li> -->
        <li class="report-list" v-for="item in reportLists" :key="item.id">
          <p class="report-title">{{item.reportname}}</p>
          <p class="report-time">2018-1-23</p>
          <span class="view">查看</span>
          <img class="report-img" src="../../assets/images/report-next.png" alt="" @click="view(item.id,item.reportname)">
        </li>
      </ul>
      ...
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import { Group, Cell } from 'vux'
// import axios from 'axios'
import infiniteScroll from 'vue-infinite-scroll'
export default {
  name: 'userInformation',
  data () {
    return {
      reportLists: [],
      busy: false,
      page: 0,
      pageSize: 10
    }
  },
  async mounted () {
    // 登录
    await fetch('http://web.is8.com.cn:8031/om/common/login/loginDo?action=login2&username=gzwxb&password=gzwxb')
    // fetch(url, {
    //   credentials: 'include'
    // }).then(res => {
    //   res.json().then(data => {
    //     this.reportLists = data
    //   })
    // })
  },
  components: {
    Group,
    Cell
  },
  methods: {
    _parseJSON (response) {
      return response.text().then(function(text) {
        return text ? JSON.parse(text) : []
      })
    },
    async view (reporttempid, reportname) {
      await fetch("http://web.is8.com.cn/om/mpart/exp/PreviewAction?action=previewWorkApp&reportid=" + reporttempid + "&reportname=" + reportname, {
      credentials: 'include'
      }).then(res => {
        res.json().then(data => {
          console.log(data)
          window.location = 'http://web.is8.com.cn/om' + data.downloadUrl
        })
      })
    },
    // ' + this.pageSize + '&page=' + this.page
    async reportList (flag) {
      await fetch('http://web.is8.com.cn/om/mpart/oWork/oWorkDo?action=reportList&pagesize=' + this.pageSize + '&page=' + this.page, {
        credentials: 'include'
      }).then(this._parseJSON).then(res => {
        if (!res.length) return

        if (flag) {
          // 多次加载数据
          this.reportLists = this.reportLists.concat(res)
          // console.log(this.reportLists.length)
          if (!res.length) {
            this.busy = true
          } else {
            this.busy = false
          }
        } else {
          // 第一次加载数据
          this.reportLists = res
          // 当第一次加载数据完之后，把这个滚动到底部的函数触发打开
          this.busy = false
        }
      })
    },
    loadMore () {
      this.busy = true
      // 多次加载数据
      setTimeout(() => {
        this.page++
        this.reportList(true)
      }, 1000)
    }
  },
  directives: {
    infiniteScroll
  }
}
</script>

<style lang="less" scoped>
.opinion-report {
  width:100%;
  height:35.5rem;
  background-color: #efefef;
  .report-list {
    position: relative;
    top:1.1875rem;
    margin-bottom: 0.8125rem;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    list-style: none;
    background-color: #fff;
  }
  .report-title {
    display: inline-block;
    position: relative;
    left:4.5rem;
    top:0.625rem;
    font-size:0.875rem;
    color: #585858;
  }
.report-time {
    position: relative;
    left:4.5rem;
    top:0.5625rem;
    padding-bottom: 0.75rem;
    font-size: 0.6875rem;
    color: #c6c6c6;
  }
  .view {
    position: absolute;
    top:1.0625rem;
    right:3.25rem;
    z-index:2;
    font-size: 0.75rem;
    color:#d4d4d4;
  }
  .report-img {
    position: absolute;
    top: 1.0625rem;
    right: 1.3125rem;
    z-index:2;
    width: 0.625rem;
    height: 0.9375rem;
  }
}
</style>
