const express = require('express');
const router = express.Router();

const {renderQuienesSomos,renderTerminos,renderContacto,renderPreguntas,renderCambios,renderCompra,renderEnvios} = require('../controllers/vistasControllers')

router.get('/quienesSomos',renderQuienesSomos);
router.get('/terminos',renderTerminos);
router.get('/contacto',renderContacto);
router.get('/preguntas',renderPreguntas);
router.get('/cambios',renderCambios);
router.get('/compra',renderCompra);
router.get('/envios',renderEnvios);

module.exports= router;