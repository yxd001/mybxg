define(['jquery','template','utile'],function($,template,utile){
//���õ������˵�ѡ��
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