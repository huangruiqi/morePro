<template>
  <div class="bigContent">
      <div class="queryTitle">
        <span>今日教室查询选坐</span>
      </div>
      <div id="query">

      </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      allInfor: {},
      classTime: [, "8:00", "10:15", "14:00", "16:15", "19:00", "21:15"]
    }
  },
  created() {
    this.$axios.get("http://localhost:8080/api/information")
    .then(res => {
      this.allInfor = res.data;
    })
    .catch(error => {
      console.log(error);
    })
  },
  methods: {
    look() {
      // console.log(1);
      let allClass = this.allInfor.information[0].class;
      let information = this.allInfor.information[0];
      let season = this.allInfor.season;
      let dateNow = new Date();
      let dateStart = new Date(season[0], season[1], season[2]);
      let distance = Math.ceil((dateNow.getTime() - dateStart.getTime()) / (1000 * 60 * 60 *24));
      let erectWeek = Math.ceil(distance / 7);//为第几周
      let nowWeek = dateNow.getDay();//为星期几
      let addChoose = "";
      if(nowWeek == 0) {
        nowWeek = 7;
      }
      for(let i = 0; i < allClass.length && allClass[i]; i++) {
        for(let j = 0; j < allClass[i].week.length && allClass[i].week; j++) {
          if(allClass[i].week[j] == erectWeek){  
            for(let k = 0; allClass[i].time[k] && allClass[i]; k++) {
              if(allClass[i].time[k][0] == nowWeek) {
                addChoose += "<div class='choose'><a href='/seat/classroom?classroom=" + allClass[i].room + "'>" + allClass[i].className +"</a><br><a href='/seat/classroom?classroom=" + allClass[i].room + "'>" + this.classTime[allClass[i].time[k][1]] +"</a><br><a href='/seat/classroom?classroom=" + allClass[i].room + "'>" + allClass[i].room + "</a></div>";
              }
            }  
          }
        }
      }
      document.getElementById('query').innerHTML = addChoose;
    }
  },
  components: {

  },
  watch: {
    allInfor() {
      this.look();
    }
  }
}
</script>

<style lang="scss">
@import "../../styles/main";
.bigContent {
  width: 100%;
  height: 100%;
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #DBFCA6;
  .queryTitle {
    width: px2rem(60);
    height: px2rem(20);
    display:flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: px2rem(7);
      color: #777A7B;
      font-weight: 600;
    }
  }
  #query {
    width: 70%;
    height: 60%;
    // background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    .choose {
      width: px2rem(40);
      height: px2rem(40);
      border-radius: 50%;
      border: px2rem(4) solid #58D68D;
      background-color: #CCFF99;
      font-size: px2rem(4);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      line-height: px2rem(4);
      cursor: pointer;
      a {
        color: #777A7B;
        font-weight: 600;
      }
    }
  }
}
</style>
