import React from 'react';
import { cast } from '../../constants';

export const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : cast.filter(
        actor => actor.name.toLowerCase().slice(0, inputLength) === inputValue
      );
};

export const getSuggestionValue = suggestion => suggestion.name;

export const renderSuggestion = suggestion => <span>{suggestion.name}</span>;
