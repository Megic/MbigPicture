define(['zepto.cookie.min'],function(){
    window.User={};//保存用户资料
    window.AUTHDATA={};//登录返回内容
    window.MAPDATA='';//定位数据
    window.GET=getArgs();
    //$('body').on('touchmove', function (event) {
    //    event.preventDefault();
    //});
    var string=$.fn.cookie('authData');
    if(string)window.AUTHDATA=JSON.parse(string);//用户登录后数据
    function aajax(url,obj,callback,TYPE,file){
        if(AUTHDATA.token) {
            obj = obj ? obj : {};
            var option={
                type:TYPE,
                url: url,
                data: obj,
                dataType: "json",
                headers:{
                    'token':AUTHDATA.token
                },
                success: function (data) {
                    callback(data);
                }
            };
            if(file){
                option.processData=false;
                option.contentType=false;
            }
            $.ajax(option);
        }else{
            $.tips({
                content:'未登录,正在跳转...',
                stayTime:2000,
                type:"warn"
            });
            setTimeout(function(){
                location.href=window.LOGINURL;
            },1000);
        }
    }
    function aPostFile(url,obj,callback){
        aajax(url,obj,callback,'POST',1);
    }
    function aPost(url,obj,callback){
        aajax(url,obj,callback,'POST');
    }
    function aGet(url,obj,callback){
        aajax(url,obj,callback,'GET');
    }
    function init(callback){//入口文件先判断用户是否登录，获取用户资料

        aGet(APIHOST+'profile/patient-base'+'?t='+new Date().getTime(),{},function(data){
            appError(data, function (data) {
                window.User=data;
                appHideLoading();
                $(function(){
                    callback();
                });
            });

         });

    }
//隐藏loading
    function appHideLoading(){
        $(function(){
            setTimeout(function(){
                var loading=$('#loading');
                loading.addClass('hide');
                setTimeout(function(){
                    loading.remove();
                },300);
            },100);
        });
    }
//ajax请求错误预处理
    function appError(data,success,alldata){
        if(data.status==200)
        {
            var res=data.data;
            if(alldata)res=data;
            success(res);
        }else{
            var msg;
            switch (data.status){
                case 401:
                    msg='未登录,正在跳转...';
                    setTimeout(function(){
                        location.href=window.LOGINURL;
                    },1000);
                    break;
                case 404:msg='url错误';break;
                case 1100:msg='系统发生未知错误';break;
                case 1101:msg='sql语句错误';break;
                case 80001:msg='图片未上传成功';break;
                case 80002:msg='图片大小太大 ';break;
                case 80003:msg='图片格式不正确成功';break;
                case 90004:msg='紧急咨询id不存在';break;
                case 90005:msg='职称输入项只能为1 2 3 4 5';break;
                case 90006:msg='用户id不正确';break;
                case 90001:msg='请填写完整';break;
                case 90007:msg='医生id不正确 ';break;
                case 90008:msg='性别输入项非法';break;
                case 90009:msg='输入项必须为正整数';break;
                case 90010:msg='金额数量(诊金)太大';break;
                case 90011:msg='医生未通过认证';break;
                case 90012:msg='医院id不正确(或者为空)';break;
                case 90013:msg='输入项必须为数组';break;
                case 90014:msg='预约(就诊)id不存在';break;
                case 90015:msg='输入字段只能为0或1';break;
                //注册登录部分
                case 10001:msg='短信验证码验证码不正确';break;
                case 10002:msg='手机号被注册过';break;
                case 10003:msg='手机号与注册邮箱不匹配';break;
                case 10004:msg='该手机号未注册';break;
                case 10005:msg='登录密码不正确';break;
                case 10006:msg='发送验证码过程中出错';break;
                case 10007:msg='手机号码不合法';break;
                case 10008:msg='邮箱不合法';break;
                case 10009:msg='注册的用户类型不正确';break;
                case 10010:msg='用户已经退出登录了';break;
                case 10011:msg='医生已经退出登录了';break;
                //个人模块
                case 20001:msg='不能重复新建本人病历';break;
                case 20002:msg='不能重复新建同名病历';break;
                case 20003:msg='出生年月格式不正确';break;
                case 20004:msg='新密码确认不一致';break;
                case 20005:msg='用户的姓名和出生年月还未设置，不能新建本人病历';break;
                case 20006:msg='新密码与旧密码一样';break;
                case 20007:msg='旧密码验证不通过';break;
                //预约模块
                case 30001:msg='用户已经收藏过该名医生';break;
                case 30002:msg='该病历不存在';break;
                case 30003:msg='用户不存在该病历';break;
                case 30004:msg='紧急咨询等待时间不合法(应该为正整数)';break;
                case 30005:msg='一个病历不能进行多个紧急咨询';break;
                case 30006:msg='用户不存在该紧急咨询单';break;
                case 30007:msg='该紧急咨询单已经付过款了';break;
                case 30008:msg='非法的紧急咨询单id';break;
                case 30009:msg='排序规则非法(只能为asc或desc)';break;
                case 30010:msg='经度输入非法';break;
                case 30011:msg='纬度输入非法';break;
                case 30012:msg='排序字段非法';break;
                case 30013:msg='该预约已经取消了';break;
                case 30014:msg='该紧急咨询不能被取消';break;
                case 30015:msg='该预约单已经支付过了，不能付款';break;
                case 30016:msg='该预约单处于关闭状态，不能付款';break;
                case 30017:msg='该预约单不是正常预约单';break;
                case 30018:msg='不能收藏该医生';break;
                case 30019:msg='该时间不能被预约';break;
                case 30020:msg='预约类型不正确';break;
                case 30021:msg='已经是就诊状态了';break;
                case 30022:msg='预约单不属于该登录医生';break;
                case 30023:msg='付款未付款筛选字段不正确';break;
                case 30024:msg='付款的预约不能被取消';break;
                case 30025:msg='状态异常,不能取消预约';break;
                case 30026:msg='紧急咨询还有追加的金额未付款';break;
                case 30027:msg='病历与该医生的预约就诊还没结束，不能再进行预约';break;
                case 30028:msg='提醒用户付款无效';break;
                case 30029:msg='提醒用户答题无效';break;
                case 30030:msg='该医生不在你的收藏列表里';break;
                    //时间设置
                case 40001:msg='错误的week格式';break;
                case 40002:msg='错误的type格式';break;
                case 40003:msg='错误的时间格式';break;
                case 40004:msg='起始时间比结束时间大';break;
                case 40005:msg='系统错误的存储时间，请联系管理员';break;
                case 40006:msg='设置的时间和已设的时间冲突';break;
                case 40007:msg='要删除的时间已被删除';break;
                case 40008:msg='传值不是int型';break;
                case 40009:msg='年月日错误';break;
                case 40010:msg='转诊医生日期列表错误的请求';break;
                //就诊模块
                case 50001:msg='就诊未完成，不能评价该医生';break;
                case 50002:msg='已经评价过该医生';break;
                case 50003:msg='评分输入项不正确';break;
                case 50004:msg='开关传值错误';break;
                case 50005:msg='日期格式错误';break;
                case 50006:msg='时间格式错误';break;
                case 50007:msg='传值不是json类型';break;
                case 50008:msg='错误的预约';break;
                case 50009:msg='已诊断';break;
                case 50010:msg='无效的诊断信息请求';break;
                case 50011:msg='复诊时间不可用';break;
                case 50012:msg='错误的复诊类型';break;
                case 50013:msg='不是自己的转诊';break;
                case 50014:msg='已经操作过的会诊';break;
                case 50015:msg='所拒绝的会诊不是医生本人';break;
                case 50016:msg='不能转诊给自己';break;
                case 50017:msg='无权开处方';break;
                //聊天模块
                case 70001:msg='该医生不是当前用户的联系人';break;
                case 70002:msg='该用户不是当前医生的联系人';break;
                case 70003:msg='用户联系人与病历id不匹配';break;
                case 70004:msg='更新时间字段的格式不正确';break;
                default :msg='未知错误';break;


            }
            $.tips({
                content:msg,
                stayTime:2000,
                type:"warn"
            });
        }
    }

 //百度定位
    function getLocation(success){
        require(['bmap'], function (BMap) {
        var el = $.loading({content: '定位中...'});
        if(!window.MAPDATA) {
            var geolocation = new BMap.Geolocation();
            // 创建地理编码实例
            var myGeo = new BMap.Geocoder();
            geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    var pt = r.point;
                    // 根据坐标得到地址描述
                    myGeo.getLocation(pt, function (result) {
                        if (result) {
                            window.MAPDATA = result;
                            success(result);
                        }else{
                            $.tips({content:'定位失败'});
                        }
                        el.loading("hide");

                    });
                } else {
                    el.loading("hide");
                    $.tips({content:'定位失败'});
                }
            });
        }else{
            success(window.MAPDATA);
            el.loading("hide");
        }
        });
    }
