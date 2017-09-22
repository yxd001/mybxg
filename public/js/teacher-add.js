define(['jquery','template','utile'],function ($,template,utile) {
  //console.log(location);
  var tcId = utile.qs('tc_id');
  //console.log(tcId)//结果为id值
  if (tcId) {
    //编辑
      $.ajax({
        type:'get',
        url:'/api/teacher/edit',
        data:{tc_id:tcId},
        dataType:'json',
        success:function(data){
         //console.log(data);
         data.result.operate='编辑讲师'
         var html = template('temll',data.result);
         $('#teacherAf').html(html);
        }
      })

  }else{
    //添加
     var html = template('temll',{operate:'添加讲师'});
         $('#teacherAf').html(html);
  }


})
