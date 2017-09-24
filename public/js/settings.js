define(['jquery','template','ckeditor','uploadify','region','datepicker','language'],function($,template,CKEDITOR){
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
            });

            //�����ı�
            CKEDITOR.replace('editor',{
                toolbarGroups : [
                    { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
                    { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
                    { name: 'links', groups: [ 'links' ] },
                ]
            })
        }
    })
})
