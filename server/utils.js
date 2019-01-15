const axios = require('axios');

const cast = new Map();

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/455207',
  params: {
    language: 'en-US',
    api_key: process.env.TMDB_API_KEY,
    append_to_response: 'credits'
  }
};

axios(options)
  .then(body => {
    const cra = body.data;
    for (let i = 0; i < cra.credits.cast.length; i++) {
      actor = cra.credits.cast[i];
      cast.set(actor.name, actor.id);
    }
  })
  .catch(err => console.log(err));

const utils = {
  actorUrl: actor => {
    return `https://api.themoviedb.org/3/person/${cast.get(
      actor
    )}/combined_credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`;
  },
  getCast: () => cast
};

module.exports = utils;
