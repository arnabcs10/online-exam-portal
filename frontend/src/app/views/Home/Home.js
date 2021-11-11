import React from 'react'
import useAuth from 'app/hooks/useAuth'
import { Link } from 'react-router-dom'


const Home = () => {
    const {
        isAuthenticated,
        // user
    } = useAuth()
    return (
        <div>
            Home

            {
                (isAuthenticated ? <div>
                    <Link to='/class'>Go to Classroom</Link>
                    <div><Link to='/session/signout'>SignOut</Link></div>
                    </div> 
                :
                <div><Link to='/session/signin'>SignIn</Link></div>
                )
            }
        </div>
    )
}

export default Home
