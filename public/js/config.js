require.config({
  baseUrl:'/public/assets',
  paths:{
    jquery:'jquery/jquery',
    cookie:'jquery-cookie/jquery.cookie',
    template:'artTemplate/template-web',
    bootstrap:'bootstrap/js/bootstrap.min',
    common:'../js/common',
    datepicker:'bootstrap-datepicker/js/bootstrap-datepicker',
    language:'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
    validate:'vlidate/jquery-validate',
    form:'jquery-form/jquery.form',
    uploadify:'upload/jquery.uploadify.min',
    utile:'../js/utile',
    login:'../js/login',
    teacherlist:'../js/teacher-list',
    teacheradd:'../js/teacher-add',
    settings:'../js/settings',
  },
  shim:{
    bootstrap:{
      deps:['jquery']
    },
    language:{
      deps:['jquery','datepicker']
    },
    validate:{
      deps:['jquery']
    },
    uploadify:{
      deps:['jquery']
    }
  }
})
