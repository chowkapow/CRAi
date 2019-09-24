import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

import './App.css';
import Results from './components/Results';
import {
  getSuggestions,
  getSuggestionValue,
  renderSuggestion
} from './components/Autosuggest';

class App extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: [],
      showResults: false,
      filmography: [],
      picture: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ showResults: false });
    const filmography = await fetch(
      '/actor-filmography?actor=' + this.state.value
    );
    const picture = await fetch('/actor-picture?actor=' + this.state.value);
    if (filmography.status === 200 && picture.status === 200) {
      const filmographyJSON = await filmography.json();
      const pictureJSON = await picture.json();
      this.setState({
        showResults: true,
        filmography: filmographyJSON,
        picture:
          'http://image.tmdb.org/t/p/original' +
          pictureJSON.profiles[
            Math.floor(Math.random() * Math.floor(pictureJSON.profiles.length))
          ].file_path
      });
    }
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Enter actor's name...",
      value,
      onChange: this.onChange
    };

    return (
      <div className="App">
        CRAi
        <br />
        <br />
        <div>
          <form onSubmit={this.handleSubmit}>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
            <input className="hide" type="submit" />
          </form>

          {this.state.showResults ? (
            <Results
              filmography={this.state.filmography}
              picture={this.state.picture}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;