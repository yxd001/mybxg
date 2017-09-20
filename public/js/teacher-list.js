define(['jquery','template'],function ($,template) {
  $.ajax({
    type:'get',
    url:'/api/teacher',
    dataType:'json',
    success:function(data){
      console.log(data);
      var html = template('template',{list:data.result});
      $('#teacheinfo').html(html);
    }
  })
});
