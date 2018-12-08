import axios from 'axios';
import Vue from 'vue';

const $http = axios.create({
  baseURL: EX_API, // api域名及端口
  timeout: 30000, // 超时自动取消请求
  responseType: 'json', // 返回数据格式
  withCredentials: true, // 是否允许带cookie等验证信息
  headers: {'Content-Type': 'application/json;charset=utf-8;'},
  notice: false, // 是否弹出成功提示
  process: true, // 是否在拦截函数中处理数据
});

// 添加请求拦截器
$http.interceptors.request.use(
  (config) => {
    // 统一修改请求地址参数
    const lang = localStorage.getItem('lang');
    config.headers['exchange-language'] = lang;
    return config;
  },
  error => Promise.reject(error),
);

// 添加响应拦截器
$http.interceptors.response.use(
  (response) => {
    return response.data;
  }
);
export default $http;

Plugin.install = () => {
  window.$http = $http;
  Object.defineProperties(Vue.prototype, {
    $http: {
      get() {
        return $http;
      },
    },
  });
};

Vue.use(Plugin);

