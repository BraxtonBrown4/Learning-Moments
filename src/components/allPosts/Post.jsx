import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getPostById } from "../../services/PostsService"
import { doesLikeExist } from "../../services/LikeServices"
import { FilledHeartIcon, UnFilledHeartIcon } from "../heartIcons/HeartIcons"

export const Post = ({ post, postsLocation, setPostToDelete, currentUser}) => {
    const [like, setLike] = useState(false)
    const [postLikes, setPostLikes] = useState(0)

    useEffect(() => {
            getPostById(post.id).then((res) => {
                const onlyThumbsUp = res.userLikesPost.filter(like => like.liked === true)
                setPostLikes(onlyThumbsUp.length)
            }).then(
                doesLikeExist(currentUser.id, parseInt(post.id)).then((likeObj) => {
                    if (likeObj.length > 0) {
                        setLike(likeObj[0].liked)
                    }
                })
            )
        }, [currentUser])

    return (
        <div className="card post">
            <div className="postTextAlign card-body">
                <Link to={`${postsLocation}/${post.id}`}>
                    <h5 className="card-title postTitle">{post.title}</h5>
                </Link>
                <h2>Topic: {post.topic.name}</h2>
                {
                    setPostToDelete ?
                        <div className="likesAndDelete">
                            <h2>{isLiked ? <FilledHeartIcon/> : <UnFilledHeartIcon/>} {postLikes} Likes</h2>
                            <button type="button" className="btn btn-danger" onClick={() => { setPostToDelete(post.id) }}>Delete</button>
                        </div> :
                        <h2>{like ? <FilledHeartIcon/> : <UnFilledHeartIcon/>} {postLikes} Likes</h2>
                }
            </div>
        </div>
    )
}