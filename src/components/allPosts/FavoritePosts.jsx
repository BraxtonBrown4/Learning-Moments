import { useEffect, useState } from "react"
import { deletePostById, getAllPosts } from "../../services/PostsService.js"
import { getAllTopics } from "../../services/AllTopicsService.js"
import { Post } from "./Post.jsx"
import { FilterUtilities } from "../filterUtilities/FilterUtilities.jsx"
import "./Posts.css"
import { updateLike } from "../../services/LikeServices.js"

export const FavoritePosts = ({ currentUser }) => {
    const [favorites, setfavorites] = useState([])
    const [filteredPosts, setFilteredPosts] = useState(favorites)
    const [topics, setTopics] = useState([])
    const [topicId, setTopicId] = useState(0)
    const [searchTerm, setSearchTerm] = useState('')
    const [likeObj, setLikeObj] = useState(0)

    useEffect(() => {
        getAllPosts(currentUser.id).then(postsArray => {
            const favorites = postsArray.filter(post => post.userLikesPost.some(like => like.userId === currentUser.id && like.liked === true))
            setfavorites(favorites)
        })

        getAllTopics().then((res) => {
            setTopics(res)
        })
    }, [currentUser, likeObj])

    useEffect(() => {
        let updatedPosts = favorites

        if (topicId > 0) {
            updatedPosts = updatedPosts.filter((post) => post.topic.id === topicId)
        }

        if (searchTerm !== '') {
            updatedPosts = updatedPosts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
        }

        setFilteredPosts(updatedPosts)

    }, [favorites, topicId, searchTerm, topics])

    useEffect(()=>{
        likeObj.id > 0 && updateLike(likeObj)

        getAllPosts(currentUser.id).then(postsArray => {
            const favorites = postsArray.filter(post => post.userLikesPost.some(like => like.userId === currentUser.id && like.liked === true))
            setfavorites(favorites)
        })
    }, [likeObj])

    return (
        <div>
            <FilterUtilities topics={topics} setTopicId={setTopicId} setSearchTerm={setSearchTerm} />
            <div className="allPosts">
                {filteredPosts.map(post => {
                    return (
                        <Post className="post" post={post} postsLocation={'/favorites'} currentUser={currentUser} setLikeObj={setLikeObj} key={post.id}/>
                    )
                })}
            </div>
        </div>
    )
}