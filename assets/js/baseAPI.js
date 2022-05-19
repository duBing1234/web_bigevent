// 每次调用$.post,$.get,$.ajax都会调用$.ajaxprefilter函数
// 在这个函数里可以拿到请求里的配置对象
$.ajaxPrefilter(function(options){
    options.url='http://www.liulongbin.top:3007'+options.url
})