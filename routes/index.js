const express = require('express')
const router = express.Router()
const sardoche = require('../services/sardoche')

/* GET home page. */
router.get('/', async function (req, res, next) {
  const result = await sardoche.getData()
  res.render('index', { live: result.live, time: result.time, onair: result.onair })
});

module.exports = router
