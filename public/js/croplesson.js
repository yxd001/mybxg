define(['jquery','template','utile'],function($,template,utile){
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

            $('#lessonBtn').click(function(){

            })
        }
    })
});
