const express = require('express');
const router = express.Router();

const { getActorFilmography, getActorPicture } = require('../utils');

router.get('/actor-filmography', async (req, res) => {
  const filmography = await getActorFilmography(req.query.actor);
  if (filmography) res.send(filmography);
  else res.redirect('/error');
});

router.get('/actor-picture', async (req, res) => {
  const picture = await getActorPicture(actor);
  if (picture) res.send(picture);
});

module.exports = router;
