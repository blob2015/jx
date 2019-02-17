var md5  = require('./md5');
var base64 = require("./base64");
/**
 * 构造已签名的"获取优酷视频地址及视频信息"的网址
 * 默认回调: mtopjsonp1
 * 访问该网址的Cookie中的_m_h5_tk和_m_h5_tk_enc必须一致,否则签名验证失败
 * @param {String} encodevid 优酷视频id http://v.youku.com/v_show/id_XNTQwMTgxMTE2.html 的id为:XNTQwMTgxMTE2
 * @param {String} cookie 必须添加cookie:_m_h5_tk和_m_h5_tk_enc
 * @param {String} vid 优酷视频的vid，暂时没什么用
 */
function youku(encodevid ,cookie,vid = "135045279") {
    if(typeof encodevid !== "string" || typeof cookie === "undefined"){
        throw "Illegal parameters";
    }
    var protocol = typeof window !== "undefined"? window.location.protocol : 'http:';
    var url = protocol + '//acs.youku.com/h5/mtop.youku.play.ups.appinfo.get/1.1/?';
    var token=new RegExp("(?:^|;\\s*)" + "_m_h5_tk" + "\\=([^;]+)(?:;\\s*|$)").exec(cookie)[1].split("_")[0];
    var emb = base64.encode("\x02"+vid+"\x02"+"v.youku.com"+"\x02"+"/v_show/id_XNTQwMTgxMTE2.html");
    var t = (new Date).getTime();
    var appKey = '24679788';
    var showid = "19461";
    var data = json2str({
        "steal_params": {
            "ccode":"0502",
            "client_ip":"192.168.1.1",
            "utid":"VFPlFKTomXgCAXWpS0HpQGDh",
            "client_ts":parseInt(t/1e3),
            "version":"0.6.14",
            "ckey":"DIl58SLFxFNndSV1GFNnMQVYkx1PP5tKe1siZu/86PR1u/Wh1Ptd+WOZsHHWxysSfAOhNJpdVWsdVJNsfJ8Sxd8WKVvNfAS8aS8fAOzYARzPyPc3JvtnPHjTdKfESTdnuTW6ZPvk2pNDh4uFzotgdMEFkzQ5wZVXl2Pf1/Y6hLK0OnCNxBj3+nb0v72gZ6b0td+WOZsHHWxysSo/0y9D2K42SaB8Y/+aD2K42SaB8Y/+ahU+WOZsHcrxysooUeND"
        },
        "biz_params": {
            "vid":encodevid,
            "current_showid":showid
        },
        "ad_params": {
            "vs":"1.0",
            "pver":"0.6.14",
            "sver":"1.0",
            "site":1,
            "aw":"w",
            "fu":0,
            "d":"0",
            "bt":"pc",
            "os":"win",
            "osv":"10",
            "dq":"auto",
            "atm":"",
            "partnerid":"null",
            "wintype":"interior",
            "isvert":0,
            "vip":0,
            "emb":emb,
            "p":1,
            "rst":"mp4",
            "needbf":2
        }
    });
    var sign = md5(token+"&"+t+"&"+appKey+"&"+data);
    var p = {
        jsv: '2.5.0',
        appKey: appKey,
        t: t,
        sign: sign,
        api: 'mtop.youku.play.ups.appinfo.get',
        v: '1.1',
        timeout: 20000,
        YKPid: '20160317PLF000211',
        YKLoginRequest: true,
        AntiFlood: true,
        AntiCreep: true,
        type: 'jsonp',
        dataType: 'jsonp',
        callback: 'mtopjsonp1', //回调，自行修改
        data: data
    };
    var dataurl = url+join(p,"&");
    return dataurl;
}
//添加到url参数
function join(e, c) {
    var arr = [];
    for (var key in e) {
        if (e.hasOwnProperty(key)) {
            var element = encodeURIComponent(e[key]);
            arr.push(key + '=' + element);
        }
    }
    return arr.join(c);
}
function json2str(obj){
    for(var i in obj){
        obj[i] = JSON.stringify(obj[i]);
    }
    return JSON.stringify(obj);
}
module.exports = youku;
