var express = require('express');
var router = express.Router();
const { actorUrl } = require('../utils');
const rp = require('request-promise');
require('dotenv').load();

let actor = 'Henry Golding';

router.post('/search-actor', (req, res) => {
  actor = req.body.actor;
  res.redirect('/actor-page');
});

/* GET home page. */
router.get('/actor-info', function(req, res, next) {
  rp(actorUrl(actor)).then(data => {
    res.render('index', { data });
  });
});

module.exports = router;
