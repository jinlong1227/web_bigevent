//1. 每次调用$.ajax() 或 $.get()或 $.post() 之前
// 会先调用$.ajaxPrefliter()这个函数
//  在这个函数中 可以拿到我们配置的对象 
$.ajaxPrefilter(function (options) {
    // options 是传递过来的 参数  options.url 与 根目录进行拼接
    options.url = 'http://www.liulongbin.top:3007' + options.url

    //2. 统一为有权限的接口 设置headers 请求 
    // 如果有 /my/ 证明存在权限 
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    // complete 回调函数 控制 用户的访问权限 
    // 全局统一挂载 complete 回调函数 
    options.complete = function (res) {
        // 在回调函数中，使用res.responseJSON 拿到响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token 
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页面
            location.href = '/login.html'

        }
    }
})
