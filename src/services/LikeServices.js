export const createLike = (likeInfo) => {
    return fetch(`http://localhost:8088/userLikesPost`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(likeInfo)
    }).then((res) => res.json())
}

export const doesLikeExist = (userId, postId) => {
    return fetch(`http://localhost:8088/userLikesPost?userId=${userId}&postId=${postId}`).then((res) => res.json())
}

export const updateLike = (likeObj) => {
    return fetch(`http://localhost:8088/userLikesPost/${likeObj.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(likeObj)
    })
}