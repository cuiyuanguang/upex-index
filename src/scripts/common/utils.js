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

  function addZero(num) {
    return num > 10 ? num : '0' + num;
  }

  //时间戳 返回 小时
  function MillisecondToDate(msd) {
    var time = parseInt(msd, 10) / 1000;
    if (null != time && '' != time) {
      if (time > 60 && time < 3600) {
        time =
          '00:' +
          addZero(parseInt(time / 60)) +
          ':' +
          addZero(parseInt((parseFloat(time / 60) - parseInt(time / 60)) * 60));
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
        time = '00:' + '00:' + addZero(parseInt(time));
      }
    }

    var a = time.split(':');
    var temp = '';
    a.forEach(function(i) {
      if (parseInt(i) < 9 && parseInt(i) > 0) {
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
    for(var key in obj) {
      if (obj.hasOwnProperty(key)) {
        for(var k in obj[key]) {
          if (obj[key].hasOwnProperty(k)) {
            result[k] = {
              [key]: obj[key][k],
            };
          }
        }
      }
    }
    return result;
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
    };
  }
})(window);
