import axios from "axios";
import baseURL from "../baseURL";
import qs from "qs";

const intros = axios.create({
    baseURL: `${baseURL}/intro`,
    withCredentials: true
});

export const write = intro => intros.post("", intro);

export const read = ({ id, subId }) => intros.get(`/${id}/${subId}`);

export const list = ({ title }) => {
    const queryString = qs.stringify({
        title
    });
    return intros.get(`?${queryString}`);
};

export const update = (id, subId, intro) =>
    intros.patch(`${id}/${subId}`, intro);

export const remove = ({ id, subId }) => intros.delete(`${id}/${subId}`);
