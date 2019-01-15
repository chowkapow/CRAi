const rp = require('request-promise');
require('dotenv').load();

const cast = new Map();

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/455207',
  qs: {
    language: 'en-US',
    api_key: process.env.TMDB_API_KEY,
    append_to_response: 'credits'
  }
};
rp(options)
  .then(body => {
    cra = JSON.parse(body);
    for (let i = 0; i < cra.credits.cast.length; i++) {
      actor = cra.credits.cast[i];
      cast.set(actor.name, actor.id);
    }
    console.log('test');
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
