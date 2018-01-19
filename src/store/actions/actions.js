import axios from 'axios';
import shuffle from 'shuffle-array';
import {QuestionStates} from './../../shared/utility';

const getOptions = (correctOption, countries) => {
  let options = [correctOption];
  while (options.length < 4) {
    const optionIndex = Math.floor(Math.random() * countries.length);
    if (options.indexOf(countries[optionIndex].name) === -1) {
      options.push({ name: countries[optionIndex].name });
    }
  }
  return shuffle(options);
};

export const onGuess = ({name}) => {
  return {
    type: "ON_GUESS",
    name
  };
};

export const nextQuestion = () => {
  return {
    type: "NEXT_QUESTION"
  };
};

export const setCountries = (countries) => {
  const correctOptionIndex = Math.floor(Math.random() * countries.length);
  const flag = countries[correctOptionIndex].flag;
  const correctOption = { name: countries[correctOptionIndex].name };
  const options = getOptions(correctOption, countries);
  return {
    type: "SET_COUNTRIES",
    countries,
    options,
    correctOption,
    flag,
    questionState: QuestionStates.QUESTION 
  };
};

export const fetchCountries = () => {
  return dispatch => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(({data}) => {
        dispatch(setCountries(data));
      });
  };
};