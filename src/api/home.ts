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

export interface MessageListResponse {
  data: MessageListData[];
}

export function getMessageListData() {
  return axios.get<MessageListData[]>("/api/home/getmessagedata/");
}
