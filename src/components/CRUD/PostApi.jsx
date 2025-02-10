import axios from "axios";

const api = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com"
})


// GET Method

export const getPost = () => {
    return api.get('/posts')
}


// DELETE Method 

export const deletePost = (id) => {
    return api.delete(`/posts/${id}`)
}


// POST Method

export const postData = (post) => {
    return api.post("/posts", post)
}



// PUT Method 

export const updateData = (id, post) => {
    return api.put(`/posts/${id}`,post)
}



