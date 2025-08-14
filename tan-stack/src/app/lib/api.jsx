import axios from "axios";

const api =axios.create({
    baseURL:'https://jsonplaceholder.typicode.com'
});

const fetchPost=()=>{
    return api.get('/posts')
}

export default fetchPost