define(['jquery','template','uploadify','region'],function($,template){
    $.ajax({
        type:'get',
        url:'/api/teacher/profile',
        dataType:'json',
        success:function(data){
            //console.log(data)
            var html = template('settingsTpl',data.result);
            $('#settingsInfo').html(html);
            //����ͷ���ϴ�
            $('#upfile').uploadify({
                width:120,
                height:120,
                buttonText:'',
                //����������Ϊ��
                itemTemplate:'<span></span>',
                swf:'/public/assets/upload/uploadify.swf',
                //��ַ  ��̨�ӿ�
                uploader:'/api/uploader/avatar',
                //���ӿڶ�Ӧ
                fileObjName:'tc_avatar',
                //�ϴ��ɹ����ص�����   ����������  ��Ҫ�ڶ�������
                onUploadSuccess:function(a,b){
                   // console.log(b);//�ַ������
                    //�ַ���ת���ɶ���
                    var obj =JSON.parse(b);
                    // ���ͼƬ ��src����  ��ȡ����result �е�path·��
                    $('.preview img').attr('src',obj.result.path);
                }
            });
            //����ʡ������������
            $('#pcd').region({
                url:'/public/assets/jquery-region/region.json',
            })
        }
    })
})
