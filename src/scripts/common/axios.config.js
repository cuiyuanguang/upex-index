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
        Toast.show(result.message, {
          icon: 'warning',
          callback: function() {
            if (result.code == 2048) {
              utils.delCookie('token');
            }
          }
        });
        return {
          success: false,
          data: result.message,
        };
      }
      if (response.config.method === 'post') {
        // Toast.show(toastMsg[result.code][locale], { icon: 'ok' });
        Toast.show(result.message, { icon: 'ok' });
      }
      return {
        success: true,
        data: result,
      };
    }
  },
  function(error) {
    // http错误码判断
    console.log(error);
    // swal('Warning!', res.data.message, 'error');
    // 返回 response 里的错误信息
    return Promise.reject(error.response.statusText);
  }
);

function post(url, data) {
  return $http.post(url, data).then(function(response) {
    return response;
  });
}

function get(url, params) {
  return $http.get(url, { params: params }).then(function(response) {
    return response;
  });
}
