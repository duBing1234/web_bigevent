$(function(){
    //点击注册去注册页面
    $('#link_reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();
    })
    //点击登录去登陆页面
    $('#link_login').on('click',function(){
        $('.login-box').show();
        $('.reg-box').hide();
    })
    // 表单的验证
    //从layui对象里获取form
    var form = layui.form;
    var layer = layui.layer;
    //用verify方法添加自定义表单规则
    form.verify({
        pad:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repad:function(value){
            var pad = $('.reg-box [name=password]').val();
            if(pad !==value)
            {
               return'两次的密码不统一' ;
            }

        }        
    }) 
    //注册的链接
    $('#form_reg').on('submit',function(e){
        //阻止默认提交事件
        e.preventDefault();
        //用post提交数据
        $.post('/api/reguser',
        {username:$('#form_reg [name=username]').val(),
        password:$('#form_reg [name=password]').val()},
        function(res){
            if(res.status !== 0 )
            {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录');
        })
        $('#link_login').click();
    })
    //监听登录的请求
    $('#form_login').on('submit',function(e){
        //阻止默认行为
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0)
                {
                    return layer.msg('登录失败');
                }
                //将登陆的token保存到localstorage里面
                localStorage.setItem('token',res.token)
                layer.msg('登录成功')
                location.href='index.html'

            }          
        })
    })
})