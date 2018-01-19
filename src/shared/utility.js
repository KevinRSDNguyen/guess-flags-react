import shuffle from 'shuffle-array';

export const QuestionStates = {
  QUESTION: 1,
  ANSWER_WRONG: 2,
  ANSWER_CORRECT: 3
};

export const getOptions = (correctOption, countries) => {
  let options = [correctOption];
  while (options.length < 4) {
    const optionIndex = Math.floor(Math.random() * countries.length);
    if (options.indexOf(countries[optionIndex].name) === -1) {
      options.push({ name: countries[optionIndex].name });
    }
  }
  return shuffle(options);
};