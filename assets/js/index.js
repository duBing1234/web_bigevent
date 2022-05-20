$(function(){
    getUserInfo();
    var layer = layui.layer;
    //点击退出按钮 退出页面
    $('#btnLogout').on('click',function(){
        //提示用户是否退出
        layer.confirm('确定退出登录吗？', {icon: 3, title:'提示'}, function(index){
            //do something
            //删除token里的数据
            localStorage.removeItem('token');
            //跳转到登录页面
            location.href='/login.html'
            
            layer.close(index);
          });
    })

})
//获取用户的基本资料
function getUserInfo(){
    $.ajax({
        method:"GET",
        url:'/my/userinfo',
        success:function(res){
           if(res.status !== 0 )
           {
               return layui.layer.msg('获取失败');
           }
           renderAvatar(res.data);


        }
    })
}
//渲染用户的头像
function renderAvatar(user){
    //当用户有昵称时显示昵称 没有就显示用户名
    var name = user.nickname || user.username;
    //渲染到页面把用户名
    $('.welcome').html('欢迎&nbsp&nbsp'+name);
    //当用户有头像时渲染头像 没有时渲染name的第一位
    if(user.user_pic !== null)
    {
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $('.text_avatar').hide();

    }
    else{
        $('.layui-nav-img').hide();
        var firet = name[0].toUpperCase();

        $('.text_avatar').html(firet).show();
        
    }

}

