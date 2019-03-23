<template>
  <div id="opinionWeibo">
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

    <div class="echarts">
      <IEcharts :option="line" :loading="loading" @ready="onReady" @click="onClick"></IEcharts>
    </div>

    <group class="opinion-weibo-con" v-for="(doc, index) in weiboList" :key="index">
      <cell
        :title="doc.title"
        :border-intent="false"
        is-link
        :arrow-direction="doc.show ? 'up' : 'down'"
        @click.native="doc.show = !doc.show"
      >
        <img slot="icon" width="15" src="../../assets/llp/icon-details-grey.png" class="icon">
      </cell>
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
import HeaderFilter from './headerFilter'
import './negative.less'

import IEcharts from 'vue-echarts-v3/src/lite.js'
import 'echarts/lib/chart/line'

//
const url = 'http://web.is8.com.cn/om/mpart/docList/DocSearchDo?action=docList&carry=%E5%BE%AE%E5%8D%9A'

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
        url: '/weibo'
      }, {
        name: '倾向',
        url: '/weibo'
      }, {
        name: '微博',
        url: '/weibo'
      }, {
        name: '其他',
        url: '/weibo'
      }],

      loading: true,
      line: {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['01', '02', '03', '04', '05', '06', '07']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true
        }, {
          data: [720, 682, 901, 734, 990, 1130, 920],
          type: 'line',
          smooth: true
        }, {
          data: [820, 982, 801, 734, 990, 1130, 920],
          type: 'line',
          smooth: true
        }]
      }
    }
  },
  methods: {
    onReady (instance) {
      this.loading = false
      // console.log(instance)
    },
    onClick (event, instance, echarts) {
      // console.log(arguments)
    }
  },
  async mounted () {
    await fetch('http://web.is8.com.cn:8031/om/common/login/loginDo?action=login2&username=gzwxb&password=gzwxb')

    fetch(url, {
      credentials: 'include'
    }).then(res => {
      // console.log(res)
      res.json().then(body => {
        let docList = body.docList
        docList.forEach(val => {
          val.show = false
        })
        this.weiboList = docList
      }).catch(err => {
        console.error('parse json error: ', err)
      })
    }).catch(err => {
      console.error('fetch data error: ', err)
    })
  },
  components: {
    Group,
    Cell,
    Flexbox,
    FlexboxItem,
    TabItem,
    Tab,
    IEcharts,
    HeaderFilter
  }
}
</script>

<style lang="less">
#opinionWeibo {
  .weui-cell_access .weui-cell__ft:after {
    border: none;
    border-top: 10px solid #7a7a7a;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid transparent;
    width: 0;
    height: 0;
    transform: rotate(180deg);
    right: -10px;
    top: 45px;
  }
  .weui-cell_access .weui-cell__ft.vux-cell-arrow-down:after {
    transform: rotate(0deg);
  }
  .vux-tab .vux-tab-item.vux-tab-selected {
    &:after {
      content: '';
      display: block;
      position: relative;
      top: -20px;
      left: 40px;
      z-index: 1000;
      border-top: 10px solid transparent;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid #fff;
      width: 0;
      height: 0;
    }
  }
  p {
    margin: 0;
  }
  .opinion-weibo-con {
    margin: 0 auto;
    width: 702/2px;
    border-radius: 10px;
  }
  .icon {
    padding-right: 7px;
  }
  .weibo-intro {
    padding-bottom: 10px;
    padding-left: 20px;
  }
  .source {
    color: #f20000;
    font-size: 8px;
  }
  .pubdate {
    font-size: 8px;
    color: #6f6f6f;
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
</style>
