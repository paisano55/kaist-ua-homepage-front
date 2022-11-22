import baseURL from "../baseURL";
import axios from "axios";

const banners = axios.create({ baseURL: `${baseURL}/banners`, withCredentials: true });

export const list = () => banners.get();
export const remove = () => banners.delete();
export const create = (bannerInfo) => banners.post("", bannerInfo);
export const update = (id, content) => banners.patch(`/${id}`, content);