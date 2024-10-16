import StartScreen from './StartScreen';
import AnswerSheet from './AnswerSheet';
import SubmittedScreen from './SubmittedScreen';

const testRoutes = [
    {
        path: '/assessment/:testId/live',
        component: AnswerSheet,
    },
    {
        path: '/assessment/:testId/submitted',
        component: SubmittedScreen,
    },
    {
        path: '/assessment/:testId',
        component: StartScreen,
    }
    
    
]

export default testRoutes;
