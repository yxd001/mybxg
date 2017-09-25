define(['jquery', 'template', 'ckeditor', 'uploadify', 'region', 'datepicker', 'language', 'validate', 'form'], function ($, template, CKEDITOR) {
    $.ajax({
        type: 'get',
        url: '/api/teacher/profile',
        dataType: 'json',
        success: function (data) {
            //console.log(data)
            var html = template('settingsTpl', data.result);
            $('#settingsInfo').html(html);
            //����ͷ���ϴ�
            $('#upfile').uploadify({
                width: 120,
                height: 120,
                buttonText: '',
                //����������Ϊ��
                itemTemplate: '<span></span>',
                swf: '/public/assets/upload/uploadify.swf',
                //��ַ  ��̨�ӿ�
                uploader: '/api/uploader/avatar',
                //���ӿڶ�Ӧ
                fileObjName: 'tc_avatar',
                //�ϴ��ɹ����ص�����   ����������  ��Ҫ�ڶ�������
                onUploadSuccess: function (a, b) {
                    // console.log(b);//�ַ������
                    //�ַ���ת���ɶ���
                    var obj = JSON.parse(b);
                    // ���ͼƬ ��src����  ��ȡ����result �е�path·��
                    $('.preview img').attr('src', obj.result.path);
                }
            });
            //����ʡ������������
            $('#pcd').region({
                url: '/public/assets/jquery-region/region.json',
            });

            //�����ı�
            CKEDITOR.replace('editor', {
                toolbarGroups: [
                    {name: 'clipboard', groups: ['clipboard', 'undo']},
                    {name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing']},
                    {name: 'links', groups: ['links']},
                ]
            });

            //������ύ  �������  �ύ��Ϣ
            $('#settingsForm').validate({
                //��ֹĬ�ϵ�
                sendForm: false,
                //������֤����Чʱ����
                valid: function () {
                    //��ȡ��ѡ�������˵����������
                    var p = $('#p').find('option:selected').text();
                    var c = $('#c').find('option:selected').text();
                    var d = $('#d').find('option:selected').text();
                    //����ƴ��
                    var hometown = p + '|' + c + '|' + d;

                    //ѭ�� ͬ�����ı�����  instanceʵ��  instances���ʵ��
                    for(var instance in CKEDITOR.instances){
                        CKEDITOR.instances[instance].updateElement();
                    }
                    $(this).ajaxSubmit({
                        type: 'post',
                        data: {tc_hometown: hometown},
                        //���¸�����Ϣ��ַ
                        url: '/api/teacher/modify',
                        dataType: 'json',
                        success: function (data) {
                            if (data.code == 200) {
                                //�޸ĳɹ�֮���޸�ˢ�µ�ǰҳ��
                                location.reload();
                            }
                        }
                    })
                }
            })
        }
    })
})
