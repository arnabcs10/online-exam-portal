import StartScreen from './StartScreen';

const testRoutes = [
    {
        path: '/assessment/:testId',
        component: StartScreen,
    },
    {
        path: '/assessment/:testId/live',
        component: StartScreen,
    },
    {
        path: '/assessment/:testId/submitted',
        component: StartScreen,
    }
    
]

export default testRoutes;
