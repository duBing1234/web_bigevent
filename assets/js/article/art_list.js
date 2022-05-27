$(function(){
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;
    //  用模板把时间美化
    template.defaults.imports.dataFormat = function(date){
            const dt = new Date(date)
            var y = dt.getFullYear()
            var m = padZero(dt.getMonth() + 1)
            var d = padZero(dt.getDate())
            var hh = padZero(dt.getHours())
            var mm = padZero(dt.getMinutes())
            var ss = padZero(dt.getSeconds())
           return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    
    }
    //补零的方法
    function padZero(n){
        return  n >9 ? n : '0'+ n;

    }
    // 定义一个对象保存发请求时的数据
    var p={
        pagenum:1,//页码值
        pagesize:2,//每页有几条数据
        cate_id:'',//文章分类的ID
        state:'已发布'//发布的状态

    }
    initTable()
    //获取文章的列表
    function initTable(){
        $.ajax({
            method:'GET',
            url:'/my/article/list',
            data:p,
            success:function(res){
                if(res.status !==0){
                    return layer.msg('获取文章失败')
                }
                // 使用模板渲染文章列表
                var htmlStr = template('tpl-table',res)
                $('tbody').html(htmlStr)
                renderPage(res.total);

            }
        })

    }
    initCate();
    // 获取文章分类
    function initCate(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                var htmlStr = template('tpl-cate',res)
                $('[name=cate_id]').html(htmlStr)
                // 通过 layui 重新渲染表单区域的UI结构
                form.render()

            }
        })

    }
    // 给筛选按钮添加提交事件
    $('#form-search').on('submit',function(e){
        e.preventDefault();
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();
        p.cate_id = cate_id;
        p.state =state;
        initTable(); 
        
    })
    //获取文章的条数
    function renderPage(total){
       // 调用 laypage.render() 方法来渲染分页的结构
        laypage.render({
           elem: 'pageBox', // 分页容器的 Id
           count: total, // 总数据条数
           limit: p.pagesize, // 每页显示几条数据
           curr: p.pagenum ,// 设置默认被选中的分页
           layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
           limits: [2, 3, 5, 10],//自定义每页的个数

           // 分页发生切换的时候，触发 jump 回调
          jump: function(obj,first) {
           // 把最新的页码值，赋值到 q 这个查询参数对象中
           p.pagenum = obj.curr;
           p.pagesize = obj.limit
          // 根据最新的 q 获取对应的数据
           if(!first){
            initTable()
           } 
          }
         
        })
    }
    // 给删除绑定点击事件
    $('tbody').on('click','.btn-delete',function(){
        // 获取删除按钮的个数
        var len = $('.btn-delete').length
        var id  = $(this).attr('data-id');
        // 询问用户是否要删除数据
       layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index)
       {
           $.ajax({
            method:'GET',
            url:'/my/article/delete/'+id,
            success:function(res){
                if(res.status !==0){
                    return layer.msg('删除文章失败')
                }
               
                layer.msg('删除文章成功')
                //当页面上删除的按钮只有一个的时候说明删除了 页面上就没有数据了
                //所以页数就要减1 当页面等于一时就不减
                if(len===1){
                    p.pagenum = p.pagenum===1 ? 1 : p.pagenum-1                }
                initTable()
            }
          })
        })
    
    })

  

})