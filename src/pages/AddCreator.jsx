import {useState} from "react"
import { useNavigate, Link } from "react-router-dom"
import { supabase } from "../clients"
import {FaYoutube, FaTwitter, FaInstagram} from "react-icons/fa"
import Header from "./Header"
import "./AddCreator.css"


function AddCreator() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [youtube, setYoutube] = useState("")
    const [twitter, setTwitter] = useState("")
    const [instagram, setInstagram] = useState("")
    const [description, setDescription] = useState("")
    const [imageURL, setImageURL] = useState("")

    const [saving, setSaving] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")

    async function handleSubmit(event) {
        event.preventDefault()
        setSaving(true)
        setErrorMessage("")

        const {data, error} = await supabase
        .from("creators")
        .insert([
            {name,description,youtube,twitter,instagram,imageURL}
        ])
        .select()
        .single()
        if(error) {
            console.error("Error adding the creator")
            setErrorMessage(error.message)
            setSaving(false)
            return;
        }
        navigate(`/creator/${data.id}`)
    }
    async function handleViewAllCreator() {
        navigate("/#creators")
    }
    return (
        <main>
            <Header onViewAll={handleViewAllCreator}/>
            <div className="form-wrapper">
            <div className="from-container">
            <h1 className="from-title" className="h1">Adding New Creator</h1>
            {errorMessage && <p>Error : {errorMessage}</p>}
            <form onSubmit={handleSubmit} className="creator-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        type="text"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="youtube">Youtube</label>
                    <input
                        id="youtube"
                        type="url"
                        value={youtube}
                        onChange={(event) => setYoutube(event.target.value)}
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="twitter">Twitter</label>
                    <input
                        id="twitter"
                        type="url"
                        value={twitter}
                        onChange={(event) => setTwitter(event.target.value)}

                    >
                    </input>
                </div>
                <div className="form-group">
                    <label htmlFor="instagream">Instagram</label>
                    <input
                        id="instagram"
                        type="url"
                        value={instagram}
                        onChange={(event) => setInstagram(event.target.value)}
                    ></input>
                </div>
                {/* <div>
                    <lable htmlFor="url">URL</lable>
                    <input
                        id="url"
                        type="url"
                        value={url}
                        onChange={(event) => setURL(event.target.value)}
                        required
                    
                    ></input>
                </div> */}

              

                <div className="form-group">
                    <label htmlFor="imageURL">Image URL</label>
                    <input
                        id="imageURL"
                        type="url"
                        value={imageURL}
                        onChange={(event) => setImageURL(event.target.value)}                    
                    ></input>
                </div>
                <button type="submit" >

                    ADD
                </button>


            </form>
            {/* <Link to="/">Cancel</Link> */}
            
            </div>
            </div>
        </main>
    )
}
export default AddCreator