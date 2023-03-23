import { UserState } from "@/store/types";
import axios from "axios";
import { da } from "element-plus/es/locale";

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

export function getUserBasic() {
  return axios.get("/api/user/basic/");
}

export interface editbasicType {
  basicForm: object;
  contactForm: object;
  schoolForm: object;
}

export function editUserBasic(data: editbasicType) {
  return axios.post("/api/user/editbasic/", data);
}
