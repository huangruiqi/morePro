<template>
  <div class="my-opinion">

    <!-- 头部 -->
    <div class="my-opinion-head">
      <!-- 头像部分 -->
      <div class="my-opinion-head-img"></div>
      <!-- 文字部分 -->
      <div class="my-opinion-head-info">
        <p>软云科技有限公司</p>
        <p>
          <router-link  to="/userinfo"><img src="./img/my-opinion-info.png">我的信息</router-link>
          <router-link  to="/resetnotice"><img src="./img/my-opinion-set.png">通知设置</router-link>
          <a><img src="./img/my-opinion-exit.png" v-on:click="clickExit">退出</a>
        </p>
      </div>
      <br class="clear">
    </div>

    <!-- 中间内容 -->
    <div class="my-opinion-center">
        <!-- 第一行 -->
        <div>
          <router-link  to="/report">
            <img src="./img/my-opinion-myReport.png">
            <span>我的报告</span>
          </router-link>

          <router-link to="/material">
            <img src="./img/my-opinion-material.png">
            <span>素材库</span>
          </router-link>

          <router-link to="/collection">
            <img src="./img/my-opinion-collect.png">
            <span>收藏库</span>
          </router-link>
          <br class="clear">
        </div>
        <!-- 第二行 -->
        <div>
          <router-link to="/worning">
            <img src="./img/my-opinion-worningSet.png">
            <span>预警设置</span>
          </router-link>

          <router-link to="/topic">
            <img src="./img/my-opinion-topicSet.png">
            <span>专题设置</span>
          </router-link>

          <router-link to="/category">
            <img src="./img/my-opinion-typeSet.png">
            <span>分类设置</span>
          </router-link>
          <br class="clear">
        </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'myOpinion',
  methods: {
    clickExit: function (event) {
      var xhr = ''
      var requestData = ''
      // 兼容性处理
      if(window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
      }else{
        // xhr = new ActiveXObject("Microsoft.XMLHTTP")
      }
      var url = "http://web.is8.com.cn/om/common/login/loginDo?action=loginOut"
      xhr.open('GET', url, true)
      xhr.send(null)
      xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
          if((xhr.status >= 200 && xhr.status < 300) || (xhr.status === 304)) {
            // 返回的参数
            requestData = xhr.responseText
            var data = JSON.parse(requestData)
            alert(data.msg)
          }else{
            // 请求数据错误的处理函数
          }
        }else{
          // ajax发送失败，没有得到响应数据
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .my-opinion-head{
    width:90%;
    height:110px;
    padding:0 5%;
    padding-top:25px;
    background:#2d324f;
  }
  .my-opinion-head-img{
    float:left;
    margin-right:17px;
    width:60px;
    height:60px;
    border:2px solid white;
    border-radius:100px;
  }
  .my-opinion-head-info{
    color:white;
  }
  .my-opinion-head-info p{
    font-size:13px;
    line-height:30px;
    text-align:left;
  }
  .my-opinion-head-info a{
    color:white;
    margin-right:15px;
  }
  .my-opinion-head-info img{
    width:11px;
    height:11px;
    margin-right:7px;
  }

  .my-opinion-center{
    height:142px;
  }
  .my-opinion-center div{
    height:65px;
    background:white;
    margin-bottom:12px;
    display: flex;
    justify-content: space-around;
  }
  .my-opinion-center div a{
    width:100px;
    height:35px;
    margin-top:15px;
    font-size:12px;
    text-align:center;
    color:black;
  }
  .my-opinion-center div a img{
    display:block;
    height:20px;
    margin:0 auto;
    margin-bottom:5px;
  }
  .clear{
    clear:both;
  }
</style>
