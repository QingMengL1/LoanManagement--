import axios from "axios";

export function queryShengOption() {
  return axios.get("/api/area/sheng/");
}

export function queryShiOption(params: number) {
  return axios.get("/api/area/shi/", { params });
}

export function queryXianOption(params: number) {
  return axios.get("/api/area/xian/", { params });
}
export function queryMinzuOption() {
  return axios.get("/api/system/minzu/");
}
export function queryZhiyeOption() {
  return axios.get("/api/system/zhiye/");
}

export function submitLoan(data: object) {
  return axios.post("/api/loan/submit", data);
}
