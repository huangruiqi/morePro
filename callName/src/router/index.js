import Vue from 'vue'
import Router from 'vue-router'
import calender from '../complements/left/calender'
import login from '../complements/left/login'
import timeTable from "../complements/content/timeTable"
import seat from "../complements/content/seat"
import homework from "../complements/content/homework"
import exam from "../complements/content/exam"
import data from "../complements/content/data"
import callTheRoll from "../complements/content/callTheRoll"
import seatEssential from "../complements/content/seatChange/seatEssential"

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            redirect: "/timeTable"
        },
        {
            path: '/timeTable',
            component: timeTable
        },
        {
            path: '/seat',
            component: seat
        },
        {
            path: '/homework',
            component: homework
        },
        {
            path: '/exam',
            component: exam
        },
        {
            path: '/data',
            component: data
        },
        {
            path: '/callTheRoll',
            component: callTheRoll
        },
        {
            path: '/seat/classroom',
            component: seatEssential
        }
        // {
        //     path: '/login',
        //     name: 'login',
        //     component: login
        // }
        
    ]
})