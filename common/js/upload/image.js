/**
 * Created by Administrator on 2015/11/11 0011.
 */
/**
 * Created by Administrator on 2015/9/16 0016.
 */
define(["avalon",'./lrz.bundle','app'], function (avalon,lrz,app) {
    function heredoc(fn) {
        return fn.toString()
            .replace(/^[^\/]+\/\*!?\s?/, '')
            .replace(/\*\/[^\/]+$/, '')
    }
    avalon.component("ms:image", {
        $tpl: "",
        id:'',
        apiurl:'',
        upload:avalon.noop,
        //插件模板
        $template: heredoc(function (vm) {
            /*
             {{$tpl|html}}
             <input type="file"  ms-change="upload()" accept="image/*" capture="camera" style="width:100%;height:100%;opacity:0;top:0;left:0;position: absolute;"/>
             */
        }),
        $init:function(vm){
            var obj;
            vm.id=vm.$id;
            vm.upload=function(){
                var el = $.loading({content: '上传图片...'});
                lrz(this.files[0],{fieldName:'photo'})
                    .then(function (rst) {
                        // 处理成功会执行
                        app.aPostFile(vm.apiurl,rst.formData,function (data) {
                            el.loading("hide");
                            app.preError(data, function (data) {
                               // console.log(data)
                                //修改成功
                                //location.href=window.HOME;
                               $('#'+vm.id+' input').val(data.url);
                            });
                        });

                    })
                    .catch(function (err) {
                        // 处理失败会执行
                      //  console.log(2)
                        el.loading("hide");
                    })
                    .always(function () {
                        // 不管是成功失败，都会执行
                    });
            };

        },
        $ready:function(vm){
          //  console.log(vm)
          //avalon(vm.$tpl).addClass('2123');
        }
    });



    return avalon;
});