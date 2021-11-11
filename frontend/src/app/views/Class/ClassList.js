import React from 'react'
import useAuth from 'app/hooks/useAuth'
import { Link } from 'react-router-dom'


const ClassList = () => {
    const {
        isAuthenticated,
        // user
    } = useAuth()
    return (
        <div>
            Class List

            
        </div>
    )
}

export default ClassList
