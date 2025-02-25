export const Post = ({ post, setPostId}) => {
    return (
        <div className="card post">
            <div className="postTextAlign card-body">
                <h5 className="card-title titleColor" onClick={()=>{setPostId(post.id)}}>{post.title}</h5>
                <h2>Topic: {post.topic.name}</h2>
                <h2>👍 {post.userLikesPost.length} Likes</h2>
            </div>
        </div>
    )
}