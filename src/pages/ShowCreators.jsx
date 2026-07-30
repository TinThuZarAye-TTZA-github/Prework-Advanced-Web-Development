import {useEffect, useState, useRef} from 'react'
import {supabase} from '../clients.js'
import Card from '../components/Card.jsx'
import { Link } from 'react-router-dom'
import "./ShowCreators.css"
import Header from './Header.jsx'

function ShowCreators() {
    const creatorRef = useRef(null)
    const [creators, setCreators] = useState([])
    const [loading, setLoading] = useState(true)
    const[errorMessage, setErrorMessage] = useState("")
    

    useEffect(() => {
        async function getCreators() {
            const {data, error} = await supabase
            .from("creators")
            .select("*")
            // .order("name", {ascending: true})

            if(error) {
                console.error("Error fetching creators:", error)
                setErrorMessage("Failed to fetch creators. Please try again later.")
            }else {
                setCreators(data ?? [])

            }
            setLoading(false)
            
        }
        getCreators()
    },[])
    if(loading) {
        return <p>Loading creators...</p>
    }
    if (errorMessage) {
        return <p>{errorMessage}</p>
    }

    function scrollToCreators () {
        creatorRef.current?.scrollIntoView({
            behavior : "smooth",
            block : "start"
        })
    }
    return (
        <main className='creators-page'>
            <Header onViewAll={scrollToCreators}/>
           
            <section className='creator-list' ref={creatorRef}>
                  {creators.length === 0 ? (
                <p>No creators found</p>
            ): 
            (
                <section className="creators-grid" ref={creatorRef}>
                    {creators.map((creator) => (
                        <Card key={creator.id} creator={creator}
                                
                        />
                    ))  }

                </section>
            )
            }
            </section>

            
          
          
        </main>
    )
}
export default ShowCreators