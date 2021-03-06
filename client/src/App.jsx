import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

import './App.css';
import './components/Autosuggest/Autosuggest.css';
import {
  getSuggestions,
  getSuggestionValue,
  renderSuggestion
} from './components/Autosuggest';
import Footer from './components/Footer';
import Results from './components/Results';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cast: [],
      value: '',
      suggestions: [],
      showResults: false,
      filmography: [],
      picture: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async getCast() {
    const cast = await (await fetch('/getCast')).json();
    this.setState({ cast });
  }

  componentDidMount() {
    this.getCast();
  }

  async handleSubmit(event) {
    event.preventDefault();
    const value =
      event.type === 'click' ? event.currentTarget.innerText : this.state.value;
    this.setState({ showResults: false });
    const filmography = await fetch('/actor/filmography?actor=' + value);
    const picture = await fetch('/actor/picture?actor=' + value);
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
      suggestions: getSuggestions(this.state.cast, value)
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
      <div>
        <section className="jumbotron text-center">
          <div className="container">
            <h1>The Crazy Rich Asians Index</h1>
            <form onSubmit={this.handleSubmit}>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={this.handleSubmit}
              />
              <input className="hide" type="submit" />
            </form>
          </div>
        </section>
        {this.state.showResults && (
          <Results
            filmography={this.state.filmography}
            picture={this.state.picture}
          />
        )}
        <br />
        <Footer />
      </div>
    );
  }
}

export default App;
