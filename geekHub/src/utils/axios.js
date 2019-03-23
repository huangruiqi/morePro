import axios from 'axios';

export default function request(url, options) {
    return axios(url, options);
}
