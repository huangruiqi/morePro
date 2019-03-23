<template>
  <div id="opinionMaterial">
    <div>
      <header-filter></header-filter>
    </div>
    <group class="opinion-weibo-con" v-for="(doc, index) in materialList" :key="index">
      <p>
        <img slot="icon" width="15" :src="doc.imgurl" class="icon">
        <span id="cellTitle"><cell
        :title="doc.title"
        :border-intent="false"
        is-link
        :arrow-direction="doc.show ? 'up' : 'down'"
        @click.native="doc.show = !doc.show"
      > 
      </cell></span> 
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
        aaaa
        {{ doc.summary }}
      </p>
    </group>
    
  </div>
</template>

<script type="text/ecmascript-6">
import { Cell, Flexbox, Group, FlexboxItem, Tab, TabItem } from 'vux'
import HeaderFilter from './head'
import './../opinionWeibo/negative.less'
import {mapState} from 'vuex'
// 获取素材地址
// const url = 'http://web.is8.com.cn/om/mpart/oWork/reportDo?action=getResourceByUserId&model=1'
export default {
  name: 'opinionMaterial',
  data () {
    return {
      negative: {
        '-1': '正面',
        '0': '中性',
        '1': '负面',
        '2': '预警'
      },
      list: [{
        name: '时间',
        url: '/material'
      }, {
        name: '倾向',
        url: '/material'
      }, {
        name: '来源',
        url: '/material'
      }, {
        name: '其他',
        url: '/material'
      }]
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
    // 登录
    await fetch('http://web.is8.com.cn:8031/om/common/login/loginDo?action=login2&username=gzwxb&password=gzwxb')
    this.$store.commit('SET_HEAD_M', {
    datetag: 'all',
    neg: 'all',
    carry: '全部',
    similer: '1',
    order: 'timedown'
  })
  },
  computed: {
    ...mapState(["materialList"])
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
#opinionMaterial {
  position: relative;
  background-color: #fff;
  .opinion-weibo-con {
    margin: 0 auto;
    width: 702/2px;
  }
  .icon {
    padding-right: 7px;
    position: absolute;;
    top:14px;
    left:20px;
  }
  .weibo-intro {
    padding-top: -10px;
    margin-left: 20px;
    // border-bottom: 1px solid #d7d7d7;
  }
  .source {
    color: #f20000;
    font-size: 8px;
  }
  .pubdate {
    font-size: 8px;
    color: #6f6f6f;
  }
  .tab {
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
  border-top: 0.5px solid #d7d7d7;
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
