import { useEffect, useState } from "react"
import { getAllTopics } from "../../services/AllTopicsService"
import "./Posts.css"

export const NewPost = ({ currentUser }) => {
   const [topics, setTopics] = useState([])
   const [placeHolder, setPlaceHolder] = useState('Topic')

   //setUnixTime(Math.floor(Date.now() / 1000)


   useEffect(() => {
      getAllTopics().then(res => {
         setTopics(res)
      }
      )
   }, [])

   return (
      <div className="container">
         <div className="backgroundBox">
            <div className="postDetails">
               <div className="postAuthorPosition">
                  <div className="authorAndEdit">
                     <div className="postDetailsContents">author</div>
                  </div>
               </div>
               <input className="newPostInputs" placeholder="Title" />
               <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle topicBtn" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">{placeHolder}</button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                     {topics.map(topic => {
                        return <li key={topic.id}><a className="dropdown-item" href="#" onClick={() => {
                           setPlaceHolder(topic.name)
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
                  hour12: true})}</div>
               <input className="postDetailsBody newPostInputs" placeholder="Content" />
            </div>
         </div>
      </div>
   )
}