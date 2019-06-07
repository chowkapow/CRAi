import React, { Component } from 'react';
import './App.css';

import Results from './components/Results';

class App extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      filmography: [],
      showResults: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ showResults: false });
    const res = await fetch('/actor-filmography?actor=' + this.state.value);
    if (res.status === 200) {
      const cast = (await res.json()).cast;
      this.setState({ showResults: true, filmography: cast });
    }
  }

  render() {
    return (
      <div className="App">
        CRAi
        <br />
        <br />
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="actor"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="Actor's name..."
            />
            <input type="submit" />
          </form>

          {this.state.showResults ? (
            <Results filmography={this.state.filmography} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
