import React, { useState, useEffect } from 'react';
import './QuizPage.css'


const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Fetch questions from API
  useEffect(() => {
    fetch('https://the-trivia-api.com/v2/questions')
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error('Error fetching questions:', error));
  }, []);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  if (!questions.length) {
    return <div>Loading questions...</div>;
  }

  if (quizFinished) {
    return (
      <div className="quiz-container">
        <h2>Quiz Finished!</h2>
        <p>Your final score is: {score} / {questions.length}</p>
        <button className="restart-button" onClick={() => window.location.reload()}>
          Restart Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answers = [...currentQuestion.incorrectAnswers, currentQuestion.correctAnswer].sort();

  return (
    <div className="quiz-container">
      <div className="question-card">
        <h3>Question {currentQuestionIndex + 1} / {questions.length}</h3>
        <h4>{currentQuestion.question.text}</h4>
        <div className="answer-options">
          {answers.map((answer, idx) => (
            <button
              key={idx}
              className={`answer-button ${selectedAnswer
                  ? answer === questions[currentQuestionIndex].correctAnswer
                    ? 'correct'
                    : answer === selectedAnswer
                      ? 'incorrect'
                      : ''
                  : ''
                }`}
              onClick={() => handleAnswerSelection(answer)}
              disabled={!!selectedAnswer}
            >
              {answer}
            </button>
          ))}
        </div>
        {selectedAnswer && (
          <button
            className="next-button"
            onClick={handleNextQuestion}
          >
            Next Question
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizApp;
