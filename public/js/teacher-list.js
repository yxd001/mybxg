// 讲师列表功能
define(['jquery','template'],function ($,template) {
  $.ajax({
    type:'get',
    url:'/api/teacher',
    dataType:'json',
    success:function(data){
      //console.log(data);
      var html = template('template',{list:data.result});
      $('#teacheinfo').html(html);
      //注销和启用功能
      $('.zx').click(function(){
        var that =$(this);
        //获取当前按钮的父元素 当前按钮的父元素是td 标签
          var td = $(this).closest('td');
          //添加data-tcId，data-status
          var tcId = td.attr('data-tcId');
          var status = td.attr('data-status');
          //ajax  调用接口
          $.ajax({
            type:'post',
            url:'/api/teacher/handle',
            dataType:'json',
            data:{tc_id:tcId,tc_status:status},
            success:function(data){
             if(data.code==200){
              //给td添加状态，修改为后台数据的状态(页面状态)
               td.attr('data-status',data.result.tc_status);
                //改变文字  修改按钮文字  就是this   用that
                if(data.result.tc_status==0){
                  $(that).text('注销');
                }else{
                  $(that).text('启用');
                }
             }
            }
          })
      });
    }
  })
});
