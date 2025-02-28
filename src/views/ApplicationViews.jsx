import { PostList } from "../components/allPosts/PostList"
import { Routes, Route } from "react-router-dom"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={<PostList/>}/>
        </Routes>
    )
}

