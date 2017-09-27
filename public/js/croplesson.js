define(['jquery','template','utile','bootstrap','form'],function($,template,utile){
   //设置导航菜单选中
    utile.setMenu('/course/add');

    //选择课程id
    var csId =  utile.qs('cs_id');


    //调接口，发请求
    $.ajax({
        type:'get',
        url:'/api/course/lesson',
        data:{cs_id:csId},
        dataType:'json',
        success:function(data){
            //console.log(data);
            var html = template('lessonTpl',data.result);
            $('#lessonInfo').html(html);
            //点击课时按钮弹窗 添加课时
            $('#lessonBtn').click(function(){
                var html = template('lesTpl',{operate:'添加课时'});
                $('#lesInfo').html(html);
                //调用modal模态框方法
                $('#chapterModal').modal();
                //点击添加按钮
                $('#addOrlenssonBtn').click(function(){
                    $('#lessonForm').ajaxSubmit({
                        type:'post',
                        url:'/api/course/chapter/add',
                        data:{ct_cs_id:csId},
                        dataType:'json',
                        success:function(data){
                            // console.log(data)
                            if(data.code==200){
                                location.reload();
                            }
                        }
                    })
                })
            });
            //编辑课时
            $('.bjBtn').click(function(){
                //获取课时id
                var ctId = $(this).attr('data-ctId');
                //console.log(ctId);
                //调用接口  渲染页面
                $.ajax({
                    type:'get',
                    url:'/api/course/chapter/edit',
                    data:{ct_id : ctId},
                    dataType:'json',
                    success:function(data){
                        //console.log(data)
                        data.result.operate='编辑课时';
                        var html = template('lesTpl',data.result);
                        $('#lesInfo').html(html);
                        //调用modal模态框方法
                        $('#chapterModal').modal();
                        $('#addOrlenssonBtn').click(function(){
                            $('#lessonForm').ajaxSubmit({
                                type:'post',
                                url:'/api/course/chapter/modify',
                                data:{ct_cs_id:csId,ct_id:ctId},
                                dataType:'json',
                                success:function(data){
                                    // console.log(data)
                                    if(data.code==200){
                                        location.reload();
                                    }
                                }
                            })
                        })
                    }
                })

            })
        }
    })
});
