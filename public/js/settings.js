define(['jquery', 'template', 'ckeditor', 'uploadify', 'region', 'datepicker', 'language', 'validate', 'form'], function ($, template, CKEDITOR) {
    $.ajax({
        type: 'get',
        url: '/api/teacher/profile',
        dataType: 'json',
        success: function (data) {
            //console.log(data)
            var html = template('settingsTpl', data.result);
            $('#settingsInfo').html(html);
            //处理头像上传
            $('#upfile').uploadify({
                width: 120,
                height: 120,
                buttonText: '',
                //进度条设置为空
                itemTemplate: '<span></span>',
                swf: '/public/assets/upload/uploadify.swf',
                //地址  后台接口
                uploader: '/api/uploader/avatar',
                //跟接口对应
                fileObjName: 'tc_avatar',
                //上传成功返回的内容   有三个参数  需要第二个参数
                onUploadSuccess: function (a, b) {
                    // console.log(b);//字符串结果
                    //字符串转化成对象
                    var obj = JSON.parse(b);
                    // 添加图片 的src属性  获取到的result 中的path路经
                    $('.preview img').attr('src', obj.result.path);
                }
            });
            //处理省市区三级联动
            $('#pcd').region({
                url: '/public/assets/jquery-region/region.json',
            });

            //处理富文本
            CKEDITOR.replace('editor', {
                toolbarGroups: [
                    {name: 'clipboard', groups: ['clipboard', 'undo']},
                    {name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing']},
                    {name: 'links', groups: ['links']},
                ]
            });

            //处理表单提交  点击保存  提交信息
            $('#settingsForm').validate({
                sendForm: false,
                valid: function () {
                    //获取你选中下拉菜单里面的内容
                    var p = $('#p').find('option:selected').text();
                    var c = $('#c').find('option:selected').text();
                    var d = $('#d').find('option:selected').text();
                    var hometown = p + '|' + c + '|' + d;

                    //同步富文本内容  instance实例  instances多个实例
                    for(var instance in CKEDITOR.instances){
                        CKEDITOR.instances[instance].updateElement();
                    }
                    $(this).ajaxSubmit({
                        type: 'post',
                        data: {tc_hometown: hometown},
                        url: '/api/teacher/modify',
                        dataType: 'json',
                        success: function (data) {
                            if (data.code == 200) {
                                //修改成功之后修改刷新当前页面
                                location.reload();
                            }
                        }
                    })
                }
            })
        }
    })
})
