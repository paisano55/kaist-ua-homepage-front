import baseURL from "../baseURL";
import axios from "axios";

const deadlines = axios.create({ baseURL: `${baseURL}/deadlines`, withCredentials: true });

export const list = () => deadlines.get();
export const create = (content) => deadlines.post("", content);
export const update = (id, content) => deadlines.patch(`/${id}`, content);