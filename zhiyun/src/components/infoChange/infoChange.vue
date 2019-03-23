<template>
  <div class="info-change">
    <div class="info-change-firstLine">
      <router-link to="/passwordsetting">
        <p class="info-change-border">修改密码<img src="./img/info-change-arrow.png"></p>
      </router-link>

      <router-link to="/emailsetting">
        <p class="info-change-border">修改邮箱<img src="./img/info-change-arrow.png"></p>
      </router-link>

      <router-link to="/phonesetting">
        <p>修改电话<img src="./img/info-change-arrow.png"></p>
      </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'infoChange'
}
</script>

<style lang="less" scoped>
  .info-change{
    width:100%;
    height:566px;
    background:#e6e6e6;
  }
  .info-change a{
    color:black;
    display:block;
    height:42px;
    background:white;
  }
  .info-change a p{
    line-height:41px;
    width:80%;
    padding:0 5%;
    margin-left:5%;
  }
  .info-change a p img{
    margin-top:14px;
    float:right;
    height:18px;
  }
  .info-change-border{
    border-bottom:2px solid #d5d5d5;
  }
  .info-change-firstLine{
    position:relative;
    top:20px;
  }
</style>
