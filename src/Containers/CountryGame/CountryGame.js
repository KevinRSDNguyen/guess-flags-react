import React, { Component } from 'react';
// import FlagQuestion from './FlagQuestion.js';
import axios from 'axios';
import shuffle from 'shuffle-array';

const QuestionStates = {
  QUESTION: 1,
  ANSWER_WRONG: 2,
  ANSWER_CORRECT: 3
};

class CountryGame extends Component {
  state = {
    countries: [], //List of all countries from the AJAX
    options: [], //Array of 4 country names
    correctOption: undefined, //The index # of array
    questionState: undefined,
  }
  componentDidMount() {
    axios.get("https://restcountries.eu/rest/v2/all")
      .then(({ data: countries }) => {
        const correctOptionIndex = Math.floor(Math.random() * countries.length);
        const correctOption = { name: countries[correctOptionIndex].name };
        const options = this.getOptions(correctOption, countries);
        this.setState({
          countries,
          options,
          correctOption,
          questionState: QuestionStates.QUESTION
        });
      })
  }
  getOptions = (correctOption, countries) => {
    let options = [{ name: correctOption }];
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
  render() {
    return (
      <p>Country game component</p>
    );
  }
};

export default CountryGame;