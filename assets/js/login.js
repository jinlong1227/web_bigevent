$(function () {
    //给‘去注册账号’添加单击事件
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 给‘去登录’添加点击事件
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 从 layui 中获取 from 属性 ，引入layui属性
    var form = layui.form;
    var layer = layui.layer
    // 通过form.verify（）来校验规则
    form.verify({
        // 自定义 一个 密码校验规则  引入密码校验规则 多个规则用 | 隔开
        pwd: [/^[\S]{6,12}$/,
            '密码必须6到12位,且不能出现空格'],
        // 给确认密码框 添加这个校验规则
        // 获取 密码框输入的值 判断是否与确认框输入的值一样
        repwd: function (value) {
            if ($('.reg-box #pwd').val() != value) {
                return '两次密码不一致'
            }
        }

    })

    // 给注册页面添加 post 请求 
    $('#form-reg').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        var data = { username: $('#username').val(), password: $('#pwd').val() }
        // 发送ajax 中post请求
        $.post('/api/reguser',
            data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录');
                // 注册成功之后 模拟点击了去登陆 进入登录页面
                $('#link_login').click()
            })
    })

    // 给登录页面添加 post 请求
    $('#form-login').on('submit', function (e) {
        // 阻止默认行为
        e.preventDefault()
        // 获取到输入得数据
        var data = { username: $('#name-login').val(), password: $('#pwd-login').val() }
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单里得元素
            // data: $(this).serialize(),
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登陆成功')
                console.log(res.token);
                // 登录成功后将 token 得值 存到本地存储
                localStorage.setItem('token', res.token);
                // 登陆成功后跳转到 首页
                location.href = '/index.html'
            }

        })

    })
})