import React, { Component } from 'react';
import {connect} from 'react-redux';
import FlagQuestion from './../FlagQuestion/FlagQuestion.js';

import {fetchCountries, onGuess, nextQuestion} from './../../store/actions/actions';

class CountryGame extends Component {
  componentDidMount() {
    this.props.setCountries();
  }
  render() {
    const {
      options,
      correctOption,
      flag,
      questionState,
      onGuess,
      nextQuestion
    } = this.props;
    return (
      <div style={{ marginTop: '15px' }}>
        <FlagQuestion 
          options={options}
          correctOption={correctOption}
          flag={flag}
          questionState={questionState}
          onGuess={onGuess}
          nextQuestion={nextQuestion}
        />
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
      options: state.options,
      correctOption: state.correctOption,
      flag: state.flag,
      questionState: state.questionState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCountries: () => dispatch(fetchCountries()),
    onGuess: (name) => dispatch(onGuess(name)) ,
    nextQuestion: () => dispatch(nextQuestion())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryGame);