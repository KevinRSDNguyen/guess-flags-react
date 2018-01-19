import React, { Component } from 'react';
import FlagChoices from './../../Components/FlagChoices/FlagChoices';
import FlagAnswer from './../../Components/FlagAnswer/FlagAnswer';
import {QuestionStates} from './../../shared/utility';
import './FlagQuestion.css';

class FlagQuestion extends Component {
  state = {
    userChoice: '',
  }
  handleChange = (e) => {
    this.setState({
      userChoice: e.target.value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onGuess(this.state.userChoice);
  }
  render() {
    const {
      options,
      correctOption,
      flag,
      questionState,
      nextQuestion
    } = this.props;
    const {userChoice} = this.state;
    let opts = options.map(opt => {
      return {
        name: opt,
        checked: userChoice === opt
      }
    });
    const output = questionState === QuestionStates.QUESTION ?
      (<FlagChoices handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        options={opts}/>) :
      (<FlagAnswer 
        correct={questionState === QuestionStates.ANSWER_CORRECT}
        correctOption={correctOption}
        nextQuestion={nextQuestion}
      />)

    return (
      <div>
        {output}
        <img
          className="flag-img"
          src={flag} //Passed from props. Gives flag img of c. option
          alt="Guess the flag"
        />
      </div>
    );
  }
};

export default FlagQuestion;