/**
 * 爱奇艺视频例子,可直接在浏览器中打开
 * 从而获取一些视频信息
 */
var iqiyi = require("./qiyi");
var vid = 1798764800; //Number类型
console.log(iqiyi(vid))

/**
 * 优酷视频例子
 * 需要一定的cookie: _m_h5_tk和_m_h5_tk_enc 可在优酷网页中找到
 * 需要配合后端语言，不可直接利用浏览器解析
 */
var youku = require("./youku");
var encodevid = "XMzk1MjYwNzA0MA==";
// 本cookie已过期,这两个cookie必须对应存在
var cookie = "_m_h5_tk=866f1059b33f225ed7388933a89a860e_1550318733213; _m_h5_tk_enc=6d74f4a0d26085f4dacb0b2f6880f626";
var url = youku(encodevid,cookie);
console.log(url);

var parse = require("url").parse;
var option = parse(url);
option["headers"] = {
    "Cookie": cookie,
    "Referer":"https://v.youku.com/v_show/id_XNTQwMTgxMTE2.html",
    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.96 Safari/537.36"
};
var http = require("http");
var req = http.get(option, res => {
    var data = "";
    console.log(res.headers["set-cookie"]);
    res.on("data", chunk => {
        data += chunk;
    }).once("end", () => {
        // console.log("end!!!");
        data = data.substring(12,data.length-1);
        let json = JSON.parse(data);
        if(json['ret'][0].indexOf("SUCCESS")>=0){
            var stream = json["data"]["data"]["stream"];
            let maxLight = 0;
            console.log(json['data']['data']['video']['title']);
            // console.log(json["data"]["data"]["stream"][3]["m3u8_url"]);
            // 获取最高清晰度的视频
            for(let s in stream){
                maxLight = stream[s]["height"]>=stream[maxLight]["height"] ? s : maxLight;
            }
            let url = stream[maxLight]["m3u8_url"];
            console.log(url);
        }else{
            console.log(json);
        }
    });
});