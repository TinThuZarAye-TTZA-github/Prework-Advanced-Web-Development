/**
 * Read the creator id from the URl
 * Fetch the creator from Supabase
 * Fill the form with the current value
 * Update the row when the user submits the form
 */
import {useEffect, useState} from "react"
import {Link, useNavigate, useParams} from "react-router-dom"
import {supabase} from "../clients.js"
import Header from "./Header.jsx"
import "./EditCreator.css"

function EditCreator() {
    // useParams is dynamic routing parameters from the current URL path
    const {id} = useParams()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [youtube, setYoutube] = useState("")
    const [twitter, setTwitter] = useState("")
    const [instagram, setInstagram] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [loading, setLoading] = useState(true)
    const [saving, setSaving]   = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
   

  
    useEffect (() => {
        async function getCreator() {
            const {data, error} = await supabase
            .from("creators")
            .select("*")
            .eq("id", id)
            .single()

            if (error) {
                colsole.error("Error fetching creator:", error)
                setErrorMessage("Failed to fetch creator. Please try again later.")
            }else {
                setName(data.name ?? "")
                setDescription(data.description ?? "")
                setYoutube(data.youtube ?? "")
                setTwitter(data.twitter ?? "")
                setInstagram(data.instagram ?? "")
                setImageURL(data.imageURL ?? "")
                
            }
            setLoading(false)

        }
        getCreator()
    },[id])
    async function handleSubmit(event) {
        event.preventDefault()
        setSaving(true)

        setErrorMessage("")

        const {error} = await supabase
        .from("creators")
        .update({
            name, description, imageURL, youtube, twitter, instagram
        })
        .eq("id", id)

        if (error) {
            console.error("Error updating creator:", error)
            setErrorMessage("Failed to update creator. Please try again later.") 
            setSaving(false)
            return   
        }
        navigate(`/creator/${id}`)

        if(loading) {
            return <p>loading creator ...</p>
        }
    }

    async function handleDelete() {
  setDeleting(true);
  setErrorMessage("");

  const { error } = await supabase
    .from("creators")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting creator:", error);
    setErrorMessage(error.message);
    setDeleting(false);
    return;
  }

  navigate("/#creators");
}

    async function handleViewAllCreator() {
        navigate("/#creators")
    }
    return (
        <main>
            <Header onViewAll={handleViewAllCreator}/>

            <section className="edit-wrapper">
                <h1 className="edit-title">Editing Creator</h1>

                {errorMessage && <p className="error">{errorMessage}</p>}

                 <form onSubmit={handleSubmit} className="edit-form">

                <div className="edit-form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        id="name"
                        type="text"
                        value={name}

                        onChange = {(event) => setName(event.target.value )}
                        required
                    ></input>
                </div>

                

               
                <div className="edit-form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        id="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        required
                    
                    ></input>
                </div>

                <div className="edit-form-group">
                    <label htmlFor="youtube">Youtube</label>
                    <input
                        id="youtube"
                        type="url"
                        value={youtube}
                        onChange={(event) => setYoutube(event.target.value)}
                    ></input>
                </div>

                <div className="edit-form-group">
                    <label htmlFor="twitter">Twitter</label>
                    <input
                        id="twitter"
                        type="url"
                        value={twitter}
                        onChange={(event) => setTwitter(event.target.value)}
                    
                    ></input>
                </div>

                <div className="edit-form-group">
                    <label htmlFor="instagram">Instagram</label>
                    <input
                        id="instagram"
                        type="url"
                        value={instagram}
                        onChange={(event) => setInstagram(event.target.value)}
                    ></input>
                </div>

            
                <div className="edit-form-group">
                    <label htmlFor="imageURL">ImageURL</label>
                    <input
                        id="imageURL"
                        type="url"
                        value={imageURL}
                        onChange={(event) => setImageURL(event.target.value)}
                        required
                    ></input>
                </div>
                <div className="edit-actions">                
                    <button type="submit" disabled={saving}>

                    {saving ? "Saving..." : "Update Creator"}
                </button>

                {/* <button type="button"><Link to={`/creator/${id}`}>View Creator</Link></button> */}
                <Link to={`/creator/${id}`} className="action-btn">View Creator</Link>
                <button type="button" onClick={handleDelete} disabled={saving || deleting} className="action-btn delete-btn">Delete</button>
                </div>
            </form>
            
            </section>
            
            {/* <h1>Edit Creator</h1>
            {errorMessage && <p className="error">{errorMessage}</p>} */}

        {showConfirm && (
  <div className="modal-overlay">
    <div className="delete-modal">
      <h2>Delete Creator</h2>

      <p>
        Are you sure you want to delete{" "}
        <strong>{name}</strong>?
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
export default EditCreator