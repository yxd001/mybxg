define(['jquery','template','utile'],function($,template,utile){
    //设置导航菜单选中
   utile.setMenu('/course/add');
    //获取课程id
   var csId=  utile.qs('cs_id');//cs_id=1  1
   // console.log(csId)
    //获取操作位  （编辑时候的内容）
    var flag = utile.qs('flag');

    //根据课程id  获取课程相关信息
    $.ajax({
        type:'get',
        url:'/api/course/basic',
        data:{cs_id:csId},
        dataType:'json',
        success:function(data){
            //console.log(data)
            //判断课程添加的时候显示课程添加，课程编辑的时候是课程编辑
          if(flag){
              data.result.operate='课程编辑';
          }else{
              data.result.operate='课程添加';
          }

            var html = template('courseTpl',data.result);
            $('#courseInfo').html(html);
        }
    })
});