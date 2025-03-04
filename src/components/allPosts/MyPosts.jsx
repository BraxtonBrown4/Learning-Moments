import { useEffect, useState } from "react"
import { deletePostById, getMyPosts } from "../../services/PostsService.js"
import { getAllTopics } from "../../services/AllTopicsService.js"
import { Post } from "./Post.jsx"
import { FilterUtilities } from "../filterUtilities/FilterUtilities.jsx"
import "./Posts.css"

export const MyPosts = ({ currentUser }) => {
    const [myPosts, setmyPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState(myPosts)
    const [topics, setTopics] = useState([])
    const [topicId, setTopicId] = useState(0)
    const [searchTerm, setSearchTerm] = useState('')
    const [postToDelete, setPostToDelete] = useState(0)

    useEffect(() => {
        getMyPosts(currentUser.id).then(postsArray => {
            setmyPosts(postsArray)
        })

        getAllTopics().then((res) => {
            setTopics(res)
        })
    }, [currentUser, postToDelete])

    useEffect(() => {
        let updatedPosts = myPosts

        if (topicId > 0) {
            updatedPosts = updatedPosts.filter((post) => post.topic.id === topicId)
        }

        if (searchTerm !== '') {
            updatedPosts = updatedPosts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
        }

        setFilteredPosts(updatedPosts)

    }, [myPosts, topicId, searchTerm])

    useEffect(()=>{
        postToDelete > 0 && deletePostById(postToDelete)
    }, [postToDelete])

    return (
        <div>
            <FilterUtilities topics={topics} setTopicId={setTopicId} setSearchTerm={setSearchTerm} />
            <div className="allPosts">
                {filteredPosts.map(post => {
                    return (
                        <Post className="post" post={post} postsLocation={'/my-posts'} setPostToDelete={setPostToDelete} key={post.id}/>
                    )
                })}
            </div>
        </div>
    )
}