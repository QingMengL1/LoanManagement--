import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // let each request carry token
    // this example using the JWT token
    // Authorization is a custom headers key
    // please modify it according to the actual situation
    const token = "";
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    if (res.code !== 2000) {
      console.log(res.msg);
      return Promise.reject(new Error(res.msg || "Error"));
    }
    return res;
  },
  (error) => {
    console.log(error.msg);
    return Promise.reject(error);
  }
);
