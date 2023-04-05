import axios from "axios";

export interface TotalData {
  total: number;
  shengyv: number;
  messages: number;
}

export function getTotalListData() {
  return axios.get<TotalData>("/api/home/gettotaldata/");
}

export interface MessageListData {
  id: number;
  link: string;
  title: string;
  time: string;
}

export interface fileListType {
  id: number;
  name: string;
}
export interface MessageListType {
  messageData: MessageListData[];
  fileData: fileListType[];
}

export function getMessageListData() {
  return axios.get<MessageListType>("/api/home/getmessagedata/");
}
