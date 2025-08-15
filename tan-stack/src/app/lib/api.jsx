import axios from "axios";

const api =axios.create({
    baseURL:'https://jsonplaceholder.typicode.com'
});

// to fetch the data
export const fetchPost = async (pageNumber) => {
  try {
    const res = await api.get(`/posts?_start=${pageNumber}&_limit=3`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
  }
};

export default fetchPost