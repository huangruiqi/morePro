import request from '../utils/axios';
import qs from 'qs'
// import axios from 'axios';
//配置GET
const config = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    baseURL: 'http://5bf6912ca1a6a70013726301.mockapi.io'
}
//用文童的测试
const configGet = {
    method: 'GET',
    // headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    // },
    baseURL: 'http://120.79.94.90:8080/gh-manage'
}
//配置post
const configPost = {
    method: 'post',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    baseURL: 'http://5bf6912ca1a6a70013726301.mockapi.io'
}
//配置delete
const configDelete = {
    method: 'delete',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    baseURL: 'http://5bf6912ca1a6a70013726301.mockapi.io'
}
//请求举报文章数据
export function queryReportArtical() {
    return request('/reportArtical', config);
}
//请求举报资源数据
export function queryReportSource() {
    return request('/reportArtical', config);
}
//请求举报评论数据
export function queryReportComment() {
    return request('/comment/selectReportComment', configGet);
}

//请求举报评论数据
export function getReportCommentDetail(id) {
    return request('/comment/selectCommentDetail?commentId=' + id, configGet);
}

//提交举报文章的通知信息
export function postReportArtical(data) {
    // console.log(data);
    const dataAll = qs.stringify(data);
    return request('/reArticalInformation', {data: dataAll ,...configPost});
}
//提交举报文章的冻结信息
export function postStopArtical(data) {
    const dataAll = qs.stringify(data);
    return request('/stopArticalInfornmation', { data: dataAll, ...configPost });
}
//提交举报资源的通知信息
export function postReportSource(data) {
    // console.log(data);
    const dataAll = qs.stringify(data);
    return request('/reArticalInformation', { data: dataAll, ...configPost });
}
//提交举报资源的冻结信息
export function postStopSource(data) {
    const dataAll = qs.stringify(data);
    return request('/stopArticalInfornmation', { data: dataAll, ...configPost });
}
//提交举报评论的通知信息
export function postReportComment(data) {
    // console.log(data);
    const dataAll = qs.stringify(data);
    return request('/reArticalInformation', { data: dataAll, ...configPost });
}
//提交举报评论的冻结信息
export function postStopComment(data) {
    const dataAll = qs.stringify(data);
    return request('/stopArticalInfornmation', { data: dataAll, ...configPost });
}

//删除举报文章数据行
export function deleteArtical(id) {
    const dataAll = qs.stringify(id);
    return request('/deleteData', { data: dataAll, ...configPost });
}
//删除举报资源数据行
export function deleteSource(id) {
    const dataAll = qs.stringify(id);
    return request('/deleteData', { data: dataAll, ...configPost });
}
//删除举报评论数据行
export function deleteComment(id) {
    const dataAll = qs.stringify(id);
    return request('/deleteData', { data: dataAll, ...configPost });
}
