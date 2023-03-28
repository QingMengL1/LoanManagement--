import axios from "axios";

export interface LoanDataParamsType {
  status: string;
  pageSize: number;
  currentPage: number;
}
export function getLoanData(params: LoanDataParamsType) {
  return axios.get("/api/audit/loandata/", { params });
}

export interface editType {
  number: string;
  refuseValue?: string;
}

export function sendAgreeApply(data: editType) {
  return axios.post("/api/audit/aggreeapply/", data);
}

export function sendRefuseApply(data: editType) {
  return axios.post("/api/audit/refuseapply/", data);
}
