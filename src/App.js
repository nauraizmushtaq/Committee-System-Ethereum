import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainComponent from './MainComponent';

function App() {
  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          Voting App
        </h1>
        <p>
          by Haris
        </p>
      </header>

      <body>
        <MainComponent/>
      </body>

      <footer className="Appfooter">
        <p>This app was made using React</p>
      </footer>
      
    </div>
  );
}

export default App;