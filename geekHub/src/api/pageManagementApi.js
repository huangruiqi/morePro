import Axios from 'axios';

export const getQiniuUpToken = (payload) => {
    return Axios({
        url: 'http://120.79.94.90:8080/page/QiniuUpToken',
        method: 'GET',
        params: payload
    });
}