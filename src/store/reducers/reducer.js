import {QuestionStates, getOptions} from './../../shared/utility';

const initialState= {
  countries: [], 
  options: [], 
  correctOption: {name: ''}, 
  flag: undefined,
  questionState: undefined  
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