export const getAllPosts = () => {
    return fetch('http://localhost:8088/').then((res)=>res.json())
}