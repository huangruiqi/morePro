<template>
  <div class="login">
      <div class="title-wrapper">
          <h1>用户登录</h1>
      </div>
      <div v-transfer-dom>
        <loading :show="showLoading" :text="loadingText"></loading>
      </div>
      <group>
        <x-input title="用户名" v-model="userName" required></x-input>
        <x-input title="密码" v-model="password" type="password" required @enter="onEnter(value, $event)"></x-input>
      </group>
      <div style="padding:15px;">
        <x-button type="primary" @click.native="onClickBotton">登 录</x-button>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {Group, XInput, XButton, AlertModule, Loading, TransferDomDirective as TransferDom} from 'vux'
import request from '@/utils/request'
export default {
  name: 'login',
  data() {
    return {
      userName: '',
      password: '',
      showLoading: false,
      loadingText: '正在登录...'
    }
  },
  methods: {
    onEnter (value, event) {
      console.log(value)
    },
    onClickBotton () {
      this.showLoading = true
      if (this.userName === '') {
        AlertModule.show({
          title: '用户名不能为空',
          content: ''
        })
        return
      }
      if (this.password === '') {
        AlertModule.show({
          title: '密码不能为空',
          content: ''
        })
        return
      }
      if (this.userName !== '' && this.password !== '') {
        request(`http://web.is8.com.cn/om/common/login/loginDo?action=login2&username=${this.userName}&password=${this.password}`).then(res => {
          this.showLoading = false
          if (res.data.code === 1) {
            this.$router.push('/myopinion')
          }
          if (res.data.code === 0) {
            AlertModule.show({
              title: res.data.msg,
              content: '请检查您的输入是否有误！'
            })
          }
        })
      }
    }
  },
  components: {
    Group,
    XInput,
    XButton,
    Loading
  },
  directives: {
    TransferDom
  }
}
</script>

<style lang="less" scoped>
</style>
