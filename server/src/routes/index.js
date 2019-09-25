import express from 'express';
import { capitalize } from './utils';
import utils from './utils';

const router = express.Router();

router.get('/actor-filmography', async (req, res) => {
  const actor = capitalize(req.query.actor);
  const filmography = await utils.getActorFilmography(actor);
  if (filmography)
    res.send(
      filmography.cast
        .filter(film => film.title && film.character)
        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
    );
  else res.redirect('/error');
});

router.get('/actor-picture', async (req, res) => {
  const actor = capitalize(req.query.actor);
  const picture = await utils.getActorPicture(actor);
  if (picture) res.send(picture);
  else res.redirect('/error');
});

export default router;
