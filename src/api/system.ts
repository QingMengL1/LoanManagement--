import axios from "axios";

export interface OptionType {
  code: number;
  name: string;
}

export function queryShengOption() {
  return axios.get<OptionType[]>("/api/area/sheng/");
}

export interface optionIdType {
  Id: number;
}
export function queryShiOption(params: optionIdType) {
  return axios.get<OptionType[]>("/api/area/shi/", { params });
}

export function queryXianOption(params: optionIdType) {
  return axios.get<OptionType[]>("/api/area/xian/", { params });
}
export function queryMinzuOption() {
  return axios.get<OptionType[]>("/api/system/minzu/");
}

export interface queryType {
  pageSize: number;
  currentPage: number;
  search?: object;
}

export function getLogData(params: queryType) {
  return axios.get("/api/system/log/", { params });
}

export function getXueYuanData() {
  return axios.get("/api/system/xueyuan/");
}

export function getZhuanYeData(params?: optionIdType) {
  return axios.get("/api/system/zhuanye/", { params });
}

export function uploadAxios(data: any) {
  return axios.post("/api/system/upload/", data);
}
export interface downloadType {
  Id: number;
  fileName: string;
}
export function downloadAxios(params: downloadType) {
  axios
    .get("/api/system/download/", {
      params,
    })
    .then((response) => {
      const filename = response.data.filename;
      const data = response.data.data;
      const byteCharacters = atob(data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/octet-stream" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    });
}
