$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })

    inituser_info();

    function inituser_info() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res);
                //快速为表单赋值
                form.val('formUserInfo', res.data);
            }
        })
    }

    //重置表单
    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        inituser_info();
    })

    //提交修改
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败');
                }
                // inituser_info();
                layer.msg('更新用户信息成功');

                //调用父页面函数
                window.parent.getuserInfo();
            }
        })
    })
})