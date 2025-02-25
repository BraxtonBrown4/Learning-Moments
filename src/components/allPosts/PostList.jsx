import { useEffect, useState } from "react"
import { getAllPosts } from "../../services/AllPostsService"
import { Post } from "./Post.jsx"
import { TopicsDropdown } from "./filterUtilities/TopicsDropdown.jsx"

export const PostList = () => {
    const [posts, setPosts] = useState([])
    const [postId, setPostId] = useState(0)

    useEffect(() => {
        getAllPosts().then(postsArray => {
            setPosts(postsArray)
        })
    }, [])

    useEffect(() => {
        console.log('click')
    }, [postId])

    return (
        <div>
            <header><TopicsDropdown/></header>
            <div className="allPosts">
                {posts.map(post => {
                    return <Post className="post" post={post} setPostId={setPostId} key={post.id} />
                })}
            </div>
        </div>
    )
}