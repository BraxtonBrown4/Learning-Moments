import { useEffect, useState } from "react"
import { getAllTopics } from "../../services/AllTopicsService"
import "./Forms.css"
import { getUserById } from "../../services/userService"
import { createNewPost } from "../../services/PostsService"
import { useNavigate } from "react-router-dom"

export const NewPost = ({ currentUser }) => {
   const [topics, setTopics] = useState([])
   const [userInfo, setUserInfo] = useState(0)
   const [placeHolder, setPlaceHolder] = useState('Topic')

   const [title, setTitle] = useState(0)
   const [topicId, setTopicId] = useState(0)
   const [body, setBody] = useState(0)

   const navigate = useNavigate()

   useEffect(() => {
      getAllTopics().then(res => {
         setTopics(res)
      })

   getUserById(currentUser.id).then(res => {
      const user = res[0]
      setUserInfo(user)
   })
   }, [currentUser])

   const handleCreateBtn = () => {
      const newPost = {
         "userId": currentUser.id,
         "topicId": topicId,
         "title": title,
         "body": body,
         "date": Math.floor(Date.now() / 1000),
      }

      Object.values(newPost).some(value => value === 0 || value.length === 0) ?
         alert('Please Fill Out All Forms') :
         (createNewPost(newPost), navigate('/my-posts'))
   }

   return (
      <div className="container">
         <div className="backgroundBox">
            <div className="postDetails">
               <div className="postAuthorPosition">
                  <div className="authorAndEdit">
                     <div className="postDetailsContents">{userInfo?.fullName}</div>
                  </div>
               </div>
               <input className="newPostInputs" onChange={(event) => {setTitle(event.target.value)}} placeholder="Title" />
               <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle topicBtn" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">{placeHolder}</button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                     {topics.map(topic => {
                        return <li key={topic.id}><a className="dropdown-item" href="#" onClick={() => {
                           setPlaceHolder(topic.name)
                           setTopicId(topic.id)
                        }
                        }>{topic.name}</a></li>
                     })}
                  </ul>
               </div>
               <div className="postDetailsContents">{new Date().toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
               })}</div>
               <input className="postDetailsBody newPostInputs" onChange={(event) => {setBody(event.target.value)}} placeholder="Body" />
               <button type="button" className="btn btn-success createBtn" onClick={handleCreateBtn}>Create</button>
            </div>
         </div>
      </div>
   )
}