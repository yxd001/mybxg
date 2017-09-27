define(['jquery','template','utile','uploadify','jcrop','form'],function($,template,utile){
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


            //获取图片
            var img  = $('.preview img').eq(0);

            //防止被多次提交保存
            var nowCrop =null;

            //图片上传  uploadify插件
            $('#myfile').uploadify({
                width:80,
                height:'auto',//居中
                buttonText:'选择图片',//按钮的文字
                itemTemplate:'<span></span>',//进度条设置为空
                buttonClass:'btn btn-success btn-sm',//按钮的样式
                swf:'/public/assets/upload/uploadify.swf',//图片上传的文件
                uploader:'/api/uploader/cover',//接口文档
                fileObjName:'cs_cover_original',//对应数据
                formData:{cs_id:csId},//传递参数的属性
                onUploadSuccess:function(a,b,c){//
                    //console.log(b);
                    var a = JSON.parse(b.trim());//结果为字符串  转化成对象格式
                    //获取图片添加src属性  属性值为后天返回的数据
                    $('.preview img').attr('src',a.result.path);
                    //图片上传成功之后  图片的选区会自动选中 实现裁剪选区框
                    courseImg();
                    //自动选中的时候  裁切按钮的文字变成保存图片
                    $('#cropBtn').text('保存图片').attr('data-flag',true);
                }
            });

            //处理裁剪按钮的状态
          /*  $('#cropBtn').click(function(){
                //给按钮添加自定义属性
               var flag = $(this).attr('data-flag');
                if(flag){
                    //跳转到下一个页面
                    //处理表单提交
                    $('#cropForm').ajaxSubmit({
                        type:'post',
                        url:'/api/course/update/picture',
                        data:{cs_id:csId},
                        dataType:'json',
                        success:function(data){
                            //console.log(data);
                            if(data.code==200){
                               location.href='/course/lesson?cs_id='+data.result.cs_id;
                            }
                        }
                    })

                }else{
                    //第一次点击  把按钮文字进行修改  添加状态位
                    $(this).text('保存图片').attr('data-flag',true);
                    //实现裁切功能，选框
                    cropImg();
                }
            });
            //封装一个方法
           var img =  $('.preview img').eq(0);
            function cropImg(){
                img.Jcrop({
                    //setSelect:[100,100,300,200],
                    aspectPatio:2
            },function(){
                    //console.log(this);
                    //获取图片的高度  宽度
                    var w = this.ui.stage.width;
                    var h = this.ui.stage.height;
                    //计算x，y轴
                    var x = 0;
                    var y = (h-w/2)/2;
                    var width = w;
                    var height = w/2;
                    //初始化默认选区参数
                    var aInput = $('#cropForm').find('input');
                    aInput.eq(0).val(x);
                    aInput.eq(1).val(y);
                    aInput.eq(2).val(w);
                    aInput.eq(3).val(h);
                   //动态创建选区的
                    this.newSelection();
                    this.setSelect([x,y,width,height]);
                    //初始化缩略图的预览
                    this.initComponent('Thumbnailer',{
                        width:240,
                        height:120,
                        mythumb:'.thumb'
                    });
                    $('.jcrop-thumb').css({
                        position:'absolute',
                        top:0,
                        left:0
                    });
                    //监控选区变化事件
                    img.parent().on('cropstart cropmove,cropend',function(a,b,c){
                       // console.log(c);
                      var aInput = $('#cropForm').find('input');
                        aInput.eq(0).val(c.x);
                        aInput.eq(1).val(c.y);
                        aInput.eq(2).val(c.w);
                        aInput.eq(3).val(c.h);

                    });

                });
            }*/
            $('#cropBtn').click(function(){
                //给按钮添加一个自定义属性
                var flag = $(this).attr('data-flag');
                //判断这个按钮的自定义属性有没有  有的话就把按钮的文字设置为保存图片， 没有的话就跳转到下一页
                if(flag){
                    //跳转到下一页
                    $('#cropForm').ajaxSubmit({
                        type:'post',
                        url:'/api/course/update/picture',
                        data:{cs_id:csId},
                        dataType:'json',
                        success:function(data){
                            console.log(data);
                            if(data.code==200){
                                location.href='/course/lesson?cs_id='+data.result.cs_id;
                            }
                        }
                    });
                }else{
                    //有自定属性 修改文字内容  添加属性
                    $(this).text('保存图片').attr('data-flag',true);
                    //实现裁剪选区框
                    courseImg();
                }
            });
            //封装一个方法
            //var img  = $('.preview img').eq(0);
            //截取图片
            function courseImg(){
                img.Jcrop({
                    //需要动态创建坐标，大小
                    //setSelect:[100,100,300,200],
                    aspectPatio:2
            },function(){
                    //销毁之前的裁切实例  判断
                    nowCrop && nowCrop.destroy();
                    nowCrop=this;
                    //console.log(this);
                    //获取图片的高度宽度
                    var w = this.ui.stage.width;
                    var h = this.ui.stage.height;
                    //计算 x，y的坐标
                    var x = 0;
                    var y = (h-w/2)/2;
                    var width =w;
                    var height = w/2;
                    //初始化选区参数
                    var aInput = $('#cropForm').find('input');
                    aInput.eq(0).val(x);
                    aInput.eq(1).val(y);
                    aInput.eq(2).val(w);
                    aInput.eq(3).val(h);
                    //动态创建，选区的大小坐标需要动态生成
                    this.newSelection();
                    this.setSelect([x,y,width,height]);

                    //初始化选区的裁剪
                    this.initComponent('Thumbnailer',{
                        width:240,
                        height:120,
                        mythumb:'.thumb'
                    });
                    //修改thumb的位置
                    $('.jcrop-thumb').css({
                       position:'absolute',
                        top:0,
                        left:0
                    });
                    //监听选区位置的变化
                    img.parent().on('cropstart cropmove cropend',function(a,b,c){
                       //console.log(c);
                        var aInput = $('#cropForm').find('input');
                        aInput.eq(0).val(c.x);
                        aInput.eq(1).val(c.y);
                        aInput.eq(2).val(c.w);
                        aInput.eq(3).val(c.h);
                    });
                });
            }
        }
    });



})
