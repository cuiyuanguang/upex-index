var API_URL = '/';
var $http = axios.create({
  baseURL: API_URL, // api域名及端口
  timeout: 30000, // 超时自动取消请求
  responseType: 'json', // 返回数据格式
  withCredentials: true, // 是否允许带cookie等验证信息
  headers: {
    'Content-Type': 'application/json;charset=utf-8;',
  },
});

$http.interceptors.request.use(
  function(config) {
    // 统一修改请求地址参数
    if (utils.getCookie('token')) {
      config.headers['exchange-token'] = utils.getCookie('token');
    }
    // if (config.method === 'post' || config.method === 'option') {
    //   config.data = qs.stringify(config.data);
    // }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
$http.interceptors.response.use(
  function(response) {
    // 处理响应数据
    const locale = localStorage.getItem('locale') || 'zh';
    const result = response.data;
    if (result) {
      if (result.code != 0) {
        // 接口错误码判断
        // Toast.show(toastMsg[result.code][locale], { icon: 'warning' });
        Toast.show(toastMsg[result.code][locale], {
          icon: 'warning',
          callback: function() {
            if (result.code == 2048) {
              localStorage.clear();
              utils.delCookie('token');
              location.href = 'otc_adverts.html?auth=1';
            }
          }
        });
        return {
          success: false,
          data: toastMsg[result.code][locale],
        };
      }
      if (response.config.method === 'post' && response.config.showToast) {
        // Toast.show(toastMsg[result.code][locale], { icon: 'ok' });
        Toast.show(toastMsg[result.code][locale], { icon: 'ok' });
      }
      return {
        success: true,
        data: result,
      };
    }
  },
  function(error) {
    // http错误码判断
    console.log(error.response.statusText);
    // location.href = 'otc_error.html?code=' + error.response.status;
    // 返回 response 里的错误信息
    return Promise.reject(error.response.statusText);
  }
);

function post(url, data, showToast) {
  var show = typeof showToast === 'undefined' ? true : showToast;
  return $http.post(url, data, { showToast: show }).then(function(response) {
    return response;
  });
}

function get(url, params, showToast) {
  var show = typeof showToast === 'undefined' ? true : showToast;
  return $http.get(url, { params: params, showToast: show }).then(function(response) {
    return response;
  });
}
