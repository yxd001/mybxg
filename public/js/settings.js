define(['jquery','template','uploadify'],function($,template){
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
                itemTemplate:'<span></span>',
                swf:'/public/assets/upload/uploadify.swf',
                //地址  后台接口
                uploader:'/api/uploader/avatar',
                //跟接口对应
                fileObjName:'tc_avatar',
                //
                onUploadSuccess:function(a,b){
                   // console.log(b);
                    //转化成对象
                    var obj =JSON.parse(b);
                    // 添加图片 的src属性  获取到的result 中的path路经过
                    $('.preview img').attr('src',obj.result.path);
                }
            })
        }
    })
})
