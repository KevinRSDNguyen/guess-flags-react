import {QuestionStates, getOptions} from './../../shared/utility';

const initialState= {
  countries: [], 
  options: [], 
  correctOption: {name: ''}, 
  flag: undefined,
  questionState: undefined  
};

const setCountries = (countries, state) => {
  const correctOptionIndex = Math.floor(Math.random() * countries.length);
  const flag = countries[correctOptionIndex].flag;
  const correctOption = countries[correctOptionIndex].name;
  const options = getOptions(correctOption, countries);
  return {
    ...state,
    countries,
    options,
    correctOption,
    flag,
    questionState: QuestionStates.QUESTION
  };
};

const onGuess = (name, state) => {
  const prevState = {...state};
  const {correctOption} = prevState;
  const questionState = name === correctOption ?
    QuestionStates.ANSWER_CORRECT :
    QuestionStates.ANSWER_WRONG;
  return {
    ...state,
    questionState
  };
};

const nextQuestion = (state) => {
  const prevState = {...state};
  const {countries} = prevState;
  const correctOptionIndex = Math.floor(Math.random() * countries.length);
  const flag = countries[correctOptionIndex].flag;
  const correctOption = countries[correctOptionIndex].name;
  const options = getOptions(correctOption, countries);
  return {
    ...state,
    options,
    correctOption,
    flag,
    questionState: QuestionStates.QUESTION
  };
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_COUNTRIES': return setCountries(action.countries, state);
    case "ON_GUESS": return onGuess(action.name, state);
    case "NEXT_QUESTION": return nextQuestion(state);
    default: return state;
  }
};

export default reducer;