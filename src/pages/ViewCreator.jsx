import {useEffect, useState} from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import {supabase} from '../clients.js'
import Card from '../components/Card.jsx'
import Header from './Header.jsx'
import { FaYoutube, FaTwitter, FaInstagram, FaEdit} from 'react-icons/fa'
import "./ViewCreator.css"


function ViewCreator() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [creators, setCreators] = useState([])
    const [deleting, setDeleting] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [loading, setLoading] = useState(true)
    const[errorMessage, setErrorMessage] = useState("")
    

    useEffect(() => {
        async function getCreators() {
            const {data, error} = await supabase
            .from("creators")
            .select("*")
            .eq("id", id)
            .single()

            if(error) {
                console.error("Error fetching creator:", error)
                // setErrorMessage("Failed to fetch creator. Please try again later.")
            }else {
                setCreators(data)
            }
            setLoading(false)
        }
        getCreators()
    },[id])
    if(loading) {
        return <p>Loading creator...</p>
    }
    if (errorMessage) {
        return <p>{errorMessage}</p>
    }

    async function handleViewAllCreator() {
        navigate("/#creators")
    }

    async function handleDelete () {
       
        setDeleting(true)
        // setError("")

        
        const {error} = await supabase
        .from("creators")
        .delete()
        .eq("id", creators.id)

        if(error) {
            console.error("Error deleting" , error)
            setDeleting(false)
            return
        }
        setShowConfirm(false)
        navigate("/#creators")
        
        
    }
    return (
        <main className='view-creator-page'>
            <Header onViewAll={handleViewAllCreator}/>

            <article className='creator-detail-card'>
                <Link
                    to={`/creator/${creators.id}/edit`}
                    className='creator-edit-icon'
                    aria-label={`Edit ${creators.name}`}
                
                >
                    <FaEdit />
                </Link>

                 <div className='creator-detail-image-wrapper'>
            {
                creators.imageURL && (
                    <img 
                        src={creators.imageURL}
                        alt={creators.name}
                        className="creator-image"
                    />
                )
            }
            </div>

            <div className='creator-detail-info'>
                <h1>{creators.name}</h1>
                <div className='creator-detail-description'>
                    <h2>Description</h2>
                    <span>{creators.description}</span>
                </div>

                <div className='creator-social-links'>
                {creators.youtube && (
                    <a
                        href={creators.youtube}
                        target='_blank'
                        rel='noopener noreferrer'
                    >

                        <FaYoutube />
                        <span>{creators.youtube}</span>
                    </a>
                )}

                {creators.twitter && (
                    <a 
                        href={creators.twitter}
                        target='_blank'
                        rel='noopener noreferrer'
                    >

                        <FaTwitter />
                        <span>{creators.twitter}</span>
                    </a>
                )}

                {creators.instagram && (
                    <a
                        href={creators.instagram}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <FaInstagram />
                        <span>{creators.instagram}</span>
                    </a>
                )}

            </div>

            </div>
            <div className='creator-actions'>
                <Link
                    to={`/creator/${creators.id}/edit`}
                    className='edit-btn'
                >
                   
                    <span>EDIT</span>
                </Link>
                <button
                    type='button'
                    className='delete-btn'
                    onClick={() => setShowConfirm(true)}
                >
                    DELETE
                </button>
            </div>

            

            </article>

           
          {showConfirm && (
  <div className="modal-overlay">
    <div className="delete-modal">
      <h2>Delete Creator</h2>

      <p>
        Are you sure you want to delete{" "}
        <strong>{creators.name}</strong>?
      </p>

      <div className="modal-buttons">
        <button
          type="button"
          className="yes-btn"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Yes"}
        </button>

        <button
          type="button"
          className="no-btn"
          onClick={() => setShowConfirm(false)}
          disabled={deleting}
        >
          No
        </button>
      </div>
    </div>
  </div>
)}
        </main>
    )
}
export default ViewCreator