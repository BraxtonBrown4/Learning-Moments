import { PostList } from "../components/allPosts/PostList"
import { PostDetails } from "../components/allPosts/PostDetails"
import { Routes, Route, Outlet } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"
import { useEffect, useState } from "react"
import { NewPost } from "../components/forms/NewPost"
import { MyPosts } from "../components/allPosts/MyPosts"
import { EditPost } from "../components/forms/EditPost"
import { FavoritePosts } from "../components/allPosts/FavoritePosts"
import { Profile } from "../components/profile/Profile"

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
                <Route index element={<PostList currentUser={currentUser}/>} />
                <Route path="/:postLocation/:postId" element={<PostDetails currentUser={currentUser}/>} />
                <Route path="/new-post" element={<NewPost currentUser={currentUser}/>}/>
                <Route path="/my-posts" element={<MyPosts currentUser={currentUser}/>}/>
                <Route path="/:postLocation/:postId/edit-post" element={<EditPost currentUser={currentUser}/>}/>
                <Route path="/favorites" element={<FavoritePosts currentUser={currentUser}/>}/>
                <Route path="/profile" element={<Profile currentUser={currentUser}/>}/>
            </Route>
        </Routes>
    )
}