import Qs from 'qs'
export default{
    url: '/information',
	baseURL: 'localhost:8080/api',
	method:'POST',
	transformRequest: [function (data) {
	    //为了避免qs格式化时对内层对象的格式化先把内层的对象转为
        data.CustData = JSON.stringify(data.CustData);
	    //由于使用的form-data传数据所以要格式化
	    data = Qs.stringify(data);
	    return data;
	}],
	transformResponse: [function (data) {
	    return data;
	}],
	headers: {'Content-Type':'application/x-www-form-urlencoded'},
	params: {
	},
	paramsSerializer: function(params) {
	    return Qs.stringify(params)
	},
    data: {
    	
  	},
    timeout: 10000,
    withCredentials: false, 
    responseType: 'json', 
    validateStatus: function (status) {
            return status >= 200 && status < 300; // default
    },
    maxRedirects: 5// default
}
