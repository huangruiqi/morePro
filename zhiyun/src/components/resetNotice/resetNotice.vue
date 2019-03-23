<template>
  <div id="notice">
    <div class="header">
      <router-link to="/myopinion"><img src = "../../assets/images/back.png" alt="back" @click="Done"></router-link>
        <p>修改通知</p>
    </div>
    <!-- 具体内容 -->
   <div class="content">
     <group gutter="0">
       <x-switch title="通知" :value-map="['0', '1']" v-model='emailConfig.pushState'></x-switch>
    </group>
     <group gutter="0">
       <x-input title="推送方式" placeholder="请输入验证码" text-align="right"></x-input>
     </group>
      <group gutter="0" class="setWay">
         <cell title="邮件推送">
           <div class="check">
             <input @click="checkboxClick" type="checkbox" name="warning" value="1"><span>推送预警</span>
             <img class="unchecked" src="../../assets/images/unchecked.png" alt="">
             <img v-show="warningisChecked" class="checked" src="../../assets/images/check.png" alt="">
           </div>
           <div class="check">
             <input @click="checkboxClick" type="checkbox" name="negative" value="1"><span>推送负面</span>
             <img class="unchecked" src="../../assets/images/unchecked.png" alt="">
             <img v-show="negativeisChecked" class="checked" src="../../assets/images/check.png" alt="">
           </div>
         </cell>
      </group>
      <!-- 获取原来的邮箱地址 -->
      <div class="orginal">
         <group gutter="0" class="email" v-for="(item,index) in emailAddressList" :key="index">
            <x-input @on-blur="checkEmail(index, 2)" v-model="emailAddressList[index].email" class="input" title="邮箱" placeholder="请输入邮箱地址" text-align="right"></x-input>
            <img v-if="index === 0" src="../../assets/images/add.png" alt="" @click='addEmail'>
            <img v-else src="../../assets/images/reduce.png" alt="" @click='removeEmail(index, 2)'>
         </group>
      </div>
      <!-- 新增邮箱地址 -->
      <div class="newAdd">
        <group gutter="0" class="email" v-if="emailArray[index]" v-for="(item,index) in emailArray" :key="index">
           <x-input @on-blur="checkEmail(index, 1)" v-model="emailArray[index].email" class="input" title="邮箱" placeholder="请输入邮箱地址" text-align="right"></x-input>
           <img src="../../assets/images/reduce.png" alt="" @click='removeEmail(index, 1)'>
        </group>
      </div>
     <group gutter="0">
       <cell title="时间设置"></cell>
     </group>
     <group class="setTime" gutter="0">
       <cell title="推送时间">
         <input type="text" name="startEveryDay" v-model="emailConfig.startEveryDay">
         <span>—</span>
         <input type="text" name="endEveryDay" v-model="emailConfig.endEveryDay">
         <span>二十四时制</span>
       </cell>
     </group>
     <!-- 推送次数更改 -->
     <group class="setTimes" gutter="0">
       <cell title="推送频次">
         <input type="text" name="timesFrom" v-model="emailConfig.frequency">
         <span>{{emailConfig.frequency || 0}} 分钟</span>
       </cell>
     </group>
      <group gutter="0">
        <x-switch title="周末推送" :value-map="['1', '2']" v-model='emailConfig.weekendOpen'></x-switch>
      </group>
   </div>
