define(['jquery','template','utile','uploadify'],function($,template,utile){
    // //设置导航菜单选中 初始地址就是add这个地址  都要以他为基础
    utile.setMenu('/course/add');
    //获取课程id
    var csId = utile.qs('cs_id');

    //获取课程封面数据 调用接口
    $.ajax({
       type:'get',
        url:'/api/course/picture',
        data:{cs_id:csId},
        dataType:'json',
        success:function(data){
            //console.log(data);
            var html = template('pictureTpl',data.result);
            $('#pictureInfo').html(html);

            //图片上传
            $('#myfile').uploadify({
                width:80,
                height:'auto',
                buttonText:'选择图片',
                itemTemplate:'<span></span>',
                buttonClass:'btn btn-success btn-sm',
                swf:'/public/assets/upload/uploadify.swf',
                uploader:'/api/uploader/cover',
                fileObjName:'cs_cover_original',
                formData:{cs_id:csId},
                onUploadSuccess:function(a,b,c){
                    //console.log(b);
                    var a = JSON.parse(b.trim());
                    $('.preview img').attr('src',a.result.path);
                }
            });
        }
    });



})
