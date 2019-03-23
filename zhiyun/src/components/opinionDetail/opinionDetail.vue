<template>
  <div class="opinion-detail">
    <header class="header">
      <span class="type" :style="typeBackgound(detail.negative)">{{detail.negative}}</span>
      <h2 class="title">{{detail.title}}</h2>
    </header>
    <section class="info">
      <span class="carry">{{detail.carry}}</span>
      <span class="author" v-if="detail.author">{{detail.author}}</span>
      <span class="time">{{detail.pubdate}}</span>
    </section>
    <section class="content">
      {{detail.content}}
    </section>
    <section class="keywords">
      <span class="name">关键词：</span>
      <div class="keyword-wrapper">
        <span class="keyword"
          v-if="detail.keyword && detail.keyword.length>0"
          v-for="(item,index) in detail.keyword"
          :key="index">
          {{item}}
        </span>
      </div>
    </section>
    <section class="reference" v-if="detail.similerInfo && detail.similerInfo.similerCount > 0">
      <span class="name">涉及专题：</span>
      <ul class="reference-list">
        <li class="reference-item" v-for="item in detail.similerInfo.similerDocList" :key="item.sid">
          <a :href="'#/detail?sid=233'">{{item.title}}</a>
        </li>
      </ul>
    </section>
    <section class="source">
      <span class="name">原文链接：</span>
      <a :href="detail.url">点击此链接查看原文！</a>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import request from '@/utils/request'
import { mapState } from 'vuex'

export default {
  name: 'opinionDetail',
  data() {
    return {
      detail: {}
    }
  },
  created () {
    const url = 'http://web.is8.com.cn:8031/om/webpart/docDetail/docDetailDo?action=getDetail&sid='
    const sid = this.query.sid ? this.query.sid : '2fe53992-7527-40fb-a1bd-96333935dbc8'
    request(url+sid).then(res => {
      if (!!res.data && res.data.code === 1) {
        this.detail = res.data
      }
    })
  },
  methods: {
    typeBackgound (type) {
      if (type === '正面') {
        return {backgroundColor: 'rgb(0, 122, 255)'}
      } else if (type === '中性') {
        return {backgroundColor: 'rgb(0, 140, 33)'}
      } else if (type === '负面') {
        return {backgroundColor: 'rgb(233, 0, 0)'}
      } else {
        return {backgroundColor: 'rgb(255, 210, 0)'}
      }
    },
  },
  computed: {
    ...mapState({
      route: state => state.RouteModule,
      path: state => state.RouteModule.path,
      query: state => state.RouteModule.query
    })
  }
}
</script>

<style lang="less" scoped>
.opinion-detail {
  padding: 20px;
  .header {
    .type {
      color: #ffffff;
      border-radius: 2px;
      font-size: 14px;
    }
    .title {
      display: inline;
      margin-left: 16px;
      font-size: 16px;
    }
  }
  .info {
    border-bottom: 1px solid #999999;
    margin: 10px 0;
    span {
      margin-right: 14px;
    }
    .carry {
      color: rgb(233, 0, 0)
    }
  }
  .content {
    text-indent: 2em;
    word-break:break-all;
    border-bottom: 1px solid #999999;
    padding-bottom: 10px;
  }
  .keywords {
    display: flex;
    width: 100%;
    margin: 10px 0;
    .name {
      width: 80px;
      flex: 0 0 80px
    }
    .keyword-wrapper {
      flex: 1;
    }
  }
  .reference {
    display: flex;
     margin: 10px 0;
    ul, li {
      list-style: none;
    }
    .name {
      width: 100px;
      flex: 0 0 90px
    }
    .reference-list {
      flex: 1;
    }
  }
}
</style>
