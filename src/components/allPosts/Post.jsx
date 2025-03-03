export const Post = ({ post }) => {
    return (
        <div className="card post">
            <div className="postTextAlign card-body">
                <h5 className="card-title titleColor">{post.title}</h5>
                <h2>Topic: {post.topic.name}</h2>
                <h2>👍 {post.userLikesPost.length} Likes</h2>
            </div>
        </div>
    )
}