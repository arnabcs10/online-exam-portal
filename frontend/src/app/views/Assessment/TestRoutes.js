import StartScreen from './StartScreen';
import AnswerSheet from './AnswerSheet';

const testRoutes = [
    {
        path: '/assessment/:testId/live',
        component: AnswerSheet,
    },
    {
        path: '/assessment/:testId/submitted',
        component: StartScreen,
    },
    {
        path: '/assessment/:testId',
        component: StartScreen,
    }
    
    
]

export default testRoutes;
