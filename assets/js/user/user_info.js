$(function(){
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname:function(value){
            if(value.length > 6){
                return '用户昵称字符必须在1~6个字符之间';
            }

        }

    })
    
   
   
})
listUserInfo();
//获取用户的基本信息
function listUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function(res){
            if(res.status !==0){
                return layer.msg('请求信息失败')
            }
            layui.form.val('formUserInfo',res.data)
        }
    })
}
//给重置按钮添加点击事件
$('#btnRest').on('click',function(e){
    //阻止表单默认行为
    e.preventDefault();
    listUserInfo();
})
//给提交按钮添加事件 修改用户的个人信息
$('.layui-form').on('submit',function(e){
    //阻止表单的默认行为
    e.preventDefault();
    //修改用户的个人信息
    $.ajax({
        method:'POST',
        url:'/my/userinfo',
        data:$(this).serialize(),
        success:function(res){
            if(res.status !==0){
                return  layer.msg('更新用户失败')
            }
           layer.msg('更新成功')
            //调用父元素index的方法
            window.parent.getUserInfo();
        }
    })
})