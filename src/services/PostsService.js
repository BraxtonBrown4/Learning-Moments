export const getAllPosts = () => {
    return fetch('http://localhost:8088/posts?_embed=userLikesPost&_expand=topic').then((res)=>res.json())
}

export const getPostById = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}?_embed=userLikesPost&_expand=topic&_expand=user`).then((res)=>res.json())
} 