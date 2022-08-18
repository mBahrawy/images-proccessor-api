import axios from "axios";

export const getPost = async (id: number) => {
    return await axios(`https://jsonplaceholder.typicode.com/posts/${id}`);
};
