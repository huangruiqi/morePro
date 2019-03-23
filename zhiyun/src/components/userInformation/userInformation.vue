<template>
  <div class="user-information">
    <div class="head">
      <img :src="`http://web.is8.com.cn:8031/om${userinfo.logourl}`" height="60" width="60">
      <p> {{ userinfo.sysname }} </p>
    </div>
    <ul class="info">
      <li class="info-list">
        <span class="info-list_left">邮箱</span>
        <span class="info-list_right">
          {{ userinfo.email }}
        </span>
      </li>
      <li class="info-list">
        <span class="info-list_left">密码</span>
        <span class="info-list_right password">
          <span v-if="isShowPassword">
            {{ userinfo.password }}
            <img class="eye" src="../../assets/llp/eyed9be0a.png" height="16" width="16" @click="closePassword">
          </span>
          <span v-else>
            *******
            <img class="eye" src="../../assets/llp/eye808080.png" height="16" width="16" @click="showPassword">
          </span>
        </span>
      </li>
      <li class="info-list">
        <span class="info-list_left">电话</span>
        <span class="info-list_right">
          {{ userinfo.tel }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">

const userInforUrl = 'http://web.is8.com.cn/om/mpart/self/myInfo?action=getUserInfo'

export default {
  name: 'userInformation',
  data () {
    return {
      // showPassword: true,
      isShowPassword: false,
      userinfo: {}
    }
  },
  methods: {
    showPassword () {
      this.isShowPassword = true
    },
    closePassword () {
      this.isShowPassword = false
    }
  },
  async mounted () {
    await fetch('http://web.is8.com.cn:8031/om/common/login/loginDo?action=login2&username=gzwxb&password=gzwxb')
    fetch(userInforUrl, {
      credentials: 'include'
    }).then(res => {
      res.json().then(data => {
        console.log(data)
        this.userinfo = data
      })
    }).catch(err => {
      console.error('error in information: ', err)
    })
  }
}
</script>

<style lang="less">
.user-information {
  font-family: 'PingFang SC Regular';
  .head {
    padding-top: 15px;
    height: 238/2-15px;
    text-align: center;
    color: #fff;
    background-color: #2d324f;
  }
  .info {
    &-list {
      padding-left: 222/2px;
      margin-top: 44/2px;
      &_left {
        margin-right: 46/2px;
        font-size: 15px;
        color: #000;
      }
      &_right {
        font-size: 13px;
        color: #8d8d8d;
      }
    }
    .password {
      position: relative;
    }
    .eye {
      position: absolute;
      top: 0;
      right: -50px;
      bottom: 0;
      margin: auto;
    }
  }
}
</style>
