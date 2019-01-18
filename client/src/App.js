import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showResults: false
    };
  }

  async onClick() {
    const res = await fetch('/search-actor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        actor: document.getElementById('actor').value
      })
    });
    if (res.status === 200) this.setState({ showResults: true });
  }

  render() {
    return (
      <div className="App">
        CRAi
        <br />
        <br />
        <div>
          <input id="actor" name="actor" placeholder="Actor's name..." />
          <button onClick={() => this.onClick()}>Enter</button>
          {this.state.showResults ? <Results /> : null}
        </div>
      </div>
    );
  }
}

class Results extends Component {
  constructor() {
    super();
    this.state = { filmography: [] };
  }
  componentDidMount() {
    fetch('/actor-filmography')
      .then(res => res.json())
      .then(res => {
        const filmography = res.cast;
        this.setState({ filmography });
      });
  }
  render() {
    return (
      <div id="results">
        {this.state.filmography.map(film => (
          <h1 key={film.id}>
            {film.title} as {film.character}
          </h1>
        ))}
      </div>
    );
  }
}

export default App;
