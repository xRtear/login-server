/** axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from "axios";
import QS from "qs";
import { Message } from "element-plus";
import store from "@/store";
// 请求超时时间
axios.defaults.timeout = 50000;

// //设置全局请求头
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// // 设置 withCredentials
// axios.defaults.withCredentials = true;
// post请求头
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";

// 请求拦截器


// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        case 401:
          // Message({
          //   message: "登录过期，请重新登录!",
          //   type: "warning",
          // });
          // store.dispatch("auth/logout");
          break;
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          Message({
            message: "登录过期，请重新登录!",
            type: "warning",
          });
          store.dispatch("auth/logout");

          break;
        // 404请求不存在
        case 404:
          Message.error("网络请求不存在!");

          break;
        // 其他错误，直接抛出错误提示
        default:
          Message.error("服务器错误，请稍后重试！");
      }
      return Promise.reject(error.response);
    }
  }
);
export default axios;

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, QS.stringify(params))
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
/** 额外封装post请求 应对独立方式
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function zzkxPost(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
/**
 * delete方法，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function remove(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, { params })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function putJson(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, QS.stringify(params))
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
