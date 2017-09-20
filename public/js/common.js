define(['jquery','cookie'],function($){
  //NProgress.start();

  //NProgress.done();

  $('.navs ul').prev('a').on('click', function () {
    $(this).next().slideToggle();
  });
  //点击退出按钮
  $('#logoutBtn').click(function(){
    $.ajax({
      type:'post',
      url:'/api/logout',
      dataType:'json',
      success:function(date){
        if (date.code==200) {
          //如果退出成功就跳转登录界面
          location.href='/main/login';
        }
      }
    })
  })
//检测用户是否登录
  var flag =$.cookie('PHPSESSID');
 if(!flag&&location.pathname!='/main/login'){
  //如果cookie不存在，跳转到登录页
    location.href = '/main/login';
 }
 
    
  
//设置一个用户头像信息
console.log($.cookie('loginInfo'));
var loginInfo = $.cookie('loginInfo');
loginInfo = loginInfo&&JSON.parse(loginInfo);
$('.aside .profile img').attr('src',loginInfo.tc_avatar);
$('.aside .profile h4').html(loginInfo.tc_name);
});
	
