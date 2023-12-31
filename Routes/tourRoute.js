const express = require('express');
const router = express.Router();
const { addTour, getTours } = require('../Controllers/tourController');


router.post('/add', addTour);
router.get('/list', getTours);

module.exports = router;
