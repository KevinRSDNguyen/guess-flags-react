import React from 'react';
import StyledButton from './../StyledButton/StyledButton';
import './FlagChoices.css';

const FlagChoices = ({options, handleChange, handleSubmit}) => {
  let inputs = options.map(opt => {
    return (
      <label key={opt.name}>
      <input type="radio"
        value={opt.name} 
        checked={opt.checked} 
        onChange={handleChange} 
        name="flag-choice" />
      {opt.name}
    </label>
    );
  });
  return (
    <form className="flag-form" onSubmit={handleSubmit}> 
      {inputs}
      <StyledButton text="GUESS" type="submit"/>
    </form>
  );
};

export default FlagChoices;