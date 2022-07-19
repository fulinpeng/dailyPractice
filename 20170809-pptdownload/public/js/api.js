/**
 * Created by sunsharp on 2017/8/17.
 */

/**
    path            服务器地址
    api.fileurl     首页在线阅读的url，需单独修改
    验证码：'/ppt/getCaptcha'
    登录：'/ppt/login'
    地域列表：'/ppt/area'
    文件列表：'/ppt/file'
    下载：'/ppt/download'
    用户信息搜集提交：'/ppt/signInfo'
*/


// var path='http://192.168.1.80:8083';
var path='http://192.168.1.222:8484';

var api={
    getCaptcha:path+'/ppt/getCaptcha',
    login:path+'/ppt/login',
    area:path+'/ppt/area',
    file:path+'/ppt/file',
    download:path+'/ppt/download',
    signInfo:path+'/ppt/signInfo',
    fileurl:'http://ppt.sunsharp.cn/%E5%9C%A8%E7%BA%BF%E9%A2%84%E8%A7%88%E8%8C%83%E4%BE%8B.pdf'
};

// 判断是否是手机端浏览器
var mobileType=getBrowser();
function getBrowser() {
    var mobileType='';
    var ua = navigator.userAgent.toLowerCase();
    if ((ua.match(/msie|trident/g) || [])[0]) {
        btypeInfo = 'msie';
    }
    // 如果没有触摸事件 判定为PC
    var isTocuh = ('ontouchstart' in window) || (ua.indexOf('touch') !== -1) || (ua.indexOf('mobile') !== -1);
    if (isTocuh) {
        if (ua.indexOf('mobile') !== -1) {
            mobileType = 'mobile';
        } else if (ua.indexOf('android') !== -1) {
            mobileType = 'androidPad';
        } else {
            mobileType = 'pc';
        }
    } else {
        mobileType = 'pc';
    }
    return mobileType;
}

(function(global){
    //获取cookie对象，以对象表示
    function getCookiesObj(){
        var cookies = {};
        if(document.cookie){
            var objs = document.cookie.split('; ');
            for(var i in objs){
                var index = objs[i].indexOf('='),
                    name = objs[i].substr(0, index),
                    value = objs[i].substr(index + 1, objs[i].length);
                cookies[name] = value;
            }
        }
        return cookies;
    }
    //设置cookie
    function set(name, value, opts){
        //opts maxAge, path, domain, secure
        if(name && value){
            var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
            //可选参数
            if(opts){
                if(opts.maxAge){
                    cookie += '; max-age=' + opts.maxAge;
                }
                if(opts.path){
                    cookie += '; path=' + opts.path;
                }
                if(opts.domain){
                    cookie += '; domain=' + opts.domain;
                }
                if(opts.secure){
                    cookie += '; secure';
                }
            }
            document.cookie = cookie;
            return cookie;
        }else{
            return '';
        }
    }
    //获取cookie
    function get(name){
        return decodeURIComponent(getCookiesObj()[name]) || null;
    }
    //清除某个cookie
    function remove(name){
        if(getCookiesObj()[name]){
            document.cookie = name + '=; max-age=0';
        }
    }
    //清除所有cookie
    function clear(){
        var cookies = getCookiesObj();
        for(var key in cookies){
            document.cookie = key + '=; max-age=0';
        }
    }
    //获取所有cookies
    function getCookies(name){
        return getCookiesObj();
    }
    //解决冲突
    function noConflict(name){
        if(name && typeof name === 'string'){
            if(name && window['cookie']){
                window[name] = window['cookie'];
                delete window['cookie'];
                return window[name];
            }
        }else{
            return window['cookie'];
            delete window['cookie'];
        }
    }
    global['cookie'] = {
        'getCookies': getCookies,
        'set': set,
        'get': get,
        'remove': remove,
        'clear': clear,
        'noConflict': noConflict
    };
})(window);

