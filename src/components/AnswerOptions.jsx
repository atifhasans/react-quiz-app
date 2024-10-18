import React, { useState } from 'react';

const AnswerOptions = ({ answers, correctAnswer, onAnswerSelection }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    onAnswerSelection(answer, correctAnswer);
  };

  return (
    <div className="answer-options">
      {answers.map((answer, idx) => (
        <button
          key={idx}
          className={`answer-button ${selectedAnswer === answer ? 'selected' : ''}`}
          onClick={() => handleAnswerClick(answer)}
          disabled={!!selectedAnswer}
        >
          {answer}
        </button>
      ))}
    </div>
  );
};

export default AnswerOptions;
