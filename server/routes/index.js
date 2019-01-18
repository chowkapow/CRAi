const express = require('express');
const router = express.Router();

const { getActorFilmography, getCast, getActorPicture } = require('../utils');

let actor;

router.post('/search-actor', (req, res) => {
  actor = req.body.actor.trim();
  if (!getCast().has(actor)) res.redirect('/error');
  else res.sendStatus(200);
});

router.get('/actor-filmography', async (req, res) => {
  const filmography = await getActorFilmography(actor);
  if (filmography) res.send(filmography);
  else res.redirect('/error');
});

router.get('/actor-picture', async (req, res) => {
  const picture = await getActorPicture(actor);
  if (picture) res.send(picture);
});

module.exports = router;
