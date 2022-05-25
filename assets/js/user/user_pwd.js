$(function(){
    var form = layui.form;
    //添加自定义的验证方式
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        samepwd:function(value){
            if(value === $('[name=oldpwd]').val()){
                return '和旧密码一致重新输入';
            }
            
        },
        repwd:function(value){
            if(value !==$('[name=newpwd]').val()){
                return'密码两次不一致'
            }

        }

    })
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success: function(res){
               console.log(res); 
            }
        })

    })
})