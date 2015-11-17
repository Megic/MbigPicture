/**
 * Created by Administrator on 2015/11/11 0011.
 */
/**
 * Created by Administrator on 2015/9/16 0016.
 */
define(["avalon",'lib/swiper/js/swiper.jquery.min','css!lib/swiper/css/swiper.min.css'], function (avalon,Swiper) {
    function heredoc(fn) {
        return fn.toString()
            .replace(/^[^\/]+\/\*!?\s?/, '')
            .replace(/\*\/[^\/]+$/, '')
    }
    var cury=new Date().getFullYear();
    var years=[];
    for(var i=0;i<100;i++){
        years.push(cury-i);
    }
    avalon.component("ms:datelist", {
        $tpl: "",
        show:0,
        id:'',
        years:years,
        months:['01','02','03','04','05','06','07','08','09','10','11','12'],
        chooseDate:avalon.noop,
        close:avalon.noop,
        save:avalon.noop,
        //插件模板
        $template: heredoc(function (vm) {
            /*
             {{$tpl|html}}
             <div ms-attr-id="id" ms-class="show:show" class="ui-actionsheet mj-datelist">
             <div class="ui-actionsheet-cnt">
             <div class="mj-datelist-title">
             <button ms-click="close" type="button" class="mj-datelist-span f-fl">取消</button>选择日期<button type="button"  ms-click="save" class="mj-datelist-span f-fr">确定</button>
             </div>
             <div class="mj-datelist-body">
             <div class="mj-datelist-cur"></div>
             <span class="mj-datelist-sl">
             <div class="swiper-container">
             <div class="swiper-wrapper"><div class="swiper-slide" ms-repeat="years" ms-attr-data="el">{{el}}年</div></div>
             </div>
             </span>
             <span class="mj-datelist-sr">
             <div class="swiper-container">
             <div class="swiper-wrapper"><div class="swiper-slide" ms-repeat="months" ms-attr-data="el">{{el}}月</div></div>
             </div>
             </span>
             </div>
             </div>
             </div>
             */
        }),
        $init:function(vm){
            var obj;
            vm.id=vm.$id;
            vm.close=function(){
                vm.show=0;
            };
            vm.chooseDate=function(){
               vm.show=1;
               obj=$(this);
            };
            vm.save=function(){
                vm.show=0;
                var year=$('#'+vm.id+' .mj-datelist-sl .swiper-slide-active').attr('data');
                var month=$('#'+vm.id+' .mj-datelist-sr .swiper-slide-active').attr('data');
                obj.val(year+'-'+month);
            };
        },
        $ready:function(vm){
            new Swiper('#'+vm.id+' .swiper-container', {
                direction:'vertical',
                slidesPerView : 5,
                freeModeMomentumRatio : 0.5,
                centeredSlides : true,
                heigth: 30,
                freeMode : true,
                freeModeSticky : true
              //  autoplay: 5000,//可选选项，自动滑动
            })
        }
    });



    return avalon;
});