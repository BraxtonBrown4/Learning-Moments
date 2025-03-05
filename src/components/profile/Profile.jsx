import { useEffect, useState } from "react"
import "./Profile.css"
import { getUserById } from "../../services/userService"

export const Profile = ({ currentUser, authorId }) => {
    const [profile, setProfile] = useState({})

    useEffect(() => {
        const userId = authorId || currentUser.id

        userId && getUserById(userId).then((res) => { setProfile(res[0]) })

    }, [currentUser, authorId])

    return (
        <div className="profile-container">
            <div className="profile-box">
                <div className="text-field">{profile.fullName}</div>
                <div className="text-field">Cohort: {profile.cohort}</div>
                <div className="text-field">Posts: {profile.posts?.length}</div>
                {profile.id === currentUser.id && <button type="button" className="btn btn-light edit-btn">Edit</button>}
            </div>
        </div>
    )
}

/* save and cancle btns
    <div className="control-btns">
        <button type="button" class="btn btn-success">Save</button>
        <button type="button" class="btn btn-danger">Cancle</button>
    </div>
*/