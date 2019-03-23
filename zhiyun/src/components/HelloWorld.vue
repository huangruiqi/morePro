<template>
  <div class="hello">
    <flexbox>
    </flexbox>
  </div>
</template>

<script type="text/ecmascript-6">
import { Swiper, Flexbox, FlexboxItem } from 'vux'

const imgList = [
  'http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff',
  'http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff',
  'http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff'
]
const demoList = imgList.map((one, index) => ({
  url: 'javascript:',
  img: one
}))

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      demoList: demoList
    }
  },
  components: {
    Swiper,
    Flexbox,
    FlexboxItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello {
  .flex-box-left {
    width: 100%;
    img {
      max-width: 100%;
    }
    .top {
      img {
        height: 230px;
      }
    }
    .bottom {
      img {
        height: 180px;
      }
    }
  }
  .flex-box-right {
    width: 100%;
    img {
      max-width: 100%;
    }
    .top {
      img {
        height: 180px;
      }
    }
    .bottom {
      img {
        height: 230px;
      }
    }
  }
}
</style>
