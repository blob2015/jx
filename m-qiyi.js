var w = require('./vf');
/**
 * 构造爱奇艺的m3u8或mp4视频地址
 * @param {Number} tvId 爱奇艺视频tvid
 * @param {String} vid 建议为null
 * @param {String} type mp4或者m3u8
 * @param {String} cb 回调函数
 */
function m_iqiyi(tvId, vid, type = 'mp4',cb = 'Q') {
    if(typeof tvId == 'undefined'){
        throw 'tvId is undefined!';
    }else if(typeof vid == 'undefined' || vid == null){
        vid = "15c8a7e2fe8511dfaa6aa4badb2c35a1";//vid暂时无所谓，以后可能会有用
    }
    var qyid = "hj1rxl4tdkdlwfzrgbc4u83z";
    var n = w.cmd5xtmts ? w.cmd5xtmts() : "";
    var e = {
        uid: '',
        cupid: "qc_100001_100186",
        platForm: "h5",
        qyid: qyid,
        agenttype: 13,
        type: type,
        nolimit: '',
        k_ft1: 8,
        rate: 1,
        sgti: "13_" + qyid + "_" + (new Date).getTime().toString(),
        codeflag: 1,
        preIdAll: '',
        dfp: '',
        pv: 0,
        qd_v: n.qd_v,
        qdy: n.qdy,
        qds: n.qds,
        tm: n.tm,
        src: '02020031010000000000',
        callback: cb
    };
    var a = "/jp/tmts/" + tvId + "/" + vid + "/?" + join(e, '&');
    var vf = w.cmd5x(a);
    var url = "http://cache.m.iqiyi.com" + a + "&vf=" + vf;
    return url;
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
module.exports = m_iqiyi;