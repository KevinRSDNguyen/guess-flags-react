import React, { Component } from 'react';
import {connect} from 'react-redux';
import FlagQuestion from './../FlagQuestion/FlagQuestion.js';

import {fetchCountries, onGuess, nextQuestion} from './../../store/actions/actions';

class CountryGame extends Component {
  componentDidMount() {
    this.props.setCountries();
  }
  render() {
    return (
      <div style={{ marginTop: '15px' }}>
        <FlagQuestion 
          options={this.props.options}
          correctOption={this.props.correctOption}
          flag={this.props.flag}
          questionState={this.props.questionState}
          onGuess={this.props.onGuess}
          nextQuestion={this.props.nextQuestion}
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
    onGuess: (obj) => dispatch(onGuess(obj)) ,
    nextQuestion: () => dispatch(nextQuestion())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryGame);