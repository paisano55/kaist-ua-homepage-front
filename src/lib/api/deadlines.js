import axios from "axios";
import baseURL from "../baseURL";

const deadlines = axios.create({
    baseURL: `${baseURL}/deadlines`,
    withCredentials: true
});

export const get = () =>
    deadlines.get(`/`);


export const add = ({ year, semester, due }) =>
    deadlines.post("", { year, semester, due });