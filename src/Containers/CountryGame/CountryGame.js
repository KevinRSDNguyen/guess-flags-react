import React, { Component } from 'react';
import FlagQuestion from './../FlagQuestion/FlagQuestion.js';
import axios from 'axios';
import shuffle from 'shuffle-array';
import {QuestionStates} from './../../shared/utility';

class CountryGame extends Component {
  state = {
    countries: [], 
    options: [], 
    correctOption: {name: ''}, 
    flag: undefined,
    questionState: undefined
  }
  componentDidMount() {
    axios.get("https://restcountries.eu/rest/v2/all")
      .then(({ data: countries }) => {
        const correctOptionIndex = Math.floor(Math.random() * countries.length);
        const flag = countries[correctOptionIndex].flag;
        const correctOption = { name: countries[correctOptionIndex].name };
        const options = this.getOptions(correctOption, countries);
        this.setState({
          countries,
          options,
          correctOption,
          flag,
          questionState: QuestionStates.QUESTION
        });
      })
  }
  getOptions = (correctOption, countries) => {
    let options = [correctOption];
    while (options.length < 4) {
      const optionIndex = Math.floor(Math.random() * countries.length);
      if (options.indexOf(countries[optionIndex].name) === -1) {
        options.push({ name: countries[optionIndex].name });
      }
    }
    return shuffle(options);
  }
  onGuess = ({name}) => {
    const {correctOption} = this.state;
    const questionState = name === correctOption.name ?
      QuestionStates.ANSWER_CORRECT : 
      QuestionStates.ANSWER_WRONG;
    this.setState({questionState});
  }
  nextQuestion = () => {
    const {countries} = this.state;
    const correctOptionIndex = Math.floor(Math.random() * countries.length);
    const flag = countries[correctOptionIndex].flag;
    const correctOption = { name: countries[correctOptionIndex].name };
    const options = this.getOptions(correctOption, countries);
    this.setState({
      options,
      correctOption,
      flag,
      questionState: QuestionStates.QUESTION
    });
  }
  render() {
    const {
      options, 
      correctOption, 
      flag, 
      questionState
    } = this.state;
    return (
      <div style={{ marginTop: '15px' }}>
        <FlagQuestion 
          options={options}
          correctOption={correctOption}
          flag={flag}
          questionState={questionState}
          onGuess={this.onGuess}
          nextQuestion={this.nextQuestion}
        />
      </div>
    );
  }
};

export default CountryGame;