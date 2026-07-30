import { Link } from "react-router-dom"
 
function Header ({onViewAll})  {


    return (
        <section className='creators-header' >
                <h1>Creator</h1>

                <div className='header-links'>
                    <button
                        type='button'
                        className='header-link-btn'
                        onClick={onViewAll}
                    >View All Creators</button>
                    <Link to={`/new`}>Add new Creator</Link>

                </div>

            </section>
    )
}

export default Header