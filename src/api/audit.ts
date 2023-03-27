import axios from "axios";

export function getLoanData() {
  return axios.get("/api/audit/loandata/");
}
