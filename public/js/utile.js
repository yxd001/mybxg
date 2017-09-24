define(['jquery'], function ($) {
    return {
        //获取字符串方法
        qs: function (key) {
            //获取url地址栏的参数?tc_id=2&a=123  通过search属性  不需要?  需截取substr（1）
            var kk = location.search.substr(1);//tc_id=2&a=123
            //console.log(kk);
            var result = null;
            if (kk) {
                //截取&符号
                var ks = kk.split('&');//"tc_id=2", "a=123"
                //console.log(ks);
                //循坏tc_id=2", "a=123，
                $.each(ks, function (index, item) {
                    var kv = item.split('=');//tc_id", "2
                    //console.log(kv)
                    //判断item得值 是否等于tc_id；
                    if (kv[0] == key) {
                        result = kv[1];
                        return false;//阻止each循坏
                    }
                });
            }
            return result;
        },
        setMenu: function (path) {
            //设置导航菜单选中
            $('.aside .navs a[href="'+path+'"]').addClass('active').closest('ul').show();
        }
    }
});
