import express from 'express';
import utils from './utils';

const router = express.Router();

router.get('/actor-filmography', async (req, res) => {
  const filmography = await utils.getActorFilmography(req.query.actor);
  if (filmography)
    res.send(
      filmography.cast
        .filter(film => film.title && film.character)
        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
    );
  else res.redirect('/error');
});

router.get('/actor-picture', async (req, res) => {
  const picture = await utils.getActorPicture(req.query.actor);
  if (picture) res.send(picture);
  else res.redirect('/error');
});

export default router;
