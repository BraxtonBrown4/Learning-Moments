import { Link } from "react-router-dom"

export const Post = ({ post, postsLocation, setPostToDelete }) => {

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
                            <h2>👍 {post.userLikesPost.filter(like => like.liked === true).length} Likes</h2>
                            <button type="button" className="btn btn-danger" onClick={() => { setPostToDelete(post.id) }}>Delete</button>
                        </div> :
                        <h2>👍 {post.userLikesPost.filter(like => like.liked === true).length} Likes</h2>
                }
            </div>
        </div>
    )
}