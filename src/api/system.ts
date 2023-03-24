import axios from "axios";

export interface OptionType {
  code: number;
  name: string;
}

export function queryShengOption() {
  return axios.get<OptionType[]>("/api/area/sheng/");
}

export interface optionType {
  pcodeId: number;
}
export function queryShiOption(params: optionType) {
  return axios.get<OptionType[]>("/api/area/shi/", { params });
}

export function queryXianOption(params: optionType) {
  return axios.get<OptionType[]>("/api/area/xian/", { params });
}
export function queryMinzuOption() {
  return axios.get<OptionType[]>("/api/system/minzu/");
}

export function submitLoan(data: object) {
  return axios.post("/api/loan/submit/", data);
}