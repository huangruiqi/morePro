<template>
  <div id="publicOpinion">
    <div class="item" v-for="(item, index) in topicNews" :key="index">
      <flexbox class="item-title">
        <flexbox-item :span="3.5">
          {{ item.source || '暂无' }}
        </flexbox-item>
        <flexbox-item>
          <div class="item-name">
            {{ item.title }}
          </div>
        </flexbox-item>
      </flexbox>
      <flexbox class="item-intro">
        <flexbox-item :span="4">
          <img width="16" src="../../assets/llp/icon-details.png">
          舆情详情
        </flexbox-item>
        <flexbox-item>
          <img width="16" src="../../assets/llp/icon-sheet.png">
          图表分析
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Flexbox, FlexboxItem } from 'vux'
// import request from '../../utils/request'

// 获取专题舆情信息地址
let url = 'http://web.is8.com.cn:8031/om/webpart/oTopic/TopicEchartDo?action=topicNews&topicid=75'

export default {
  name: 'opinionWeibo',
  data () {
    return {
      topicNews: []
    }
  },
  async mounted () {
    await fetch('http://web.is8.com.cn:8031/om/common/login/loginDo?action=login2&username=gzwxb&password=gzwxb')
    fetch(url, {
      credentials: 'include'
    }).then(res => {
      res.json().then(body => {
        this.topicNews = body.doclist
      })
    })
  },
  components: {
    Flexbox,
    FlexboxItem
  }
}
</script>

<style lang="less" scoped>
#publicOpinion {
  margin: 0 auto;
  height: 60px;
  width: 351px;
  font-family: 'PingFang SC Regular';
}
.item {
  margin-top: 15px;
  padding: 12px;
  border-top: 3px solid #2d324f;
  // border-radius: 5px;
  &-title {
    padding: 10px 0;
    font-size: 14px;
    color: #363636;
  }
  &-intro {
    padding: 10px 0;
    font-size: 12px;
    color: #8d8d8d;
    border-top: 1px solid #ccc;
  }
  &-name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  img {
    vertical-align: middle;
  }
}
</style>
