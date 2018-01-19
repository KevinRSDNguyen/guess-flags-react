import React from 'react';
import StyledButton from './../StyledButton/StyledButton';
import './FlagAnswer.css';

const FlagAnswer = ({correct, correctOption, nextQuestion}) => {
  return (
    <div className="flag-answer">
      {correct ? `Correct. The answer was ${correctOption.name}`:
      `Incorrect! The answer was ${correctOption.name}`
      }
      <StyledButton text="NEXT" onClick={nextQuestion}/>
    </div>
  );
};

export default FlagAnswer;