<template>
  <div class="email-setting">
    <div class="email-setting-box">
      <div class="email-setting-box-content">
        <p>
          <span>此处显示用户名</span>
        </p>
        <p>
          <span>新邮箱</span>
          <input type="email" name="" placeholder="请输入邮箱" id="email-setting-email">
        </p>
        <button class="email-setting-box-content-button" id="sure_email" v-on:click="sureAmend">确定</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import ajax from '../../utils/setting-ajax'
export default {
  name: 'emailSetting',
  methods: {
    sureAmend: function (event) {
      var userEmail = document.getElementById("email-setting-email").value
      // 确定修改邮箱
      var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!userEmail.match(reg)) {
        alert('邮箱格式不正确，请重新输入！')
      }else{
        var url = "http://web.is8.com.cn/om/mpart/self/myInfo?action=editEmail&email=" + userEmail
        ajax(url)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .email-setting-box{
    position:relative;
    top:43px;
  }
  .email-setting-box-content{
    margin-left:10%;
    width:80%;
    height:280px;
    background:white;
    border-radius:8px;
  }
  .email-setting-box-content p{
    text-indent:5%;
    width:90%;
    margin-left:5%;
    line-height:52px;
    border-bottom:1px solid #d7d7d7;
  }
  .email-setting-box-content input{
    width:60%;
    height:20px;
    margin-top:-3px;
    margin-left:10px;
    border:none;
    outline:none;
  }
  .email-setting-box-content-button{
    display:block;
    height:35px;
    width:90px;
    margin:0 auto;
    margin-top:85px;
    background:#2d324f;
    border:none;
    outline:none;
    color:white;
    border-radius:5px;
    cursor:pointer;
  }

  // input标签的placeholder属性靠右显示
  :-moz-placeholder
    {
      text-align: right;
    }
  :-ms-input-placeholder
    {
       text-align: right;
    }
  ::-moz-placeholder
    {
      text-align: right;
    }
  ::-webkit-input-placeholder
    {
        text-align: right;
    }
</style>
