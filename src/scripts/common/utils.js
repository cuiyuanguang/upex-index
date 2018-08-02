(function(w) {
  function getHost() {
    return w.location.href.match(/http:\/\/[^\/]*|https:\/\/[^\/]*/)[0];
  }

  // 写固定时间cookies
  function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
  }

  // 读取cookies
  function getCookie(name) {
    var arr,
      reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');

    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    else return null;
  }

  // 删除cookies
  function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
  }

  /**
   * 清空所有的cookie， 不要随便用。
   */
  function clearCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (var i = keys.length; i--; ) {
        if (keys[i] == 'JSESSIONID') continue;
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
      }
    }
  }

  // 写动态时间cookies
  function setCookieAndTime(name, value, time) {
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
  }

  // 取时间大小
  function getsec(str) {
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == 's') {
      return str1 * 1000;
    } else if (str2 == 'h') {
      return str1 * 60 * 60 * 1000;
    } else if (str2 == 'd') {
      return str1 * 24 * 60 * 60 * 1000;
    }
  }

  //时间戳 返回 小时
  function MillisecondToDate(msd) {
    var time = parseInt(msd, 10) / 1000;
    if (null != time && '' != time) {
      if (time > 60 && time < 3600) {
        time =
          '00:' +
          parseInt(time / 60) +
          ':' +
          parseInt((parseFloat(time / 60) - parseInt(time / 60)) * 60);
      } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
        time =
          parseInt(time / 3600) +
          ':' +
          parseInt((parseFloat(time / 3600) - parseInt(time / 3600)) * 60) +
          ':' +
          parseInt(
            (parseFloat((parseFloat(time / 3600) - parseInt(time / 3600)) * 60) -
              parseInt((parseFloat(time / 3600) - parseInt(time / 3600)) * 60)) *
              60
          );
      } else {
        time = '00:' + '00:' + parseInt(time);
      }
    }

    var a = time.split(':');
    var temp = '';
    a.forEach(function(i) {
      if (parseInt(i) <= 9 && parseInt(i) > 0) {
        i = '0' + i;
      }
      temp += i + ':';
    });
    return temp.replace(/:$/gim, '');
  }

  function initData(p) {
    for (var i in this[p]) {
      if (isNumberic(this[p][i])) {
        console.log(this[p][i]);
        this[p][i] = 0;
        console.log(this[p][i]);
      }
      if (isArray(this[p][i])) {
        this[p][i] = [];
      }
      if (typeof (this[p][i] == 'string')) {
        this[p][i] = '';
      }
    }
  }

  function isArray(value) {
    if (typeof Array.isArray === 'function') {
      return Array.isArray(value);
    } else {
      return Object.prototype.toString.call(value) === '[object Array]';
    }
  }

  function isNumberic(val) {
    if (val === '' || val == null) {
      return false;
    }
    if (!isNaN(val)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * 转换i18n数据格式
   * @param {object} obj 传入数据格式
   * var messages = {
   *    welcome: {
   *      zh: '欢迎光临',
   *      en: 'Welcome',
   *    },
   * };
   * transform(messages);
   * // => {
   *        zh: {
   *            welcome: '欢迎光临',
   *        },
   *        en: {
   *            welcome: 'Welcome',
   *        }
   *      }
   */
  function transform(obj) {
    var result = {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        for (var k in obj[key]) {
          if (obj[key].hasOwnProperty(k)) {
            result[k] = result[k] || {};
            result[k][key] = obj[key][k];
          }
        }
      }
    }
    return result;
  }

  /**
   * [getParam ]
   * @param  {String} name
   * @param  {String} url   [default:location.href]
   * @return {String|Boolean}
   */
  /* eslint-disable */
  function getParam(name, url) {
    if (typeof name !== 'string') return false;
    if (!url) url = window.location.href;
    // 当遇到name[xx]时，对方括号做一下转义为 name\[xxx\]，因为下面还需要使用name做正则
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  
  function dateFormat(utc, format) {
    var date = new Date(utc);
    format = format || 'yyyy-MM-dd HH:mm:ss';
    var o = {
      "M+": date.getMonth() + 1, //月份 
      "d+": date.getDate(), //日 
      "h+": date.getHours(), //小时 
      "m+": date.getMinutes(), //分 
      "s+": date.getSeconds(), //秒 
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
      "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return format;
  }

  if (!w.utils) {
    w.utils = {
      setCookie: setCookie,
      getCookie: getCookie,
      delCookie: delCookie,
      clearCookie: clearCookie,
      setCookieAndTime: setCookieAndTime,
      getsec: getsec,
      MillisecondToDate: MillisecondToDate,
      getHost: getHost,
      initData: initData,
      transform: transform,
      getParam: getParam,
      dateFormat: dateFormat,
    };
  }
})(window);
