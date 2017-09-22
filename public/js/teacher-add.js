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
       // 处理表单url地址  修改讲师
       submitForm('/api/teacher/update');
        }
      })

  }else{
    //添加
     var html = template('temll',{operate:'添加讲师'});
         $('#teacherAf').html(html);
         // 处理表单url地址  添加讲师
       submitForm('/api/teacher/add');
  }

  //提交功能  封装一个方法  调用即可
    function  submitForm(url){
      $('#tjBtn').click(function(){
      $.ajax({
        type:'post',
        url:url,
        data:$('#teacherForm').serialize(),
        dataType:'json',
        success:function(data){
          if (data.code==200) {
            location.href = '/teacher/list';
          }
        }
      })
    })
    }
});
