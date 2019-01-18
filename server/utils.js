const axios = require('axios');

const cast = new Map();

const options = {
  movieCast: {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/455207',
    params: {
      language: 'en-US',
      api_key: process.env.TMDB_API_KEY,
      append_to_response: 'credits'
    }
  },

  actorFilmography: id => {
    return {
      method: 'GET',
      url: `https://api.themoviedb.org/3/person/${id}/combined_credits`,
      params: {
        language: 'en-US',
        api_key: process.env.TMDB_API_KEY
      }
    };
  },

  actorPicture: id => {
    return {
      method: 'GET',
      url: `https://api.themoviedb.org/3/person/${id}/images`,
      params: {
        api_key: process.env.TMDB_API_KEY
      }
    };
  }
};

axios(options.movieCast)
  .then(res => {
    const cra = res.data;
    for (let i = 0; i < cra.credits.cast.length; i++) {
      actor = cra.credits.cast[i];
      cast.set(actor.name, actor.id);
    }
  })
  .catch(err => console.log(err));

const utils = {
  getActorFilmography: actor => {
    return axios(options.actorFilmography(cast.get(actor)))
      .then(res => res.data)
      .catch(err => console.log(err));
  },
  getCast: () => cast,
  getActorPicture: actor =>
    axios(options.actorPicture(cast.get(actor)))
      .then(res => res.data)
      .catch(err => console.log(err))
};

module.exports = utils;
