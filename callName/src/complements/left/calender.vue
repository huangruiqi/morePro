<template>
    <div class="calender">
        <div class="calenderReal">
            <div id='schedule-box' class="boxshaw">
            </div>
            <div>
                <h3 id='h3Ele'></h3>
            </div>
        </div>
        <div class="plan">
            <div class="title" href="">
                <span>日程安排</span>
            </div>
            <div class="content">
                <table id="contentPlan">

                </table>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import calenderUtils from '../../ultis/calender.js'

export default {
    data() {
        return {
            classTime: [, "8:00", "10:15", "14:00", "16:15", "19:00", "21:15"]
        }
    },
    mounted() {
        //日历
        let mySchedule = new calenderUtils({
            el: '#schedule-box'
	    });
    },
    props: ['allInfor'],
    methods: {
        //计划
        plan() {
            let contentPlan = document.getElementById('contentPlan');
            let season = this.allInfor.season;
            let information = this.allInfor.information[0];
            let numClassWeek = [[,],[,],[,],[,],[,]];//为课程排序
            let controlQuanju;
            // let timer = setInterval(() => {
                let planWord = "";
                let dateNow = new Date();
                let dateHour = dateNow.getHours();
                let dateMinute = dateNow.getMinutes();
                let dateSecond = dateNow.getSeconds();
                let dateStart = new Date(season[0], season[1], season[2]);
                const startWeek = 1;
                let distance = Math.ceil((dateNow.getTime() - dateStart.getTime()) / (1000 * 60 * 60 *24));
                let erectWeek = Math.ceil(distance / 7);//为第几周
                let nowWeek = dateNow.getDay();
                //let nowWeek = 3 + extraWeek;//现在的星期
                let control = 0;
                for(let i = 0; i < information.class.length; i++) {
                    for(let j = 0; j < information.class[i].week.length; j++) {
                        if(information.class[i].week[j] == erectWeek){
                            for(let k = 0; k < information.class[i].time.length; k++) {
                                let result1 = /.*?:/g;
                                //console.log(result1.exec("3:"));
                                let result2 = /\#:.*/g;
                                let splictHour = this.classTime[ information.class[i].time[k][1]].match(/(\S*):/)[1];
                                let splictMinute = this.classTime[ information.class[i].time[k][1]].match(/:(\S*)/)[1];
                                //&& (dateHour <  splictHour || (dateHour == splictHour && dateMinute < splictMinute))
                                //console.log(information.class[i].time[k][0]);
                                if(nowWeek == 0) {
                                    nowWeek = 7;
                                }
                                if(information.class[i].time[k][0] == nowWeek && numClassWeek[control]) {
                                    numClassWeek[control][0] = information.class[i].time[k][1];
                                    numClassWeek[control][1] = information.class[i].className;
                                    control++;
                                }
                            }
                        }
                    }
                }
                if(control > 1) {
                    for(let j = 0; j < control - 1; j++) {
                        for(let i = 0; i < control - 1 - j; i++) {
                            let reserve, reserveName;
                            if(numClassWeek[i][0] > numClassWeek[i + 1][0] && numClassWeek[i] && numClassWeek[i + 1]) {
                                reserve = numClassWeek[i][0];
                                reserveName = numClassWeek[i][1];
                                numClassWeek[i][0] = numClassWeek[i + 1][0];
                                numClassWeek[i][1] = numClassWeek[i + 1][1];
                                numClassWeek[i + 1][0] = reserve;
                                numClassWeek[i + 1][1] = reserveName;
                            }
                        }
                    }
                }
                for(let i = 0; i < control && numClassWeek[i]; i++) {
                    planWord += "<tr style='font-size: 7%; height: 1px;font-weight: 700'><td style='width: 35%'>" + this.classTime[numClassWeek[i][0]] +"</td><td>" + numClassWeek[i][1] + "</td></tr>";
                }
                contentPlan.innerHTML = planWord;
            // },1000);
        }
    },
    components: {

    },
    watch: {
        allInfor() {
           this.plan();
        }
    }
}
</script>

<style lang="scss">
@import "../../styles/main";
.calender {
    width: 100%;
    height: px2rem(100);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .calenderReal {
        width: 80%;
        height: px2rem(40);
        #schedule-box{
            width: 100%;
            height: 100%;
			margin: 0 auto;
            font-size: px2rem(3);
            font-weight: 600;
            background-color: #fff;            
            .schedule-hd{
                display: flex;
                justify-content: center;
                align-content: center;
                background-color: #58D68D;
                height: px2rem(6);
                .arrow{
                    cursor: pointer;
                    font-size: px2rem(4);
                    font-weight: 400;
                    color: white;
                }

                .today{
                    flex: 1;
                    text-align: center;
                    color: white;
                    font-size: px2rem(4);
                    font-weight: 600;
                }
            }
            .ul-box{
                overflow: hidden;
                font-size: px2rem(2.8);
                li{
                    float: left;
                    width: 14.28%;
                    text-align: center;
                }
                .other-month {
                    .dayStyle {
                        color: white;
                    }
                }
                .current-month{
                    color: #333333;
                    .dayStyle{
                        display: inline-block;
                        width: px2rem(6);
                        height: px2rem(6);
                        border-radius: 50%;
                        text-align: center;
                        line-height: px2rem(8);
                        cursor: pointer;
                    }
                    .dayStyle:hover{
                        background: #00BDFF;
                        color: #ffffff;
                        border-radius: 50%;
                    }
                    .today-style{
                        border-radius: 50%;
                        background: #58d321;
                    }
                    .selected-style {
                        background: #00BDFF;
                        color: #ffffff;
                        border-radius: 50%;
                    }
                    .today-flag{
                        display: block;
                        background: #58D68D;
                        color: #fff;
                        border-radius: 50%;
                    }
                }
                
            }
		}
    }
    .plan {
        width: 80%;
        height: px2rem(40);
        .title {
            width: 100%;
            height: px2rem(6);
            background-color: #58D68D;
            display: flex;
            justify-content: center;
            align-content: center;
            span {
                font-size: px2rem(4);
                color: white;
            }
        }
        .content {
            width: 100%;
            height: px2rem(36);
            background-color: #fff;
            overflow: scroll;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            #contentPlan {
                width: 90%;
            }
        }
    }
}
</style>
