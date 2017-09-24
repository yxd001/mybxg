define(['jquery','template','ckeditor','uploadify','region','datepicker','language'],function($,template,CKEDITOR){
    $.ajax({
        type:'get',
        url:'/api/teacher/profile',
        dataType:'json',
        success:function(data){
            //console.log(data)
            var html = template('settingsTpl',data.result);
            $('#settingsInfo').html(html);
            //处理头像上传
            $('#upfile').uploadify({
                width:120,
                height:120,
                buttonText:'',
                //进度条设置为空
                itemTemplate:'<span></span>',
                swf:'/public/assets/upload/uploadify.swf',
                //地址  后台接口
                uploader:'/api/uploader/avatar',
                //跟接口对应
                fileObjName:'tc_avatar',
                //上传成功返回的内容   有三个参数  需要第二个参数
                onUploadSuccess:function(a,b){
                   // console.log(b);//字符串结果
                    //字符串转化成对象
                    var obj =JSON.parse(b);
                    // 添加图片 的src属性  获取到的result 中的path路经
                    $('.preview img').attr('src',obj.result.path);
                }
            });
            //处理省市区三级联动
            $('#pcd').region({
                url:'/public/assets/jquery-region/region.json',
            });

            //处理富文本
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
