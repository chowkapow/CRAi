import React, { Component } from 'react';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = { filmography: props.filmography || [] };
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

export default Results;
