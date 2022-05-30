import axios from "axios";
import baseURL from "../baseURL";

const intros = axios.create({
    baseURL: `${baseURL}/intros`,
    withCredentials: true
});

export const write = intro => intros.post("", intro);

export const read = id => intros.get(`/${id}`);

export const list = () => intros.get("");

export const update = (id, intro) => intros.patch(`/${id}`, intro);

export const remove = id => intros.delete(`/${id}`);
