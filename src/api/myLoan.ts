import axios from "axios";

export function submitLoan(data: object) {
  return axios.post("/api/loan/submit/", data);
}

export interface queryId {
  studentId: string;
}

export interface LoanStatusType {
  hetongbianhao: string;
  daikuanjine: number;
  fafangriqi: string;
  hetongyve: number;
  daoqiriqi: string;
  status: string;
  academicYear: string;
  shenpitime: string;
  shenqingtime: string;
}

export function getLoanStatus() {
  return axios.get<LoanStatusType[]>("/api/loan/status/");
}

export interface advanceDataType {
  hetongbianhao: string;
  academicYear: string;
  yve: number;
  jinqi: number;
  huankuan: number;
}

export interface repaymentType {
  hetongbianhao: string;
  huankuan: number;
}

export function repayment(data: repaymentType) {
  return axios.post("/api/loan/repayment/", data);
}
