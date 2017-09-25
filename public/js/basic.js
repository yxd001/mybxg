define(['jquery','template','utile','ckeditor','validate','form'],function($,template,utile,CKEDITOR){
    //设置导航菜单选中 初始地址就是add这个地址  都要以他为基础
    utile.setMenu('/course/add');
    //获取课程id
    var csId=  utile.qs('cs_id');//cs_id=1  1
    // console.log(csId)
    //获取操作位  （编辑时候的内容）
    var flag = utile.qs('flag');

    //根据课程id  获取课程相关信息
    $.ajax({
        type:'get',
        url:'/api/course/basic',
        data:{cs_id:csId},
        dataType:'json',
        success:function(data){
            //console.log(data)
            //判断课程添加的时候显示课程添加，课程编辑的时候是课程编辑
            if(flag){
                data.result.operate='课程编辑';
            }else{
                data.result.operate='课程添加';
            }

            var html = template('basicTpl',data.result);
            $('#basicInfo').html(html);


            //处理二级菜单下拉功能
            $('#one').change(function(){
                var pid = $(this).val();
                //console.log(pid)
                $.ajax({
                    type:'get',
                    url:'/api/category/child',
                    data:{cg_id:pid},
                    dataType:'json',
                    success:function(data){
                        //console.log(data)
                        //拼接二级下拉菜单
                        var tpl =' <option value="">请输入二级分类...</option>{{each list}}<option value="{{$value.cg_id}}">{{$value.cg_name}}<option>{{/each}}'

                        var html = template.render(tpl,{list:data.result});
                        $('#secondType').html(html);
                    }
                })
            });

            //富文本
            CKEDITOR.replace('editor',{
                toolbarGroups: [
                    {name: 'clipboard', groups: ['clipboard', 'undo']},
                    {name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing']},
                    {name: 'links', groups: ['links']},
                ]
            });

            //处理表单提交
            $('#basicForm').validate({
               sendForm:false,
               valid:function(){
                   //同步富文本
                   for(var instance in CKEDITOR.instances){
                       CKEDITOR.instances[ instance ].updateElement();
                   }
                   //表单提交
                   $(this).ajaxSubmit({
                       type:'post',
                       url:'/api/course/update/basic',
                       data:{cs_id:csId},
                       dataTpye:'json',
                       success:function(data){
                           //console.log(data);
                          if(data.code==200){
                              location.href='/course/picture?cs_id='+data.result.cs_id;
                          }
                       }
                   })
               }
            });
        }
    })
});