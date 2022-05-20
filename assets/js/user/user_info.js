$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })
    initUserInfo()
    // 初始化 用户信息模块
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }

                //  调用 form.val('filter', object); 快速为表单赋值

                form.val('userInfo', res.data)
            }
        })
    }

    // 重置表单数据
    $('#btnReset').on('click', function (e) {
        // 阻止表单默认提交行为
        e.preventDefault()
        // 重新获取用户信息，填写表单
        initUserInfo()
    })

    //监听 提交表单信息 的事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        // var data = {
        //     id: $('#id').val(),
        //     nickname: $('#nickname').val(),
        //     email: $('#email').val(),
        // }
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败')
                    console.log(data);
                }
                layer.msg('修改用户信息成功')


                // 调用 父级里面的方法
                window.parent.getUserIfon()

            }
        })

    })
})