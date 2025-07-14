import React from 'react';

function QuestionCard({ question, questionNumber, totalQuestions, handleAnswer }) {
  return (
    <div>
      <h2>Question {questionNumber} / {totalQuestions}</h2>
      <p>{question.questionText}</p>
      {question.answerOptions.map((option, index) => (
        <button
          key={index}
          style={{ display: 'block', margin: '10px 0', padding: '10px' }}
          onClick={() => handleAnswer(option.isCorrect)}
        >
          {option.answerText}
        </button>
      ))}
    </div>
  );
}

export default QuestionCard;
