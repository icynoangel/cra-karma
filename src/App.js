import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  onClick() {
    console.log('clicked');
  }

  render() {
    return (
      <div className="App" onClick={this.onClick}>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
      </div>
    );
  }
}

export default App;
