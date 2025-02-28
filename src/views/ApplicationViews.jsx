import { PostList } from "../components/allPosts/PostList"
import { Routes, Route, Outlet } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={<><NavBar/> <Outlet/></>}>
                <Route index element={<PostList />} />
            </Route>
        </Routes>
    )
}