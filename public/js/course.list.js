define(['jquery','template','utile'],function($,template,utile){
//设置导航栏菜单选中
    utile.setMenu(location.pathname);

    $.ajax({
        type:'get',
        url:'/api/course',
        dataType:'json',
        success:function(data){
            var html = template('coursetcl',{list:data.result});
            $('#courseIofo').html(html);
        }
    })
})