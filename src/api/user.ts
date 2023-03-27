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
  formData: object;
}

export function editUserBasic(data: editbasicType) {
  return axios.post("/api/user/editbasic/", data);
}

export interface userSettingType {
  id: string;
  password1: string;
  password2: string;
  phone: string;
  email: string;
  qq: string;
}

export function userSetting(data: userSettingType) {
  return axios.post("/api/user/setting/", data);
}

export function subCommonUser(data: object) {
  return axios.post("/api/user/subcommon/", data);
}

export interface conmmonDataType {
  commonName: string;
  relation: string;
  idCard: string;
  phone: string;
  guoji: string;
  idCardType: string;
  hukouxingzhi: string;
  minzu: number;
  xingbie: string;
  hunyinzhuangkuang: string;
  zhiye: string;
  jiatingdianhua: string;
  youbian: string;
  idCardQishi: string;
  idCardJieshu: string;
  jiankangzhuangkuang: string;
  hujiSheng: number;
  hujiShi: number;
  hujiXian: number;
  hujiDetailed: string;
  jiatingSheng: number;
  jiatingShi: number;
  jiatingXian: number;
  jiatingDetailed: string;
}

export function getCommonData() {
  return axios.get("/api/user/commondata/");
}
