<template>
  <div class="phone-setting">
    <div class="phone-setting-box">
      <div class="phone-setting-box-content">
        <p>
          <span>新电话</span>
          <input type="text" name="" placeholder="请输入电话号码" id="newPhone">
        </p>
        <p>
          <span>获取短信验证码</span>
          <input type="text" name="" placeholder="请输入验证码" id="verificationCode">
        </p>
        <button class="phone-setting-box-content-button" id="sure_phone" v-on:click="sureAmend">确定</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import ajax from "../../utils/setting-ajax"
  export default {
    name: 'phoneSetting',
    methods: {
      amendSure: function (event) {
        var newPhone = document.getElementById('newPhone').value
        var reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/
        if (!newPhone.match(reg)) {
          alert('电话号码格式不正确，请重新输入！')
        }else{
          var url = 'http://web.is8.com.cn/om/mpart/self/myInfo?action=editTel&password=' + newPhone
          ajax(url)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .phone-setting-box{
    position:relative;
    top:43px;
    top:43px;
  }
  .phone-setting-box-content{
    margin-left:10%;
    width:80%;
    height:280px;
    background:white;
    border-radius:8px;
  }
  .phone-setting-box-content p{
    font-size:12px;
    text-indent:5%;
    width:90%;
    margin-left:5%;
    line-height:52px;
    border-bottom:1px solid #d7d7d7;
  }
  .phone-setting-box-content input{
    width:50%;
    height:20px;
    float:right;
    margin-top:16px;
    border:none;
    outline:none;
  }
  .phone-setting-box-content-button{
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
