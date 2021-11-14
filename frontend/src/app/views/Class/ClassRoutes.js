import React from 'react'
import { authRoles } from '../../auth/authRoles'

const ClassRoutes = [
    {
        path: '/class/1/student',
        component: React.lazy(() => import('./StudentList')),
        auth: authRoles.sa,
    },
    {
        path: '/class/1',
        component: React.lazy(() => import('./ClassPage')),
        auth: authRoles.sa,
    },
    {
        path: '/class',
        component: React.lazy(() => import('./ClassList')),
        auth: authRoles.sa,
    },
    
]

export default ClassRoutes