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
      // 获取文件名
      const filename = response.data.filename;
      // 获取文件数据
      const data = response.data.data;
      // 转换成二进制数据
      const byteCharacters = atob(data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      // 转换成Blob对象
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/octet-stream" });
      // 创建一个a标签
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      // 下载文件
      link.click();
    });
}

export interface fileType {
  pageSize: number;
  currentPage: number;
  search?: object;
}

export function getFileData(params: fileType) {
  return axios.get("/api/system/filedata/", { params });
}

export function deleteFileData(data: string) {
  return axios.post("/api/system/deletefile/", data);
}

export interface NewsType {
  pageSize: number;
  currentPage: number;
  title?: string;
}

export function getNewsData(params: NewsType) {
  return axios.get("/api/system/newsdata/", { params });
}

export interface AddNewsType {
  title: string;
  link: string;
}

export function queryAddNews(data: AddNewsType) {
  return axios.post("/api/system/addnews/", data);
}

export function queryDeleteNews(data: string) {
  return axios.post("/api/system/deletenews/", data);
}

export interface SendMessageType {
  id: string;
  read: boolean;
  send: string;
  to: string;
  event: string;
  uploaded: string;
}

export function querySendMessage(params: { type: string }) {
  return axios.get("/api/system/sendmessage/", { params });
}

export function queryReadMessage(data: string) {
  return axios.post("/api/system/readmessage/", data);
}
