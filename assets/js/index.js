$(function () {
    // 调用 用户信息
    getUserIfon()
    // 给 退出绑定事件
    var layer = layui.layer;
    $('#btnLogOut').on('click', function () {
        // 弹出确认框
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            // 1. 清空本地存储 'token'
            localStorage.removeItem('token')
            // 2. 重新返回到首页
            location.href = '/login.html'
            // 关闭 询问框
            layer.close(index);
        });
    })
})


// 获取用户信息 函数
function getUserIfon() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 有权限的接口设置 headers 请求
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvater(res.data)
        },
        // 无论成功还是失败 都会调用这个函数 
        //写到了 baseAPI.js文件 里面
        // complete: function (res) {
        //     console.log(res);
        //     // 在回调函数中，使用res.responseJSON 拿到响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1. 强制清空 token 
        //         localStorage.removeItem('token')
        //         // 2. 强制跳转到登录页面
        //         location.href = '/login.html'

        //     }
        // }
    })
}
// 渲染用户头像
function renderAvater(user) {
    // 1. 获取用户名
    var name = user.nickname || user.username;
    // 2. 将用户名添加到 welcome
    $('#welcome').html('欢迎&nbsp&nbsp' + name)
    // 3. 按照需求渲染用户头像
    if (user.user_pic !== null) {
        // 3.1 显示图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //3.2 显示文本头像
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
        $('.layui-nav-img').hide()
    }
}



