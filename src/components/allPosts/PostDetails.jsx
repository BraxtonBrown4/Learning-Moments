import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getPostById } from "../../services/PostsService"
import "./Posts.css"

export const PostDetails = ({ currentUser }) => {
    const [post, setPost] = useState()
    const { postId } = useParams()

    useEffect(() => {
        getPostById(postId).then((res) => {
            setPost(res)
        })
    }, [])

    return (
        <div className="container">
            <div className="backgroundBox">
                <div className="postDetails">
                    <div className="postAuthorPosition">
                        {
                            post?.userId === currentUser?.id ?
                                <div className="authorAndEdit"><div className="postDetailsContents">{post?.user?.fullName}</div>  <Link to="/"><div className="postDetailsContents">Edit Post</div></Link></div> :   //takes user to edit post page
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
                            post?.userId !== currentUser?.id && <button className="postDetailsContents">insert toggle thumbs up and handler function to create liked post jointable👍</button>
                        }
                        <div className="postDetailsContents">{post?.userLikesPost.length} Likes</div>
                    </div>
                    <div className="postDetailsBody">{post?.body}</div>
                </div>
            </div>
        </div>
    )
}