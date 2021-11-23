import axios from "axios";
import store from "@/store";
import { Modal } from "antd";

import { getToken } from './auth'


//创建一个axios示例
const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_API, // api 的 base_url
  timeout: 5000, // request timeout
});

// 请求拦截
service.interceptors.request.use(
  (config) => {
    // 判断用户有没有带token
    if(store.getState().user.token) {
      // 如果有token，每一个请求带上token
      config.headers.Authoriztion = getToken();
    }
    return config
  },
  (error) => {
    // 抛出异常
    console.log(error)
    Promise.reject(error);
  }
)

// 响应拦截
service.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log('err', error);
    const { status } = error.response;
    if(status === 403) {
      Modal.confirm({
        title: '确定登出？',
        content: '长时间未操作，您已经被登出，可以取消继续留在该页面，或者重新登录',
        okText: '重新登录',
        cancelText: '取消',
        onOk() {
          // let token = store.getState().user.token;
          // store.dispath(logout(token))
        },
        onCancel() {
          console.log("Cancel");
        },
      })
    }
    return Promise.reject(error);
  }
)

export default service