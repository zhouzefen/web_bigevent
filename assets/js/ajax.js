$(function() {
    $.ajaxPrefilter(function(options) {
        options.url = 'http://ajax.frontend.itheima.net' + options.url;
        console.log(options.url);
        console.log(options.responseJSON);
        //添加请求头
        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }

        options.complete = function(res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                //清楚访问权限
                localStorage.removeItem('token');
                //强制跳转登录页面
                location.href = 'login.html';
            }
        }
    })
})