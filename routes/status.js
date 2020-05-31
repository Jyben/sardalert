const express = require('express')
const router = express.Router()
const sardoche = require('../services/sardoche')

/* GET status. */
router.get('/', async function (req, res, next) {
  const result = await sardoche.getData()
  res.status(200).json(result)
});

module.exports = router
