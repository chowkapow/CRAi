import express from 'express';
import utils from './utils';

const router = express.Router();

router.get('/getCast', (req, res) => {
  res.send(utils.getCast());
});

export default router;
