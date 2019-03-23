<template>
    <div class="essay">
        <hr/>
        <img v-bind:src="imgUrl[i]">
        <p class="title" @click='goToDetial(getessay.sid)'>{{ getessay.title }}</p>    
        <p class="message">
            <span :class="evaluate[getessay.negative+1].className">{{evaluate[getessay.negative+1].message}}</span>
            <span class="source"> {{ getessay.source }}</span>
            <span class="date">{{ getessay.pubdate}}</span>
            <span class="more" @click='showessay' v-if="isUp"><a href="javascript:;">{{Upmsg}}</a></span>
            <span class="more" @click='showessay' v-else><a href="javascript:;" >{{Downmsg}}</a></span>
        </p>
        <transition name="fade">
            <div v-show="isShow">
                <hr/> 
                <p class="contentwords">
                  {{ getessay.summary }}
                </p>
            </div>
        </transition>
  </div>
</template>
<script>
var n=0;
import axios from 'axios'
export default {
    name:'watchEssay',
    data() {
        return {
            isShow:false,
            Downmsg:'▼',
            Upmsg:'▲',
            isUp:false,
            imgUrl:[require('../images/label1.png'),
                    require('../images/label2.png'),
                    require('../images/label3.png')],
            i:(n++)%3,
            evaluate:[
            {
                "className":"positive",
                "message":"正面"
            },
             {
                "className":"neutral",
                "message":"中性"
            },
            {
                "className":"negative",
                "message":"负面"
            },
            {
                "className":"warning",
                "message":"预警"
            }
            ]
        }
    },
    props:["getessay"],
    methods:{
        showessay:function(){
            this.isShow = !this.isShow;
            this.isUp = !this.isUp
        },
        goToDetial:function(sid){
          if(sid){
            this.$router.push(`/detail?sid=${sid}`);
            console.log(sid);
          }
        }
    },
    created:function(){
    }
        // axios.get('http://web.is8.com.cn/om/mpart/docList/DocSearchDo?action=docList&page=1',{})
        // .then(response=>{
        //     console.log(response);
        // })
        // .catch(error=>{
        //     console.log(error);
        // })
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
a {
  color: inherit;
  text-decoration: none;
}
.essay {
  margin-left: 1%;
  margin-right: 1%;
}
.fade-enter-active {
  transition: opacity 1.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
hr {
  color: #d7d7d7;
  width: 100%;
  height: 0px;
  border-bottom: 1px solid #d7d7d7;
  border-top: none;
  border-left: none;
  border-right: none;
  margin-top: 5px;
}
.title {
  margin-top: 5px;
  font-size: 0.688em;
  line-height: 20px;
  color: #363636;
  text-indent: 10px;
}
img {
  width: 19px;
  height: 19px;
  padding-top: 5px;
  float: left;
}
.negative{
  width: 28px;
  height: 11px;
  color: #fff;
  background-color: #ec0000;
  font-size: 0.563em;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 3px;
}
.neutral {
  width: 28px;
  height: 11px;
  color: #fff;
  background-color: #45d100;
  border: 1px solid #45d100;
  font-size: 0.563em;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 3px;
}
.warning {
  width: 28px;
  height: 11px;
  color: #fff;
  background-color: #ffa507;
  border: 1px solid #ffa507;
  font-size: 0.563em;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 3px;
}
.positive {
  width: 28px;
  height: 11px;
  color: #fff;
  background-color: #007aff;
  border: 1px solid #007aff;
  font-size: 0.563em;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 3px;
}
.source {
  color: #ec0000;
  font-size: 0.5em;
  margin-left: 6px;
}
.date{
  color: #929292;
  word-spacing: 2px;
  font-size: 0.5em;
  margin-left: 10px;
}
.contentwords {
  width: 95%;
  margin:0 auto;
  font-size: 0.658em;
  color: #a4a4a4;
  text-indent: 18px;
}
.more {
  color: #000;
  font-size: 0.625em;
  right: 20px;
  margin-top: 10px;
  float: right;
}
</style>
