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
      filmography: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ showResults: false });
    const res = await fetch('/actor-filmography?actor=' + this.state.value);
    if (res.status === 200) {
      const filmography = await res.json();
      this.setState({ showResults: true, filmography: filmography });
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
            <Results filmography={this.state.filmography} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
