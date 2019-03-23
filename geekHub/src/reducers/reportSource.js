import { CHANGE_REPORTSOURCE_DATA, DELETE_REPORTSOURCE_DATA } from "../actions/actionTypes";

const defaultState = [{
    key: '1',
    name: '文童',
    title: '关于webSocket',
    reporter: '杨雨涵',
    category: ['前端', '后台'],
    tags: ['html5', 'js'],
    authority: '内部',
    pullTime: '2018-1-1',
    reportTime: '2018-3-21'
}, {
    key: '2',
    name: '文童',
    title: '关于webSocket',
    reporter: '杨雨涵',
    category: ['前端', '后台'],
    tags: ['html5', 'js'],
    authority: '内部',
    pullTime: '2018-1-1',
    reportTime: '2018-3-21'
}, {
    key: '3',
    name: '文童',
    title: '关于webSocket',
    reporter: '杨雨涵',
    category: ['前端', '后台'],
    tags: ['html5', 'js'],
    authority: '内部',
    pullTime: '2018-1-1',
    reportTime: '2018-3-21'
}, {
    key: '4',
    name: '文童',
    title: '关于webSocket',
    reporter: '杨雨涵',
    category: ['前端', '后台'],
    tags: ['html5', 'js'],
    authority: '内部',
    pullTime: '2018-1-1',
    reportTime: '2018-3-21'
}, {
    key: '5',
    name: '文童',
    title: '关于webSocket',
    reporter: '杨雨涵',
    category: ['前端', '后台'],
    tags: ['html5', 'js'],
    authority: '内部',
    pullTime: '2018-1-1',
    reportTime: '2018-3-21'
}, {
    key: '6',
    name: '文童',
    title: '关于webSocket',
    reporter: '杨雨涵',
    category: ['前端', '后台'],
    tags: ['html5', 'js'],
    authority: '内部',
    pullTime: '2018-1-1',
    reportTime: '2018-3-21'
}, {
    key: '7',
    name: '文童',
    title: '关于webSocket',
    reporter: '杨雨涵',
    category: ['前端', '后台'],
    tags: ['html5', 'js'],
    authority: '内部',
    pullTime: '2018-1-1',
    reportTime: '2018-3-21'
}, {
    key: '8',
    name: '文童',
    title: '关于webSocket',
    reporter: '杨雨涵',
    category: ['前端', '后台'],
    tags: ['html5', 'js'],
    authority: '内部',
    pullTime: '2018-1-1',
    reportTime: '2018-3-21'
}, {
    key: '9',
   name: '文童',
    title: '关于webSocket',
    reporter: '杨雨涵',
    category: ['前端', '后台'],
    tags: ['html5', 'js'],
    authority: '内部',
    pullTime: '2018-1-1',
    reportTime: '2018-3-21'
}, {
    key: '10',
    name: '文童',
    title: '关于webSocket',
    reporter: '杨雨涵',
    category: ['前端', '后台'],
    tags: ['html5', 'js'],
    authority: '内部',
    pullTime: '2018-1-1',
    reportTime: '2018-3-21'
}, {
    key: '11',
    name: '文童',
    title: '关于webSocket',
    reporter: '杨雨涵',
    category: ['前端', '后台'],
    tags: ['html5', 'js'],
    authority: '内部',
    pullTime: '2018-1-1',
    reportTime: '2018-3-21'
}, {
    key: '12',
    name: '文童',
    title: '关于webSocket',
    reporter: '杨雨涵',
    category: ['前端', '后台'],
    tags: ['html5', 'js'],
    authority: '内部',
    pullTime: '2018-1-1',
    reportTime: '2018-3-21'
}, {
    key: '13',
    name: '文童',
    title: '关于webSocket',
    reporter: '杨雨涵',
    category: ['前端', '后台'],
    tags: ['html5', 'js'],
    authority: '内部',
    pullTime: '2018-1-1',
    reportTime: '2018-3-21'
}, {
    key: '14',
    name: '文童',
    title: '关于webSocket',
    reporter: '杨雨涵',
    category: ['前端', '后台'],
    tags: ['html5', 'js'],
    authority: '内部',
    pullTime: '2018-1-1',
    reportTime: '2018-3-21'
}, {
    key: '15',
    name: '文童',
    title: '关于webSocket',
    reporter: '杨雨涵',
    category: ['前端', '后台'],
    tags: ['html5', 'js'],
    authority: '内部',
    pullTime: '2018-1-1',
    reportTime: '2018-3-21'
}];

//删除数据行
const deleteKey = (state, key) => {
    const newState = JSON.parse(JSON.stringify(state));
    if (key == newState.length) {
        newState.pop();
        return newState;
    } else {
        newState.forEach((data, i, dataAll) => {
            if (i + 1 >= key && i + 1 < dataAll.length) {
                newState[i] = newState[i + 1];
            } else if (i + 1 >= key && i + 1 == dataAll.length) {
                newState.pop();
            } 
        });
    }
    return newState;
}
export default (state = [], action) => {
    switch (action.type) {
        case CHANGE_REPORTSOURCE_DATA:
            return action.objectArray;
        case DELETE_REPORTSOURCE_DATA:
            return deleteKey(state, action.key);
        default: return state;
    }
}