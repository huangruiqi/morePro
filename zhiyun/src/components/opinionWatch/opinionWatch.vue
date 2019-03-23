<template>
  <div class="opinion-watch">
    <headnav @maskmsg="maskmessage" @selectData="getStoreData"></headnav>
    <watchcontent :ismask="maskmsg" :storedata="storeData"></watchcontent>
  </div>
</template>

<script type="text/ecmascript-6">
import { XHeader } from 'vux'
import headnav from '@/components/opinionWatch/common/headnav'
import watchcontent from '@/components/opinionWatch/common/Watchcontent'
import watchEssay from '@/components/opinionWatch/common/watchessay'
export default {
  data(){
    return{
      maskmsg:"",
      storeData:{}
    }
  },
  name: 'opinionWatch',
  components: {
    XHeader,
    headnav,
    watchcontent,
  },
  methods:{
    maskmessage:function(data){
      if(data=='mask'){
        this.maskmsg='true';
      }else{
        this.maskmsg='false';
      }
    },
    getStoreData:function(data){
      this.storeData = data;
      // console.log(data);
    }  
  }
}
</script>

<style lang="less" scoped>
  *{
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
</style>
