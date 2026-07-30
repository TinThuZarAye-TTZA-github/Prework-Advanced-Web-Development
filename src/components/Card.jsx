import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../clients"
import {FaYoutube, FaInstagram, FaTwitter} from "react-icons/fa"
import "./Card.css"

function Card({creator}) {
    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState("")
    const [showConfirm, setShowConfirm] = useState(false)
    async function handleDelete () {
        // const confirmed = window.confirm(
        //     "Are you sure you want to delete this creator?"
        // )
        // if(!confirmed)  {
        //     return;
        // }
        setDeleting(true)
        setError("")

        
        const {error} = await supabase
        .from("creators")
        .delete()
        .eq("id", creator.id)

        if(error) {
            console.error("Error deleting" , error)
            setDeleting(false)
            return
        }
        window.location.reload()
        
        
    }
    return (
        <article className="creator-card">
            {creator.imageURL && (
                <img 
                
                    src={creator.imageURL}
                    alt={creator.name}
                    className="card-image"
                />
            )}
          

            <div className="creator-card-content">
                <h2>{creator.name}</h2>
                <p>{creator.description}</p>

                <div className="creator-social-icons">
                    {creator.youtube && (
                        <a href={creator.youtube} target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                    )}
                    {
                        creator.instagram && (
                            <a href={creator.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                        )
                    }
                    {creator.twitter && (
                        <a href={creator.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                    )}
                </div>

                <div className="creator-card-actions">
                    <Link to={`/creator/${creator.id}`}>View</Link>
                    <Link to={`/creator/${creator.id}/edit`}>Edit</Link>
                    <button type="button" onClick={() => setShowConfirm(true)}>Delete</button>


                </div>
             
            </div>

            {
                showConfirm && (
                    <div className="modal-overlay">
                        <div className="delete-modal">
                            <h2>Delete Craetor</h2>
                            <p>
                                Are you sure you want to delete 
                                <strong>{creator.name}</strong>
                            </p>

                            <div className="modal-buttons">     
                                <button className="yes-btn" onClick={handleDelete}>
                                    YES
                                </button>
                                <button
                                    className="no-btn" onClick={() => setShowConfirm(false)}
                                >NO</button>
                            </div>
                        </div>

                    </div>
                )
            }
        </article>
       
    )
}

export default Card