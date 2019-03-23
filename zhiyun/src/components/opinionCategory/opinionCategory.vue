<template>
  <div id="opinionCategory">
    <div class="opinionCategory">
      <template v-for="(topicItem, index) in topicMemu">
        <group :title="topicItem.catname" :key="index" class="item-list">
          <cell v-for="(topic, index) in topicItem.topicList"
            :key="index"
            :inline-desc="topic.topicname"
            link="/category"
            class="item"
            value="舆情详情">
            <img slot="value" width="15" src="../../assets/llp/icon-details-grey.png">
          </cell>
        </group>
      </template>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Cell, Group } from 'vux'

// 获取分类舆情信息地址
let url = 'http://web.is8.com.cn:8031/om/webpart/oTopic/TopicDo?action=getTopicMemu'

export default {
  name: 'opinionCategory',
  data () {
    return {
      topicMemu: []
    }
  },
  async mounted () {
    await fetch('http://web.is8.com.cn:8031/om/common/login/loginDo?action=login2&username=gzwxb&password=gzwxb')
    fetch(url, {
      credentials: 'include'
    }).then(res => {
      res.json().then(body => {
        this.topicMemu = body
      })
    })
  },
  components: {
    Group,
    Cell
  }
}
</script>

<style lang="less" scoped>
#opinionCategory {
  margin-top: -100px;
  min-width: 1000px;
  min-height: 1000px;
  background-color: #fff;
  .opinionCategory {
    margin-top: 100px;
    padding-top: 10px;
    margin-left: 30px;
    width: 702/2px;
  }
  .weui-cells__title {
    color: #363636;
  }
  .item-list {
    color: #363636;
    font-size: 14px;
  }
  .item {
    margin-top: 10px;
    color: #363636;
    font-size: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  img {
    padding-right: 5px;
    vertical-align: middle;
  }
}
</style>
