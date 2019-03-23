<template>
  <div class="allPage">
    <div class="left">
      <left v-if='allInfor' :allInfor='allInfor'></left>
    </div>
    <div class="content">
      <div class="title">
        <div>
            <i class="icon-table"></i>
            <router-link to='/timeTable'>课表查询</router-link>
        </div>
          <div>
            <i class="icon-call"></i>
            <router-link to='/callTheRoll'>课堂考勤</router-link>
          </div>
          <div>
            <i class="icon-position"></i>
            <router-link to='/seat'>座位管理</router-link>
          </div>
          <div>
            <i class="icon-homework"></i>
            <router-link to='/homework'>作业管理</router-link>
          </div>
          <div>
            <i class="icon-data"></i>
            <router-link to='/data'>教学资料</router-link>
          </div>
          <div>
            <i class="icon-exam"></i>
            <router-link to='/exam'>考试设置</router-link>  
          </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import left from './complements/left/left'
import config from './http/config'

export default {
  name: 'App',
  data() {
    return {
      allInfor: {}
    }
  },
  beforeCreate() {
    this.$axios.get("http://localhost:8080/api/information")
    .then(res => {
      this.allInfor = res.data;
    })
    .catch(error => {
      console.log(error);
    })
  },
  components: {
    left
  }
}
</script>

<style lang="scss">
@import "./styles/common";
@import "./styles/mixin";
@import "./styles/font";
@import "./styles/main";
.allPage {
  padding: 0;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  .left {
    width: 15%;
    height: 100%;
  }
  .content {
    width: 85%;
    height: 100%;
    float: left;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .title {
      width: 100%;
      height: 10%;
      background-color: #E6FFB6;
      display: flex;
      flex-wrap: nowrap;
      border-bottom: px2rem(0.6) solid white;
      div {
        width: px2rem(100);
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        i {
          font-size: px2rem(8);
          font-weight: 600;
        }
        a {
          font-size: px2rem(4);
          font-weight: 600;
        }
      }
      div:hover {
        background-color: #CCFF99;
      }
    }
  }
}
</style>
