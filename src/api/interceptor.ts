import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { getToken } from "@/utils/auth";
import { ElMessage } from "element-plus";
import router from "@/router";

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 请求拦截器，向请求中添加token之后发送请求
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {
          Authorization: "",
        };
      }
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    ElMessage.error(error.msg);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // 响应拦截器，判断相应状态是否正确做出对应操作
    const res = response.data;
    if (res.code !== 2000) {
      ElMessage.error(res.msg);
      if (res.code === 666) {
        router.push({ name: "Login" });
      }
      return Promise.reject(new Error(res.msg || "Error"));
    }
    return res;
  },
  (error) => {
    ElMessage.error(error);
    return Promise.reject(error);
  }
);
