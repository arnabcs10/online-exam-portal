import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const AnswerSheet = () => {
    const testState = useSelector(state => state.testStore);
    const { loading, message, status, testDetails } = testState;
  return (
    <div>
        AnswerSheet
        <p>
          {testDetails.examId.description}
        </p>
        {testDetails.timeLeft}
    </div>
  )
}

export default AnswerSheet