import axios from "axios";

export interface TotalData {
  totalAmount: number;
  residualAmount: number;
  nextTime: string;
  message: number;
}

export function getTotalListData() {
  return axios.get<TotalData>("/api/home/getTotalData");
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
  return axios.get<MessageListResponse>("/api/home/getMessageData");
}
