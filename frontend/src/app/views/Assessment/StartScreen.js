import React from 'react';
import { useParams } from 'react-router-dom';

const StartScreen = () => {

    const { testId} = useParams();
    return (
        <div>
            StartScreen { testId}
        </div>
    );
}

export default StartScreen;