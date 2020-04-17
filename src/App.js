import React, { Component } from 'react';
import './App.css';
import Beat from './components/beat';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Metronome</h1>
        <Beat />
      </div>
    );
  }
}

export default App;
