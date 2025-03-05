import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getPostById} from "../../services/PostsService"
import { createLike, doesLikeExist, updateLike  } from "../../services/LikeServices"
import "./Posts.css"
import { FilledHeartIcon, UnFilledHeartIcon } from "../heartIcons/HeartIcons"

export const PostDetails = ({ currentUser }) => {
    const [post, setPost] = useState()
    const [like, setLike] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const [postLikes, setPostLikes] = useState(0)

    const { postLocation, postId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getPostById(postId).then((res) => {
            setPost(res)
            const onlyThumbsUp = res.userLikesPost.filter(like => like.liked === true)
            setPostLikes(onlyThumbsUp.length)
        }).then(
            doesLikeExist(currentUser.id, parseInt(postId)).then((likeObj) => {
                if (likeObj.length > 0) {
                    setLike(likeObj[0])
                }
            })
        )
    }, [currentUser])

    useEffect(()=>{
        setIsLiked(like.liked)
    }, [like])

    const handleLikeBtn = () => {
        const likeCopy = { ...like }
        likeCopy.liked = !like.liked
        setLike(likeCopy)
        setIsLiked(!isLiked)

        if (like) {
            updateLike(likeCopy)
            navigate('/favorites')
        } else {
            createLike({ userId: currentUser.id, postId: parseInt(postId), liked: true })
            navigate('/favorites')
        }
    }

    return (
        <div className="container">
            <div className="backgroundBox">
                <div className="postDetails">
                    <div className="postAuthorPosition">
                        {
                            post?.userId === currentUser?.id ?
                                <div className="authorAndEdit">
                                    <div className="postDetailsContents">{post?.user?.fullName}</div>
                                    <Link to={`/${postLocation}/${post?.id}/edit-post`}><div className="postDetailsContents">Edit Post</div></Link>
                                </div> :
                                <Link to="/"><div className="postDetailsContents">{post?.user?.fullName}</div></Link> //takes user to creator page
                        }
                    </div>
                    <div className="postDetailsContents">{post?.title}</div>
                    <div className="postDetailsContents">Topic: {post?.topic?.name}</div>
                    <div className="postDetailsContents">Created on {new Date(post?.date * 1000).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })}</div>
                    <div className="postLikes">
                        {
                            post?.userId !== currentUser?.id && <button className="postDetailsContents" onClick={handleLikeBtn}>{isLiked ? <FilledHeartIcon/> : <UnFilledHeartIcon/>}</button>
                        }
                        <div className="postDetailsContents">{postLikes} Likes</div>
                    </div>
                    <div className="postDetailsBody">{post?.body}</div>
                </div>
            </div>
        </div>
    )
}