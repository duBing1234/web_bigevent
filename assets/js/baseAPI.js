// 每次调用$.post,$.get,$.ajax都会调用$.ajaxprefilter函数
// 在这个函数里可以拿到请求里的配置对象
$.ajaxPrefilter(function(options){
    // 拼接url的网络地址
    options.url='http://www.liulongbin.top:3007'+options.url;
    //无论请求成功还是失败都会调用complete函数
        
    options.complete=function(res){
        //判断获取数据成功了还是失败了 失败了就退回登录页面
        if(res.responseJSON.status===1 && res.responseJSON.message==='身份认证失败！'){
            //清空本地的token
            localStorage.removeItem('token');
            //强制退回登录页面
            location.href='/login.html';

        }
    }
    //有权限的申请
    if(options.url.indexOf('/my/')!==-1){
        options.headers={
            Authorization: localStorage.getItem('token') || ""
        }
    }

})