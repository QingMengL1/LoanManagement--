import axios from "axios";

export interface LoginData {
  username: string;
  password: string;
}

export function login(data: LoginData) {
  // TODO:获取UserInfo
  return axios.post("/api/login/", data);
}
