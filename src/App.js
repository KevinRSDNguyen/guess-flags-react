import React, { Component } from 'react';
import CountryGame from './Containers/CountryGame/CountryGame';
import worldImg from './assets/images/world.jpg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="flag-app">
        <header
          className="title-header"
          style={{ backgroundImage: `url(${worldImg})` }}>
          <h1 className="title-text">Guess The Flag</h1>
        </header>
        <CountryGame />
      </div>
    );
  }
}

export default App;
