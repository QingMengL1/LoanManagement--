import { UserState } from "@/store/types";
import axios from "axios";

export interface LoginData {
  username: string;
  password: string;
}

export function userLogin(data: LoginData) {
  // TODO:获取UserInfo
  return axios.post("/api/login/", data);
}

export function userLogout() {
  return axios.get("/api/logout/");
}

export function getUserInfo() {
  return axios.get<UserState>("/api/user/info/");
}
