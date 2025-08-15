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

export const fetchInvPost = async (id) => {
  try {
    const res = await api.get(`/posts/${id}`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log(error);
  }
};

export const deletePost=(id)=>{
    return api.delete(`/posts/${id}`)
};

/// to update the post
export const updatePost = (id) => {
  return api.patch(`/posts/${id}`, { title: "I have updated" });
};

//infinite scrolling
export const fetchUsers=async({pageParam=1})=>{
  try {
    const res=await axios.get(`https://api.github.com/users?per_page=10&page=${pageParam}`) //pageParam is page no.
    return res.data;
  } catch (error) {
    console.log(error)
  }
}