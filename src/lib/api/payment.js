import baseURL from "../baseURL";
import axios from "axios";

const payments = axios.create({
  baseURL: `${baseURL}/payments`,
  withCredentials: true
});

export const bulkUpload = body => payments.post("/admin", body);
export const list = body => payments.get("", body);
export const getAll = ({ year, semester }) => payments.get("/all", { params: { year, semester } });