$(function(){
    var form = layui.form;
    var layer = layui.layer;
    //获取文章的类别
    initArtCateList();
    function initArtCateList(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                if(res.status !==0){
                    return layer.msg('获取文章列表失败');
                }
                // 调用模板template方法
                var htmlStr = template('tpl-table',res)
                $('tbody').html(htmlStr);
            }
        })     
    }

    // 给按钮添加点击事件
    var indexAdd = null;
    $('#btnAddCate').on('click',function(){
       
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
          })
    })
    //用代理的形式给按钮添加submt事件
    $('body').on('submit','#form-add',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0)
                {
                    return layer.msg('添加分类失败');
                }
                initArtCateList()
                layer.msg('添加分类成功')
                //关闭弹窗
                layer.close(indexAdd)

            }
        })
    })
    //给按钮添加点击事件
    $('tbody').on('click','.btn-edit',function(){
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '编辑文章分类',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-id');
        $.ajax({
            method:'GET',
            url:'/my/article/cates/'+id,
            success:function(res){
                form.val('form-edit',res.data);

            }
        })     
    })
    //给修改的按钮添加submit事件
    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            method:"POST",
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg('修改分类失败')
                }
                initArtCateList()
                layer.msg('更新分类成功')
                layer.close(indexAdd)
            }
        })
    })
    // 用代理的方式给删除按钮绑定点击事件删除分类
    $('body').on('click','.btm-delete',function(){
        var id = $(this).attr('data-id');
        $.ajax({
            method:'GET',
            url:'/my/article/deletecate/'+id,
            success:function(res){
                if(res.status !==0){
                    return layer.msg('删除分类失败');
                }
                initArtCateList()
                layer.msg('删除分类成功');
            }
        })
    })
    
})