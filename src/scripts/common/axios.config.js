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
    if (localStorage.getItem('token')) {
      config.headers['exchange-token'] = localStorage.getItem('token');
    }
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
    const locale = localStorage.getItem('locale') || 'ar';
    const result = response.data;
    if (result) {
      if (result.code != 0) {
        // 接口错误码判断
        Toast.show(toastMsg[result.code][locale], {
          icon: 'error',
          callback: function() {
            if (result.code == 2048 || result.code == 10002) {
              localStorage.removeItem('user');
              localStorage.removeItem('token');
              location.href = 'otc_adverts.html';
            }
          },
        });
        return false;
      }
      if (response.config && response.config.method === 'post' && response.config.showToast) {
        Toast.show(toastMsg[result.code][locale], { icon: 'ok' });
      }
      return result.data ? result.data : true;
    }
  },
  function(error) {
    // http错误码判断
    if (error.code === 'ECONNABORTED') {
      Toast.show('请求超时，请稍后再试', { icon: 'error' });
    }
    if (error.response.status >= 500) {
      location.href = '500.html';
    }
    if (error.response.status >= 400) {
      location.href = '404.html';
    }
    // 返回 response 里的错误信息
    return Promise.reject(error.response.statusText);
  }
);

function post(url, data, showToast) {
  var show = typeof showToast === 'undefined' ? true : showToast;
  return $http.post(url, data, { showToast: show });
}

function put(url, data, showToast) {
  var show = typeof showToast === 'undefined' ? true : showToast;
  return $http.put(url, data, { showToast: show });
}

function get(url, params, showToast) {
  var show = typeof showToast === 'undefined' ? true : showToast;
  return $http.get(url, { params: params, showToast: show });
}
