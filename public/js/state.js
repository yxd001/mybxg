define(['jquery'],function($){


    $(document).ajaxStart(function(){
        //��ʾ������
        $('.overlay').show();
    });
    $(document).ajaxStop(function(){
        //��ʾ������
       setTimeout(function(){
           $('.overlay').hide();
       },500);
    });


});