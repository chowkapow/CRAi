import React, { Component } from 'react';

import './Results.css';

class Results extends Component {
  render() {
    return (
      <div className="container">
        <div className="row results">
          <div className="col-md-4">
            <img
              className="picture"
              src={this.props.picture}
              alt="actor headshot"
            />
          </div>
          <div className="col-md-8">
            <ul className="filmography-list">
              {this.props.filmography.map(film => (
                <li key={film.id} className="filmography-list-item">
                  <span className="bold">{film.title} </span>
                  <span className="light">
                    (
                    {(film.release_date && film.release_date.substring(0, 4)) ||
                      'TBD'}
                    ) |{' '}
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
