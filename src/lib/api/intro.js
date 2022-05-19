import axios from "axios";
import baseURL from "../baseURL";
import qs from "qs";

const posts = axios.create({
    baseURL: `${baseURL}/intro`,
    withCredentials: true
});

export const write = post => posts.post("", post);

export const read = ({ id, subId }) => posts.get(`/${id}/${subId}`);

export const list = ({ page, author, title, boardId }) => {
    const BoardId = boardId;
    const queryString = qs.stringify({
        page,
        author,
        title,
        BoardId
    });
    return posts.get(`?${queryString}`);
};

export const update = (id, post) =>
    posts.patch(`${id}`, post);

export const remove = id => posts.delete(`${id}`);
