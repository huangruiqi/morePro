<template>
  <div class="container">
    <watch-chart></watch-chart>
    <div class="Watchcontent">
      <div v-for="(obj,index) in allessay" :key="index">
      <watch-essay :getessay="allessay[index]">
      </watch-essay>
      </div>
    </div>
    <div class="mask" v-show="maskShow">
    </div>
  </div>
</template>
<script>
import watchEssay from '@/components/opinionWatch/common/watchessay'
import watchChart from '@/components/opinionWatch/common/highchart'
import request from '@/utils/request'
export default {
  name: "watchcontent",
  props:['ismask','storedata'],
  data() {
    return {
      allessay:[],
      // storeData: storeobj
    }
  },
  components:{
    watchEssay,
    watchChart
  },
  computed:{
    maskShow(){
      if(this.ismask=='true'){
        return true;
      }else{
        return false;
      }
    },
  },
  async mounted (){
   request('http://web.is8.com.cn/om/mpart/docList/DocSearchDo?action=docList&page=1&datetag=all&neg=all&order=timedown&similer=0&carry=全部').then(res => {
     let essaycontent=res.data.docList;
       this.allessay = essaycontent; 
   })
  }, 
  watch:{
    storedata:{
      handler(newVal,oldVal){
        request('http://web.is8.com.cn/om/mpart/docList/DocSearchDo?action=docList&page='+newVal.page+'&datetag='+newVal.datetag+'&neg='+newVal.neg+'&order='+newVal.order+'&similer'+newVal.similer+'&carry='+newVal.carry).then(res => {
           let essaycontent=res.data.docList;
           this.allessay = essaycontent; 
        })
      },
      deep:true
    }
  }
  // watch:{
  //   url:function(newVal,oldVal){
  //     console.log(newVal);
  //     request(newVal).then(res => {
  //     let essaycontent=res.data.docList;
  //       this.allessay = essaycontent; 
  //     })  
  //   }
  // }
}
</script>
<style scoped>
*{
  overflow: hidden;
}
.Wacthcontent {
  margin-top: 10px;
}
.container {
  position: relative;
}
.mask {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 5;
  background-color: #000000;
  opacity: 0.5;
  top:0;
}
</style>

