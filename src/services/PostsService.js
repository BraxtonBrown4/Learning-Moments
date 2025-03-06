export const getAllPosts = () => {
    return fetch('http://localhost:8088/posts?_embed=userLikesPost&_expand=topic').then((res) => res.json())
}

export const getPostById = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}?_embed=userLikesPost&_expand=topic&_expand=user`).then((res) => res.json())
}

export const createNewPost = (postObj) => {
    return fetch(`http://localhost:8088/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObj)
    }).then((res) => res.json())
}

export const doesLikeExist = (userId, postId) => {
    return fetch(`http://localhost:8088/userLikesPost?userId=${userId}&postId=${postId}`).then((res) => res.json())
}

export const deletePostById = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}`, {method: "DELETE"}).then((res) => res.json())
} 

export const savePost = (updatedPost) => {
    return fetch(`http://localhost:8088/posts/${updatedPost.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedPost)
    })
}