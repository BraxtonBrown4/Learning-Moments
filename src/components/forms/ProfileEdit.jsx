import { useEffect, useState } from "react"
import "./Forms.css"
import { getUserById } from "../../services/userService"
import { useNavigate } from "react-router-dom"

export const ProfileEdit = ({ currentUser }) => {
    const [profile, setProfile] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        getUserById(currentUser.id).then((res) => {
            setProfile(res[0])
        })
    }, [currentUser])

    return (
        <div className="profile-container">
            <div className="profile-box">
                <div className="text-container">
                    <h2 className="text-field-description">Full Name</h2>
                    <input type="text" className="text-field text-input" value={profile?.fullName}/>
                </div>
                <div className="text-container">
                    <h2 className="text-field-description">Cohort</h2>
                    <input className="text-field text-input" value={profile?.cohort}/>
                </div>
                <div className="text-container">
                    <h2 className="text-field-description">Number Of Posts</h2>
                    <div className="text-field">{profile?.posts?.length}</div>
                </div>
                <div className="control-btns">
                    <button type="button" className="btn btn-success control-btn">Save</button>
                    <button type="button" className="btn btn-danger control-btn" onClick={() => { navigate(`/profile/${profile.id}`) }}>Cancel</button>
                </div>
            </div>
        </div>
    )
}