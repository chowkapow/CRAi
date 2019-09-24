import React, { Component } from 'react';

import './Results.css';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filmography: props.filmography || [],
      picture: props.picture || ''
    };
  }

  render() {
    return (
      <div id="results">
        <img className="picture" src={this.state.picture} />
        {this.state.filmography.map(film => (
          <h1 key={film.id}>
            {film.title} as {film.character} (
            {film.release_date.substring(0, 4) || 'TBD'})
          </h1>
        ))}
      </div>
    );
  }
}

export default Results;
