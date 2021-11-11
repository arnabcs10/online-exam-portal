import React from 'react'
import useAuth from 'app/hooks/useAuth'
import { Link } from 'react-router-dom'


const ClassPage = () => {
    const {
        isAuthenticated,
        // user
    } = useAuth()
    return (
        <div>
            Class 1

            
        </div>
    )
}

export default ClassPage
