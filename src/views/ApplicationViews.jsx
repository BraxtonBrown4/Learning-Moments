import { PostList } from "../components/allPosts/PostList"
import { PostDetails } from "../components/allPosts/PostDetails"
import { Routes, Route, Outlet } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"
import { useEffect, useState } from "react"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const locallearningUser = localStorage.getItem("learning_user")
        const learningUserObject = JSON.parse(locallearningUser)

        setCurrentUser(learningUserObject)
    }, [])


    return (
        <Routes>
            <Route path="/" element={<><NavBar /> <Outlet /></>}>
                <Route index element={<PostList />} />
                <Route path="/allposts/:postId" element={<PostDetails currentUser={currentUser}/>} />
            </Route>
        </Routes>
    )
}