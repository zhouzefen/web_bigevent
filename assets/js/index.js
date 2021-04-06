$(function() {
    //获取用户信息
    getuserInfo();
    //推出登录
    var layer = layui.layer;
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            //清楚本地存储中的token
            localStorage.removeItem('token');
            //跳回登录页面
            location.href = 'login.html';

            layer.close(index);
        });
    })

})

function getuserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers是头部请求配置对象
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui, layer.msg('获取用户信息失败！')
            }
            //渲染头像
            renderAvatar(res.data);


        },
        // 无论成功还是失败都会执行complete
        // complete: function(res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //清楚访问权限
        //         localStorage.removeItem('token');
        //         //强制跳转登录页面
        //         location.href = 'login.html';
        //     }
        // }

    })
}




function renderAvatar(user) {
    // $('.layui-nav-img').css('href','user.user_pic')
    //1.获取用户名
    var name = user.nickname || user.username;
    //2.设置欢迎
    $('#welcome').html("欢迎 &nbsp;&nbsp;" + name);
    //3.设置头像
    if (user.user_pic !== null) {
        //3.1渲染图片头像
        $('.layui-nav-img').attr('src', 'user.user_pic').show();
        $('.text-avatar').hide();

    } else {
        //3.2渲染文字头像
        var first = name[0].toUpperCase();
        $('.layui-nav-img').hide();
        $('.text-avatar').html(first);
    }
}