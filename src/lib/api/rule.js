import axios from "axios";
import baseURL from "../baseURL";

const rules = axios.create({
    baseURL: `${baseURL}/rules`,
    withCredentials: true
});

export const write = rule => rules.post("", rule);

export const read = id => rules.get(`/${id}`);

export const list = () => rules.get("");

export const update = (id, rule) => rules.patch(`/${id}`, rule);

export const remove = id => rules.delete(`/${id}`);
