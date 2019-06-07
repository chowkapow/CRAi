import express from 'express';
import utils from './utils';

const router = express.Router();

router.get('/actor-filmography', async (req, res) => {
  const filmography = await utils.getActorFilmography(req.query.actor);
  if (filmography) res.send(filmography);
  else res.redirect('/error');
});

router.get('/actor-picture', async (req, res) => {
  const picture = await utils.getActorPicture(actor);
  if (picture) res.send(picture);
});

export default router;
