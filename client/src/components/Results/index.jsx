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
        <div className="row results">
          <div className="col-md-4">
            <img
              className="picture"
              src={this.state.picture}
              alt="actor headshot"
            />
          </div>
          <div className="col-md-8">
            <ul className="filmography-list">
              {this.state.filmography.map(film => (
                <li key={film.id} className="filmography-list-item">
                  <span className="bold">{film.title} </span>(
                  <span className="light">
                    {film.release_date.substring(0, 4) || 'TBD'}) |&nbsp;
                  </span>
                  {film.character}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Results;
