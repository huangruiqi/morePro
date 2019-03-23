<template>
  <div class="situation">
    <tab>
      <tab-item selected @on-item-click="onItemClick">预警</tab-item>
      <tab-item @on-item-click="onItemClick">负面</tab-item>
      <tab-item @on-item-click="onItemClick">最新舆情</tab-item>
    </tab>
    <div v-transfer-dom>
      <loading :show="showLoading" text="正在加载..."></loading>
    </div>
    <div class="list-wrapper">
      <ul class="list">
        <li v-if="!!docList" v-for="(item) in docList" :key="item.sid" class="list-item">
          <h2 class="title" @click="goToDetail(item.sid)">{{item.title}}</h2>
          <div class="info">
            <div class="info-left">
              <span class="type" :style="typeBackgound(item.negative)">{{types[item.negative+1]}}</span>
              <span class="carray">{{item.carry}}</span>
              <span class="time">{{item.pubdate}}</span>
            </div>
            <div class="info-right">
              <img src="http://owd9ip8d2.bkt.clouddn.com/triangle-bottom.png" alt="开" height="10" @click="toggleSummary">
            </div>
          </div>
          <div class="summary" style="display: none;">{{item.summary}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Tab, TabItem, Loading, TransferDomDirective as TransferDom } from 'vux'
import request from '@/utils/request'
export default {
  name: 'opinionSituation',
  data () {
    return {
      showIndex: 0,
      showLoading: false,
      docList: [],
      types: ['正面', '中性', '负面', '预警']
    }
  },
  created () {
    request('http://web.is8.com.cn:8031/om/webpart/main/DocSearchDo?action=docList&neg=2').then(res => {
      if (!!res.data && res.data.code === 1) {
        this.docList = res.data.docList
      }
    })
  },
  methods: {
    typeBackgound (type) {
      if (type === -1) {
        return {backgroundColor: 'rgb(0, 122, 255)'}
      } else if (type === 0) {
        return {backgroundColor: 'rgb(0, 140, 33)'}
      } else if (type === 1) {
        return {backgroundColor: 'rgb(233, 0, 0)'}
      } else {
        return {backgroundColor: 'rgb(255, 210, 0)'}
      }
    },
    onItemClick (index) {
      this.showLoading = true
      if (index === 0) {
        request('http://web.is8.com.cn:8031/om/webpart/main/DocSearchDo?action=docList&neg=2').then(res => {
          if (!!res.data && res.data.code === 1) {
            this.docList = res.data.docList
            this.showLoading = false
          }
        })
      }
      if (index === 1) {
        request('http://web.is8.com.cn:8031/om/webpart/main/DocSearchDo?action=docList&neg=1').then(res => {
          if (!!res.data && res.data.code === 1) {
            this.docList = res.data.docList
            this.showLoading = false
          }
        })
      }
      if (index === 2) {
        request('http://web.is8.com.cn:8031/om/webpart/main/DocSearchDo?action=docList').then(res => {
          if (!!res.data && res.data.code === 1) {
            this.docList = res.data.docList
            this.showLoading = false
          }
        })
      }
    },
    toggleSummary (event) {
      const summaryNode = event.target.parentNode.parentNode.nextElementSibling
      if (summaryNode.style.display === 'none') {
        summaryNode.style.display = 'block'
      } else {
        summaryNode.style.display = 'none'
      }
    },
    goToDetail (sid) {
      if (sid) {
        this.$router.push(`/detail?sid=${sid}`)
      }
    }
  },
  computed: {
  },
  components: {
    Tab,
    TabItem,
    Loading
  },
  directives: {
    TransferDom
  }
}
</script>

<style scoped lang="less">
.situation {
  .list-wrapper {
     padding: 10px 20px;
    .list {
      list-style: none;
      .list-item {
        border-bottom: 1px solid #cccccc;
        margin-top: 18px;
        .title {
          font-size: 16px;
        }
        .info {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          .info-left {
            .type {
              color: #ffffff;
              border-radius: 2px;
            }
            .carray {
              margin-left: 10px;
              color: red;
            }
            .time {
              margin-left: 10px;
              color: #999999;
            }
          }
        }
      }
    }
  }
}
</style>
