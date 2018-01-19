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
      const correctOptionIndex = Math.floor(Math.random() * action.countries.length);
      const flag = action.countries[correctOptionIndex].flag;
      const correctOption = { name: action.countries[correctOptionIndex].name };
      const options = getOptions(correctOption, action.countries);
      return {
        ...state,
        countries: action.countries,
        options,
        correctOption,
        flag,
        questionState: QuestionStates.QUESTION
      };
    case "ON_GUESS":
      const prevState = {...state};
      const {correctOption: correctOption3} = prevState;
      const questionState = action.name === correctOption3.name ?
        QuestionStates.ANSWER_CORRECT : 
        QuestionStates.ANSWER_WRONG;
      return {
        ...state,
        questionState
      };
    case "NEXT_QUESTION":
      const prevState2 = {...state};
      const {countries} = prevState2;
      const correctOptionIndex2 = Math.floor(Math.random() * countries.length);
      const flag2 = countries[correctOptionIndex2].flag;
      const correctOption2 = { name: countries[correctOptionIndex2].name };
      const options2 = getOptions(correctOption2, countries);
      return {
        ...state,
        options: options2,
        correctOption: correctOption2,
        flag: flag2,
        questionState: QuestionStates.QUESTION
      };
    default: return state;
  }
};

export default reducer;