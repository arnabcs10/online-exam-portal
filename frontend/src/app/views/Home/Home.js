import React from 'react'
import useAuth from 'app/hooks/useAuth'
import { Link } from 'react-router-dom'


const Home = () => {
    const {
        isAuthenticated,
        logout,
        // user
    } = useAuth()
    return (
        <div>
            Home

            {
                (isAuthenticated ? <div>
                    <Link to='/class'>Go to Classroom</Link>
                    <div style={{cursor:"pointer"}} onClick={logout}>SignOut</div>
                    </div> 
                :
                <div><Link to='/session/signin'>SignIn</Link></div>
                )
            }
        </div>
    )
}

export default Home
