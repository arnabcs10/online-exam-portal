import React from 'react'
import { authRoles } from '../../auth/authRoles'

const ClassRoutes = [
    
    {
        path: '/class/:classId/test/:testId/student/:studentId',
        component: React.lazy(() => import('./StudentAnswerSheet')),
        auth: authRoles.sa,
    },
    {
        path: '/class/:classId/test/edit',
        component: React.lazy(() => import('./TestForm')),
        auth: authRoles.sa,
    },
    {
        path: '/class/:classId/test/:testId',
        component: React.lazy(() => import('./TestDashboard')),
        auth: authRoles.sa,
    },
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