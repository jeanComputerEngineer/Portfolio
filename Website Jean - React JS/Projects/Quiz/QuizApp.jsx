import React from 'react';
import IndexQuiz from './IndexQuiz';
import { QuizProvider } from './Quiz';

function QuizApp() {
  return (
    <QuizProvider>
      <IndexQuiz />
    </QuizProvider>
  );
}

export default QuizApp;
