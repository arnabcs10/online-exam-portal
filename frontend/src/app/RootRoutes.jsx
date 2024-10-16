import React from 'react'
import { Redirect } from 'react-router-dom'

import homeRoutes from './views/Home/HomeRoutes'
import ClassRoutes from './views/Class/ClassRoutes'
import testRoutes from './views/Assessment/TestRoutes'
import dashboardRoutes from './views/dashboard/DashboardRoutes'
import utilitiesRoutes from './views/utilities/UtilitiesRoutes'

import materialRoutes from './views/material-kit/MaterialRoutes'
import chartsRoute from './views/charts/ChartsRoute'
import dragAndDropRoute from './views/Drag&Drop/DragAndDropRoute'

import formsRoutes from './views/forms/FormsRoutes'
import mapRoutes from './views/map/MapRoutes'


const redirectRoute = [
    // {
    //     path: '/',
    //     exact: true,
    //     component: () => <Redirect to="/home" />,
    // },
]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    // ...homeRoutes,
    ...testRoutes,
    ...ClassRoutes,
    ...dashboardRoutes,
    ...materialRoutes,
    ...utilitiesRoutes,
    ...chartsRoute,
    ...dragAndDropRoute,
    ...formsRoutes,
    ...mapRoutes,
    ...redirectRoute,
    ...errorRoute,
]

export default routes
