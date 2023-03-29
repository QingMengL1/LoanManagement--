import axios from "axios";

export interface LoanDataParamsType {
  status?: string;
  pageSize: number;
  currentPage: number;
  search?: {
    username?: string;
    academicYear?: string;
    status?: string;
    cause?: string;
  };
}
export function getLoanData(params: LoanDataParamsType) {
  return axios.get("/api/audit/loandata/", { params });
}

export interface editType {
  number: string | string[];
  refuseValue?: string;
}

export function sendAgreeApply(data: editType) {
  return axios.post("/api/audit/aggreeapply/", data);
}

export function sendRefuseApply(data: editType) {
  return axios.post("/api/audit/refuseapply/", data);
}
