<template>
  <div>
    <div class="header">
        <ul class="headNav">
          <li v-for="(items,index) in navTitle" @click='showThing(index)'>
               {{items.title}}
              <div class="squar" v-show="items.show">
              </div>
          </li>
        </ul>
    </div>
    <transition name="fade">
      <ul class="time_message" v-show="navTitle[0].show">
        <li @click = "timestyle($event,'today')">
            今天
        </li>
        <hr>
        <li @click = "timestyle($event,'yestoday')">
            昨天
        </li>
        <hr>
        <li @click = "timestyle($event,'7day')">
            近7天
        </li>
        <hr>
        <li @click = "timestyle($event,'30day')">
            近30天
        </li>
        <hr>
        <li>
            自定义
            <div class="myself">
            <input type="text" placeholder="开始时间">
            到
            <input type="text" placeholder="结束时间">
            <input type="submit" value="确定">
            </div>
        </li>
      </ul>
    </transition>
      <transition name="fade">
      <div class="inclination" v-show="navTitle[1].show">
        <ul>
        <li>
          <button class="all" @click= "selectInc('all')">全部</button>
        </li>
         <li>
          <button class="positive" @click= "selectInc(-1)">正面</button>
        </li>
        <li>
          <button class="neutral" @click= "selectInc(0)">中性</button>
        </li>
        <li>
          <button class="negative" @click= "selectInc(1)">反面</button>
        </li>
        <li>
          <button class="warning" @click= "selectInc(2)">预警</button>
        </li>
      </ul>
      </div>
      </transition>
      <transition name="fade">
      <div class="origin" v-show="navTitle[2].show">
      <table>
      <tr>
        <td>
        <input type="radio" name="carry">全部来源
        <label>(12345)</label>
        </td>
        <td><input type="radio" name="carry">微博
        <label>(12345)</label>
        </td>
      </tr>
      <tr>
        <td> 
        <input type="radio" name="carry">全部来源
        <label>(12345)</label>
        </td>
        <td><input type="radio" name="carry">微博
        <label>(12345)</label>
        </td>
      </tr>
      <tr>
        <td>
        <input type="radio" name="carry">微信
        <label>(12345)</label>
        </td>
        <td><input type="radio" name="carry">App
        <label>(12345)</label>
        </td>
      </tr>
       <tr>
        <td>
        <input type="radio" name="carry">其他
        <label>(12345)</label>
        </td>
      </tr>
      </table>  
      </div>  
      </transition>
      <transition name="fade">
      <div class="other" v-show="navTitle[3].show">
        <div>
          <ul class="order">
            <label>排序：</label>
            <li @click = "orderstyle($event,'timedown')">
              时间降序
            </li>
            <li  @click = "orderstyle($event,'timeup')">
              时间升序
            </li>
            <li  @click = "orderstyle($event,'hot')">
              热搜排序
            </li>
          </ul>
        </div>
        <div>
          <ul class="repeat">
            <label>去重：</label>
            <li  @click = "similerstyle($event,0)">去重</li>
            <li  @click = "similerstyle($event,1)">不去重</li>
          </ul>
        </div>
        <ul class="otherButton">
            <li>
              <button class="sure" @click="othersure">确定</button>
            </li>
            <li>
              <button class="close">取消</button>
            </li>
        </ul>
      </div>
      </transition>
  </div>
