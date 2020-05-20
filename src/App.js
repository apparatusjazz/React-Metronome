import React, { Component } from 'react';
import './App.css';
import Metronome from './components/metronome';
import Beat from './components/beat';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Metronome</h1>
        <Metronome />
      </div>
    );
  }
}

export default App;
