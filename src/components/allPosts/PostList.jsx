import { useEffect, useState } from "react"
import { getAllPosts } from "../../services/AllPostsService"
import { getAllTopics } from "../../services/AllTopicsService.js"
import { Post } from "./Post.jsx"
import { FilterUtilities } from "../filterUtilities/FilterUtilities.jsx"
import "./Posts.css"

export const PostList = () => {
    const [allPosts, setAllPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState(allPosts)
    const [topics, setTopics] = useState([])
    const [topicId, setTopicId] = useState(0)
    const [searchTerm, setSearchTerm] = useState('')
    const [postId, setPostId] = useState(0)

    useEffect(() => {
        getAllPosts().then(postsArray => {
            setAllPosts(postsArray)
        })

        getAllTopics().then((res) => {
            setTopics(res)
        })
    }, [])

    useEffect(() => {
        let updatedPosts = allPosts

        if (topicId > 0) {
            updatedPosts = updatedPosts.filter((post) => post.topic.id === topicId)
        }

        if (searchTerm !== '') {
            updatedPosts = updatedPosts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
        }

        setFilteredPosts(updatedPosts)

    }, [allPosts, topicId, searchTerm])

    useEffect(() => {
        console.log('click')
    }, [postId])

    return (
        <div>
            <div className="whiteSpace"></div>
            <FilterUtilities topics={topics} setTopicId={setTopicId} setSearchTerm={setSearchTerm} />
            <div className="allPosts">
                {filteredPosts.map(post => {
                    return <Post className="post" post={post} setPostId={setPostId} key={post.id} />
                })}
            </div>
        </div>
    )
}