define(['jquery','utile','form'],function($,utile){
    //设置导航菜单选中
    utile.setMenu(location.pathname);

//绑定点击事件，点击创建课程按钮   使用验证表单插件
    $('#courseBtn').click(function(){
       $('#courseForm').ajaxSubmit({
           type:'post',
           url:'/api/course/create',
           dataType:'json',
           success:function(data){
               if(data.code==200){
                   //跳转到下一步
                   location.href='/course/besic?cs_id'+data.result.cs_id;
               }
           }
       })
    });
});
