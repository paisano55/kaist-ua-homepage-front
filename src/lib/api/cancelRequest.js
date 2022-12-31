import axios from "axios";
import baseURL from "../baseURL";

const cancelRequest = axios.create({
  baseURL: `${baseURL}/cancelRequest`,
  withCredentials: true
});

export const write = ({ year, semester }) =>
  cancelRequest.post("", { year, semester });

export const getOne = () => cancelRequest.get();

export const remove = ({ year, semester }) =>
  cancelRequest.delete(`/`, { params: { year, semester } });