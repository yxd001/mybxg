define(['jquery','template','utile'],function($,template,utile){
   //���õ����˵�ѡ��
    utile.setMenu('/course/add');

    //ѡ��γ�id
    var csId =  utile.qs('cs_id');


    //���ӿڣ�������
    $.ajax({
        type:'get',
        url:'/api/course/lesson',
        data:{cs_id:csId},
        dataType:'json',
        success:function(data){
            //console.log(data);
            var html = template('lessonTpl',data.result);
            $('#lessonInfo').html(html);

            $('#lessonBtn').click(function(){

            })
        }
    })
});
