import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showResults: false
    };
  }

  onClick() {
    this.setState({ showResults: true });
  }

  render() {
    return (
      <div className="App">
        CRAi
        <br />
        <br />
        {/* <form method="POST" action="/search-actor"> */}
        <input name="actor" placeholder="Actor's name..." />
        <button onClick={() => this.onClick()}>Enter</button>
        {this.state.showResults ? <Results /> : null}
        {/* </form> */}
      </div>
    );
  }
}

class Results extends Component {
  render() {
    return <div id="results">Some results</div>;
  }
}

export default App;