</template>
<script>
var siblings = require('../js/siblings');
// var storeData = store.state.data;
export default {
  name: "headNav",
  data() {
    return {
      navTitle: [
        {
          title: "时间",
          show: false
        },
        {
          title: "倾向",
          show: false
        },
        {
          title: "来源",
          show: false
        },
        {
          title: "其他",
          show: false
        }
      ],
      msg:false,
      storeobj:{
         page:1,
         datetag: "all", //时间
         neg: "all", //倾向
         carry: "全部", //载体
         order: "timedown", //排序
         similer: 0, //是否排重
      }
    };
  },
  methods: {
    showThing: function(n) {
      for (var i = 0; i < this.navTitle.length; i++) {
        this.navTitle[i].show = false;
        if (i == n) {
          this.navTitle[i].show = true;
          this.msg = true;
        }
      }
    },
    selectInc:function(data){
      this.msg = false;
      this.navTitle.forEach(obj=>{
        obj.show = false;
    })
      this.storeobj.neg = data;
      // console.log(this.storeobj);
    },
    timestyle: function(event,data) {
      this.msg = false;
      var dom = event.target;
      dom.style.color = "#484848";
      var a = siblings.siblings(dom);
      for (var i = 0; i < a.length; i++) {
        if (a[i].nodeName == "LI") {
          a[i].style.color = " #7d8093";
        }
      }
    this.navTitle.forEach(obj=>{
        obj.show = false;
    })
    this.storeobj.datetag = data;
  },
  orderstyle:function(event,data){
      var dom = event.target;
      dom.style.color = "#484848";
      var a = siblings.siblings(dom);
      for (var i = 0; i < a.length; i++) {
        if (a[i].nodeName == "LI") {
          a[i].style.color = " #7d8093";
        }
      }
      this.storeobj.order = data;
    },
  similerstyle:function(event,data){
      var dom = event.target;
      dom.style.color = "#484848";
      var a = siblings.siblings(dom);
      for (var i = 0; i < a.length; i++) {
        if (a[i].nodeName == "LI") {
          a[i].style.color = " #7d8093";
        }
      }
      this.storeobj.similer = data;
    },
  othersure:function(){
    this.msg = false;
      this.navTitle.forEach(obj=>{
      obj.show = false
    })
  }
},
  watch:{
    msg:function(newVue,oldVue){
      if(newVue){
        this.$emit("maskmsg","mask");
       // alert(newVue);
      }else{
        this.$emit("maskmsg","nomask");
      // alert(newVue);
      }
    },
    storeobj:{
    handler(newVue,oldVue){
      // alert("wacth"+newVue);
      if(newVue){
        this.$emit("selectData",this.storeobj);
      }
    },
          deep: true
    }
  }
}
</script>
<style scoped lang="less">
@import "~vux/src/styles/reset.less";
* {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.header {
  height: 44px;
  width: 100%;
  background-color: #3e4464;
  display: -webkit-inline-flex;
  justify-content: center;
  .headNav {
    width: 375px;
    padding-top: 10px;
    display: -webkit-inline-flex;
    justify-content: space-around;
    li {
      list-style: none;
      float: left;
      font-size: 15px;
      color: #7d8093;
      .squar {
        width: 13px;
        height: 13px;
        background-color: white;
        transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        margin-left: 10px;
        margin-top: 7px;
      }
    }
    .nav_hover {
      color: #d2d6dd;
    }
  }
}
.time_message {
  width: 100%;
  height: 200px;
  background-color: white;
  li {
    list-style: none;
    width: 375px;
    height: 38px;
    padding-left: 5.5%;
    line-height: 38px;
    font-size: 14px;
    color: #b0b0b0;
    margin: 0 auto;
    .myself {
      color: #b0b0b0;
      font-size: 12px;
      width: 300px;
      height: 38px;
      margin-left: 85px;
      margin-top: -36px;
      input[type="text"] {
        padding: 2px 5px 2px 5px;
        width: 65px;
        text-align: center;
        border-radius: 3px;
        font-size: 12px;
        border: 1px solid #ececec;
        outline: 0;
      }
      input[type="submit"] {
        background-color: #2d324f;
        width: 55px;
        height: 23px;
        color: #b0b0b0;
        text-align: center;
        border-radius: 5px;
        border: 1px solid #ececec;
        outline: none;
      }
    }
  }

  hr {
    background-color: #ececec;
    height: 0;
    border-bottom: 1.5px solid #ececec;
    border-top: none;
    padding-left: 1%;
    padding-right: 1%;
  }
}
.inclination {
  width: 100%;
  height: 46px;
  ul {
    width: 375px;
    margin: 0 auto;
    li {
      list-style: none;
      float: left;
      margin-left: 22px;
      padding-top: 10px;
      button {
        width: 48px;
        height: 19px;
        font-size: 12px;
        outline: none;
        border-radius: 3px;
      }
      .all {
        background-color: #fff;
        border: 1px solid #d9d9d9;
      }
      .positive {
        color: #fff;
        background-color: #007aff;
        border: 1px solid #007aff;
      }
      .neutral {
        color: #fff;
        background-color: #45d100;
        border: 1px solid #45d100;
      }
      .negative {
        color: #fff;
        background-color: #ec0000;
        border: 1px solid #ec0000;
      }
      .warning {
        color: #fff;
        background-color: #ffa507;
        border: 1px solid #ffa507;
      }
    }
  }
}
.origin {
  width: 375px;
  font-size: 13px;
  margin: 0 auto;
  color: #585858;
  margin-top: 14px;
  font-family: "微软雅黑";
  input {
    width: 11px;
    height: 11px;
    margin-right: 5px;
  }
  td {
    padding-top: 2px;
    padding-left: 30px;
    padding-right: 30px;
  }
  label {
    margin-left: 18px;
    margin-top: -2px;
  }
}
.other {
  width: 100%;
  height: 120px;
  .otherButton {
    width: 375px;
    margin: 0 auto;
    margin-top: 10px;
    li {
      list-style: none;
      float: left;
      button {
        width: 110px;
        height: 21px;
        border-radius: 4px;
        outline: none;
        margin-left: 50px;
      }
      .sure {
        color: #ffffff;
        background-color: #2d324f;
        border: 1px solid #2d324f;
      }
      .close {
        color: #373c57;
        background-color: #ffffff;
        border: 1px solid #727587;
      }
    }
  }
}
.other > div {
  border-bottom: 1.5px solid #ececec;
  list-style: none;
  width: 100%;
  height: 35px;
  font-size: 12px;
  ul {
    width: 375px;
    margin: 0 auto;
    padding-left: 70px;
    label {
      float: left;
      margin-top: 8px;
    }
    li {
      list-style: none;
      float: left;
      color: #9c9c9c;
      margin-left: 30px;
      line-height: 35px;
    }
    li:hover {
      color: #6b6d7e;
    }
  }
}
.fade-enter-active {
  transition: opacity 1.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
