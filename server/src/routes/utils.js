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

export async function setCast() {
  try {
    const cra = (await axios(options.movieCast)).data;
    for (let i = 0; i < cra.credits.cast.length; i++) {
      let actor = cra.credits.cast[i];
      cast.set(actor.name, actor.id);
    }
  } catch (err) {
    console.log(err);
  }
}

const utils = {
  getActorFilmography: async actor => {
    try {
      return (await axios(options.actorFilmography(cast.get(actor)))).data;
    } catch (err) {
      console.log(err);
    }
  },
  getCast: () => cast,
  getActorPicture: async actor => {
    try {
      return (await axios(options.actorPicture(cast.get(actor)))).data;
    } catch (err) {
      console.log(err);
    }
  }
};

export default utils;
