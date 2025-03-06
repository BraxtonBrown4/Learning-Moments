import { useEffect, useState } from "react"
import "./Profile.css"
import { getUserById } from "../../services/userService"
import { Link, useParams } from "react-router-dom"

export const Profile = ({ currentUser }) => {
    const [profile, setProfile] = useState({})

    const { authorId } = useParams()

    useEffect(() => {
        const userId = authorId || currentUser?.id

        userId && getUserById(userId).then((res) => { setProfile(res[0]) })

    }, [currentUser, authorId])

    return (
        <div className="profile-container">
            <div className="profile-box">
                <div className="text-container">
                    <h2 className="text-field-description">Full Name</h2>
                    <div className="text-field">{profile.fullName}</div>
                </div>
                <div className="text-container">
                    <h2 className="text-field-description">Cohort</h2>
                    <div className="text-field">{profile.cohort}</div>
                </div>
                <div className="text-container">
                    <h2 className="text-field-description">Number Of Posts</h2>
                    <div className="text-field">{profile.posts?.length}</div>
                </div>
                {profile.id === currentUser?.id && <Link to={`/profile/edit`} className="edit-btn-link"><button type="button" className="btn btn-light edit-btn">Edit</button></Link>}
            </div>
        </div>
    )
}