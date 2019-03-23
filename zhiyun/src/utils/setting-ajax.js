export default function settingAjax(url) {
    var xhr = ''
    var requestData = ''
    // 兼容性处理
    if(window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
    }else{
        // xhr = new ActiveXObject("Microsoft.XMLHTTP")
    }
    xhr.open('GET', url, true)
    xhr.send(null)
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
            if((xhr.status >= 200 && xhr.status < 300) || (xhr.status === 304)) {
                // 返回的参数
                requestData = xhr.responseText
                var data = JSON.parse(requestData)
                if(data.code === 1) {
                    alert(data.msg)
                }else if (data.code === 0) {
                    alert(data.msg)
                }
            }else{
                // 请求数据错误的处理函数
            }
        }else{
            // ajax发送失败，没有得到响应数据
        }
    }
}
