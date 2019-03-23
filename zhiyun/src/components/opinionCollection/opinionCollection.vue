<template>
  <div id="opinionCollection">
    <div>
      <header-filter></header-filter>
       <!-- <tab :line-width=2 active-color='#fff' class="tab">
        <tab-item
          class="vux-center"
          :selected="0 === index"
          v-for="(item, index) in list"
          :key="index"
        >
          <router-link :to="{path: item.url}" class="tab-list">
            {{ item.name }}
          </router-link>
        </tab-item>
      </tab> -->
    </div>

    <!-- <div class="echarts">
      <IEcharts :option="line" :loading="loading" @ready="onReady" @click="onClick"></IEcharts>
    </div> -->

    <group class="opinion-weibo-con" v-for="(doc, index) in weiboList" :key="index">
      <p>
        <img slot="icon" width="15" :src="doc.imgurl" class="icon">
          <span id="cellTitle">
            <cell
              :title="doc.title"
              :border-intent="false"
              is-link
              :arrow-direction="doc.show ? 'up' : 'down'"
              @click.native="doc.show = !doc.show"> 
            </cell>
        </span> 
      </p>
      <flexbox class="weibo-intro">
        <flexbox-item :span="1/10" class="negative" :class="`negative${doc.negative}`">
          {{ negative[doc.negative] }}
        </flexbox-item>
        <flexbox-item :span="2/10" class="source">
          新浪微博
        </flexbox-item>
        <flexbox-item :span="2/5" class="pubdate">
          {{ doc.pubdate }}
        </flexbox-item>
      </flexbox>
      <p class="slide" :class="doc.show ? 'animate' : ''">
        {{ doc.summary }}
      </p>
    </group>
  </div>
</template>

<script type="text/ecmascript-6">
import { Cell, Flexbox, Group, FlexboxItem, Tab, TabItem } from 'vux'
import HeaderFilter from '../opinionWeibo/headerFilter'
import './../opinionWeibo/negative.less'
// import IEcharts from 'vue-echarts-v3/src/lite.js'
// import 'echarts/lib/chart/line'

// 获取收藏地址
const url = 'http://web.is8.com.cn/om/mpart/oWork/reportDo?action=getResourceByUserId&model=1'
export default {
  name: 'opinionWeibo',
  data () {
    return {
      weiboList: [],
      negative: {
        '-1': '正面',
        '0': '中性',
        '1': '负面',
        '2': '预警'
      },
      list: [{
        name: '时间',
        url: '/collection'
      }, {
        name: '倾向',
        url: '/collection'
      }, {
        name: '来源',
        url: '/collection'
      }, {
        name: '其他',
        url: '/collection'
      }]
    }
  },
  methods: {
  },
  async mounted () {
    // 登录
    await fetch('http://web.is8.com.cn:8031/om/common/login/loginDo?action=login2&username=gzwxb&password=gzwxb')
    fetch(url, {
      credentials: 'include'
    }).then(res => {
      res.json().then(body => {
        let docList = body.docList
        docList.forEach(val => {
          val.show = false
          if (val.carry === '微博') {
            val.imgurl = require('../../assets/llp/icon-details-grey.png')
          }else if(val.carry === '论坛') {
            val.imgurl = require('../../assets/llp/icon-details-grey.png')
          }else if(val.carry === 'APP'){
            val.imgurl = require('../../assets/llp/icon-details-grey.png')
          }else if(val.carry === '新闻'){
            val.imgurl = require('../../assets/llp/icon-details-grey.png')
          }
        })
        this.weiboList = docList
      })
    })
  },
  components: {
    Group,
    Cell,
    Flexbox,
    FlexboxItem,
    TabItem,
    Tab,
    HeaderFilter
  }
}
</script>

<style lang="less" scoped>
#opinionCollection {
  .opinion-weibo-con {
    margin: 0 auto;
    width: 702/2px;
  }
  .icon {
    padding-right: 7px;
    position: absolute;;
    top:10px;
    left:20px;
  }
  .weibo-intro {
    padding-bottom: 10px;
    margin-left: 20px;
  }
  .source {
    color: #f20000;
    font-size: 8px;
  }
  .pubdate {
    font-size: 8px;
    color: #6f6f6f;
  }
  .tab  {
    background-color: #3e4464;
    &-list {
      color: #7f8395;
    }
  }
  .vux-tab-selected a {
    color: #fff;
  }
  .echarts {
    width: 100%;
    height: 260px;
  }
}
.slide {
  font-size: 7px;
  text-indent: 24px;
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
#cellTitle{
  text-indent: 38px;
  font-size: 11px;
  line-height: 18px;
}
</style>
