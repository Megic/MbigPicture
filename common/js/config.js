require.config({
    paths: {//�ٶȵ�ͼAPI��ַ
        bmap: "http://api.map.baidu.com/getscript?v=1.4&ak=ia6HfFL660Bvh43exmH9LrI6&services=&t=20150522093217"
    },
    shim: {
        bmap:{
            exports:'BMap' //ָ�����������ռ�
        }
    }});

window.APIHOST='https://www.zhaoyang120.com/api/';//API��ַ
window.HOST='../';//��Ŀ��ַ
window.LOGINURL=HOST+'auth/login.html';//��¼��ַ
window.HOME=HOST+'yyue/index.html';//�����
