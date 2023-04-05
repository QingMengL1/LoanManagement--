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
  return axios.get("/api/datalist/studentlist/", { params });
}

export interface teacherTypes {
  pageSize: number;
  currentPage: number;
  search?: {
    name?: string;
    teacherId?: string;
    ruxueyear?: string;
    xingbie?: string;
  };
}

export function getTeacherData(params: teacherTypes) {
  return axios.get("/api/datalist/teacherlist/", { params });
}

export function editPassword(data: string) {
  return axios.post("/api/datalist/editpassword/", data);
}

export interface Types {
  type: string;
  ids: string[];
}

export function deleteData(data: Types) {
  return axios.post("/api/datalist/datalistdelete/", data);
}

export function editTeacher(data: object) {
  return axios.post("/api/datalist/teacheredit/", data);
}
