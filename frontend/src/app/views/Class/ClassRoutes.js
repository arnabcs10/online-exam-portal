import React from 'react'
import { authRoles } from '../../auth/authRoles'

const ClassRoutes = [
    {
        path: '/class/:classId/test',
        component: React.lazy(() => import('./TestList')),
        auth: authRoles.sa,
    },
    {
        path: '/class/:classId/student',
        component: React.lazy(() => import('./StudentList')),
        auth: authRoles.sa,
    },
    {
        path: '/class/:classId',
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