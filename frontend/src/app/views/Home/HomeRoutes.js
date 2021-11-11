import React from 'react'
import { authRoles } from '../../auth/authRoles'

const HomeRoutes = [
    {
        path: '/home',
        component: React.lazy(() => import('./Home')),
        auth: authRoles.sa,
    }
]

export default HomeRoutes