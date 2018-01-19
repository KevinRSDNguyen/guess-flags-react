import axios from 'axios';

export const onGuess = (name) => {
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
  return {
    type: "SET_COUNTRIES",
    countries
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