function ajax(url, type, data, successFn, isCross) {
    /**
     *   url: 请求地址
     *   type: 请求方式
     *   data: 请求数据（标准数据格式：userName=1&userPwd=1...）
     *   successFn: 回调函数
     *   isCross: 是否跨域
     **/
    data = data || '';
    successFn = successFn || new Function();
    isCross = isCross || false;
    var type=type.toUpperCase();
    if (isCross && window.XDomainRequest) {    // IE 8、9、10 跨域 POST
        var xdr = new XDomainRequest();
        xdr.onload = function() {
            // var res = JSON.parse(xdr.responseText);
            // successFn(res);
            var res='';
            try {
                res = JSON.parse(xdr.responseText);
            } finally {
                successFn(res);
            }
        };
        xdr.onerror = function() {
            alert("error");
        };

        if (data) {
            xdr.open(type, url + '?' + data);
        } else {
            xdr.open(type, url);
        }
        xdr.send();
    } else {    // 常规 Ajax
        var xhr = null;
        if (window.XMLHttpRequest){
            xhr = new XMLHttpRequest();
            if (window.withCredentials) {
                xhr.withCredentials = true;
            }
        } else {
			var versions = ['MSXML2.XMLHttp','Microsoft.XMLHTTP'];
			for (var i = 0,len = versions.length; i<len; i++) {
				try {
					return new ActiveXObject(version[i]);
					break;
				} catch (e) {
					//跳过
				}  
			}
            // if (window.ActiveXObject) {
                // xhr = new ActiveXObject("Msxml2.XMLHTTP");
            // } else {
                // xhr = new ActiveXObject("Microsoft.XMLHTTP");
            // }
        }

        xhr.onreadystatechange = function(){
            if(xhr.readyState===4 && xhr.status===200){
                var res='';
                try {
                    res = JSON.parse(xhr.responseText);
                } catch (e){
                    console.log(e)
                } finally {
                    //不管有没有错误发生，都始终执行
                    if (res) {
                        successFn(res);
                    } else {
                        successFn(xhr.responseText);
                    }
                }
            }
        };
        xhr.onerror && (xhr.onerror = function(e){
            console.log(e);
        });
        if (type === 'GET') {
            // ----------------GET请求格式----------------------
            if (data) {
                xhr.open("GET", url + '?' + data , true);
            } else {
                xhr.open("GET", url, true);
            }

            xhr.send(null);
        } else {
            // ----------标准键值对POST-------------
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xhr.send(data);

            // ---------JSON格式------------
            // xhr.open("POST", url, true);
            // xhr.send(JSON.stringify(data));
        }
    }
}

if (!window.JSON) {
    window.JSON = {
        parse: function(jsonStr) {
            return eval('(' + jsonStr + ')');
        },
        stringify: function(jsonObj) {
            var result = '',
                curVal;
            if (jsonObj === null) {
                return String(jsonObj);
            }
            switch (typeof jsonObj) {
                case 'number':
                case 'boolean':
                    return String(jsonObj);
                case 'string':
                    return '"' + jsonObj + '"';
                case 'undefined':
                case 'function':
                    return undefined;
            }

            switch (Object.prototype.toString.call(jsonObj)) {
                case '[object Array]':
                    result += '[';
                    for (var i = 0, len = jsonObj.length; i < len; i++) {
                        curVal = JSON.stringify(jsonObj[i]);
                        result += (curVal === undefined ? null : curVal) + ",";
                    }
                    if (result !== '[') {
                        result = result.slice(0, -1);
                    }
                    result += ']';
                    return result;
                case '[object Date]':
                    return '"' + (jsonObj.toJSON ? jsonObj.toJSON() : jsonObj.toString()) + '"';
                case '[object RegExp]':
                    return "{}";
                case '[object Object]':
                    result += '{';
                    for (i in jsonObj) {
                        if (jsonObj.hasOwnProperty(i)) {
                            curVal = JSON.stringify(jsonObj[i]);
                            if (curVal !== undefined) {
                                result += '"' + i + '":' +curVal + ',';
                            }
                        }
                    }
                    if (result !== '{') {
                        result = result.slice(0, -1);
                    }
                    result += '}';
                    return result;

                case '[object String]':
                    return '"' + jsonObj.toString() + '"';
                case '[object Number]':
                case '[object Boolean]':
                    return jsonObj.toString();
            }
        }
    };
}