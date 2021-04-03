$(function() {
    $("#reset").on('click', function() {
        $(".reg-box").show();
        $('.login-box').hide();
    })

    $('#login-go').on('click', function() {
        $(".reg-box").hide();
        $('.login-box').show();
    })

    var form = layui.form;
    form.verify({
            paw: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],

            repaw: function(value) {
                var pwd = $('.reg-box [name = password]').val();
                if (value != pwd) {
                    return '两次密码输入不一致'
                }
            }

        })
        // 注册表单提交事件
    var data = {
        username: $('#nn').val(),
        password: $('#pp').val()
    };
    $('#form-reg').on('submit', function(e) {
        e.preventDefault()
        $.post('/api/reguser', {
            username: $('#nn').val(),
            password: $('#pp').val()
        }, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
                // return console.log(res.message);
            }
            // console.log('注册成功');
            layer.msg('注册成功');
            $('#login-go').click();

        })

    })


    //登录事件
    // $('#logina').on('submit', function(e) {
    //     e.preventDefault();
    //     $.post('http://ajax.frontend.itheima.net/api/login', { username: $('#kk').val(), password: $('#ll').val() }, function(res) {
    //         if (res.status == 1) {
    //             return layer.msg(res.message);
    //         } else if (res.status == 0) {
    //             layer.msg('登录成功');
    //             // console.log(res.token);
    //             location.href = 'index.html';
    //         }

    //     })
    // })
    $('#logina').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',

            data: { username: $('#kk').val(), password: $('#ll').val() },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功');

                localStorage.setItem('token', res.token)
                location.href = 'index.html';
            }


        })
    })


})