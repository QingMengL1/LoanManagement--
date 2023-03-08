import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { getToken } from "@/utils/auth";
import { ElMessage } from "element-plus";
import router from "@/router";

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // let each request carry token
    // this example using the JWT token
    // Authorization is a custom headers key
    // please modify it according to the actual situation
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
    const res = response.data;
    if (res.code !== 2000) {
      ElMessage.error(res.msg);
      if (res.mse === "请登陆后在进行操作") {
        router.push({ name: "Login" });
      }
      return Promise.reject(new Error(res.msg || "Error"));
    }
    ElMessage.success(res.msg);
    return res;
  },
  (error) => {
    ElMessage.error(error);
    return Promise.reject(error);
  }
);
