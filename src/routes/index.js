const express = require('express');
const router = express.Router();

const {index, search, categories, prueba, descuentosCategory} = require('../controllers/mainControllers')

router.get('/',index);
router.get('/search', search);
router.get('/categories', categories);
router.get('/descuentos', descuentosCategory);
router.get('/prueba', prueba)

module.exports= router;