<template>
  <div class="password-setting">
    <div class="password-setting-box">
      <div class="password-setting-box-content">
        <p>
          <span>原密码</span>
          <input type="password" name="" placeholder="请输入当前密码" id="oldpassword">
          <img src="./img/password-setting-eye-off.png" v-on:click="click_notSeePassword" id="passwordEyeOff">
          <img src="./img/password-setting-eye.png" v-on:click="click_seePassword" class="displayNone" id="passwordEye">
        </p>
        <p>
          <span>新密码</span>
          <input type="text" name="" placeholder="请输入新的密码" id="newpassword">
        </p>
        <span class="passwordWorning">密码是8-16位字母和数字组合</span>
        <button class="password-setting-box-content-button" id="sure_password" v-on:click="sureAmend">确定</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    import ajax from "../../utils/setting-ajax"
    export default {
        name: 'passwordSetting',
        methods: {
            sureAmend: function(event) {
                var newpassword = document.getElementById('newpassword').value
                var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
                console.log(newpassword)
                if(!newpassword.match(reg)) {
                    alert('密码格式不正确，请重新输入！')
                }else{
                    var url = 'http://web.is8.com.cn/om/mpart/self/myInfo?action=editPassword&password' + newpassword
                    ajax(url)
                }
            },
            click_seePassword: function() {
                var passwordInput = document.getElementById('oldpassword')
                var passwordEye = document.getElementById('passwordEye')
                var passwordEyeOff = document.getElementById('passwordEyeOff')
                passwordInput.type = "password"
                passwordEye.style.display = "none"
                passwordEyeOff.style.display = "inline-block"
            },
            click_notSeePassword: function() {
                var passwordInput = document.getElementById('oldpassword')
                var passwordEye = document.getElementById('passwordEye')
                var passwordEyeOff = document.getElementById('passwordEyeOff')
                passwordInput.type = "text"
                passwordEye.style.display = "inline-block"
                passwordEyeOff.style.display = "none"
            }
        }
    }
</script>

<style lang="less" scoped>
  .password-setting-box{
    position:relative;
    top:43px;
    top:43px;
  }
  .password-setting-box-content{
    margin-left:10%;
    width:80%;
    height:280px;
    background:white;
    border-radius:8px;
  }
  .password-setting-box-content p{
    font-size:12px;
    text-indent:5%;
    width:90%;
    margin-left:5%;
    line-height:52px;
    border-bottom:1px solid #d7d7d7;
  }
  .password-setting-box-content img{
      float: right;
      height:13px;
      margin-top:20px;
      margin-right:10px;
  }
  .password-setting-box-content input{
    width:58%;
    height:20px;
    margin-left:10px;
    margin-top:16px;
    border:none;
    outline:none;
  }
  .password-setting-box-content-button{
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
  .passwordWorning{
      color:#a4a4a4;
      font-size:12px;
      margin-left:10%;
  }
  .displayNone{
      display:none;
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