//获取GET参数
    function getArgs(){
        var args = {};
        var match = null;
        var search = decodeURIComponent(location.search.substring(1));
        var reg = /(?:([^&]+)=([^&]+))/g;
        while((match = reg.exec(search))!==null){
            args[match[1]] = match[2];
        }
        return args;
    }
//分页loading
    var pageLoading;
    function loadingPage(callback){
        if(!pageLoading){
            pageLoading=$('<div id="pageLoading" class="ui-loading-wrap "><p>正在加载中...</p><i class="ui-loading"></i></div>');
            $('body').append(pageLoading.hide());
        }
        //滚动加载
        window.onscroll=function(cllback){
            var sHeight=document.documentElement.scrollTop||document.body.scrollTop;//滚动高度
            var wHeight=document.documentElement.clientHeight;//window
            var dHeight=document.documentElement.offsetHeight;//整个文档高度
            if(dHeight-(sHeight+wHeight)<30)
            {
                pageLoading.show();
                callback();

            }
        };
        return {
            getPage:function(){
                pageLoading.show();
                callback();
            },
            hide:function(){
                pageLoading.hide()
            }
        };
    }
    //MD5
    function MD5(a){function d(a){return m(k(p(a)))}function k(a){return t(u(s(a),8*a.length))}function m(a){var d,e,f,g;try{}catch(c){b=0}for(d=b?"0123456789ABCDEF":"0123456789abcdef",e="",g=0;g<a.length;g++)f=a.charCodeAt(g),e+=d.charAt(15&f>>>4)+d.charAt(15&f);return e}function p(a){for(var d,e,b="",c=-1;++c<a.length;)d=a.charCodeAt(c),e=c+1<a.length?a.charCodeAt(c+1):0,d>=55296&&56319>=d&&e>=56320&&57343>=e&&(d=65536+((1023&d)<<10)+(1023&e),c++),127>=d?b+=String.fromCharCode(d):2047>=d?b+=String.fromCharCode(192|31&d>>>6,128|63&d):65535>=d?b+=String.fromCharCode(224|15&d>>>12,128|63&d>>>6,128|63&d):2097151>=d&&(b+=String.fromCharCode(240|7&d>>>18,128|63&d>>>12,128|63&d>>>6,128|63&d));return b}function s(a){var c,b=Array(a.length>>2);for(c=0;c<b.length;c++)b[c]=0;for(c=0;c<8*a.length;c+=8)b[c>>5]|=(255&a.charCodeAt(c/8))<<c%32;return b}function t(a){var c,b="";for(c=0;c<32*a.length;c+=8)b+=String.fromCharCode(255&a[c>>5]>>>c%32);return b}function u(a,b){var c,d,e,f,g,h,i,j,k;for(a[b>>5]|=128<<b%32,a[(b+64>>>9<<4)+14]=b,c=1732584193,d=-271733879,e=-1732584194,f=271733878,g=0;g<a.length;g+=16)h=c,i=d,j=e,k=f,c=w(c,d,e,f,a[g+0],7,-680876936),f=w(f,c,d,e,a[g+1],12,-389564586),e=w(e,f,c,d,a[g+2],17,606105819),d=w(d,e,f,c,a[g+3],22,-1044525330),c=w(c,d,e,f,a[g+4],7,-176418897),f=w(f,c,d,e,a[g+5],12,1200080426),e=w(e,f,c,d,a[g+6],17,-1473231341),d=w(d,e,f,c,a[g+7],22,-45705983),c=w(c,d,e,f,a[g+8],7,1770035416),f=w(f,c,d,e,a[g+9],12,-1958414417),e=w(e,f,c,d,a[g+10],17,-42063),d=w(d,e,f,c,a[g+11],22,-1990404162),c=w(c,d,e,f,a[g+12],7,1804603682),f=w(f,c,d,e,a[g+13],12,-40341101),e=w(e,f,c,d,a[g+14],17,-1502002290),d=w(d,e,f,c,a[g+15],22,1236535329),c=x(c,d,e,f,a[g+1],5,-165796510),f=x(f,c,d,e,a[g+6],9,-1069501632),e=x(e,f,c,d,a[g+11],14,643717713),d=x(d,e,f,c,a[g+0],20,-373897302),c=x(c,d,e,f,a[g+5],5,-701558691),f=x(f,c,d,e,a[g+10],9,38016083),e=x(e,f,c,d,a[g+15],14,-660478335),d=x(d,e,f,c,a[g+4],20,-405537848),c=x(c,d,e,f,a[g+9],5,568446438),f=x(f,c,d,e,a[g+14],9,-1019803690),e=x(e,f,c,d,a[g+3],14,-187363961),d=x(d,e,f,c,a[g+8],20,1163531501),c=x(c,d,e,f,a[g+13],5,-1444681467),f=x(f,c,d,e,a[g+2],9,-51403784),e=x(e,f,c,d,a[g+7],14,1735328473),d=x(d,e,f,c,a[g+12],20,-1926607734),c=y(c,d,e,f,a[g+5],4,-378558),f=y(f,c,d,e,a[g+8],11,-2022574463),e=y(e,f,c,d,a[g+11],16,1839030562),d=y(d,e,f,c,a[g+14],23,-35309556),c=y(c,d,e,f,a[g+1],4,-1530992060),f=y(f,c,d,e,a[g+4],11,1272893353),e=y(e,f,c,d,a[g+7],16,-155497632),d=y(d,e,f,c,a[g+10],23,-1094730640),c=y(c,d,e,f,a[g+13],4,681279174),f=y(f,c,d,e,a[g+0],11,-358537222),e=y(e,f,c,d,a[g+3],16,-722521979),d=y(d,e,f,c,a[g+6],23,76029189),c=y(c,d,e,f,a[g+9],4,-640364487),f=y(f,c,d,e,a[g+12],11,-421815835),e=y(e,f,c,d,a[g+15],16,530742520),d=y(d,e,f,c,a[g+2],23,-995338651),c=z(c,d,e,f,a[g+0],6,-198630844),f=z(f,c,d,e,a[g+7],10,1126891415),e=z(e,f,c,d,a[g+14],15,-1416354905),d=z(d,e,f,c,a[g+5],21,-57434055),c=z(c,d,e,f,a[g+12],6,1700485571),f=z(f,c,d,e,a[g+3],10,-1894986606),e=z(e,f,c,d,a[g+10],15,-1051523),d=z(d,e,f,c,a[g+1],21,-2054922799),c=z(c,d,e,f,a[g+8],6,1873313359),f=z(f,c,d,e,a[g+15],10,-30611744),e=z(e,f,c,d,a[g+6],15,-1560198380),d=z(d,e,f,c,a[g+13],21,1309151649),c=z(c,d,e,f,a[g+4],6,-145523070),f=z(f,c,d,e,a[g+11],10,-1120210379),e=z(e,f,c,d,a[g+2],15,718787259),d=z(d,e,f,c,a[g+9],21,-343485551),c=A(c,h),d=A(d,i),e=A(e,j),f=A(f,k);return Array(c,d,e,f)}function v(a,b,c,d,e,f){return A(B(A(A(b,a),A(d,f)),e),c)}function w(a,b,c,d,e,f,g){return v(b&c|~b&d,a,b,e,f,g)}function x(a,b,c,d,e,f,g){return v(b&d|c&~d,a,b,e,f,g)}function y(a,b,c,d,e,f,g){return v(b^c^d,a,b,e,f,g)}function z(a,b,c,d,e,f,g){return v(c^(b|~d),a,b,e,f,g)}function A(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c}function B(a,b){return a<<b|a>>>32-b}var b=0;return d(a)}
    return {
        init:init,
        hideLoading:appHideLoading,
        preError:appError,
        md5:MD5,
        aPost:aPost,
        aGet:aGet,
        aPostFile:aPostFile,
        getLocation:getLocation,
        loadingPage:loadingPage
    };
});

