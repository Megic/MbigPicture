require.config({
    paths: {//百度地图API地址
        bmap: "http://api.map.baidu.com/getscript?v=1.4&ak=ia6HfFL660Bvh43exmH9LrI6&services=&t=20150522093217"
    },
    shim: {
        bmap:{
            exports:'BMap' //指定它的命名空间
        }
    }});

window.APIHOST='https://www.zhaoyang120.com/api/';//API地址
window.HOST='../';//项目地址
window.LOGINURL=HOST+'auth/login.html';//登录地址
window.HOME=HOST+'yyue/index.html';//主入口
