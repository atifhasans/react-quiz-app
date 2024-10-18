import React from 'react';
import AnswerOptions from './AnswerOptions';

const QuestionCard = ({ question, onAnswerSelection }) => {
  const { question: { text }, correctAnswer, incorrectAnswers } = question;

  const shuffledAnswers = [...incorrectAnswers, correctAnswer].sort();

  return (
    <div className="question-card">
      <h4>{text}</h4>
      <AnswerOptions 
        answers={shuffledAnswers} 
        correctAnswer={correctAnswer} 
        onAnswerSelection={onAnswerSelection} 
      />
    </div>
  );
};

export default QuestionCard;
