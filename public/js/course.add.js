define(['jquery','utile','form'],function($,utile){
    //���õ����˵�ѡ��
    utile.setMenu(location.pathname);

//�󶨵���¼�����������γ̰�ť   ʹ����֤�����
    $('#courseBtn').click(function(){
       $('#courseForm').ajaxSubmit({
           type:'post',
           url:'/api/course/create',
           dataType:'json',
           success:function(data){
               if(data.code==200){
                   //��ת����һ��
                   location.href='/course/besic?cs_id'+data.result.cs_id;
               }
           }
       })
    });
});
