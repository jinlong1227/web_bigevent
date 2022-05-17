// 每次调用$.ajax() 或 $.get()或 $.post() 之前
// 会先调用$.ajaxPrefliter()这个函数
//  在这个函数中 可以拿到我们配置的对象 
$.ajaxPrefliter(function (options) {
    // options 是传递过来的 参数  options.url 与 根目录进行拼接
    options.url = 'http://www.liulongbin.top:3007' + options.url
})
