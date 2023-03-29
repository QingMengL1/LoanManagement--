import axios from "axios";

export interface studentTypes {
  pageSize: number;
  currentPage: number;
  search?: {
    name?: string;
    studentId?: string;
    classnumber?: number | null;
    zhuanye?: string;
    ruxueyear?: string;
  };
}

export function getStudentData(params: studentTypes) {
  return axios.get("/api/student/studentlist/", { params });
}