</div>
</template>
<script>
import { XSwitch, Group, Cell, XInput } from 'vux'
import axios from 'axios'
export default {
  components: {
    XSwitch,
    Group,
    Cell,
    XInput
  },
  data () {
    return {
      emailAddressList: [],
      emailConfig: {},
      warningisChecked: false,
      negativeisChecked: false,
      emailArray: []
    }
  },
  created () {
    axios({
      method: 'get',
      withCredentials: true,
      url: 'http://web.is8.com.cn:8031/om/webpart/mail/EmailDo?action=showEmailConfig'
    }).then(res => {
      const userInfor = res.data
      this.emailAddressList = userInfor.emailAddressList
      this.emailConfig = userInfor.emailConfig
      this.warningisChecked = parseInt(userInfor.emailConfig.warning)
      this.negativeisChecked = parseInt(userInfor.emailConfig.negative)
    })
  },
  methods: {
    // 检查邮箱的格式
    checkEmail (index, flag) {
      const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (flag === 2) {
        if (!reg.test(this.emailAddressList[index].email)) {
          alert('邮箱格式错误，请重新填写')
          this.emailAddressList[index].email = ''
        }
      } else {
        if (!reg.test(this.emailArray[index].email)) {
          alert('邮箱格式错误，请重新填写')
          this.emailArray[index].email = ''
        }
      }
    },
    addEmail () {
      this.emailArray.push({})
    },
    // 删除添加邮箱
    removeEmail (index, flag) {
      if (flag === 2) {
        this.emailAddressList.splice(index, 1)
      } else {
        this.emailArray.splice(index, 1)
      }
      console.log('删除邮箱', index, this.emailArray)
    },
    // 选择推送负面和推送预警
    checkboxClick (e) {
      if (e.target.name === 'warning') {
        this.warningisChecked = !this.warningisChecked
      } else {
        this.negativeisChecked = !this.negativeisChecked
      }
    },
    Done () {
      let obj = {
        emailAddressList: this.emailAddressList.concat(this.emailArray),
        emailConfig: this.emailConfig
      }
      obj.emailConfig.warning = this.warningisChecked ? '1' : '0'
      obj.emailConfig.negative = this.negativeisChecked ? '1' : '0'
      console.log('这是obj', obj)
      axios({
        method: 'POST',
        withCredentials: true,
        url: 'http://web.is8.com.cn:8031/om/webpart/mail/EmailDo?action=saveEmailConfig',
        data: obj
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
div p img input span {
  margin: 0;
  padding: 0;
}
#notice {
  position: relative;
  top: -46px;
}
.header {
  position: relative;
  width: 100%;
  padding: 15px 0;
  background: rgb(45,50,79);
  text-align: center;
    p {
      color: rgb(255,255,255);
      font-size: 1rem;
      margin: 0 auto;
    }
    img {
      position: absolute;
      top: 18px;
      left: 25px;
      width: 0.75rem;
      height: 1.25rem;
    }
}
.content {
  padding: 0 12px;
  input::input-placeholder {
      font-size: .5rem;
      color: rgb(206,206,206);
  }
  input::-webkit-input-placeholder {
    font-size: .5rem;
    color: rgb(206,206,206);
  }
.email {
  position: relative;
  img {
    position: absolute;
    top: 18px;
    right: 14px;
    width: 13px;
    height: 13px;
  }
  .input {
    margin-right: 25px;
  }
}
  .setTime,.setTimes {
    input {
      width: 3rem;
      outline: none;
      border-radius: 4px;
      border: 1px solid #DBDBDB;
      text-align: center;
      font-size: 11px;
      color: rgb(206,206,206);
    }
    span {
      color: rgb(206,206,206);
      font-size: .4rem;
    }
  }
  .setTimes {
    input {
      margin-right: 10px;
    }
  }
  .setWay {
    .check {
      display: inline-block;
      position: relative;
    }
    .unchecked {
      position: absolute;
      width: 12px;
      height: 12px;
      top: 8px;
      left: 16px;
      z-index: 5;
    }
    .checked {
      position: absolute;
      width: 5px;
      height: 5px;
      top: 12px;
      left: 20px;
      z-index: 5;
    }
    input {
      position: relative;
      z-index: 10;
      opacity: 0;
      margin-left: 1rem;
    }
    span {
      margin-left: 6px;
      font-size: .75rem;
      color: rgb(206,206,206);
    }
  }
}
</style>
