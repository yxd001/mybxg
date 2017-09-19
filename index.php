<?php


//默认目录名称
$dir = 'main';
//默认文件名称
  $filename = 'index';
 if (array_key_exists('PATH_INFO', $_SERVER)){
  //PATH_INFO属性存在
     $path = $_SERVER['PATH_INFO'];//  /main/index

     //去掉一个斜杠
     $str = substr($path, 1);
     $ret = explode('/', $str);

     if (count($ret)==2) {
    $dir = $ret[0];
    $filename = $ret[1];
  }else{
    //其他情况全部跳转到登陆目录
    $filename = 'login';
  }

  }
  
  

 
  //echo $path;
//地址栏中不是两层则报错
  include('./views/'.$dir.'/'.$filename.'.html');

?>
