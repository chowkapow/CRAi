import React from 'react';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';

export const getSuggestions = (cast, value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : cast.filter(
        actor =>
          actor.name.toLowerCase().slice(0, inputLength) === inputValue ||
          (actor.name.split(' ').length > 1 &&
            actor.name
              .split(' ')[1]
              .toLowerCase()
              .slice(0, inputLength) === inputValue) //||
        // actor.character.toLowerCase().slice(0, inputLength) === inputValue ||
        // (actor.character.split(' ').length > 1 &&
        //   actor.character
        //     .split(' ')[1]
        //     .toLowerCase()
        //     .slice(0, inputLength) === inputValue)
      );
};

export const getSuggestionValue = suggestion => suggestion.name;

export const renderSuggestion = (suggestion, { query }) => {
  const matches = AutosuggestHighlightMatch(suggestion.name, query);
  const parts = AutosuggestHighlightParse(suggestion.name, matches);
  return (
    <span className="name">
      {parts.map((part, index) => {
        const className = part.highlight ? 'highlight' : null;

        return (
          <span className={className} key={index}>
            {part.text}
          </span>
        );
      })}
    </span>
  );
};
