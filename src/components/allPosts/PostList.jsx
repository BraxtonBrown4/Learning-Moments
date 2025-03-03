import { useEffect, useState } from "react"
import { getAllPosts } from "../../services/PostsService.js"
import { getAllTopics } from "../../services/AllTopicsService.js"
import { Post } from "./Post.jsx"
import { FilterUtilities } from "../filterUtilities/FilterUtilities.jsx"
import { Link } from "react-router-dom"
import "./Posts.css"

export const PostList = () => {
    const [allPosts, setAllPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState(allPosts)
    const [topics, setTopics] = useState([])
    const [topicId, setTopicId] = useState(0)
    const [searchTerm, setSearchTerm] = useState('')

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

    return (
        <div>
            <div></div>
            <FilterUtilities topics={topics} setTopicId={setTopicId} setSearchTerm={setSearchTerm} />
            <div className="allPosts">
                {filteredPosts.map(post => {
                    return (
                        <Link to={`/allposts/${post.id}`} key={post.id}>
                            <Post className="post" post={post}/>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}