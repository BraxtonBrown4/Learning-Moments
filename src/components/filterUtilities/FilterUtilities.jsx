import { useState } from "react"
import "./FilterUtilities.css"

export const FilterUtilities = ({ topics, setTopicId, setSearchTerm }) => {
    const [placeHolder, setPlaceHolder] = useState('All')

    return (
        <div className="filterUtilities">
            <div className="dropdown topicsDropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    Filtering Posts by {placeHolder}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li key={0}><a className="dropdown-item" href="#" onClick={() => {
                        setTopicId(0)
                        setPlaceHolder('All')
                    }
                    }>All</a></li>
                    {topics.map(topic => {
                        return <li key={topic.id}><a className="dropdown-item" href="#" onClick={() => {
                            setTopicId(topic.id)
                            setPlaceHolder(topic.name)
                        }
                        }>{topic.name}</a></li>
                    })}
                </ul>
            </div>
            <input type="text" className="searchBar" placeholder="Filter By Title" onChange={(event) => setSearchTerm(event.target.value)}/>
        </div>
    )
}