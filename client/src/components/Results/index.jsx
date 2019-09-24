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
      <div className="container">
        <img className="picture" src={this.state.picture} />
        <div className="filmography-container">
          <ul className="filmography-list">
            {this.state.filmography.map(film => (
              <li key={film.id} className="filmography-list-item">
                {film.title} as {film.character} (
                {film.release_date.substring(0, 4) || 'TBD'})
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Results;
