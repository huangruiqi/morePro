<template>
    <div class="leftSon">
        <div class="leftTitle">
            <span>课程管理系统</span>
        </div>
        <div class="leftContent">
            <div class="easyInfor">
                <img src="../../assets/img/head.png" alt="头像">
                <span v-if="allInfor.information">{{allInfor.information[0].name}}</span>
            </div>
            <div class="nav">
                <!-- <router-link to="/calender"> -->
                    <i class="icon-message" id="message" ></i>
                <!-- </router-link> -->
                <span>|</span>
                <!-- <router-link to="/login"> -->
                    <i class="icon-config" id="config" @click="destroyCalender()"></i>
                <!-- </router-link> -->
                      
            </div>
            <!-- <router-view></router-view> -->
            <calender :allInfor="allInfor" :style="{display: display}"></calender>
            <!-- <login v-if="path=='/login'"></login>  -->
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import calender from './calender'
import login from './login'
export default {
    data() {
        return {
            display: 'flex'
        }
    },
    mounted() {
    },
    props: ['allInfor'],
    methods: {
       destroyCalender() {
           this.display = 'none';
       }
    },
    components: {
        calender,
        login
    },
    watch: {
        allInfor() {
            //this.allInfor = this.allInformation;
        }
    }
}
</script>

<style lang="scss">
@import "../../styles/main";
.leftSon {
    width: 100%;
    height: 100%;
    .leftTitle {
        height: 8%;
        width: 100%;
        background-color: #3A362B;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
            // display:block;
            // text-align: center;
            // padding: 6%;
            // margin: 0 auto; 
            color: white;
            font-weight: 700;
            font-size: px2rem(6);
        }
    }
    .leftContent {
        width: 100%;
        height: 92%;
        background-color: #4F4B40;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        .easyInfor {
            width: 100%;
            height: px2rem(20);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
            img {
                border-radius: 50%;
                width: px2rem(10);
                cursor: pointer;
            }
            span {
                font-size: px2rem(3.5);
                color: #A8ABA9;
                font-weight: 550;
                cursor: pointer;
            }
        }
        .nav{
            width: 100%;
            height: px2rem(14);
            border-bottom: px2rem(0.5) solid #5E5A4F;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .icon-message {
                float: left;
                font-size: px2rem(6);
                color: #8D8B83;
                font-weight: 600;
                cursor: pointer;
            }
            #message:hover {
                font-size: px2rem(6);
                color: white;
                font-weight: 800;
                cursor: pointer;
            }
            span {
                font-size: px2rem(4);
                color: #5E5A4F;
                font-weight: 600;
            }
            .icon-config{
                float: left;
                font-size: px2rem(6);
                color: #8D8B83;
                font-weight: 600;
                cursor: pointer;
            }
            #config:hover {
                font-weight: 800;
                color: #fff;
            }
        }
    }
}
</style>
