import { httpcode } from "./httpcode";
import { Toast } from "vant";
export default function({ $axios, redirect, store }, inject) {
  // 请求拦截
  $axios.onRequest(config => {
    //token验证
    if (store.state.token) {
      //  设置请求头的token, 用于身份验证
      $axios.setHeader("Authorization", `Bearer ${store.state.token}`);
    }
    return config;
  });

  // 响应拦截
  $axios.onResponse(response => {
    // console.log(response,'response');
    const { status, msg } = response.data;
    if (status !== 200) {
      Toast(msg);
    }
  });

  // 错误拦截
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    // 弹框提示
    Toast(httpcode[code]);
    if (code === 404) {
      redirect("/404");
    } else if (code == 401) {
      redirect("/my/login");
    }
  });

  // 请求方法封装
  let requestMethods = {};
  ["$get", "$post", "$delete", "#put"].forEach(method => {
    requestMethods[method] = function(url, data) {
      return $axios[method](url, data);
    };
  });

  inject("request", requestMethods);

  inject("request", requestMethods);
}
