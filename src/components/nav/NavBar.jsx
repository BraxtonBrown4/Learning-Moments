import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="nav-bar">
            <div className="nav-btns">
                <li className="btn btn-light nav-btn-color nav-btn">
                    <Link to="/">All Posts</Link>
                </li>
                <li className="btn btn-light nav-btn-color nav-btn">
                    <Link to="/new-post">Create New Post</Link>
                </li>
                <li className="btn btn-light nav-btn-color nav-btn">
                    <Link to="/my-posts">My Posts</Link>
                </li>
                <li className="btn btn-light nav-btn-color nav-btn">
                    <Link to="/favorites">Favorites</Link>
                </li>
            </div>
            <div className="profile-logout">
                <li className="btn btn-light nav-btn-color">
                    <Link to="">Profile</Link>
                </li>

                {localStorage.getItem("learning_user") ? (
                    <li className="btn btn-danger nav-btn-color">
                        <Link to="" onClick={() => {
                            localStorage.removeItem("learning_user")
                            navigate("/", { replace: true })
                        }}>Logout</Link>
                    </li>) : ("")}
            </div>
        </ul>
    )
}