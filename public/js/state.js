define(['jquery'],function($){


    $(document).ajaxStart(function(){
        //отй╬узуутЬ
        $('.overlay').show();
    });
    $(document).ajaxStop(function(){
        //отй╬узуутЬ
       setTimeout(function(){
           $('.overlay').hide();
       },500);
    });


});