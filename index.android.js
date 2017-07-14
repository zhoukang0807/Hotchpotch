import {
    AppRegistry
} from 'react-native'; //AppRegistry是JS运行所有React Native应用的入口
import Root from './app/root'; //自定义的root组件为应用入口
import SocketStore from './app/utils/RequestUtil';

global.socketStore = new SocketStore();
console.ignoredYellowBox = [ 'Setting a timer' ]

AppRegistry.registerComponent('Hotchpotch', () => Root); //reading 为应用的名称需要和项目名一样

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
