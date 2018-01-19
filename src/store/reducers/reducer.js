import {QuestionStates} from './../../shared/utility';
import shuffle from 'shuffle-array';

const initialState= {
  countries: [], 
  options: [], 
  correctOption: {name: ''}, 
  flag: undefined,
  questionState: undefined  
};

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

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_COUNTRIES':
      return {
        ...state,
        countries: action.countries,
        options: action.options,
        correctOption: action.correctOption,
        flag: action.flag,
        questionState: action.questionState
      };
    case "ON_GUESS":
      const prevState = {...state};
      const {correctOption} = prevState;
      const questionState = action.name === correctOption.name ?
        QuestionStates.ANSWER_CORRECT : 
        QuestionStates.ANSWER_WRONG;
      return {
        ...state,
        questionState
      };
    case "NEXT_QUESTION":
      const prevState2 = {...state};
      const {countries} = prevState2;
      const correctOptionIndex = Math.floor(Math.random() * countries.length);
      const flag = countries[correctOptionIndex].flag;
      const correctOption2 = { name: countries[correctOptionIndex].name };
      const options = getOptions(correctOption2, countries);
      return {
        ...state,
        options,
        correctOption: correctOption2,
        flag,
        questionState: QuestionStates.QUESTION
      };
    default: return state;
  }
};

export default reducer;