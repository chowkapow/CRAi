var express = require('express');
var router = express.Router();
const axios = require('axios');
const { actorUrl, getCast } = require('../utils');

let actor;

router.post('/search-actor', (req, res) => {
  actor = req.query.actor.trim();
  if (getCast().has(actor)) res.redirect('/actor-page');
  else res.redirect('/error');
});

router.get('/search-actor-info', function(req, res, next) {
  axios
    .get(actorUrl(actor))
    .then(data => {
      res.send({ data });
    })
    .catch(err => res.redirect('/error'));
});

module.exports = router;
